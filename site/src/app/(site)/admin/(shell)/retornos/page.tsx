import Link from "next/link";
import { MessageCircle, Star } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { AdminStatusBadge } from "@/components/admin/admin-status-badge";
import { getFollowUpBuckets } from "@/lib/admin/leads-queries";
import {
  buildWhatsAppLink,
  formatBrDate,
  formatBrDateTimeCompact,
  formatBrTime,
  getLeadInterest,
} from "@/lib/admin/display";
import type { Lead } from "@/lib/leads/types";

export const metadata = { title: "Retornos | Admin Cays" };

type Bucket = { key: keyof Awaited<ReturnType<typeof getFollowUpBuckets>>; title: string; hint: string };

const BUCKETS: Bucket[] = [
  { key: "overdue", title: "Atrasados", hint: "Retorno já passou e o lead ainda está aberto." },
  { key: "today", title: "Hoje", hint: "" },
  { key: "tomorrow", title: "Amanhã", hint: "" },
  { key: "next7Days", title: "Próximos 7 dias", hint: "" },
  { key: "later", title: "Depois de 7 dias", hint: "" },
  { key: "noDate", title: "Sem data", hint: "Leads abertos sem retorno marcado." },
];

function formatWhen(lead: Lead): string {
  if (!lead.followUpAt) return "Sem data";
  const when = new Date(lead.followUpAt);
  const today = formatBrDate(new Date());
  return formatBrDate(when) === today ? `Hoje · ${formatBrTime(when)}` : formatBrDateTimeCompact(when);
}

export default async function AdminRetornosPage() {
  let buckets;
  let interestByLeadId = new Map<string, string>();
  let loadError: string | null = null;

  try {
    buckets = await getFollowUpBuckets();
    const all = Object.values(buckets).flat();
    interestByLeadId = new Map(await Promise.all(all.map(async (lead) => [lead.id, await getLeadInterest(lead)] as const)));
  } catch (error) {
    loadError = error instanceof Error ? error.message : "Não foi possível carregar os retornos.";
  }

  const total = buckets ? Object.values(buckets).reduce((sum, leads) => sum + leads.length, 0) : 0;

  return (
    <div className="flex flex-col gap-8">
      <AdminPageHeader
        title="Retornos"
        description="Os contatos que a equipe precisa retomar, separados por data."
      />

      {loadError ? (
        <AdminEmptyState title="Não foi possível carregar os retornos." supporting={loadError} />
      ) : total === 0 ? (
        <AdminEmptyState
          title="Nenhum retorno em aberto."
          supporting="Quando um lead tiver retorno marcado, ele aparece aqui na data combinada."
        />
      ) : (
        BUCKETS.map((bucket) => {
          const leads = buckets![bucket.key];
          if (leads.length === 0) return null;
          return (
            <section key={bucket.key} aria-labelledby={`bucket-${bucket.key}`} className="flex flex-col gap-3">
              <header className="flex items-baseline justify-between gap-3">
                <h2 id={`bucket-${bucket.key}`} className="font-serif text-lg text-ink">
                  {bucket.title}
                  <span className="ml-2 font-sans text-sm text-stone">{leads.length}</span>
                </h2>
                {bucket.hint && <p className="text-xs text-stone">{bucket.hint}</p>}
              </header>

              <ul className="flex flex-col gap-3">
                {leads.map((lead) => (
                  <li
                    key={lead.id}
                    className="flex flex-col gap-3 border border-ink/10 bg-ivory p-4 md:flex-row md:items-center md:justify-between"
                  >
                    <div className="flex min-w-0 flex-col gap-1">
                      <div className="flex flex-wrap items-center gap-2">
                        {lead.priority && (
                          <Star className="size-3.5 shrink-0 fill-magenta-dark text-magenta-dark" aria-label="Prioritário" />
                        )}
                        <Link href={`/admin/leads/${lead.id}`} className="font-medium text-ink hover:text-magenta">
                          {lead.name}
                        </Link>
                        <AdminStatusBadge status={lead.status} />
                      </div>
                      <p className="text-sm text-stone">{interestByLeadId.get(lead.id)}</p>
                      {lead.nextAction && (
                        <p className="text-sm text-ink">
                          <span className="text-stone">Próxima ação:</span> {lead.nextAction}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 md:shrink-0">
                      <span className="text-sm font-medium text-ink">{formatWhen(lead)}</span>
                      <a
                        href={buildWhatsAppLink(lead.whatsapp, lead.name)}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 border border-ink/15 bg-ivory px-3 py-2 text-xs font-medium tracking-wide text-ink uppercase transition-colors duration-200 hover:border-ink/30"
                      >
                        <MessageCircle className="size-3.5" aria-hidden />
                        WhatsApp
                      </a>
                      <Link
                        href={`/admin/leads/${lead.id}`}
                        className="inline-flex items-center border border-ink/15 bg-ivory px-3 py-2 text-xs font-medium tracking-wide text-ink uppercase transition-colors duration-200 hover:border-ink/30"
                      >
                        Abrir lead
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          );
        })
      )}
    </div>
  );
}
