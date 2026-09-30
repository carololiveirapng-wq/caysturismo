import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminStatusBadge } from "@/components/admin/admin-status-badge";
import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { getLeads, daysAgo } from "@/lib/admin/leads-queries";
import { getLeadInterest, getLeadOrigin } from "@/lib/admin/display";
import { LEAD_STATUSES, LEAD_STATUS_LABELS, type LeadStatus } from "@/lib/leads/types";
import { destinationDetails } from "@/data/destinations";
import { experienceDetails } from "@/data/experiences";

export const metadata = { title: "Leads | Admin Cays" };

const SINCE_OPTIONS = [
  { value: "", label: "Qualquer período" },
  { value: "7", label: "Últimos 7 dias" },
  { value: "30", label: "Últimos 30 dias" },
  { value: "90", label: "Últimos 90 dias" },
];

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function isLeadStatus(value: string | undefined): value is LeadStatus {
  return !!value && (LEAD_STATUSES as readonly string[]).includes(value);
}

export default async function AdminLeadsPage({ searchParams }: PageProps<"/admin/leads">) {
  const params = await searchParams;
  const status = first(params.status);
  const origin = first(params.origin);
  const destination = first(params.destination);
  const experience = first(params.experience);
  const q = first(params.q);
  const sinceParam = first(params.since);
  const sort = first(params.sort) === "oldest" ? "oldest" : "newest";
  const page = Number(first(params.page)) || 1;

  const since = sinceParam ? daysAgo(Number(sinceParam)) : undefined;

  let result;
  let loadError: string | null = null;
  try {
    result = await getLeads({
      status: isLeadStatus(status) ? status : undefined,
      origin: origin || undefined,
      destination: destination || undefined,
      experience: experience || undefined,
      q: q || undefined,
      since,
      sort,
      page,
      perPage: 20,
    });
  } catch (error) {
    loadError = error instanceof Error ? error.message : "Não foi possível carregar os leads.";
  }

  const activeDestinations = destinationDetails.filter((d) => d.active);
  const activeExperiences = experienceDetails.filter((e) => e.active);

  function buildPageHref(targetPage: number) {
    const next = new URLSearchParams();
    if (status) next.set("status", status);
    if (origin) next.set("origin", origin);
    if (destination) next.set("destination", destination);
    if (experience) next.set("experience", experience);
    if (q) next.set("q", q);
    if (sinceParam) next.set("since", sinceParam);
    if (sort !== "newest") next.set("sort", sort);
    next.set("page", String(targetPage));
    return `/admin/leads?${next.toString()}`;
  }

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader title="Leads" description="Todos os pedidos de planejamento recebidos pelo site." />

      {/* Filtros — form GET simples, sem JS necessário. */}
      <form className="flex flex-wrap items-end gap-3 border border-ink/10 bg-ivory p-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="q" className="text-[0.65rem] font-medium tracking-wide text-stone uppercase">
            Buscar
          </label>
          <input
            id="q"
            name="q"
            defaultValue={q ?? ""}
            placeholder="Nome, e-mail ou WhatsApp"
            className="w-48 border border-ink/15 bg-ivory px-3 py-2 text-sm text-ink outline-none focus:border-magenta"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="status" className="text-[0.65rem] font-medium tracking-wide text-stone uppercase">
            Status
          </label>
          <select
            id="status"
            name="status"
            defaultValue={status ?? ""}
            className="border border-ink/15 bg-ivory px-3 py-2 text-sm text-ink outline-none focus:border-magenta"
          >
            <option value="">Todos</option>
            {LEAD_STATUSES.map((s) => (
              <option key={s} value={s}>
                {LEAD_STATUS_LABELS[s]}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="destination" className="text-[0.65rem] font-medium tracking-wide text-stone uppercase">
            Destino
          </label>
          <select
            id="destination"
            name="destination"
            defaultValue={destination ?? ""}
            className="border border-ink/15 bg-ivory px-3 py-2 text-sm text-ink outline-none focus:border-magenta"
          >
            <option value="">Todos</option>
            {activeDestinations.map((d) => (
              <option key={d.slug} value={d.slug}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="experience" className="text-[0.65rem] font-medium tracking-wide text-stone uppercase">
            Experiência
          </label>
          <select
            id="experience"
            name="experience"
            defaultValue={experience ?? ""}
            className="border border-ink/15 bg-ivory px-3 py-2 text-sm text-ink outline-none focus:border-magenta"
          >
            <option value="">Todas</option>
            {activeExperiences.map((e) => (
              <option key={e.slug} value={e.slug}>
                {e.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="since" className="text-[0.65rem] font-medium tracking-wide text-stone uppercase">
            Período
          </label>
          <select
            id="since"
            name="since"
            defaultValue={sinceParam ?? ""}
            className="border border-ink/15 bg-ivory px-3 py-2 text-sm text-ink outline-none focus:border-magenta"
          >
            {SINCE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="sort" className="text-[0.65rem] font-medium tracking-wide text-stone uppercase">
            Ordenar
          </label>
          <select
            id="sort"
            name="sort"
            defaultValue={sort}
            className="border border-ink/15 bg-ivory px-3 py-2 text-sm text-ink outline-none focus:border-magenta"
          >
            <option value="newest">Mais recentes</option>
            <option value="oldest">Mais antigos</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-ink px-5 py-2.5 text-xs font-medium tracking-wide text-ivory uppercase transition-colors duration-200 hover:bg-magenta"
        >
          Filtrar
        </button>
        {(status || origin || destination || experience || q || sinceParam) && (
          <Link
            href="/admin/leads"
            className="text-xs font-medium tracking-wide text-stone uppercase underline-offset-4 hover:text-ink hover:underline"
          >
            Limpar
          </Link>
        )}
      </form>

      {loadError ? (
        <AdminEmptyState title="Não foi possível carregar os leads." supporting={loadError} />
      ) : result!.items.length === 0 ? (
        <AdminEmptyState
          title="Nenhum lead encontrado."
          supporting={
            result!.total === 0 && page === 1 && !status && !q
              ? "Quando alguém enviar o planejamento pelo site, ele aparecerá aqui."
              : "Nenhum lead corresponde aos filtros atuais."
          }
        />
      ) : (
        <>
          {/* Desktop: tabela */}
          <div className="hidden overflow-x-auto border border-ink/10 bg-ivory md:block">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-ink/10 text-xs text-stone uppercase">
                  <th className="px-4 py-3 font-medium">Nome</th>
                  <th className="px-4 py-3 font-medium">Interesse</th>
                  <th className="px-4 py-3 font-medium">WhatsApp</th>
                  <th className="px-4 py-3 font-medium">Origem</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Data</th>
                  <th className="px-4 py-3 font-medium">Ação</th>
                </tr>
              </thead>
              <tbody>
                {result!.items.map((lead) => (
                  <tr key={lead.id} className="border-b border-ink/5 last:border-0">
                    <td className="px-4 py-3 font-medium text-ink">{lead.name}</td>
                    <td className="px-4 py-3 text-stone">{getLeadInterest(lead)}</td>
                    <td className="px-4 py-3 text-stone">{lead.whatsapp}</td>
                    <td className="px-4 py-3 text-stone">{getLeadOrigin(lead)}</td>
                    <td className="px-4 py-3">
                      <AdminStatusBadge status={lead.status} />
                    </td>
                    <td className="px-4 py-3 text-stone">{new Date(lead.createdAt).toLocaleDateString("pt-BR")}</td>
                    <td className="px-4 py-3">
                      <Link href={`/admin/leads/${lead.id}`} className="text-xs font-medium text-magenta hover:underline">
                        Ver detalhe
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile: cards */}
          <div className="flex flex-col gap-3 md:hidden">
            {result!.items.map((lead) => (
              <Link
                key={lead.id}
                href={`/admin/leads/${lead.id}`}
                className="flex flex-col gap-2 border border-ink/10 bg-ivory p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="font-medium text-ink">{lead.name}</span>
                  <AdminStatusBadge status={lead.status} />
                </div>
                <p className="text-sm text-stone">{getLeadInterest(lead)}</p>
                <p className="text-sm text-stone">{lead.whatsapp}</p>
                <div className="flex items-center justify-between text-xs text-stone/80">
                  <span>{getLeadOrigin(lead)}</span>
                  <span>{new Date(lead.createdAt).toLocaleDateString("pt-BR")}</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex items-center justify-between text-sm text-stone">
            <span>
              {result!.total} lead{result!.total === 1 ? "" : "s"} · página {result!.page} de {result!.totalPages}
            </span>
            <div className="flex gap-3">
              {page > 1 && (
                <Link href={buildPageHref(page - 1)} className="font-medium text-ink hover:text-magenta">
                  ← Anterior
                </Link>
              )}
              {page < result!.totalPages && (
                <Link href={buildPageHref(page + 1)} className="font-medium text-ink hover:text-magenta">
                  Próxima →
                </Link>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
