import { withAdminDb } from "./db";
import type { Lead, LeadStatus } from "@/lib/leads/types";
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
    createdAt: row.created_at.toISOString(),
    updatedAt: row.updated_at.toISOString(),
  };
}

/** Fora do corpo de um componente de propósito — a regra de pureza do React reclama de `Date.now()` direto num Server Component. */
export function daysAgo(days: number): Date {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000);
}

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

export async function getLeads(filters: LeadListFilters = {}): Promise<LeadListResult> {
  const page = Math.max(1, filters.page ?? 1);
  const perPage = Math.min(100, Math.max(1, filters.perPage ?? 20));
  const offset = (page - 1) * perPage;

  return withAdminDb(async (sql) => {
    const order = filters.sort === "oldest" ? sql`created_at ASC` : sql`created_at DESC`;

    const conditions = [
      filters.status ? sql`status = ${filters.status}` : sql`TRUE`,
      filters.origin ? sql`utm_source = ${filters.origin}` : sql`TRUE`,
      filters.destination ? sql`${filters.destination} = ANY(destinations)` : sql`TRUE`,
      filters.experience ? sql`experience = ${filters.experience}` : sql`TRUE`,
      filters.q
        ? sql`(name ILIKE ${"%" + filters.q + "%"} OR email ILIKE ${"%" + filters.q + "%"} OR whatsapp ILIKE ${"%" + filters.q + "%"})`
        : sql`TRUE`,
      filters.since ? sql`created_at >= ${filters.since}` : sql`TRUE`,
    ];
    const where = conditions.reduce((acc, cond) => sql`${acc} AND ${cond}`);

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
}

export async function getLeadStats(): Promise<LeadStats> {
  return withAdminDb(async (sql) => {
    const byStatusRows = await sql<{ status: string; count: string }[]>`SELECT status, count(*)::text FROM leads GROUP BY status`;
    const [{ week }] = await sql<{ week: string }[]>`SELECT count(*)::text AS week FROM leads WHERE created_at >= now() - interval '7 days'`;

    const stats: LeadStats = {
      total: 0,
      new: 0,
      contacted: 0,
      qualified: 0,
      proposal: 0,
      closed: 0,
      lost: 0,
      thisWeek: Number(week),
    };
    for (const { status, count } of byStatusRows) {
      const n = Number(count);
      stats.total += n;
      if (status in stats && status !== "total" && status !== "thisWeek") {
        (stats as unknown as Record<string, number>)[status] = n;
      }
    }
    return stats;
  });
}

export async function updateLeadStatus(
  id: string,
  status: LeadStatus,
  internalNotes?: string,
): Promise<Lead | null> {
  return withAdminDb(async (sql) => {
    const rows = await sql<LeadRow[]>`
      UPDATE leads
      SET status = ${status},
          internal_notes = ${internalNotes ?? sql`internal_notes`},
          updated_at = now()
      WHERE id = ${id}
      RETURNING *
    `;
    return rows[0] ? toLead(rows[0]) : null;
  });
}
