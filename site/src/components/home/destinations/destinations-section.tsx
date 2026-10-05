"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";
import { EditorialHeading } from "@/components/ui/editorial-heading";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { CarouselCircleNav } from "@/components/ui/carousel-circle-nav";
import { DestinationCard } from "./destination-card";
import { cn } from "@/lib/utils";
import type { HomeFeaturedDestination, HomeDestinationCollection } from "@/types";

function DestinationsList({ destinations }: { destinations: HomeFeaturedDestination[] }) {
  if (destinations.length > 3) {
    return (
      <Carousel aria-label="Destinos em destaque" opts={{ align: "start", loop: false }}>
        <CarouselContent className="-ml-4">
          {destinations.map((destination) => (
            <CarouselItem key={destination.slug} className="basis-[64%] pl-4 sm:basis-[42%] md:basis-[30%] lg:basis-[264px]">
              <DestinationCard destination={destination} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselCircleNav tone="light" />
      </Carousel>
    );
  }
  return (
    <div className="no-scrollbar flex justify-center gap-5 overflow-x-auto">
      {destinations.map((destination) => (
        <div key={destination.slug} className="w-[78%] shrink-0 sm:w-[42%] lg:w-[264px]">
          <DestinationCard destination={destination} />
        </div>
      ))}
    </div>
  );
}

export function DestinationsSection({
  destinations,
  collections,
}: {
  destinations: HomeFeaturedDestination[];
  collections: HomeDestinationCollection[];
}) {
  // Abas só aparecem quando existem 2+ coleções reais cadastradas no Sanity
  // — sem isso, mantém a lista única (nunca inventamos nome de coleção).
  const hasCollections = collections.length > 1;
  const [activeTab, setActiveTab] = useState(0);

  const activeList = hasCollections ? (collections[activeTab]?.destinations ?? []) : destinations;
  if (activeList.length === 0 && !hasCollections) return null;

  return (
    <section className="overflow-hidden bg-ivory py-20 md:py-28">
      <Container className="flex flex-col items-center text-center">
        <EditorialHeading as="h2" size="lg" className="max-w-2xl">
          Para onde sua próxima história pode levar você?
        </EditorialHeading>

        {hasCollections && (
          <div role="tablist" aria-label="Coleções de destinos" className="no-scrollbar mt-9 flex max-w-full gap-8 overflow-x-auto border-b border-line md:mt-10">
            {collections.map((collection, i) => (
              <button
                key={collection.title}
                role="tab"
                aria-selected={i === activeTab}
                tabIndex={i === activeTab ? 0 : -1}
                onClick={() => setActiveTab(i)}
                className={cn(
                  "relative shrink-0 pb-4 text-sm font-medium tracking-wide whitespace-nowrap transition-colors duration-300",
                  i === activeTab ? "text-ink after:absolute after:inset-x-0 after:-bottom-px after:h-px after:bg-magenta" : "text-stone hover:text-ink",
                )}
              >
                {collection.title}
              </button>
            ))}
          </div>
        )}

        <div className="relative mt-10 w-full md:mt-12">
          <DestinationsList destinations={activeList} />
        </div>
      </Container>
    </section>
  );
}
