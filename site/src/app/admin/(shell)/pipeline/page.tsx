import Link from "next/link";
import { Star } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { LeadMoveStatusForm } from "@/components/admin/lead-move-status-form";
import { getPipelineLeads } from "@/lib/admin/leads-queries";
import { formatBrDate, formatBrDateTimeCompact, getLeadInterest, getLeadOrigin } from "@/lib/admin/display";
import { LEAD_STATUSES, LEAD_STATUS_LABELS } from "@/lib/leads/types";

export const metadata = { title: "Pipeline | Admin Cays" };

export default async function AdminPipelinePage() {
  let byStatus;
  let interestByLeadId = new Map<string, string>();
  let loadError: string | null = null;

  try {
    byStatus = await getPipelineLeads();
    const all = LEAD_STATUSES.flatMap((s) => byStatus![s]);
    interestByLeadId = new Map(await Promise.all(all.map(async (lead) => [lead.id, await getLeadInterest(lead)] as const)));
  } catch (error) {
    loadError = error instanceof Error ? error.message : "Não foi possível carregar o pipeline.";
  }

  const total = byStatus ? LEAD_STATUSES.reduce((sum, s) => sum + byStatus![s].length, 0) : 0;

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="Pipeline"
        description="Acompanhe cada lead pela etapa comercial. Mudar a etapa registra o evento na timeline do lead."
      />

      {loadError ? (
        <AdminEmptyState title="Não foi possível carregar o pipeline." supporting={loadError} />
      ) : total === 0 ? (
        <AdminEmptyState
          title="Nenhum lead ainda."
          supporting="Os pedidos enviados pelo formulário do site aparecerão aqui, na coluna Novo."
        />
      ) : (
        <div className="-mx-5 flex gap-4 overflow-x-auto px-5 pb-4 md:-mx-8 md:px-8">
          {LEAD_STATUSES.map((status) => {
            const leads = byStatus![status];
            return (
              <section
                key={status}
                aria-labelledby={`col-${status}`}
                className="flex w-72 shrink-0 flex-col gap-3 bg-sand/60 p-3"
              >
                <header className="flex items-center justify-between px-1">
                  <h2 id={`col-${status}`} className="text-xs font-medium tracking-wide text-ink uppercase">
                    {LEAD_STATUS_LABELS[status]}
                  </h2>
                  <span className="text-xs text-stone">{leads.length}</span>
                </header>

                {leads.length === 0 ? (
                  <p className="px-1 py-6 text-center text-xs text-stone">Nenhum lead nesta etapa.</p>
                ) : (
                  <ul className="flex flex-col gap-3">
                    {leads.map((lead) => (
                      <li key={lead.id} className="flex flex-col gap-2 border border-ink/10 bg-ivory p-4">
                        <Link
                          href={`/admin/leads/${lead.id}`}
                          className="inline-flex items-center gap-1.5 font-medium text-ink hover:text-magenta"
                        >
                          {lead.priority && (
                            <Star className="size-3.5 shrink-0 fill-magenta-dark text-magenta-dark" aria-label="Prioritário" />
                          )}
                          {lead.name}
                        </Link>
                        <p className="text-sm text-stone">{interestByLeadId.get(lead.id)}</p>
                        <dl className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs text-stone">
                          <dt className="text-stone">Origem</dt>
                          <dd>{getLeadOrigin(lead)}</dd>
                          <dt className="text-stone">Criado</dt>
                          <dd>{formatBrDate(new Date(lead.createdAt))}</dd>
                          {lead.followUpAt && (
                            <>
                              <dt className="text-stone">Retorno</dt>
                              <dd>{formatBrDateTimeCompact(new Date(lead.followUpAt))}</dd>
                            </>
                          )}
                        </dl>
                        {lead.nextAction && (
                          <p className="text-xs text-ink">
                            <span className="text-stone">Próxima ação:</span> {lead.nextAction}
                          </p>
                        )}
                        <LeadMoveStatusForm leadId={lead.id} currentStatus={status} />
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
