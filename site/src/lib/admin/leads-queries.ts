import type { Sql } from "postgres";
import { withAdminDb } from "./db";
import type { Lead, LeadStatus, LeadEvent, LeadEventType, LeadLostReason } from "@/lib/leads/types";
import { LEAD_STATUSES, LEAD_LOST_REASONS, LEAD_LOST_REASON_LABELS } from "@/lib/leads/types";
import { BR_OFFSET_MS } from "./display";

/** Linha crua da tabela `leads` (snake_case), antes de mapear pro shape camelCase usado no app. */
interface LeadRow {
  id: string;
  name: string;
  email: string | null;
  whatsapp: string;
  city: string | null;
  destinations: string[];
  experience: string | null;
  travel_product: string | null;
  month: string | null;
  year: string | null;
  approximate_dates: string | null;
  duration: string | null;
  adults: number | null;
  children: number;
  children_ages: string | null;
  budget_tier: string | null;
  notes: string | null;
  internal_notes: string | null;
  contact_preference: string | null;
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
  lost_reason: string | null;
  created_at: Date;
  updated_at: Date;
}

function isLostReason(value: string | null): value is LeadLostReason {
  return !!value && (LEAD_LOST_REASONS as readonly string[]).includes(value);
}

function toLead(row: LeadRow): Lead {
  return {
    id: row.id,
    name: row.name,
    email: row.email ?? undefined,
    whatsapp: row.whatsapp,
    city: row.city ?? undefined,
    destinations: row.destinations ?? [],
    experience: row.experience ?? undefined,
    travelProduct: row.travel_product ?? undefined,
    month: row.month ?? undefined,
    year: row.year ?? undefined,
    approximateDates: row.approximate_dates ?? undefined,
    duration: row.duration ?? undefined,
    adults: row.adults ?? undefined,
    children: row.children,
    childrenAges: row.children_ages ?? undefined,
    budgetTier: row.budget_tier ?? undefined,
    notes: row.notes ?? undefined,
    internalNotes: row.internal_notes ?? undefined,
    contactPreference: row.contact_preference ?? undefined,
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
    lostReason: isLostReason(row.lost_reason) ? row.lost_reason : undefined,
    createdAt: row.created_at.toISOString(),
    updatedAt: row.updated_at.toISOString(),
  };
}

/** Fora do corpo de um componente de propósito — a regra de pureza do React reclama de `Date.now()` direto num Server Component. */
export function daysAgo(days: number): Date {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000);
}

/** Meia-noite de Brasília, `dayOffset` dias a partir de hoje (em Brasília, não no fuso do servidor). */
function brDayStart(dayOffset = 0): Date {
  const shifted = new Date(Date.now() - BR_OFFSET_MS);
  return new Date(Date.UTC(shifted.getUTCFullYear(), shifted.getUTCMonth(), shifted.getUTCDate() + dayOffset) + BR_OFFSET_MS);
}

function todayRange(): { start: Date; end: Date } {
  return { start: brDayStart(0), end: brDayStart(1) };
}

function brMonthStart(): Date {
  const shifted = new Date(Date.now() - BR_OFFSET_MS);
  return new Date(Date.UTC(shifted.getUTCFullYear(), shifted.getUTCMonth(), 1) + BR_OFFSET_MS);
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
  /** Leads abertos sem "próxima ação" definida — usado pelo atalho "Precisa de atenção" do dashboard. */
  noNextAction?: boolean;
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
    sql`deleted_at IS NULL`,
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
    filters.noNextAction ? sql`next_action IS NULL AND status = ANY(${OPEN_STATUSES})` : sql`TRUE`,
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
    const rows = await sql<LeadRow[]>`SELECT * FROM leads WHERE id = ${id} AND deleted_at IS NULL LIMIT 1`;
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
    const monthStart = brMonthStart();

    const byStatusRows = await sql<{ status: string; count: string }[]>`SELECT status, count(*)::text FROM leads WHERE deleted_at IS NULL GROUP BY status`;
    const [{ week }] = await sql<{ week: string }[]>`SELECT count(*)::text AS week FROM leads WHERE deleted_at IS NULL AND created_at >= now() - interval '7 days'`;
    const [{ new_today }] = await sql<{ new_today: string }[]>`SELECT count(*)::text AS new_today FROM leads WHERE deleted_at IS NULL AND created_at >= ${todayStart} AND created_at < ${todayEnd}`;
    const [{ stale }] = await sql<{ stale: string }[]>`SELECT count(*)::text AS stale FROM leads WHERE deleted_at IS NULL AND updated_at < ${daysAgo(3)} AND status = ANY(${OPEN_STATUSES})`;
    const [{ closed_month }] = await sql<{ closed_month: string }[]>`SELECT count(*)::text AS closed_month FROM leads WHERE deleted_at IS NULL AND status = 'closed' AND updated_at >= ${monthStart}`;
    const [{ follow_ups_today }] = await sql<{ follow_ups_today: string }[]>`
      SELECT count(*)::text AS follow_ups_today FROM leads
      WHERE deleted_at IS NULL AND follow_up_at >= ${todayStart} AND follow_up_at < ${todayEnd} AND status = ANY(${OPEN_STATUSES})
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
  /** `undefined` = não mexe; `""`/`null` = limpa; só faz sentido quando `status` vira "lost". */
  lostReason?: LeadLostReason | "" | null;
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
    const [before] = await sql<LeadRow[]>`SELECT * FROM leads WHERE id = ${id} AND deleted_at IS NULL LIMIT 1`;
    if (!before) return null;

    const events: { type: LeadEventType; detail?: string }[] = [];

    if (input.status !== undefined && input.status !== before.status) {
      const reasonLabel =
        input.status === "lost" && input.lostReason
          ? ` (motivo: ${LEAD_LOST_REASON_LABELS[input.lostReason as LeadLostReason] ?? input.lostReason})`
          : "";
      events.push({ type: "status_changed", detail: `${before.status} → ${input.status}${reasonLabel}` });
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
          lost_reason = ${input.lostReason === undefined ? sql`lost_reason` : input.lostReason || null},
          updated_at = now()
      WHERE id = ${id} AND deleted_at IS NULL
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

export interface AdminCounts {
  newLeads: number;
  followUpsToday: number;
  overdueFollowUps: number;
  priority: number;
  /** Leads abertos sem "próxima ação" definida. */
  noNextAction: number;
}

export async function getAdminCounts(): Promise<AdminCounts> {
  return withAdminDb(async (sql) => {
    const { start, end } = todayRange();
    const [row] = await sql<{ new_leads: string; today: string; overdue: string; priority: string; no_next_action: string }[]>`
      SELECT
        count(*) FILTER (WHERE status = 'new')::text AS new_leads,
        count(*) FILTER (WHERE follow_up_at >= ${start} AND follow_up_at < ${end} AND status = ANY(${OPEN_STATUSES}))::text AS today,
        count(*) FILTER (WHERE follow_up_at < ${start} AND status = ANY(${OPEN_STATUSES}))::text AS overdue,
        count(*) FILTER (WHERE priority = TRUE AND status = ANY(${OPEN_STATUSES}))::text AS priority,
        count(*) FILTER (WHERE next_action IS NULL AND status = ANY(${OPEN_STATUSES}))::text AS no_next_action
      FROM leads
      WHERE deleted_at IS NULL
    `;
    return {
      newLeads: Number(row.new_leads),
      followUpsToday: Number(row.today),
      overdueFollowUps: Number(row.overdue),
      priority: Number(row.priority),
      noNextAction: Number(row.no_next_action),
    };
  });
}

export interface FollowUpBuckets {
  overdue: Lead[];
  today: Lead[];
  tomorrow: Lead[];
  next7Days: Lead[];
  later: Lead[];
  noDate: Lead[];
}

/** Leads abertos agrupados pela data do retorno. Limite de 500 leads abertos — bem acima do volume real da operação. */
export async function getFollowUpBuckets(): Promise<FollowUpBuckets> {
  return withAdminDb(async (sql) => {
    const { start, end } = todayRange();
    const tomorrowEnd = brDayStart(2);
    const weekEnd = brDayStart(8);

    const rows = await sql<LeadRow[]>`
      SELECT * FROM leads
      WHERE deleted_at IS NULL AND status = ANY(${OPEN_STATUSES})
      ORDER BY follow_up_at ASC NULLS LAST, created_at DESC
      LIMIT 500
    `;

    const buckets: FollowUpBuckets = { overdue: [], today: [], tomorrow: [], next7Days: [], later: [], noDate: [] };
    for (const row of rows) {
      const lead = toLead(row);
      if (!row.follow_up_at) buckets.noDate.push(lead);
      else if (row.follow_up_at < start) buckets.overdue.push(lead);
      else if (row.follow_up_at < end) buckets.today.push(lead);
      else if (row.follow_up_at < tomorrowEnd) buckets.tomorrow.push(lead);
      else if (row.follow_up_at < weekEnd) buckets.next7Days.push(lead);
      else buckets.later.push(lead);
    }
    return buckets;
  });
}

/** Todos os leads agrupados por status, pro quadro do pipeline. Limite de 300 cards — volume atual é bem menor. */
export async function getPipelineLeads(): Promise<Record<LeadStatus, Lead[]>> {
  return withAdminDb(async (sql) => {
    const rows = await sql<LeadRow[]>`SELECT * FROM leads WHERE deleted_at IS NULL ORDER BY updated_at DESC LIMIT 300`;
    const byStatus = Object.fromEntries(LEAD_STATUSES.map((s) => [s, [] as Lead[]])) as Record<LeadStatus, Lead[]>;
    for (const row of rows) {
      const lead = toLead(row);
      byStatus[lead.status].push(lead);
    }
    return byStatus;
  });
}

export interface ReportData {
  totalAllTime: number;
  closedAllTime: number;
  newInPeriod: number;
  closedInPeriod: number;
  conversionRate: number;
  avgDaysToFirstStatusChange: number | null;
  origins: { source: string | null; count: number }[];
  destinations: { slug: string; count: number }[];
  experiences: { slug: string; count: number }[];
}

/** `sinceDays = null` significa todo o período. */
export async function getReportData(sinceDays: number | null): Promise<ReportData> {
  return withAdminDb(async (sql) => {
    const since = sinceDays === null ? null : daysAgo(sinceDays);
    const periodLeads = since ? sql`created_at >= ${since}` : sql`TRUE`;
    const periodLeadsAliased = since ? sql`l.created_at >= ${since}` : sql`TRUE`;

    const [totals] = await sql<{ total_all: string; closed_all: string; new_period: string; closed_period: string }[]>`
      SELECT
        count(*)::text AS total_all,
        count(*) FILTER (WHERE status = 'closed')::text AS closed_all,
        count(*) FILTER (WHERE ${periodLeads})::text AS new_period,
        count(*) FILTER (WHERE status = 'closed' AND ${periodLeads})::text AS closed_period
      FROM leads
      WHERE deleted_at IS NULL
    `;

    const [avg] = await sql<{ days: string | null }[]>`
      SELECT avg(EXTRACT(EPOCH FROM (f.first_change - l.created_at)) / 86400)::text AS days
      FROM leads l
      JOIN LATERAL (
        SELECT min(e.created_at) AS first_change
        FROM lead_events e
        WHERE e.lead_id = l.id AND e.type = 'status_changed'
      ) f ON f.first_change IS NOT NULL
      WHERE l.deleted_at IS NULL AND ${periodLeadsAliased}
    `;

    const origins = await sql<{ source: string | null; count: string }[]>`
      SELECT coalesce(utm_source, acquisition_source) AS source, count(*)::text AS count
      FROM leads WHERE deleted_at IS NULL AND ${periodLeads}
      GROUP BY 1 ORDER BY count(*) DESC LIMIT 10
    `;

    const destinations = await sql<{ slug: string; count: string }[]>`
      SELECT slug, count(*)::text AS count
      FROM leads, unnest(destinations) AS slug
      WHERE deleted_at IS NULL AND ${periodLeads} AND slug <> 'nao-sei'
      GROUP BY slug ORDER BY count(*) DESC LIMIT 8
    `;

    const experiences = await sql<{ slug: string; count: string }[]>`
      SELECT experience AS slug, count(*)::text AS count
      FROM leads
      WHERE deleted_at IS NULL AND ${periodLeads} AND experience IS NOT NULL AND experience <> 'nao-sei'
      GROUP BY experience ORDER BY count(*) DESC LIMIT 8
    `;

    const totalAllTime = Number(totals.total_all);
    const closedAllTime = Number(totals.closed_all);
    return {
      totalAllTime,
      closedAllTime,
      newInPeriod: Number(totals.new_period),
      closedInPeriod: Number(totals.closed_period),
      conversionRate: totalAllTime > 0 ? Math.round((closedAllTime / totalAllTime) * 1000) / 10 : 0,
      avgDaysToFirstStatusChange: avg.days === null ? null : Math.round(Number(avg.days) * 10) / 10,
      origins: origins.map((o) => ({ source: o.source, count: Number(o.count) })),
      destinations: destinations.map((d) => ({ slug: d.slug, count: Number(d.count) })),
      experiences: experiences.map((e) => ({ slug: e.slug, count: Number(e.count) })),
    };
  });
}

/**
 * Soft delete — marca `deleted_at` em vez de apagar a linha. O lead some de
 * toda consulta normal (todas filtram `deleted_at IS NULL`), mas a linha e
 * os eventos da timeline continuam no banco, intactos. Não existe tela de
 * lixeira hoje: um lead excluído fica inacessível por qualquer caminho da
 * UI, só recuperável direto no banco se um dia for preciso. Idempotente —
 * excluir um lead já excluído não erra, só não encontra linha pra marcar.
 */
export async function deleteLead(id: string): Promise<boolean> {
  return withAdminDb(async (sql) => {
    const rows = await sql<{ id: string }[]>`
      UPDATE leads SET deleted_at = now(), updated_at = now()
      WHERE id = ${id} AND deleted_at IS NULL
      RETURNING id
    `;
    if (rows.length === 0) return false;

    await sql`INSERT INTO lead_events (lead_id, type, detail) VALUES (${id}, 'deleted', NULL)`;
    return true;
  });
}

/** Só dígitos — pra comparar números digitados em formatos diferentes ("(11) 99999-9999" vs "11999999999"). */
export function normalizePhone(value: string): string {
  return value.replace(/\D/g, "");
}

export interface DuplicateLeadMatch {
  id: string;
  name: string;
  status: LeadStatus;
}

/**
 * Mesmo WhatsApp (comparando só os dígitos) ou mesmo e-mail (case-insensitive)
 * entre os leads não excluídos. Usado antes de criar um lead manualmente —
 * nunca bloqueia, só avisa quem está criando.
 */
export async function findDuplicateLead(input: { whatsapp: string; email?: string }): Promise<DuplicateLeadMatch | null> {
  const normalizedPhone = normalizePhone(input.whatsapp);
  const email = input.email?.trim().toLowerCase() || null;

  return withAdminDb(async (sql) => {
    const rows = await sql<{ id: string; name: string; status: string }[]>`
      SELECT id, name, status FROM leads
      WHERE deleted_at IS NULL
        AND (
          regexp_replace(whatsapp, '\\D', '', 'g') = ${normalizedPhone}
          OR (${email ? sql`lower(email) = ${email}` : sql`FALSE`})
        )
      LIMIT 1
    `;
    const row = rows[0];
    if (!row) return null;
    return {
      id: row.id,
      name: row.name,
      status: (LEAD_STATUSES as readonly string[]).includes(row.status) ? (row.status as LeadStatus) : "new",
    };
  });
}

export interface NewManualLeadInput {
  name: string;
  whatsapp: string;
  email?: string;
  city?: string;
  destination?: string;
  acquisitionSource: string;
  internalNotes?: string;
  nextAction?: string;
  priority: boolean;
  followUpAt?: Date | null;
}

/**
 * Lead criado manualmente pelo admin (WhatsApp, Instagram, indicação,
 * ligação, presencial...) — mesma tabela e mesmo shape de `Lead`, só sem os
 * campos específicos do formulário público (duration/adults/budgetTier/
 * contactPreference ficam `null`, liberados pela migração que removeu o
 * NOT NULL dessas colunas). Status sempre "new" e sempre gera o evento
 * "created" na timeline, igual a um lead do site.
 */
export async function createLeadManual(input: NewManualLeadInput): Promise<Lead> {
  return withAdminDb(async (sql) => {
    const [row] = await sql<LeadRow[]>`
      INSERT INTO leads (
        name, email, whatsapp, city, destinations, duration, adults, children,
        budget_tier, contact_preference, acquisition_source, internal_notes,
        next_action, priority, follow_up_at, status
      ) VALUES (
        ${input.name}, ${input.email || null}, ${input.whatsapp}, ${input.city || null},
        ${input.destination ? [input.destination] : []}, ${null}, ${null}, ${0},
        ${null}, ${null}, ${input.acquisitionSource}, ${input.internalNotes || null},
        ${input.nextAction || null}, ${input.priority}, ${input.followUpAt ?? null}, 'new'
      )
      RETURNING *
    `;
    await sql`INSERT INTO lead_events (lead_id, type, detail) VALUES (${row.id}, 'created', 'Criado manualmente pelo admin')`;
    return toLead(row);
  });
}
