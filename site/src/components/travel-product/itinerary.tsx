import { Container } from "@/components/ui/container";
import { EditorialHeading } from "@/components/ui/editorial-heading";
import { Reveal } from "@/components/ui/reveal";
import type { ItineraryStop } from "@/types";

/**
 * `<details>`/`<summary>` nativos — funcionam como accordion (pedido no
 * mobile) sem JS nem dependência nova, e continuam perfeitamente
 * navegáveis por teclado. O primeiro item abre por padrão.
 */
export function ProductItinerary({ id, stops }: { id: string; stops: ItineraryStop[] }) {
  if (stops.length === 0) return null;

  return (
    <section id={id} className="scroll-mt-28 bg-ivory py-14 md:scroll-mt-32 md:py-20">
      <Container narrow>
        <Reveal>
          <EditorialHeading as="h2" size="md">
            Roteiro
          </EditorialHeading>
        </Reveal>

        <div className="mt-8 divide-y divide-ink/10 border-t border-ink/10">
          {stops.map((stop, i) => (
            <details key={`${stop.label}-${stop.place}`} open={i === 0} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 marker:content-none">
                <span className="flex items-baseline gap-4">
                  <span className="shrink-0 text-xs tracking-[0.1em] text-stone/85 uppercase tabular-nums">
                    {stop.label}
                  </span>
                  <span className="font-serif text-lg text-ink md:text-xl">{stop.place}</span>
                  {stop.tag && (
                    <span className="hidden text-xs font-medium tracking-wide text-magenta uppercase sm:inline">
                      {stop.tag}
                    </span>
                  )}
                </span>
                <span
                  aria-hidden
                  className="shrink-0 text-lg text-stone transition-transform duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              {stop.text && (
                <p className="mt-2.5 max-w-xl pl-0 text-sm leading-relaxed text-stone sm:pl-[4.5rem]">{stop.text}</p>
              )}
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
