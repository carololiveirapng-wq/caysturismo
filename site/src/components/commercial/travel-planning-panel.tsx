import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export interface TravelPlanningItem {
  label: string;
  value: string;
}

export interface TravelPlanningPanelProps {
  title: string;
  subtitle: string;
  /** "Ideal para" — só renderiza quando há dado real por trás (ex.: títulos de `experiences[]` do destino). Nunca preenchido com tag genérica inventada. */
  tags?: string[];
  items: TravelPlanningItem[];
  ctaLabel: string;
  ctaHref: string;
  whatsappHref?: string;
}

/**
 * Painel comercial reutilizável — a mesma lógica de clareza da página de
 * Viagem (resumo + informações objetivas + "Sob consulta" + CTA), aplicada
 * em Destinos e Experiências. Sempre linguagem honesta e genérica quando
 * não há dado específico ("Sob medida", "Sob consulta") — nunca preço,
 * data ou disponibilidade inventados; cada chamador decide o que preencher
 * em `items`.
 */
export function TravelPlanningPanel({ title, subtitle, tags, items, ctaLabel, ctaHref, whatsappHref }: TravelPlanningPanelProps) {
  return (
    <section className="border-b border-line bg-sand py-14 md:py-20">
      <Container>
        <Reveal>
          <div className="border border-ink/10 bg-ivory p-7 md:p-10">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-6">
                <h2 className="font-serif text-2xl leading-tight text-ink md:text-3xl">{title}</h2>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-stone">{subtitle}</p>

                {tags && tags.length > 0 && (
                  <div className="mt-6">
                    <p className="text-[0.65rem] font-medium tracking-[0.18em] text-stone uppercase">Ideal para</p>
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <span key={tag} className="border border-ink/15 px-3 py-1.5 text-xs text-ink">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="lg:col-span-6">
                <dl className="divide-y divide-ink/10 border-t border-ink/10 text-sm lg:border-t-0">
                  {items.map((item) => (
                    <div key={item.label} className="flex items-center justify-between gap-4 py-3">
                      <dt className="shrink-0 text-stone">{item.label}</dt>
                      <dd className="text-right text-ink">{item.value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={ctaHref}
                    className="flex flex-1 items-center justify-center bg-ink px-6 py-3.5 text-sm font-medium tracking-wide text-ivory uppercase transition-colors duration-300 hover:bg-magenta-dark"
                  >
                    {ctaLabel}
                  </Link>
                  {whatsappHref && (
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noreferrer"
                      className="flex flex-1 items-center justify-center border border-ink/15 px-6 py-3.5 text-sm font-medium tracking-wide text-ink transition-colors duration-300 hover:border-ink/30"
                    >
                      Falar no WhatsApp
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
