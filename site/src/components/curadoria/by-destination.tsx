import Link from "next/link";
import { Container } from "@/components/ui/container";
import { EditorialHeading } from "@/components/ui/editorial-heading";
import { ImageReveal } from "@/components/ui/image-reveal";
import { Reveal } from "@/components/ui/reveal";
import { destinationHref } from "@/lib/links";
import type { HubSpotlightItem } from "@/types";

export function ByDestination({ destinations }: { destinations: HubSpotlightItem[] }) {
  if (destinations.length === 0) return null;

  return (
    <section className="bg-sand py-14 md:py-20">
      <Container>
        <Reveal>
          <EditorialHeading as="h2" size="md">
            Por destino
          </EditorialHeading>
        </Reveal>

        <div className="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {destinations.map((item) => (
            <Link key={item.slug} href={destinationHref(item.slug)} className="group/card relative block">
              <div className="relative aspect-[4/5] overflow-hidden">
                <ImageReveal
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="(min-width: 640px) 22vw, 45vw"
                  containerClassName="absolute inset-0"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/65 via-ink/0 to-transparent" />
                <h3 className="absolute inset-x-0 bottom-0 p-3.5 font-serif text-lg text-ivory">{item.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
