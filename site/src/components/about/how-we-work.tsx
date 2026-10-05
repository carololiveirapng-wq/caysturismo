import { Container } from "@/components/ui/container";
import { EditorialHeading } from "@/components/ui/editorial-heading";
import { Reveal } from "@/components/ui/reveal";
import type { ProcessStep } from "@/types";

/** Reaproveita os mesmos passos da Home (dado único, sem duplicar), com um layout diferente do carrossel da Home. */
export function HowWeWork({ steps }: { steps: ProcessStep[] }) {
  return (
    <section className="bg-ivory py-14 md:py-20">
      <Container narrow>
        <Reveal>
          <EditorialHeading as="h2" size="md">
            Como trabalhamos
          </EditorialHeading>
        </Reveal>

        <div className="mt-9 divide-y divide-ink/10 border-t border-ink/10">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col gap-2 py-5 sm:flex-row sm:items-baseline sm:gap-8">
              <span className="shrink-0 font-serif text-2xl text-magenta-dark sm:w-16">{step.number}</span>
              <div>
                <h3 className="font-serif text-lg text-ink">{step.title}</h3>
                <p className="mt-1 text-sm text-stone">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
