import { Container } from "@/components/ui/container";
import { EditorialHeading } from "@/components/ui/editorial-heading";
import { Reveal } from "@/components/ui/reveal";
import type { ExperienceStep } from "@/types";

export function HowItWorks({ id, steps }: { id: string; steps: ExperienceStep[] }) {
  if (steps.length === 0) return null;

  return (
    <section id={id} className="scroll-mt-28 bg-sand py-14 md:scroll-mt-32 md:py-20">
      <Container>
        <Reveal>
          <EditorialHeading as="h2" size="md">
            Como funciona
          </EditorialHeading>
        </Reveal>

        <div className="mt-9 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.06} className="border-t border-ink/10 pt-5">
              <span className="text-xs text-stone tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-1.5 font-serif text-lg text-ink md:text-xl">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-stone">{step.text}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
