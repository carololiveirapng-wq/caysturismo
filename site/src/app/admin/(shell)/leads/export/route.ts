import { NextResponse, type NextRequest } from "next/server";
import { requireAdminUser } from "@/lib/admin/auth";
import { getAllFilteredLeads, daysAgo } from "@/lib/admin/leads-queries";
import { getDestinations, getExperiences } from "@/lib/cms";
import { LEAD_STATUS_LABELS, LEAD_STATUSES, type LeadStatus } from "@/lib/leads/types";
import { getLeadOrigin } from "@/lib/admin/display";

function isLeadStatus(value: string | null): value is LeadStatus {
  return !!value && (LEAD_STATUSES as readonly string[]).includes(value);
}

function isFollowUp(value: string | null): value is "today" | "overdue" {
  return value === "today" || value === "overdue";
}

/** Mesma regra de escape de CSV em todo campo — aspas duplicadas, campo sempre entre aspas (mais simples e seguro que decidir campo a campo quando precisa ou não). */
function csvCell(value: string): string {
  return `"${value.replace(/"/g, '""')}"`;
}

const COLUMNS = ["Nome", "E-mail", "WhatsApp", "Destino", "Experiência", "Status", "Origem", "Data", "Retorno", "Observação"];

/**
 * Exportação CSV — respeita exatamente os mesmos filtros da listagem (a
 * própria página de leads monta esta URL preservando a querystring atual).
 * Protegida pelo middleware (`src/proxy.ts`, qualquer rota sob `/admin`
 * exige sessão) e, em defesa adicional, por `requireAdminUser()` aqui
 * dentro — mesmo padrão já usado em `leads/actions.ts`.
 */
export async function GET(request: NextRequest) {
  await requireAdminUser();

  const params = request.nextUrl.searchParams;
  const sinceParam = params.get("since");
  const staleParam = params.get("stale");

  const leads = await getAllFilteredLeads({
    status: isLeadStatus(params.get("status")) ? params.get("status")! as LeadStatus : undefined,
    origin: params.get("origin") || undefined,
    destination: params.get("destination") || undefined,
    experience: params.get("experience") || undefined,
    q: params.get("q") || undefined,
    since: sinceParam ? daysAgo(Number(sinceParam)) : undefined,
    staleDays: staleParam ? Number(staleParam) : undefined,
    followUp: isFollowUp(params.get("followUp")) ? params.get("followUp")! as "today" | "overdue" : undefined,
    priority: params.get("priority") === "1" ? true : undefined,
    sort: params.get("sort") === "oldest" ? "oldest" : "newest",
  });

  const [destinations, experiences] = await Promise.all([getDestinations(), getExperiences()]);
  const destinationNameBySlug = new Map(destinations.map((d) => [d.slug, d.name]));
  const experienceNameBySlug = new Map(experiences.map((e) => [e.slug, e.name]));

  const rows = leads.map((lead) => {
    const destinoNames = lead.destinations
      .filter((slug) => slug !== "nao-sei")
      .map((slug) => destinationNameBySlug.get(slug) ?? slug);
    const destino = lead.destinations.includes("nao-sei") ? [...destinoNames, "Ainda não sabe"].join("; ") : destinoNames.join("; ");
    const experiencia =
      lead.experience === "nao-sei" ? "Ainda não sabe" : lead.experience ? experienceNameBySlug.get(lead.experience) ?? lead.experience : "";

    return [
      lead.name,
      lead.email,
      lead.whatsapp,
      destino,
      experiencia,
      LEAD_STATUS_LABELS[lead.status],
      getLeadOrigin(lead),
      new Date(lead.createdAt).toLocaleDateString("pt-BR"),
      lead.followUpAt ? new Date(lead.followUpAt).toLocaleDateString("pt-BR") : "",
      lead.notes ?? "",
    ];
  });

  // BOM UTF-8 — sem isto o Excel no Windows abre acento quebrado.
  const csv = "﻿" + [COLUMNS, ...rows].map((row) => row.map(csvCell).join(",")).join("\r\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="leads-cays-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
