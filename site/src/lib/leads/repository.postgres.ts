import postgres, { type Sql } from "postgres";
import type { LeadRepository } from "./repository";
import type { Lead, NewLead } from "./types";

/**
 * Repository real em Postgres — só é instanciado quando `DATABASE_URL`
 * existe (ver `repository.ts`). Funciona com qualquer Postgres compatível
 * (Neon, Supabase, RDS, Railway, etc.), não só Vercel Postgres.
 *
 * Decisões pensadas pra serverless (Vercel):
 * - O cliente `postgres(...)` é criado UMA VEZ em escopo de módulo (não a
 *   cada chamada) — dentro da mesma instância/lambda "quente", invocações
 *   sucessivas reaproveitam a mesma conexão em vez de abrir uma nova TCP a
 *   cada submit (evita connection leak/esgotar `max_connections` do banco
 *   sob carga).
 * - `max: 1` — uma função serverless processa uma requisição por vez; mais
 *   que isso só multiplicaria conexões ociosas.
 * - `prepare: false` — poolers em modo transaction (Supabase Pooler/
 *   Supavisor, PgBouncer, RDS Proxy) não suportam prepared statements bem;
 *   desligar deixa a app compatível com conexão direta OU via pooler sem
 *   precisar saber qual é qual.
 * - `idle_timeout`/`max_lifetime` — fecham conexões ociosas/antigas de
 *   forma previsível, em vez de deixar o driver descobrir depois que uma
 *   conexão "congelada" entre invocações morreu do lado do banco.
 * - `ssl: "require"` em produção — praticamente todo Postgres gerenciado
 *   exige SSL; em dev cai pra "prefer" pra não quebrar um Postgres local
 *   sem SSL.
 *
 * NÃO testado contra um banco real neste ambiente — não há `DATABASE_URL`
 * configurado aqui. O SQL foi escrito com cuidado (tudo parametrizado via
 * template tag, sem interpolação de string — sem risco de SQL injection),
 * mas precisa ser validado contra um Postgres de verdade antes de confiar
 * em produção.
 */

let client: Sql | null = null;
let schemaReady: Promise<void> | null = null;

function getClient(connectionString: string): Sql {
  if (!client) {
    client = postgres(connectionString, {
      max: 1,
      prepare: false,
      idle_timeout: 20,
      connect_timeout: 10,
      max_lifetime: 60 * 30,
      ssl: process.env.NODE_ENV === "production" ? "require" : "prefer",
    });
  }
  return client;
}

function ensureSchema(sql: Sql): Promise<void> {
  if (!schemaReady) {
    schemaReady = sql`
      CREATE TABLE IF NOT EXISTS leads (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        name text NOT NULL,
        email text NOT NULL,
        whatsapp text NOT NULL,
        city text,
        destinations text[] NOT NULL DEFAULT '{}',
        experience text,
        travel_product text,
        month text,
        year text,
        approximate_dates text,
        duration text NOT NULL,
        adults integer NOT NULL,
        children integer NOT NULL DEFAULT 0,
        children_ages text,
        budget_tier text NOT NULL,
        notes text,
        contact_preference text NOT NULL,
        acquisition_source text,
        utm_source text,
        utm_medium text,
        utm_campaign text,
        utm_content text,
        utm_term text,
        source_path text,
        status text NOT NULL DEFAULT 'new',
        internal_notes text,
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now()
      )
    `
      // Tabela criada antes de `internal_notes` existir no schema não ganha
      // a coluna só com `CREATE TABLE IF NOT EXISTS` — sem isto,
      // `updateLeadStatus` (`src/lib/admin/leads-queries.ts`) falha ao
      // salvar observação interna contra um banco mais antigo.
      .then(() => sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS internal_notes text`)
      .then(() => sql`CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at)`)
      .then(() => sql`CREATE INDEX IF NOT EXISTS leads_status_idx ON leads (status)`)
      .then(() => sql`CREATE INDEX IF NOT EXISTS leads_email_idx ON leads (email)`)
      .then(() => sql`CREATE INDEX IF NOT EXISTS leads_whatsapp_idx ON leads (whatsapp)`)
      .then(() => undefined)
      .catch((error: unknown) => {
        // Sob concorrência (vários cold starts ao mesmo tempo), duas
        // instâncias podem tentar criar a mesma tabela/índice no mesmo
        // instante — Postgres normalmente resolve isso sozinho com
        // `IF NOT EXISTS`, mas em condição de corrida rara pode devolver um
        // erro de "já existe". Nesse caso específico, seguimos em frente;
        // qualquer outro erro de schema deve realmente falhar o request.
        const message = error instanceof Error ? error.message : String(error);
        if (!message.includes("already exists")) throw error;
      });
  }
  return schemaReady;
}

export class PostgresLeadRepository implements LeadRepository {
  private sql: Sql;

  constructor(connectionString: string) {
    this.sql = getClient(connectionString);
  }

  async save(lead: NewLead): Promise<Lead> {
    await ensureSchema(this.sql);

    const [row] = await this.sql<{ id: string; created_at: Date; updated_at: Date }[]>`
      INSERT INTO leads (
        name, email, whatsapp, city, destinations, experience, travel_product,
        month, year, approximate_dates, duration, adults, children, children_ages,
        budget_tier, notes, contact_preference, acquisition_source,
        utm_source, utm_medium, utm_campaign, utm_content, utm_term, source_path
      ) VALUES (
        ${lead.name}, ${lead.email}, ${lead.whatsapp}, ${lead.city ?? null}, ${lead.destinations},
        ${lead.experience ?? null}, ${lead.travelProduct ?? null}, ${lead.month ?? null}, ${lead.year ?? null},
        ${lead.approximateDates ?? null}, ${lead.duration}, ${lead.adults}, ${lead.children},
        ${lead.childrenAges ?? null}, ${lead.budgetTier}, ${lead.notes ?? null}, ${lead.contactPreference},
        ${lead.acquisitionSource ?? null}, ${lead.utmSource ?? null}, ${lead.utmMedium ?? null},
        ${lead.utmCampaign ?? null}, ${lead.utmContent ?? null}, ${lead.utmTerm ?? null}, ${lead.sourcePath ?? null}
      )
      RETURNING id, created_at, updated_at
    `;

    return {
      ...lead,
      id: row.id,
      createdAt: row.created_at.toISOString(),
      updatedAt: row.updated_at.toISOString(),
      status: "new",
    };
  }
}
