import Link from "next/link";
import { Container } from "@/components/ui/container";
import { EditorialHeading } from "@/components/ui/editorial-heading";
import { ImageReveal } from "@/components/ui/image-reveal";
import { Reveal } from "@/components/ui/reveal";
import { travelProductHref } from "@/lib/links";
import type { ExperienceJourneyRef } from "@/types";

export function ExperienceJourneys({ id, items }: { id: string; items: ExperienceJourneyRef[] }) {
  if (items.length === 0) return null;

  return (
    <section id={id} className="scroll-mt-28 bg-ivory py-14 md:scroll-mt-32 md:py-20">
      <Container>
        <Reveal>
          <EditorialHeading as="h2" size="md">
            Viagens relacionadas
          </EditorialHeading>
        </Reveal>

        <div className="mt-9 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((journey) => (
            <Link key={journey.slug} href={travelProductHref(journey.slug)} className="group/card block">
              <ImageReveal
                src={journey.image.src}
                alt={journey.image.alt}
                width={640}
                height={800}
                sizes="(min-width: 1024px) 30vw, 85vw"
                containerClassName="aspect-[4/5]"
              />
              <div className="mt-4 border-t border-ink/10 pt-4 transition-colors duration-300 group-hover/card:border-magenta/40">
                <h3 className="font-serif text-xl text-ink">{journey.title}</h3>
                {journey.subtitle && <p className="mt-1 text-sm text-stone">{journey.subtitle}</p>}
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
