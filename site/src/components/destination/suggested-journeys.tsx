import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { EditorialHeading } from "@/components/ui/editorial-heading";
import { LinkArrow } from "@/components/ui/link-arrow";
import { ImageReveal } from "@/components/ui/image-reveal";
import { Reveal } from "@/components/ui/reveal";
import { travelProductHref } from "@/lib/links";
import type { DestinationJourney } from "@/types";

function JourneyCard({ journey }: { journey: DestinationJourney }) {
  return (
    <Link href={travelProductHref(journey.slug)} className="group/card block">
      <ImageReveal
        src={journey.image.src}
        alt={journey.image.alt}
        width={640}
        height={800}
        sizes="(min-width: 1024px) 30vw, 85vw"
        containerClassName="aspect-[4/5]"
      />
      <div className="mt-4 border-t border-ink/10 pt-4 transition-colors duration-300 group-hover/card:border-magenta/40">
        <h3 className="font-serif text-2xl text-ink">{journey.title}</h3>
        {journey.subtitle && <p className="mt-1 text-sm text-stone">{journey.subtitle}</p>}
        {(journey.typeLabel || journey.durationLabel) && (
          <p className="mt-2.5 text-xs tracking-wide text-stone uppercase">
            {[journey.typeLabel, journey.durationLabel].filter(Boolean).join(" · ")}
          </p>
        )}
        {journey.text && <p className="mt-3 text-sm leading-relaxed text-stone">{journey.text}</p>}

        <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium tracking-wide text-ink transition-colors duration-300 group-hover/card:text-magenta">
          Ver viagem
          <ArrowRight
            aria-hidden
            className="size-3.5 transition-transform duration-300 group-hover/card:translate-x-1"
          />
        </span>
      </div>
    </Link>
  );
}

export function SuggestedJourneys({
  id,
  journeys,
  heading = "Jornadas sugeridas",
}: {
  id: string;
  journeys: DestinationJourney[];
  heading?: string;
}) {
  if (journeys.length === 0) return null;

  return (
    <section id={id} className="scroll-mt-28 bg-sand py-14 md:scroll-mt-32 md:py-20">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal className="max-w-xl">
            <EditorialHeading as="h2" size="md">
              {heading}
            </EditorialHeading>
            <p className="mt-2.5 text-sm text-stone">
              Pontos de partida que podem ser ajustados ao seu ritmo.
            </p>
          </Reveal>
          <LinkArrow href="/viagens" className="shrink-0">
            Ver todas as viagens
          </LinkArrow>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {journeys.map((journey) => (
            <JourneyCard key={journey.slug} journey={journey} />
          ))}
        </div>
      </Container>
    </section>
  );
}
