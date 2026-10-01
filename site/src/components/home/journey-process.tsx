import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { EditorialHeading } from "@/components/ui/editorial-heading";
import { Reveal } from "@/components/ui/reveal";
import type { HomeContent } from "@/types";

export function JourneyProcess({ process }: { process: NonNullable<HomeContent["process"]> }) {
  const steps = process.steps ?? [];
  if (steps.length === 0) return null;

  return (
    <section className="bg-sand py-16 md:py-20">
      <Container>
        <Reveal className="max-w-md">
          <SectionLabel>Nosso jeito de viajar</SectionLabel>
          {process.heading && (
            <EditorialHeading as="h2" size="md" className="mt-4">
              {process.heading}
            </EditorialHeading>
          )}
          {process.intro && <p className="mt-3 text-sm leading-relaxed text-stone">{process.intro}</p>}
        </Reveal>

        <div className="relative mt-12 md:mt-14">
          <span
            aria-hidden
            className="absolute top-0 right-0 left-0 hidden h-px bg-ink/15 md:block"
          />

          <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-4">
            {steps.map((step, i) => (
              <Reveal
                key={step.number}
                delay={i * 0.08}
                className="relative border-l border-ink/15 pl-6 md:border-l-0 md:pl-0"
              >
                <span
                  aria-hidden
                  className="absolute top-0.5 -left-[3.5px] size-[7px] rounded-full bg-magenta md:top-[-2.5px] md:left-0"
                />
                <span className="mt-6 block font-serif text-xl text-ink md:mt-7">
                  {step.number}
                </span>
                <h3 className="mt-2 font-serif text-xl text-ink">{step.title}</h3>
                <p className="mt-1.5 max-w-[26ch] text-sm leading-relaxed text-stone">
                  {step.text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
