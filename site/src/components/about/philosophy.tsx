import { Container } from "@/components/ui/container";
import { EditorialHeading } from "@/components/ui/editorial-heading";
import { Reveal } from "@/components/ui/reveal";

export function Philosophy({ pillars }: { pillars: { title: string; text: string }[] }) {
  return (
    <section className="bg-sand py-14 md:py-20">
      <Container>
        <Reveal>
          <EditorialHeading as="h2" size="md">
            Como enxergamos viagem
          </EditorialHeading>
        </Reveal>

        <div className="mt-9 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 0.06} className="border-t border-ink/10 pt-5">
              <span className="text-xs text-stone/70 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-1.5 font-serif text-xl text-ink">{pillar.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-stone">{pillar.text}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
