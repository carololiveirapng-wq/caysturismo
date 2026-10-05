import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { Mail, MessageCircle, Star } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { LeadStatusForm } from "@/components/admin/lead-status-form";
import { getLeadById, getLeadEvents } from "@/lib/admin/leads-queries";
import { getLeadInterest, buildWhatsAppLink } from "@/lib/admin/display";
import { getDestinationBySlug, getExperienceBySlug, getTravelProductBySlug } from "@/lib/cms";
import { LEAD_EVENT_LABELS } from "@/lib/leads/types";

export const metadata = { title: "Detalhe do lead | Admin Cays" };

function Field({ label, value }: { label: string; value?: ReactNode }) {
  if (value === undefined || value === null || value === "") return null;
  return (
    <div>
      <p className="text-[0.65rem] font-medium tracking-wide text-stone uppercase">{label}</p>
      <p className="mt-1 text-sm text-ink">{value}</p>
    </div>
  );
}

export default async function AdminLeadDetailPage({ params }: PageProps<"/admin/leads/[id]">) {
  const { id } = await params;

  let lead;
  try {
    lead = await getLeadById(id);
  } catch (error) {
    return (
      <AdminEmptyState
        title="Não foi possível carregar este lead."
        supporting={error instanceof Error ? error.message : undefined}
      />
    );
  }

  if (!lead) notFound();

  const [destinationNames, experienceDetail, productDetail, interest, events] = await Promise.all([
    Promise.all(
      lead.destinations
        .filter((slug) => slug !== "nao-sei")
        .map(async (slug) => (await getDestinationBySlug(slug))?.name ?? slug),
    ),
    lead.experience && lead.experience !== "nao-sei" ? getExperienceBySlug(lead.experience) : undefined,
    lead.travelProduct ? getTravelProductBySlug(lead.travelProduct) : undefined,
    getLeadInterest(lead),
    getLeadEvents(lead.id).catch(() => []),
  ]);
  const destinationsLabel = lead.destinations.includes("nao-sei")
    ? [...destinationNames, "Ainda não sabe"].join(", ")
    : destinationNames.join(", ");
  const experienceName =
    lead.experience && lead.experience !== "nao-sei"
      ? (experienceDetail?.name ?? lead.experience)
      : lead.experience === "nao-sei"
        ? "Ainda não sabe"
        : undefined;
  const productName = lead.travelProduct ? (productDetail?.title ?? lead.travelProduct) : undefined;

  return (
    <div className="flex flex-col gap-8">
      <AdminPageHeader
        title={lead.name}
        description={`${interest} · Recebido em ${new Date(lead.createdAt).toLocaleString("pt-BR")}`}
        actions={
          <>
            {lead.priority && (
              <span className="inline-flex items-center gap-1.5 border border-magenta/30 bg-magenta/10 px-3 py-2 text-xs font-medium text-magenta-dark uppercase">
                <Star className="size-3.5" aria-hidden fill="currentColor" />
                Prioritário
              </span>
            )}
            <a
              href={buildWhatsAppLink(lead.whatsapp, lead.name)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 border border-ink/15 bg-ivory px-4 py-2.5 text-xs font-medium tracking-wide text-ink uppercase transition-colors duration-200 hover:border-ink/30"
            >
              <MessageCircle className="size-3.5" aria-hidden />
              WhatsApp
            </a>
            <a
              href={`mailto:${lead.email}`}
              className="inline-flex items-center gap-1.5 border border-ink/15 bg-ivory px-4 py-2.5 text-xs font-medium tracking-wide text-ink uppercase transition-colors duration-200 hover:border-ink/30"
            >
              <Mail className="size-3.5" aria-hidden />
              E-mail
            </a>
          </>
        }
      />

      <Link href="/admin/leads" className="-mt-4 text-xs font-medium tracking-wide text-stone uppercase hover:text-ink">
        ← Voltar para leads
      </Link>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="flex flex-col gap-8 lg:col-span-2">
          <section className="border border-ink/10 bg-ivory p-6">
            <h2 className="font-serif text-lg text-ink">Contato</h2>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
              <Field label="Nome" value={lead.name} />
              <Field
                label="WhatsApp"
                value={
                  <a href={buildWhatsAppLink(lead.whatsapp, lead.name)} target="_blank" rel="noreferrer" className="text-magenta hover:underline">
                    {lead.whatsapp}
                  </a>
                }
              />
              <Field
                label="E-mail"
                value={
                  <a href={`mailto:${lead.email}`} className="text-magenta hover:underline">
                    {lead.email}
                  </a>
                }
              />
              <Field label="Cidade" value={lead.city} />
              <Field label="Preferência de contato" value={lead.contactPreference} />
            </div>
          </section>

          <section className="border border-ink/10 bg-ivory p-6">
            <h2 className="font-serif text-lg text-ink">Viagem</h2>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
              <Field label="Destinos" value={destinationsLabel || undefined} />
              <Field label="Experiência" value={experienceName} />
              <Field label="Produto" value={productName} />
              <Field label="Mês" value={lead.month} />
              <Field label="Ano" value={lead.year} />
              <Field label="Datas aproximadas" value={lead.approximateDates} />
              <Field label="Duração" value={lead.duration} />
              <Field label="Adultos" value={lead.adults} />
              <Field label="Crianças" value={lead.children} />
              <Field label="Idade das crianças" value={lead.childrenAges} />
              <Field label="Faixa de investimento" value={lead.budgetTier} />
            </div>
            {lead.notes && (
              <div className="mt-4 border-t border-ink/10 pt-4">
                <p className="text-[0.65rem] font-medium tracking-wide text-stone uppercase">Observações do cliente</p>
                <p className="mt-1 text-sm whitespace-pre-line text-ink">{lead.notes}</p>
              </div>
            )}
          </section>

          <section className="border border-ink/10 bg-ivory p-6">
            <h2 className="font-serif text-lg text-ink">Aquisição</h2>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
              <Field label="Origem" value={lead.acquisitionSource} />
              <Field label="Página de origem" value={lead.sourcePath} />
              <Field label="UTM Source" value={lead.utmSource} />
              <Field label="UTM Medium" value={lead.utmMedium} />
              <Field label="UTM Campaign" value={lead.utmCampaign} />
              <Field label="UTM Content" value={lead.utmContent} />
              <Field label="UTM Term" value={lead.utmTerm} />
            </div>
          </section>

          <section className="border border-ink/10 bg-ivory p-6">
            <h2 className="font-serif text-lg text-ink">Histórico</h2>
            {events.length === 0 ? (
              <p className="mt-3 text-sm text-stone">Sem registros ainda.</p>
            ) : (
              <ol className="mt-4 flex flex-col gap-3 border-l border-ink/10 pl-4">
                {events.map((event) => (
                  <li key={event.id} className="relative">
                    <span aria-hidden className="absolute top-1.5 -left-[18.5px] size-2 rounded-full bg-ink/20" />
                    <p className="text-sm text-ink">{LEAD_EVENT_LABELS[event.type]}</p>
                    {event.detail && <p className="text-sm text-stone">{event.detail}</p>}
                    <p className="text-xs text-stone/85">{new Date(event.createdAt).toLocaleString("pt-BR")}</p>
                  </li>
                ))}
              </ol>
            )}
          </section>
        </div>

        <div className="lg:col-span-1">
          <section className="border border-ink/10 bg-ivory p-6">
            <h2 className="font-serif text-lg text-ink">Status</h2>
            <p className="mt-1 text-xs text-stone">
              Atualizado em {new Date(lead.updatedAt).toLocaleString("pt-BR")}
            </p>
            <div className="mt-4">
              <LeadStatusForm
                leadId={lead.id}
                currentStatus={lead.status}
                currentInternalNotes={lead.internalNotes}
                currentFollowUpAt={lead.followUpAt}
                currentNextAction={lead.nextAction}
                currentPriority={lead.priority}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
