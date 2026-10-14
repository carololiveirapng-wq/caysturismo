import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminStatCard } from "@/components/admin/admin-stat-card";
import { AdminStatusBadge } from "@/components/admin/admin-status-badge";
import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { getAdminCounts, getFollowUpBuckets, getLeadStats, getLeads } from "@/lib/admin/leads-queries";
import { formatBrDate, formatBrDateTimeCompact, getLeadInterest, getLeadOrigin } from "@/lib/admin/display";
import type { Lead } from "@/lib/leads/types";

export const metadata = { title: "Dashboard | Admin Cays" };

const studioLinkClass =
  "inline-flex items-center gap-1 text-xs font-medium tracking-wide text-stone uppercase underline-offset-4 transition-colors duration-200 hover:text-ink hover:underline";

function AttentionItem({ href, count, text }: { href: string; count: number; text: string }) {
  return (
    <li>
      <Link
        href={href}
        className="flex items-center justify-between gap-4 border border-ink/10 bg-ivory px-4 py-3 transition-colors duration-200 hover:border-magenta/40"
      >
        <span className="text-sm text-ink">{text}</span>
        <span className="font-serif text-xl text-magenta-dark">{count}</span>
      </Link>
    </li>
  );
}

export default async function AdminDashboardPage() {
  let stats;
  let counts;
  let buckets;
  let recentLeads: Lead[] = [];
  let loadError: string | null = null;
  const interestByLeadId = new Map<string, string>();

  try {
    [stats, counts, buckets, recentLeads] = await Promise.all([
      getLeadStats(),
      getAdminCounts(),
      getFollowUpBuckets(),
      getLeads({ perPage: 6, sort: "newest" }).then((r) => r.items),
    ]);
    const nextReturns = [...buckets.today, ...buckets.tomorrow, ...buckets.next7Days].slice(0, 8);
    const leadsToResolve = [...nextReturns, ...recentLeads];
    await Promise.all(
      leadsToResolve.map(async (lead) => interestByLeadId.set(lead.id, await getLeadInterest(lead))),
    );
  } catch (error) {
    loadError = error instanceof Error ? error.message : "Não foi possível carregar os dados do banco.";
  }

  const nextReturns = buckets
    ? [...buckets.today, ...buckets.tomorrow, ...buckets.next7Days].slice(0, 8)
    : [];

  return (
    <div className="flex flex-col gap-8">
      <AdminPageHeader
        title="Dashboard"
        description="Visão geral da operação comercial de hoje."
        actions={
          <Link
            href="/admin/leads/novo"
            className="inline-flex items-center gap-1.5 bg-ink px-4 py-2.5 text-xs font-medium tracking-wide text-ivory uppercase transition-colors duration-200 hover:bg-magenta-dark"
          >
            Novo lead
          </Link>
        }
      />

      {loadError ? (
        <AdminEmptyState title="Não foi possível carregar os dados." supporting={loadError} />
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <AdminStatCard label="Novos hoje" value={stats!.newToday} />
            <AdminStatCard label="Em contato" value={stats!.contacted} />
            <AdminStatCard label="Propostas em aberto" value={stats!.proposal} />
            <AdminStatCard label="Fechados no mês" value={stats!.closedThisMonth} />
            <AdminStatCard label="Retornos hoje" value={counts!.followUpsToday} />
            <AdminStatCard label="Retornos atrasados" value={counts!.overdueFollowUps} />
            <AdminStatCard label="Prioritários" value={counts!.priority} />
            <AdminStatCard label="Sem resposta há 3+ dias" value={stats!.stale} />
          </div>

          <section aria-labelledby="atencao" className="flex flex-col gap-3">
            <h2 id="atencao" className="font-serif text-lg text-ink">
              Precisam de atenção
            </h2>
            {counts!.overdueFollowUps + counts!.followUpsToday + counts!.priority + counts!.newLeads + counts!.noNextAction + stats!.stale === 0 ? (
              <p className="text-sm text-stone">Nada urgente agora.</p>
            ) : (
              <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {counts!.newLeads > 0 && (
                  <AttentionItem href="/admin/leads?status=new" count={counts!.newLeads} text="leads novos aguardando primeiro contato" />
                )}
                {counts!.overdueFollowUps > 0 && (
                  <AttentionItem href="/admin/retornos" count={counts!.overdueFollowUps} text="retornos atrasados" />
                )}
                {counts!.followUpsToday > 0 && (
                  <AttentionItem href="/admin/retornos" count={counts!.followUpsToday} text="retornos para hoje" />
                )}
                {counts!.noNextAction > 0 && (
                  <AttentionItem href="/admin/leads?noNextAction=1" count={counts!.noNextAction} text="leads abertos sem próxima ação definida" />
                )}
                {stats!.stale > 0 && (
                  <AttentionItem href="/admin/leads?stale=3" count={stats!.stale} text="leads sem resposta há mais de 3 dias" />
                )}
                {counts!.priority > 0 && (
                  <AttentionItem href="/admin/leads?priority=1" count={counts!.priority} text="leads prioritários em aberto" />
                )}
              </ul>
            )}
          </section>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <section aria-labelledby="proximos" className="flex flex-col gap-3 lg:col-span-2">
              <div className="flex items-baseline justify-between">
                <h2 id="proximos" className="font-serif text-lg text-ink">
                  Próximos retornos
                </h2>
                <Link href="/admin/retornos" className={studioLinkClass}>
                  Ver todos
                </Link>
              </div>
              {nextReturns.length === 0 ? (
                <p className="text-sm text-stone">Nenhum retorno marcado para os próximos dias.</p>
              ) : (
                <ul className="flex flex-col gap-2">
                  {nextReturns.map((lead) => (
                    <li key={lead.id}>
                      <Link
                        href={`/admin/leads/${lead.id}`}
                        className="flex flex-col gap-1 border border-ink/10 bg-ivory p-4 transition-colors duration-200 hover:border-magenta/40 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <span className="flex items-center gap-2">
                          {lead.priority && (
                            <Star className="size-3.5 shrink-0 fill-magenta-dark text-magenta-dark" aria-label="Prioritário" />
                          )}
                          <span className="font-medium text-ink">{lead.name}</span>
                          <span className="text-sm text-stone">{interestByLeadId.get(lead.id)}</span>
                        </span>
                        <span className="text-sm font-medium text-ink">
                          {lead.followUpAt ? formatBrDateTimeCompact(new Date(lead.followUpAt)) : ""}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section aria-labelledby="conteudo" className="flex flex-col gap-3 border border-ink/10 bg-sand/60 p-6">
              <h2 id="conteudo" className="font-serif text-lg text-ink">
                Conteúdo do site
              </h2>
              <p className="text-sm text-stone">
                Gerencie destinos, experiências, viagens, artigos, equipe e depoimentos no editor de conteúdo.
              </p>
              <Link
                href="/studio"
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-fit items-center gap-1.5 border border-ink/15 bg-ivory px-4 py-2.5 text-xs font-medium tracking-wide text-ink uppercase transition-colors duration-200 hover:border-ink/30"
              >
                Abrir editor de conteúdo
                <ArrowUpRight className="size-3.5" aria-hidden />
              </Link>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 border-t border-ink/10 pt-3">
                <Link href="/studio/structure/destination" target="_blank" rel="noreferrer" className={studioLinkClass}>
                  Destinos
                </Link>
                <Link href="/studio/structure/travelProduct" target="_blank" rel="noreferrer" className={studioLinkClass}>
                  Viagens
                </Link>
                <Link href="/studio/structure/curadoriaArticle" target="_blank" rel="noreferrer" className={studioLinkClass}>
                  Curadoria
                </Link>
                <Link href="/studio/structure/person" target="_blank" rel="noreferrer" className={studioLinkClass}>
                  Equipe
                </Link>
              </div>
            </section>
          </div>

          <section aria-labelledby="recentes" className="flex flex-col gap-3">
            <div className="flex items-baseline justify-between">
              <h2 id="recentes" className="font-serif text-lg text-ink">
                Leads recentes
              </h2>
              <Link href="/admin/leads" className={studioLinkClass}>
                Ver todos
              </Link>
            </div>

            {recentLeads.length === 0 ? (
              <AdminEmptyState
                title="Nenhum lead ainda."
                supporting="Os pedidos enviados pelo formulário do site aparecerão aqui."
              />
            ) : (
              <>
                <div className="hidden overflow-hidden border border-ink/10 bg-ivory md:block">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-ink/10 text-xs text-stone uppercase">
                        <th className="px-4 py-3 font-medium">Nome</th>
                        <th className="px-4 py-3 font-medium">Interesse</th>
                        <th className="px-4 py-3 font-medium">Origem</th>
                        <th className="px-4 py-3 font-medium">Status</th>
                        <th className="px-4 py-3 font-medium">Próxima ação</th>
                        <th className="px-4 py-3 font-medium">Data</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentLeads.map((lead) => (
                        <tr key={lead.id} className="border-b border-ink/5 last:border-0">
                          <td className="px-4 py-3">
                            <Link href={`/admin/leads/${lead.id}`} className="inline-flex items-center gap-1.5 font-medium text-ink hover:text-magenta">
                              {lead.priority && <Star className="size-3.5 fill-magenta-dark text-magenta-dark" aria-label="Prioritário" />}
                              {lead.name}
                            </Link>
                          </td>
                          <td className="px-4 py-3 text-stone">{interestByLeadId.get(lead.id)}</td>
                          <td className="px-4 py-3 text-stone">{getLeadOrigin(lead)}</td>
                          <td className="px-4 py-3">
                            <AdminStatusBadge status={lead.status} />
                          </td>
                          <td className="px-4 py-3 text-stone">{lead.nextAction ?? "—"}</td>
                          <td className="px-4 py-3 text-stone">{formatBrDate(new Date(lead.createdAt))}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex flex-col gap-3 md:hidden">
                  {recentLeads.map((lead) => (
                    <Link
                      key={lead.id}
                      href={`/admin/leads/${lead.id}`}
                      className="flex flex-col gap-2 border border-ink/10 bg-ivory p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="inline-flex items-center gap-1.5 font-medium text-ink">
                          {lead.priority && <Star className="size-3.5 fill-magenta-dark text-magenta-dark" aria-label="Prioritário" />}
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
              </>
            )}
          </section>
        </>
      )}
    </div>
  );
}
