import { Container } from "@/components/ui/container";
import { EditorialHeading } from "@/components/ui/editorial-heading";
import { Reveal } from "@/components/ui/reveal";
import type { TravelProductHighlight } from "@/types";

export function ProductHighlights({ id, items }: { id: string; items: TravelProductHighlight[] }) {
  if (items.length === 0) return null;

  return (
    <section id={id} className="scroll-mt-28 bg-sand py-14 md:scroll-mt-32 md:py-20">
      <Container>
        <Reveal>
          <EditorialHeading as="h2" size="md">
            Destaques
          </EditorialHeading>
        </Reveal>

        <div className="mt-9 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06} className="border-t border-ink/10 pt-5">
              <h3 className="font-serif text-lg text-ink md:text-xl">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-stone">{item.text}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
