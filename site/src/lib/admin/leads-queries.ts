import type { Sql } from "postgres";
import { withAdminDb } from "./db";
import type { Lead, LeadStatus, LeadEvent, LeadEventType } from "@/lib/leads/types";
import { LEAD_STATUSES } from "@/lib/leads/types";

/** Linha crua da tabela `leads` (snake_case), antes de mapear pro shape camelCase usado no app. */
interface LeadRow {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  city: string | null;
  destinations: string[];
  experience: string | null;
  travel_product: string | null;
  month: string | null;
  year: string | null;
  approximate_dates: string | null;
  duration: string;
  adults: number;
  children: number;
  children_ages: string | null;
  budget_tier: string;
  notes: string | null;
  internal_notes: string | null;
  contact_preference: string;
  acquisition_source: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  source_path: string | null;
  status: string;
  follow_up_at: Date | null;
  next_action: string | null;
  priority: boolean;
  created_at: Date;
  updated_at: Date;
}

function toLead(row: LeadRow): Lead {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    whatsapp: row.whatsapp,
    city: row.city ?? undefined,
    destinations: row.destinations ?? [],
    experience: row.experience ?? undefined,
    travelProduct: row.travel_product ?? undefined,
    month: row.month ?? undefined,
    year: row.year ?? undefined,
    approximateDates: row.approximate_dates ?? undefined,
    duration: row.duration,
    adults: row.adults,
    children: row.children,
    childrenAges: row.children_ages ?? undefined,
    budgetTier: row.budget_tier,
    notes: row.notes ?? undefined,
    internalNotes: row.internal_notes ?? undefined,
    contactPreference: row.contact_preference,
    acquisitionSource: row.acquisition_source ?? undefined,
    utmSource: row.utm_source ?? undefined,
    utmMedium: row.utm_medium ?? undefined,
    utmCampaign: row.utm_campaign ?? undefined,
    utmContent: row.utm_content ?? undefined,
    utmTerm: row.utm_term ?? undefined,
    sourcePath: row.source_path ?? undefined,
    status: (LEAD_STATUSES as readonly string[]).includes(row.status) ? (row.status as LeadStatus) : "new",
    followUpAt: row.follow_up_at ? row.follow_up_at.toISOString() : undefined,
    nextAction: row.next_action ?? undefined,
    priority: row.priority,
    createdAt: row.created_at.toISOString(),
    updatedAt: row.updated_at.toISOString(),
  };
}

/** Fora do corpo de um componente de propósito — a regra de pureza do React reclama de `Date.now()` direto num Server Component. */
export function daysAgo(days: number): Date {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000);
}

/** Início e fim do dia local de hoje, em UTC — usado pros filtros "retorno hoje"/"novos hoje". */
function todayRange(): { start: Date; end: Date } {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(end.getDate() + 1);
  return { start, end };
}

const OPEN_STATUSES: LeadStatus[] = ["new", "contacted", "qualified", "proposal"];

export interface LeadListFilters {
  status?: LeadStatus;
  /** Filtra por utm_source — é o sinal mais direto de origem que temos. */
  origin?: string;
  destination?: string;
  experience?: string;
  /** Busca livre em nome, e-mail e WhatsApp. */
  q?: string;
  /** Leads criados a partir desta data (filtro de período). */
  since?: Date;
  /** Sem atualização (updated_at) há pelo menos N dias — "sem resposta". */
  staleDays?: number;
  /** "today" = retorno marcado pra hoje; "overdue" = retorno já passou e o lead ainda está aberto. */
  followUp?: "today" | "overdue";
  priority?: boolean;
  page?: number;
  perPage?: number;
  sort?: "newest" | "oldest";
}

export interface LeadListResult {
  items: Lead[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

function buildWhere(sql: Sql, filters: LeadListFilters) {
  const { start: todayStart, end: todayEnd } = todayRange();

  const conditions = [
    filters.status ? sql`status = ${filters.status}` : sql`TRUE`,
    filters.origin ? sql`utm_source = ${filters.origin}` : sql`TRUE`,
    filters.destination ? sql`${filters.destination} = ANY(destinations)` : sql`TRUE`,
    filters.experience ? sql`experience = ${filters.experience}` : sql`TRUE`,
    filters.q
      ? sql`(name ILIKE ${"%" + filters.q + "%"} OR email ILIKE ${"%" + filters.q + "%"} OR whatsapp ILIKE ${"%" + filters.q + "%"})`
      : sql`TRUE`,
    filters.since ? sql`created_at >= ${filters.since}` : sql`TRUE`,
    filters.staleDays ? sql`updated_at < ${daysAgo(filters.staleDays)}` : sql`TRUE`,
    filters.priority ? sql`priority = TRUE` : sql`TRUE`,
    filters.followUp === "today"
      ? sql`follow_up_at >= ${todayStart} AND follow_up_at < ${todayEnd}`
      : filters.followUp === "overdue"
        ? sql`follow_up_at < ${todayStart} AND status = ANY(${OPEN_STATUSES})`
        : sql`TRUE`,
  ];
  return conditions.reduce((acc, cond) => sql`${acc} AND ${cond}`);
}

export async function getLeads(filters: LeadListFilters = {}): Promise<LeadListResult> {
  const page = Math.max(1, filters.page ?? 1);
  const perPage = Math.min(100, Math.max(1, filters.perPage ?? 20));
  const offset = (page - 1) * perPage;

  return withAdminDb(async (sql) => {
    const order = filters.sort === "oldest" ? sql`created_at ASC` : sql`created_at DESC`;
    const where = buildWhere(sql, filters);

    const rows = await sql<LeadRow[]>`SELECT * FROM leads WHERE ${where} ORDER BY ${order} LIMIT ${perPage} OFFSET ${offset}`;
    const [{ count }] = await sql<{ count: string }[]>`SELECT count(*)::text FROM leads WHERE ${where}`;

    const total = Number(count);
    return {
      items: rows.map(toLead),
      total,
      page,
      perPage,
      totalPages: Math.max(1, Math.ceil(total / perPage)),
    };
  });
}

/** Mesmos filtros de `getLeads`, mas sem paginação — só pra exportação CSV. Limitado a 2000 linhas por segurança (não existe caso de uso real maior que isso hoje). */
export async function getAllFilteredLeads(filters: LeadListFilters = {}): Promise<Lead[]> {
  return withAdminDb(async (sql) => {
    const where = buildWhere(sql, filters);
    const rows = await sql<LeadRow[]>`SELECT * FROM leads WHERE ${where} ORDER BY created_at DESC LIMIT 2000`;
    return rows.map(toLead);
  });
}

export async function getLeadById(id: string): Promise<Lead | null> {
  return withAdminDb(async (sql) => {
    const rows = await sql<LeadRow[]>`SELECT * FROM leads WHERE id = ${id} LIMIT 1`;
    return rows[0] ? toLead(rows[0]) : null;
  });
}

export interface LeadStats {
  total: number;
  new: number;
  contacted: number;
  qualified: number;
  proposal: number;
  closed: number;
  lost: number;
  thisWeek: number;
  /** Criados hoje (dia local). */
  newToday: number;
  /** Abertos (não fechados/perdidos) sem nenhuma atualização há 3+ dias. */
  stale: number;
  /** Fechados com a última mudança de status neste mês — aproximação via `updated_at`, não existe `closed_at` dedicado. */
  closedThisMonth: number;
  /** fechados / total, em %. Simples, de propósito — sem funil por etapa. */
  conversionRate: number;
  /** Retornos (follow-up) marcados pra hoje, entre os leads ainda abertos. */
  followUpsToday: number;
}

export async function getLeadStats(): Promise<LeadStats> {
  return withAdminDb(async (sql) => {
    const { start: todayStart, end: todayEnd } = todayRange();
    const monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);

    const byStatusRows = await sql<{ status: string; count: string }[]>`SELECT status, count(*)::text FROM leads GROUP BY status`;
    const [{ week }] = await sql<{ week: string }[]>`SELECT count(*)::text AS week FROM leads WHERE created_at >= now() - interval '7 days'`;
    const [{ new_today }] = await sql<{ new_today: string }[]>`SELECT count(*)::text AS new_today FROM leads WHERE created_at >= ${todayStart} AND created_at < ${todayEnd}`;
    const [{ stale }] = await sql<{ stale: string }[]>`SELECT count(*)::text AS stale FROM leads WHERE updated_at < ${daysAgo(3)} AND status = ANY(${OPEN_STATUSES})`;
    const [{ closed_month }] = await sql<{ closed_month: string }[]>`SELECT count(*)::text AS closed_month FROM leads WHERE status = 'closed' AND updated_at >= ${monthStart}`;
    const [{ follow_ups_today }] = await sql<{ follow_ups_today: string }[]>`
      SELECT count(*)::text AS follow_ups_today FROM leads
      WHERE follow_up_at >= ${todayStart} AND follow_up_at < ${todayEnd} AND status = ANY(${OPEN_STATUSES})
    `;

    const stats: LeadStats = {
      total: 0,
      new: 0,
      contacted: 0,
      qualified: 0,
      proposal: 0,
      closed: 0,
      lost: 0,
      thisWeek: Number(week),
      newToday: Number(new_today),
      stale: Number(stale),
      closedThisMonth: Number(closed_month),
      conversionRate: 0,
      followUpsToday: Number(follow_ups_today),
    };
    for (const { status, count } of byStatusRows) {
      const n = Number(count);
      stats.total += n;
      if (status in stats && status !== "total" && status !== "thisWeek") {
        (stats as unknown as Record<string, number>)[status] = n;
      }
    }
    stats.conversionRate = stats.total > 0 ? Math.round((stats.closed / stats.total) * 1000) / 10 : 0;
    return stats;
  });
}

export interface LeadUpdateInput {
  status?: LeadStatus;
  /** `undefined` = não mexe; `""` = limpa; qualquer outro valor = substitui. */
  internalNotes?: string;
  /** `undefined` = não mexe; `null` = limpa o retorno; `Date` = define/substitui. */
  followUpAt?: Date | null;
  /** `undefined` = não mexe; `""` = limpa; qualquer outro valor = substitui. */
  nextAction?: string;
  priority?: boolean;
}

function formatDateTimeLabel(date: Date): string {
  return date.toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

/**
 * Atualização parcial — só grava o que foi explicitamente passado — e
 * registra na timeline (`lead_events`) cada campo que de fato mudou,
 * comparando contra o valor atual antes do UPDATE. Substitui o antigo
 * `updateLeadStatus`: aquele tinha um bug onde submeter a observação
 * interna vazia nunca limpava o campo (o `??` caía pro valor antigo) — aqui
 * `internalNotes: ""` limpa de verdade.
 */
export async function updateLead(id: string, input: LeadUpdateInput): Promise<Lead | null> {
  return withAdminDb(async (sql) => {
    const [before] = await sql<LeadRow[]>`SELECT * FROM leads WHERE id = ${id} LIMIT 1`;
    if (!before) return null;

    const events: { type: LeadEventType; detail?: string }[] = [];

    if (input.status !== undefined && input.status !== before.status) {
      events.push({ type: "status_changed", detail: `${before.status} → ${input.status}` });
    }
    if (input.internalNotes !== undefined && input.internalNotes !== (before.internal_notes ?? "")) {
      events.push({ type: "note_updated" });
    }
    const beforeFollowUp = before.follow_up_at ? before.follow_up_at.toISOString() : null;
    const afterFollowUp = input.followUpAt === undefined ? beforeFollowUp : input.followUpAt === null ? null : input.followUpAt.toISOString();
    if (input.followUpAt !== undefined && afterFollowUp !== beforeFollowUp) {
      events.push({
        type: "follow_up_changed",
        detail: input.followUpAt === null ? "Retorno removido" : `Retorno em ${formatDateTimeLabel(input.followUpAt)}`,
      });
    }
    if (input.nextAction !== undefined && input.nextAction !== (before.next_action ?? "")) {
      events.push({ type: "next_action_changed", detail: input.nextAction || "Removida" });
    }
    if (input.priority !== undefined && input.priority !== before.priority) {
      events.push({ type: "priority_changed", detail: input.priority ? "Marcado como prioritário" : "Prioridade removida" });
    }

    const rows = await sql<LeadRow[]>`
      UPDATE leads
      SET status = ${input.status ?? sql`status`},
          internal_notes = ${input.internalNotes === undefined ? sql`internal_notes` : input.internalNotes},
          follow_up_at = ${input.followUpAt === undefined ? sql`follow_up_at` : input.followUpAt},
          next_action = ${input.nextAction === undefined ? sql`next_action` : input.nextAction},
          priority = ${input.priority ?? sql`priority`},
          updated_at = now()
      WHERE id = ${id}
      RETURNING *
    `;
    const updated = rows[0];
    if (!updated) return null;

    // Loop em vez do helper de bulk-insert do `postgres` — no máximo 5
    // eventos por chamada, não vale a complicação de tipos pra isso.
    for (const event of events) {
      await sql`INSERT INTO lead_events (lead_id, type, detail) VALUES (${id}, ${event.type}, ${event.detail ?? null})`;
    }

    return toLead(updated);
  });
}

export async function getLeadEvents(leadId: string): Promise<LeadEvent[]> {
  return withAdminDb(async (sql) => {
    const rows = await sql<{ id: string; lead_id: string; type: string; detail: string | null; created_at: Date }[]>`
      SELECT * FROM lead_events WHERE lead_id = ${leadId} ORDER BY created_at DESC LIMIT 100
    `;
    return rows.map((row) => ({
      id: row.id,
      leadId: row.lead_id,
      type: row.type as LeadEventType,
      detail: row.detail ?? undefined,
      createdAt: row.created_at.toISOString(),
    }));
  });
}
