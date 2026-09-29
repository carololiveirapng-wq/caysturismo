import { Container } from "@/components/ui/container";
import { EditorialHeading } from "@/components/ui/editorial-heading";
import { Reveal } from "@/components/ui/reveal";
import { DestinationCard } from "@/components/home/destinations/destination-card";
import { destinations } from "@/data/home";
import { getActiveOrderedItems } from "@/lib/content";

/** Reaproveita os mesmos dados da aba "Destaque" da Home — nada duplicado manualmente. */
export function FeaturedDestinations() {
  const items = getActiveOrderedItems(destinations)
    .filter((d) => d.collection === "featured")
    .slice(0, 4);
  if (items.length === 0) return null;

  return (
    <section className="bg-sand py-14 md:py-20">
      <Container>
        <Reveal>
          <EditorialHeading as="h2" size="md">
            Destinos em destaque
          </EditorialHeading>
        </Reveal>
        <div className="mt-9 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {items.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      </Container>
    </section>
  );
}
