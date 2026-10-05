import { Container } from "@/components/ui/container";
import { EditorialHeading } from "@/components/ui/editorial-heading";
import { Reveal } from "@/components/ui/reveal";
import type { ExperienceMonthlyPick } from "@/types";

const MONTH_LABELS = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];

export function MonthlyPicks({ id, picks }: { id: string; picks: ExperienceMonthlyPick[] }) {
  if (picks.length === 0) return null;

  return (
    <section id={id} className="scroll-mt-28 bg-ivory py-14 md:scroll-mt-32 md:py-20">
      <Container>
        <Reveal>
          <EditorialHeading as="h2" size="md">
            Onde ir por mês
          </EditorialHeading>
        </Reveal>

        <div className="mt-9 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {picks.map((pick) => (
            <div key={pick.month} className="flex items-start gap-4 border-t border-ink/10 pt-4">
              <span className="shrink-0 text-xs font-medium tracking-[0.1em] text-magenta-dark">
                {MONTH_LABELS[pick.month - 1]}
              </span>
              <div>
                <h3 className="font-serif text-lg text-ink">{pick.destinationName}</h3>
                {pick.note && <p className="mt-1 text-sm leading-relaxed text-stone">{pick.note}</p>}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
