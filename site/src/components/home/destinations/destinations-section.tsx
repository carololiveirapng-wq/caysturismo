import { Container } from "@/components/ui/container";
import { EditorialHeading } from "@/components/ui/editorial-heading";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { CarouselCircleNav } from "@/components/ui/carousel-circle-nav";
import { DestinationCard } from "./destination-card";
import type { HomeFeaturedDestination } from "@/types";

export function DestinationsSection({ destinations }: { destinations: HomeFeaturedDestination[] }) {
  if (destinations.length === 0) return null;

  return (
    <section className="overflow-hidden bg-ivory py-20 md:py-28">
      <Container className="flex flex-col items-center text-center">
        <EditorialHeading as="h2" size="lg" className="max-w-2xl">
          Para onde sua próxima história pode levar você?
        </EditorialHeading>

        <div className="relative mt-10 w-full md:mt-12">
          {destinations.length > 3 ? (
            <Carousel opts={{ align: "start", loop: false }}>
              <CarouselContent className="-ml-4">
                {destinations.map((destination) => (
                  <CarouselItem
                    key={destination.slug}
                    className="basis-[64%] pl-4 sm:basis-[42%] md:basis-[30%] lg:basis-[264px]"
                  >
                    <DestinationCard destination={destination} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselCircleNav tone="light" />
            </Carousel>
          ) : (
            <div className="no-scrollbar flex justify-center gap-5 overflow-x-auto">
              {destinations.map((destination) => (
                <div key={destination.slug} className="w-[78%] shrink-0 sm:w-[42%] lg:w-[264px]">
                  <DestinationCard destination={destination} />
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
