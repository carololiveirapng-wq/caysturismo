import Link from "next/link";
import { Star } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminStatusBadge } from "@/components/admin/admin-status-badge";
import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { getLeads, daysAgo } from "@/lib/admin/leads-queries";
import { formatBrDate, getLeadInterest, getLeadOrigin } from "@/lib/admin/display";
import { LEAD_STATUSES, LEAD_STATUS_LABELS, type LeadStatus } from "@/lib/leads/types";
import { getDestinations, getExperiences } from "@/lib/cms";

export const metadata = { title: "Leads | Admin Cays" };

const SINCE_OPTIONS = [
  { value: "", label: "Qualquer período" },
  { value: "7", label: "Últimos 7 dias" },
  { value: "30", label: "Últimos 30 dias" },
  { value: "90", label: "Últimos 90 dias" },
];

const STALE_OPTIONS = [
  { value: "", label: "Qualquer" },
  { value: "2", label: "2+ dias sem atualização" },
  { value: "3", label: "3+ dias sem atualização" },
  { value: "5", label: "5+ dias sem atualização" },
  { value: "7", label: "7+ dias sem atualização" },
];

const FOLLOW_UP_OPTIONS = [
  { value: "", label: "Qualquer" },
  { value: "today", label: "Retorno hoje" },
  { value: "overdue", label: "Retorno atrasado" },
];

const SORT_OPTIONS = [
  { value: "newest", label: "Mais recentes" },
  { value: "oldest", label: "Mais antigos" },
];

const fieldClass = "border border-ink/15 bg-ivory px-3 py-2 text-sm text-ink outline-none focus:border-magenta";
const labelClass = "text-[0.65rem] font-medium tracking-wide text-stone uppercase";
const groupTitleClass = "text-[0.65rem] font-medium tracking-[0.15em] text-ink/60 uppercase";

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function isLeadStatus(value: string | undefined): value is LeadStatus {
  return !!value && (LEAD_STATUSES as readonly string[]).includes(value);
}

function isFollowUp(value: string | undefined): value is "today" | "overdue" {
  return value === "today" || value === "overdue";
}

type FilterValues = {
  q?: string;
  status?: string;
  priority?: boolean;
  stale?: string;
  followUp?: string;
  destination?: string;
  experience?: string;
  since?: string;
  sort: string;
};

function LeadFilterFields({
  idPrefix,
  values,
  destinations,
  experiences,
}: {
  idPrefix: string;
  values: FilterValues;
  destinations: { slug: string; name: string }[];
  experiences: { slug: string; name: string }[];
}) {
  const id = (name: string) => `${idPrefix}${name}`;
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      <fieldset className="flex flex-col gap-3">
        <legend className={groupTitleClass}>Busca</legend>
        <div className="flex flex-col gap-1">
          <label htmlFor={id("q")} className={labelClass}>
            Nome, e-mail ou WhatsApp
          </label>
          <input id={id("q")} name="q" defaultValue={values.q ?? ""} className={`${fieldClass} w-full`} />
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-3">
        <legend className={groupTitleClass}>Comercial</legend>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label htmlFor={id("status")} className={labelClass}>
              Status
            </label>
            <select id={id("status")} name="status" defaultValue={values.status ?? ""} className={fieldClass}>
              <option value="">Todos</option>
              {LEAD_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {LEAD_STATUS_LABELS[s]}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor={id("stale")} className={labelClass}>
              Sem resposta
            </label>
            <select id={id("stale")} name="stale" defaultValue={values.stale ?? ""} className={fieldClass}>
              {STALE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor={id("followUp")} className={labelClass}>
              Retorno
            </label>
            <select id={id("followUp")} name="followUp" defaultValue={values.followUp ?? ""} className={fieldClass}>
              {FOLLOW_UP_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <label className="flex items-end gap-2 pb-2.5 text-sm text-ink">
            <input
              type="checkbox"
              name="priority"
              value="1"
              defaultChecked={values.priority}
              className="size-4 border border-ink/30 accent-magenta-dark"
            />
            Só prioritários
          </label>
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-3">
        <legend className={groupTitleClass}>Viagem</legend>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label htmlFor={id("destination")} className={labelClass}>
              Destino
            </label>
            <select id={id("destination")} name="destination" defaultValue={values.destination ?? ""} className={fieldClass}>
              <option value="">Todos</option>
              {destinations.map((d) => (
                <option key={d.slug} value={d.slug}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor={id("experience")} className={labelClass}>
              Experiência
            </label>
            <select id={id("experience")} name="experience" defaultValue={values.experience ?? ""} className={fieldClass}>
              <option value="">Todas</option>
              {experiences.map((e) => (
                <option key={e.slug} value={e.slug}>
                  {e.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-2 flex flex-col gap-1">
            <label htmlFor={id("since")} className={labelClass}>
              Período de entrada
            </label>
            <select id={id("since")} name="since" defaultValue={values.since ?? ""} className={fieldClass}>
              {SINCE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-3">
        <legend className={groupTitleClass}>Ordenação</legend>
        <div className="flex flex-col gap-1">
          <label htmlFor={id("sort")} className={labelClass}>
            Ordenar por
          </label>
          <select id={id("sort")} name="sort" defaultValue={values.sort} className={fieldClass}>
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
    </div>
  );
}

export default async function AdminLeadsPage({ searchParams }: PageProps<"/admin/leads">) {
  const params = await searchParams;
  const status = first(params.status);
  const origin = first(params.origin);
  const destination = first(params.destination);
  const experience = first(params.experience);
  const q = first(params.q);
  const sinceParam = first(params.since);
  const staleParam = first(params.stale);
  const followUpParam = first(params.followUp);
  const priorityParam = first(params.priority);
  const noNextActionParam = first(params.noNextAction);
  const sort = first(params.sort) === "oldest" ? "oldest" : "newest";
  const page = Number(first(params.page)) || 1;

  const since = sinceParam ? daysAgo(Number(sinceParam)) : undefined;
  const priority = priorityParam === "1" ? true : undefined;

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
      staleDays: staleParam ? Number(staleParam) : undefined,
      followUp: isFollowUp(followUpParam) ? followUpParam : undefined,
      priority,
      noNextAction: noNextActionParam === "1" ? true : undefined,
      sort,
      page,
      perPage: 20,
    });
  } catch (error) {
    loadError = error instanceof Error ? error.message : "Não foi possível carregar os leads.";
  }

  const [allDestinations, allExperiences] = await Promise.all([getDestinations(), getExperiences()]);
  const destinationOptions = allDestinations.filter((d) => d.active).map((d) => ({ slug: d.slug, name: d.name }));
  const experienceOptions = allExperiences.filter((e) => e.active).map((e) => ({ slug: e.slug, name: e.name }));

  const interestByLeadId = result
    ? new Map(await Promise.all(result.items.map(async (lead) => [lead.id, await getLeadInterest(lead)] as const)))
    : new Map<string, string>();

  const activeFilterCount = [
    status,
    origin,
    destination,
    experience,
    q,
    sinceParam,
    staleParam,
    followUpParam,
    priority ? "1" : undefined,
    noNextActionParam === "1" ? "1" : undefined,
  ].filter(Boolean).length;
  const hasActiveFilters = activeFilterCount > 0;

  function buildQuery(overrides: Record<string, string | undefined> = {}) {
    const next = new URLSearchParams();
    const values: Record<string, string | undefined> = {
      status,
      origin,
      destination,
      experience,
      q,
      since: sinceParam,
      stale: staleParam,
      followUp: followUpParam,
      priority: priorityParam,
      noNextAction: noNextActionParam,
      sort: sort !== "newest" ? sort : undefined,
      ...overrides,
    };
    for (const [key, value] of Object.entries(values)) {
      if (value) next.set(key, value);
    }
    return next;
  }

  function buildPageHref(targetPage: number) {
    const next = buildQuery();
    next.set("page", String(targetPage));
    return `/admin/leads?${next.toString()}`;
  }

  const exportHref = `/admin/leads/export?${buildQuery().toString()}`;

  const filterValues: FilterValues = {
    q,
    status,
    priority,
    stale: staleParam,
    followUp: followUpParam,
    destination,
    experience,
    since: sinceParam,
    sort,
  };

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="Leads"
        description="Todos os pedidos de planejamento recebidos pelo site."
        actions={
          <a
            href={exportHref}
            className="inline-flex items-center gap-1.5 border border-ink/15 bg-ivory px-4 py-2.5 text-xs font-medium tracking-wide text-ink uppercase transition-colors duration-200 hover:border-ink/30"
          >
            Exportar CSV
          </a>
        }
      />

      {/* Desktop: filtros agrupados, sempre visíveis. */}
      <form className="hidden flex-col gap-5 border border-ink/10 bg-ivory p-5 md:flex">
        <LeadFilterFields idPrefix="d-" values={filterValues} destinations={destinationOptions} experiences={experienceOptions} />
        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="bg-ink px-5 py-2.5 text-xs font-medium tracking-wide text-ivory uppercase transition-colors duration-200 hover:bg-magenta-dark"
          >
            Aplicar filtros
          </button>
          {hasActiveFilters && (
            <Link
              href="/admin/leads"
              className="text-xs font-medium tracking-wide text-stone uppercase underline-offset-4 hover:text-ink hover:underline"
            >
              Limpar filtros
            </Link>
          )}
        </div>
      </form>

      {/* Mobile: filtros recolhidos num painel, com contador de filtros ativos. */}
      <details className="border border-ink/10 bg-ivory md:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-medium text-ink">
          Filtros{hasActiveFilters ? ` (${activeFilterCount})` : ""}
          <span aria-hidden className="text-stone">+</span>
        </summary>
        <form className="flex flex-col gap-5 border-t border-ink/10 p-4">
          <LeadFilterFields idPrefix="m-" values={filterValues} destinations={destinationOptions} experiences={experienceOptions} />
          <div className="flex items-center gap-4">
            <button
              type="submit"
              className="bg-ink px-5 py-2.5 text-xs font-medium tracking-wide text-ivory uppercase transition-colors duration-200 hover:bg-magenta-dark"
            >
              Aplicar filtros
            </button>
            {hasActiveFilters && (
              <Link
                href="/admin/leads"
                className="text-xs font-medium tracking-wide text-stone uppercase underline-offset-4 hover:text-ink hover:underline"
              >
                Limpar
              </Link>
            )}
          </div>
        </form>
      </details>

      {loadError ? (
        <AdminEmptyState title="Não foi possível carregar os leads." supporting={loadError} />
      ) : result!.items.length === 0 ? (
        hasActiveFilters ? (
          <div className="flex flex-col gap-4">
            <AdminEmptyState
              title="Nenhum lead corresponde aos filtros selecionados."
              supporting="Tente remover algum filtro para ver mais resultados."
            />
            <Link
              href="/admin/leads"
              className="w-fit border border-ink/15 bg-ivory px-4 py-2.5 text-xs font-medium tracking-wide text-ink uppercase transition-colors duration-200 hover:border-ink/30"
            >
              Limpar filtros
            </Link>
          </div>
        ) : (
          <AdminEmptyState
            title="Nenhum lead ainda."
            supporting="Os pedidos enviados pelo formulário do site aparecerão aqui."
          />
        )
      ) : (
        <>
          {/* Desktop: tabela */}
          <div className="hidden overflow-x-auto border border-ink/10 bg-ivory md:block">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-ink/10 text-xs text-stone uppercase">
                  <th scope="col" className="px-4 py-3 font-medium">Nome</th>
                  <th scope="col" className="px-4 py-3 font-medium">Interesse</th>
                  <th scope="col" className="px-4 py-3 font-medium">WhatsApp</th>
                  <th scope="col" className="px-4 py-3 font-medium">Origem</th>
                  <th scope="col" className="px-4 py-3 font-medium">Status</th>
                  <th scope="col" className="px-4 py-3 font-medium">Próxima ação</th>
                  <th scope="col" className="px-4 py-3 font-medium">Data</th>
                  <th scope="col" className="px-4 py-3 font-medium">
                    <span className="sr-only">Ação</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {result!.items.map((lead) => (
                  <tr key={lead.id} className="border-b border-ink/5 last:border-0">
                    <td className="px-4 py-3 font-medium text-ink">
                      <span className="inline-flex items-center gap-1.5">
                        {lead.priority && (
                          <Star className="size-3.5 shrink-0 fill-magenta-dark text-magenta-dark" aria-label="Prioritário" />
                        )}
                        {lead.name}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-stone">{interestByLeadId.get(lead.id)}</td>
                    <td className="px-4 py-3 text-stone">{lead.whatsapp}</td>
                    <td className="px-4 py-3 text-stone">{getLeadOrigin(lead)}</td>
                    <td className="px-4 py-3">
                      <AdminStatusBadge status={lead.status} />
                    </td>
                    <td className="px-4 py-3 text-stone">{lead.nextAction ?? "—"}</td>
                    <td className="px-4 py-3 text-stone">{formatBrDate(new Date(lead.createdAt))}</td>
                    <td className="px-4 py-3">
                      <Link href={`/admin/leads/${lead.id}`} className="text-xs font-medium text-magenta-dark hover:underline">
                        Abrir lead
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
                  <span className="inline-flex items-center gap-1.5 font-medium text-ink">
                    {lead.priority && (
                      <Star className="size-3.5 shrink-0 fill-magenta-dark text-magenta-dark" aria-label="Prioritário" />
                    )}
                    {lead.name}
                  </span>
                  <AdminStatusBadge status={lead.status} />
                </div>
                <p className="text-sm text-stone">{interestByLeadId.get(lead.id)}</p>
                {lead.nextAction && <p className="text-sm text-ink">Próxima ação: {lead.nextAction}</p>}
                <div className="flex items-center justify-between text-xs text-stone">
                  <span>{getLeadOrigin(lead)}</span>
                  <span>{formatBrDate(new Date(lead.createdAt))}</span>
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
