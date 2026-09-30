import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminStatCard } from "@/components/admin/admin-stat-card";
import { AdminStatusBadge } from "@/components/admin/admin-status-badge";
import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { getLeads, getLeadStats } from "@/lib/admin/leads-queries";
import { getLeadInterest, getLeadOrigin } from "@/lib/admin/display";

export const metadata = { title: "Dashboard | Admin Cays" };

export default async function AdminDashboardPage() {
  let stats;
  let recentLeads;
  let loadError: string | null = null;

  try {
    stats = await getLeadStats();
    recentLeads = (await getLeads({ perPage: 8, sort: "newest" })).items;
  } catch (error) {
    loadError =
      error instanceof Error ? error.message : "Não foi possível carregar os dados do banco.";
  }

  return (
    <div className="flex flex-col gap-8">
      <AdminPageHeader
        title="Dashboard"
        description="Visão geral da operação comercial da Cays."
      />

      {loadError ? (
        <AdminEmptyState
          title="Não foi possível carregar os dados."
          supporting={loadError}
        />
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            <AdminStatCard label="Leads novos" value={stats!.new} />
            <AdminStatCard label="Esta semana" value={stats!.thisWeek} />
            <AdminStatCard label="Em contato" value={stats!.contacted} />
            <AdminStatCard label="Propostas" value={stats!.proposal} />
            <AdminStatCard label="Fechados" value={stats!.closed} />
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/leads"
              className="inline-flex items-center gap-1.5 border border-ink/15 bg-ivory px-4 py-2.5 text-xs font-medium tracking-wide text-ink uppercase transition-colors duration-200 hover:border-ink/30"
            >
              Ver todos os leads
              <ArrowUpRight className="size-3.5" aria-hidden />
            </Link>
            <Link
              href="/studio"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 border border-ink/15 bg-ivory px-4 py-2.5 text-xs font-medium tracking-wide text-ink uppercase transition-colors duration-200 hover:border-ink/30"
            >
              Abrir Sanity Studio
              <ArrowUpRight className="size-3.5" aria-hidden />
            </Link>
            <Link
              href="/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 border border-ink/15 bg-ivory px-4 py-2.5 text-xs font-medium tracking-wide text-ink uppercase transition-colors duration-200 hover:border-ink/30"
            >
              Ver site
              <ArrowUpRight className="size-3.5" aria-hidden />
            </Link>
          </div>

          <div>
            <h2 className="font-serif text-lg text-ink">Últimos leads</h2>

            {recentLeads!.length === 0 ? (
              <div className="mt-4">
                <AdminEmptyState
                  title="Nenhum lead ainda."
                  supporting="Quando alguém enviar o planejamento pelo site, ele aparecerá aqui."
                />
              </div>
            ) : (
              <>
                {/* Desktop: tabela */}
                <div className="mt-4 hidden overflow-hidden border border-ink/10 bg-ivory md:block">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-ink/10 text-xs text-stone uppercase">
                        <th className="px-4 py-3 font-medium">Nome</th>
                        <th className="px-4 py-3 font-medium">Interesse</th>
                        <th className="px-4 py-3 font-medium">Origem</th>
                        <th className="px-4 py-3 font-medium">Status</th>
                        <th className="px-4 py-3 font-medium">Data</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentLeads!.map((lead) => (
                        <tr key={lead.id} className="border-b border-ink/5 last:border-0">
                          <td className="px-4 py-3">
                            <Link href={`/admin/leads/${lead.id}`} className="font-medium text-ink hover:text-magenta">
                              {lead.name}
                            </Link>
                          </td>
                          <td className="px-4 py-3 text-stone">{getLeadInterest(lead)}</td>
                          <td className="px-4 py-3 text-stone">{getLeadOrigin(lead)}</td>
                          <td className="px-4 py-3">
                            <AdminStatusBadge status={lead.status} />
                          </td>
                          <td className="px-4 py-3 text-stone">
                            {new Date(lead.createdAt).toLocaleDateString("pt-BR")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile: cards */}
                <div className="mt-4 flex flex-col gap-3 md:hidden">
                  {recentLeads!.map((lead) => (
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
                      <div className="flex items-center justify-between text-xs text-stone/80">
                        <span>{getLeadOrigin(lead)}</span>
                        <span>{new Date(lead.createdAt).toLocaleDateString("pt-BR")}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
