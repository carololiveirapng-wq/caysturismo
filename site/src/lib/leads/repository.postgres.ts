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

/**
 * Sequencial com `await` de propósito — uma versão anterior encadeava tudo
 * via `.then()` numa única promise e, sob `prepare: false` + conexão
 * única, isso disparava um erro intermitente e reproduzível do driver
 * ("column ... does not exist" num CREATE INDEX cuja coluna existia de
 * verdade — confirmado isolando a mesma query sozinha, que funcionava).
 * `await` em sequência não tem esse problema.
 */
/**
 * Tenta uma vez, espera um instante e tenta de novo antes de desistir.
 * Observado em produção: a mesma sequência de DDL `IF NOT EXISTS`
 * (idempotente por natureza) às vezes falha de forma intermitente contra o
 * pooler do Postgres com um erro enganoso ("column ... does not exist" num
 * CREATE INDEX cuja coluna existe de verdade, confirmado isolando a mesma
 * query sozinha — não é um erro de sintaxe nem de ordem). Como toda
 * statement aqui é segura de repetir, uma segunda tentativa resolve.
 */
async function runWithRetry(run: () => Promise<unknown>): Promise<void> {
  try {
    await run();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    // Sob concorrência (vários cold starts ao mesmo tempo), duas instâncias
    // podem tentar criar a mesma tabela/índice no mesmo instante — Postgres
    // normalmente resolve isso sozinho com `IF NOT EXISTS`, mas em condição
    // de corrida rara pode devolver um erro de "já existe" mesmo assim.
    if (message.includes("already exists")) return;
    await new Promise((resolve) => setTimeout(resolve, 200));
    await run();
  }
}

async function runSchemaMigration(sql: Sql): Promise<void> {
  const statements: (() => Promise<unknown>)[] = [
    () => sql`
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
    `,
    // Colunas adicionadas depois da criação original da tabela — `ADD
    // COLUMN IF NOT EXISTS` cobre tanto o banco já migrado quanto um banco
    // novo (onde a coluna também não existe ainda nesse ponto).
    () => sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS internal_notes text`,
    () => sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS follow_up_at timestamptz`,
    () => sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS next_action text`,
    () => sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS priority boolean NOT NULL DEFAULT false`,
    () => sql`CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at)`,
    () => sql`CREATE INDEX IF NOT EXISTS leads_status_idx ON leads (status)`,
    () => sql`CREATE INDEX IF NOT EXISTS leads_email_idx ON leads (email)`,
    () => sql`CREATE INDEX IF NOT EXISTS leads_whatsapp_idx ON leads (whatsapp)`,
    () => sql`CREATE INDEX IF NOT EXISTS leads_follow_up_at_idx ON leads (follow_up_at)`,
    () => sql`CREATE INDEX IF NOT EXISTS leads_priority_idx ON leads (priority)`,
    // Timeline mínima — só "o que mudou e quando", sem guardar o valor
    // antigo/novo completo (isso já fica no próprio registro do lead).
    () => sql`
      CREATE TABLE IF NOT EXISTS lead_events (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        lead_id uuid NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
        type text NOT NULL,
        detail text,
        created_at timestamptz NOT NULL DEFAULT now()
      )
    `,
    () => sql`CREATE INDEX IF NOT EXISTS lead_events_lead_id_idx ON lead_events (lead_id)`,
  ];

  for (const statement of statements) {
    await runWithRetry(statement);
  }
}

function ensureSchema(sql: Sql): Promise<void> {
  if (!schemaReady) {
    schemaReady = runSchemaMigration(sql);
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

    await this.sql`INSERT INTO lead_events (lead_id, type) VALUES (${row.id}, 'created')`;

    return {
      ...lead,
      id: row.id,
      createdAt: row.created_at.toISOString(),
      updatedAt: row.updated_at.toISOString(),
      status: "new",
      priority: false,
    };
  }
}
