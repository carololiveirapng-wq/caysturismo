"use client";

import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Container } from "@/components/ui/container";
import { EditorialHeading } from "@/components/ui/editorial-heading";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { CarouselCircleNav } from "@/components/ui/carousel-circle-nav";
import { DestinationCard } from "./destination-card";
import { destinations as allDestinations } from "@/data/home";
import { getActiveOrderedItems } from "@/lib/content";
import type { DestinationCollection } from "@/types";
import { cn } from "@/lib/utils";

const TABS: { key: DestinationCollection; label: string }[] = [
  { key: "featured", label: "Destinos em Destaque" },
  { key: "special", label: "Viagens Especiais" },
  { key: "cruise", label: "Cruzeiros & Expedições" },
  { key: "new", label: "Novidades" },
];

export function DestinationsSection() {
  const active = getActiveOrderedItems(allDestinations);
  const [activeTab, setActiveTab] = useState<DestinationCollection>("featured");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const itemsByTab = useMemo(
    () =>
      Object.fromEntries(
        TABS.map((tab) => [tab.key, active.filter((d) => d.collection === tab.key)]),
      ) as Record<DestinationCollection, typeof active>,
    [active],
  );

  const visibleTabs = TABS.filter((tab) => itemsByTab[tab.key].length > 0);
  if (visibleTabs.length === 0) return null;

  const currentItems = itemsByTab[activeTab] ?? [];

  const selectTab = (index: number) => {
    const tab = visibleTabs[index];
    if (!tab) return;
    setActiveTab(tab.key);
    tabRefs.current[index]?.focus();
  };

  const onTabKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      selectTab((index + 1) % visibleTabs.length);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      selectTab((index - 1 + visibleTabs.length) % visibleTabs.length);
    } else if (event.key === "Home") {
      event.preventDefault();
      selectTab(0);
    } else if (event.key === "End") {
      event.preventDefault();
      selectTab(visibleTabs.length - 1);
    }
  };

  return (
    <section className="overflow-hidden bg-ivory py-20 md:py-28">
      <Container className="flex flex-col items-center text-center">
        <EditorialHeading as="h2" size="lg" className="max-w-2xl">
          Para onde sua próxima história pode levar você?
        </EditorialHeading>

        <div
          role="tablist"
          aria-label="Coleções de destinos"
          className="no-scrollbar mt-9 flex max-w-full gap-8 overflow-x-auto border-b border-line md:mt-10"
        >
          {visibleTabs.map((tab, i) => {
            const selected = tab.key === activeTab;
            return (
              <button
                key={tab.key}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                id={`destinations-tab-${tab.key}`}
                aria-selected={selected}
                aria-controls={`destinations-panel-${tab.key}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => selectTab(i)}
                onKeyDown={(e) => onTabKeyDown(e, i)}
                className={cn(
                  "relative shrink-0 pb-4 text-sm font-medium tracking-wide whitespace-nowrap transition-colors duration-300",
                  selected ? "text-ink" : "text-stone hover:text-ink",
                )}
              >
                {tab.label}
                {selected && (
                  <motion.span
                    layoutId="destinations-tab-underline"
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-x-0 -bottom-px h-px bg-magenta"
                  />
                )}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            id={`destinations-panel-${activeTab}`}
            role="tabpanel"
            aria-labelledby={`destinations-tab-${activeTab}`}
            tabIndex={0}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative mt-10 w-full text-left md:mt-12"
          >
            {currentItems.length > 3 ? (
              // Mais itens do que cabem de uma vez — carrossel de verdade, com peek e setas.
              <Carousel opts={{ align: "start", loop: false }}>
                <CarouselContent className="-ml-4">
                  {currentItems.map((destination) => (
                    <CarouselItem
                      key={destination.id}
                      className="basis-[64%] pl-4 sm:basis-[42%] md:basis-[30%] lg:basis-[264px]"
                    >
                      <DestinationCard destination={destination} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselCircleNav tone="light" />
              </Carousel>
            ) : (
              // Cabem todos de uma vez — fileira estática centralizada, sem carrossel/setas à toa.
              <div className="no-scrollbar flex justify-center gap-5 overflow-x-auto">
                {currentItems.map((destination) => (
                  <div key={destination.id} className="w-[78%] shrink-0 sm:w-[42%] lg:w-[264px]">
                    <DestinationCard destination={destination} />
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  );
}
