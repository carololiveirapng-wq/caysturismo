import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminStatCard } from "@/components/admin/admin-stat-card";
import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { getReportData } from "@/lib/admin/leads-queries";
import { getLeadOrigin } from "@/lib/admin/display";
import { getDestinationBySlug, getExperienceBySlug } from "@/lib/cms";

export const metadata = { title: "Relatórios | Admin Cays" };

const PERIOD_OPTIONS = [
  { value: "30", label: "Últimos 30 dias", days: 30 },
  { value: "90", label: "Últimos 90 dias", days: 90 },
  { value: "365", label: "Último ano", days: 365 },
  { value: "all", label: "Todo o período", days: null },
] as const;

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function Ranking({ title, rows }: { title: string; rows: { label: string; count: number }[] }) {
  return (
    <section className="border border-ink/10 bg-ivory p-6">
      <h2 className="font-serif text-lg text-ink">{title}</h2>
      {rows.length === 0 ? (
        <p className="mt-3 text-sm text-stone">Sem dados neste período.</p>
      ) : (
        <ol className="mt-4 flex flex-col gap-3">
          {rows.map((row) => (
            <li key={row.label} className="flex items-center justify-between gap-4 text-sm">
              <span className="text-ink">{row.label}</span>
              <span className="font-medium text-ink">{row.count}</span>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

export default async function AdminRelatoriosPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const periodValue = first(params.periodo) ?? "30";
  const period = PERIOD_OPTIONS.find((p) => p.value === periodValue) ?? PERIOD_OPTIONS[0];

  let data;
  let loadError: string | null = null;
  try {
    data = await getReportData(period.days);
  } catch (error) {
    loadError = error instanceof Error ? error.message : "Não foi possível gerar o relatório.";
  }

  let origins: { label: string; count: number }[] = [];
  let destinations: { label: string; count: number }[] = [];
  let experiences: { label: string; count: number }[] = [];
  if (data) {
    const originTotals = new Map<string, number>();
    for (const o of data.origins) {
      const label = getLeadOrigin({ utmSource: o.source ?? undefined, acquisitionSource: undefined });
      originTotals.set(label, (originTotals.get(label) ?? 0) + o.count);
    }
    origins = [...originTotals].map(([label, count]) => ({ label, count })).sort((a, b) => b.count - a.count);
    destinations = await Promise.all(
      data.destinations.map(async (d) => ({ label: (await getDestinationBySlug(d.slug))?.name ?? d.slug, count: d.count })),
    );
    experiences = await Promise.all(
      data.experiences.map(async (e) => ({ label: (await getExperienceBySlug(e.slug))?.name ?? e.slug, count: e.count })),
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <AdminPageHeader
        title="Relatórios"
        description="Panorama da operação comercial. Os números de período valem para o intervalo escolhido."
      />

      <form className="flex flex-wrap items-end gap-3 border border-ink/10 bg-ivory p-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="periodo" className="text-[0.65rem] font-medium tracking-wide text-stone uppercase">
            Período
          </label>
          <select
            id="periodo"
            name="periodo"
            defaultValue={period.value}
            className="border border-ink/15 bg-ivory px-3 py-2 text-sm text-ink outline-none focus:border-magenta"
          >
            {PERIOD_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-ink px-5 py-2.5 text-xs font-medium tracking-wide text-ivory uppercase transition-colors duration-200 hover:bg-magenta-dark"
        >
          Atualizar
        </button>
      </form>

      {loadError ? (
        <AdminEmptyState title="Não foi possível gerar o relatório." supporting={loadError} />
      ) : data!.totalAllTime === 0 ? (
        <AdminEmptyState
          title="Ainda não há leads para relatar."
          supporting="Os números aparecem assim que os primeiros pedidos chegarem pelo site."
        />
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <AdminStatCard label="Leads no período" value={data!.newInPeriod} />
            <AdminStatCard label="Fechados no período" value={data!.closedInPeriod} />
            <AdminStatCard label="Taxa de conversão (total)" value={`${data!.conversionRate}%`} />
            <AdminStatCard
              label="Dias até o primeiro avanço"
              value={data!.avgDaysToFirstStatusChange === null ? "—" : `${data!.avgDaysToFirstStatusChange} d`}
            />
          </div>
          <p className="-mt-4 text-xs text-stone">
            Total de leads desde o início: {data!.totalAllTime} · fechados: {data!.closedAllTime}. A taxa de conversão usa esse total.
          </p>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <Ranking title="Origem dos leads" rows={origins} />
            <Ranking title="Destinos mais pedidos" rows={destinations} />
            <Ranking title="Experiências mais pedidas" rows={experiences} />
          </div>
        </>
      )}
    </div>
  );
}
