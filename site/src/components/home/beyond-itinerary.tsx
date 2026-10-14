import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import type { HomeContent } from "@/types";

/** Faixa curta e discreta — reforça serviços confirmados sem competir com Destinos/Experiências. */
export function BeyondItinerary({ data }: { data?: HomeContent["beyondItinerary"] }) {
  if (!data || !data.items || data.items.length === 0) return null;

  return (
    <section className="border-y border-line bg-ivory py-10 md:py-12">
      <Container className="flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between md:gap-10">
        <div className="max-w-sm">
          <SectionLabel>{data.heading ?? "Além do roteiro"}</SectionLabel>
          {data.text && <p className="mt-2 text-sm leading-relaxed text-stone">{data.text}</p>}
        </div>
        <ul className="flex flex-wrap gap-x-8 gap-y-2.5">
          {data.items.map((item) => (
            <li key={item} className="text-sm font-medium tracking-wide text-ink">
              {item}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
