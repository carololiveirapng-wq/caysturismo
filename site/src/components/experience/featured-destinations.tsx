import Link from "next/link";
import { Container } from "@/components/ui/container";
import { EditorialHeading } from "@/components/ui/editorial-heading";
import { ImageReveal } from "@/components/ui/image-reveal";
import { Reveal } from "@/components/ui/reveal";
import { destinationHref } from "@/lib/links";
import type { ExperienceDestinationRef } from "@/types";

export function ExperienceFeaturedDestinations({ id, items }: { id: string; items: ExperienceDestinationRef[] }) {
  if (items.length === 0) return null;

  return (
    <section id={id} className="scroll-mt-28 bg-sand py-14 md:scroll-mt-32 md:py-20">
      <Container>
        <Reveal>
          <EditorialHeading as="h2" size="md">
            Destinos em destaque
          </EditorialHeading>
        </Reveal>

        <div className="mt-9 grid grid-cols-2 gap-6 sm:grid-cols-3">
          {items.map((place) => (
            <Link key={place.slug} href={destinationHref(place.slug)} className="group/card relative block">
              <div className="relative aspect-[4/5] overflow-hidden">
                <ImageReveal
                  src={place.image.src}
                  alt={place.image.alt}
                  fill
                  sizes="(min-width: 640px) 30vw, 45vw"
                  containerClassName="absolute inset-0"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h3 className="font-serif text-lg text-ivory">{place.name}</h3>
                  {place.region && <p className="mt-0.5 text-xs tracking-wide text-ivory/75 uppercase">{place.region}</p>}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
