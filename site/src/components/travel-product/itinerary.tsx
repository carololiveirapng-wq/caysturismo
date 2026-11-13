import { SplitSection } from "./split-section";
import type { ItineraryStop } from "@/types";

/**
 * `<details>`/`<summary>` nativos — funcionam como accordion (pedido no
 * mobile) sem JS nem dependência nova, e continuam perfeitamente
 * navegáveis por teclado. O primeiro item abre por padrão.
 */
export function ProductItinerary({ id, stops }: { id: string; stops: ItineraryStop[] }) {
  if (stops.length === 0) return null;

  return (
    <SplitSection id={id} title="Roteiro" note={`${stops.length} ${stops.length === 1 ? "parada" : "paradas"}, dia a dia. Toque em uma parada para ver os detalhes.`}>
      <div className="divide-y divide-ink/10 border-t border-ink/10">
        {stops.map((stop, i) => (
          <details key={`${stop.label}-${stop.place}`} open={i === 0} className="group py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 marker:content-none">
              <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="w-16 shrink-0 text-xs tracking-[0.1em] text-stone uppercase tabular-nums sm:w-20">{stop.label}</span>
                <span className="font-serif text-lg text-ink md:text-xl">{stop.place}</span>
                {stop.tag && <span className="text-xs font-medium tracking-wide text-magenta-dark uppercase">{stop.tag}</span>}
              </span>
              <span aria-hidden className="shrink-0 text-lg text-stone transition-transform duration-300 group-open:rotate-45">
                +
              </span>
            </summary>
            {stop.text && <p className="mt-2.5 max-w-xl pl-[4rem] text-sm leading-relaxed text-stone sm:pl-[5rem]">{stop.text}</p>}
          </details>
        ))}
      </div>
    </SplitSection>
  );
}
