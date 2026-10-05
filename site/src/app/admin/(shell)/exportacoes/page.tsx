import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { LEAD_STATUSES, LEAD_STATUS_LABELS } from "@/lib/leads/types";

export const metadata = { title: "Exportações | Admin Cays" };

const SINCE_OPTIONS = [
  { value: "", label: "Todo o período" },
  { value: "7", label: "Últimos 7 dias" },
  { value: "30", label: "Últimos 30 dias" },
  { value: "90", label: "Últimos 90 dias" },
];

const fieldClass = "border border-ink/15 bg-ivory px-3 py-2 text-sm text-ink outline-none focus:border-magenta";
const labelClass = "text-[0.65rem] font-medium tracking-wide text-stone uppercase";
const buttonClass =
  "bg-ink px-5 py-2.5 text-xs font-medium tracking-wide text-ivory uppercase transition-colors duration-200 hover:bg-magenta-dark";

export default function AdminExportacoesPage() {
  return (
    <div className="flex flex-col gap-8">
      <AdminPageHeader
        title="Exportações"
        description="Baixe os leads em CSV para planilhas ou para outras ferramentas. O arquivo tem nome, contato, destino, status, origem, datas e a observação do cliente."
      />

      <section className="flex max-w-2xl flex-col gap-4 border border-ink/10 bg-ivory p-6">
        <div>
          <h2 className="font-serif text-lg text-ink">Exportar leads por período e status</h2>
          <p className="mt-1 text-sm text-stone">Deixe em branco para incluir todos.</p>
        </div>

        <form action="/admin/leads/export" method="get" className="flex flex-wrap items-end gap-3">
          <div className="flex flex-col gap-1">
            <label htmlFor="since" className={labelClass}>
              Período
            </label>
            <select id="since" name="since" className={fieldClass} defaultValue="">
              {SINCE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="status" className={labelClass}>
              Status
            </label>
            <select id="status" name="status" className={fieldClass} defaultValue="">
              <option value="">Todos</option>
              {LEAD_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {LEAD_STATUS_LABELS[s]}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className={buttonClass}>
            Baixar CSV
          </button>
        </form>
      </section>

      <section className="flex max-w-2xl flex-col gap-4 border border-ink/10 bg-ivory p-6">
        <div>
          <h2 className="font-serif text-lg text-ink">Exportar todos os leads</h2>
          <p className="mt-1 text-sm text-stone">Baixa a base completa, sem filtros.</p>
        </div>
        <div>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- route handler de download (CSV), não uma página */}
          <a href="/admin/leads/export" className={`${buttonClass} inline-block`}>
            Baixar todos
          </a>
        </div>
      </section>
    </div>
  );
}
