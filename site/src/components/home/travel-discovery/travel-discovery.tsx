"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { EditorialHeading } from "@/components/ui/editorial-heading";
import { DestinationSelector } from "./destination-selector";
import { PeriodSelector, type PeriodValue } from "./period-selector";
import { ExperienceSelector } from "./experience-selector";
import { unknownDestination } from "@/data/travel-discovery";
import type { DiscoveryDestination, DiscoveryExperience, DiscoveryRegion, HomeContent } from "@/types";

type PanelKey = "destination" | "period" | "experience" | null;

interface TravelDiscoveryProps {
  content?: HomeContent["travelDiscovery"];
  regions: DiscoveryRegion[];
  experiences: DiscoveryExperience[];
}

export function TravelDiscovery({ content, regions, experiences }: TravelDiscoveryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activePanel, setActivePanel] = useState<PanelKey>(null);
  const [destination, setDestination] = useState<DiscoveryDestination | null>(null);
  const [period, setPeriod] = useState<PeriodValue | null>(null);
  const [experience, setExperience] = useState<DiscoveryExperience | null>(null);

  const togglePanel = (key: Exclude<PanelKey, null>) =>
    setActivePanel((current) => (current === key ? null : key));
  const closePanel = () => setActivePanel(null);

  useEffect(() => {
    if (!activePanel) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePanel();
    };
    const onPointerDown = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        closePanel();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [activePanel]);

  /**
   * "Explorar viagens" leva pro catálogo real (/viagens), já filtrado pelo
   * que foi escolhido aqui — em vez de mostrar resultados mockados nesta
   * seção (sem viagem real por trás, viravam link morto em /jornadas/*).
   * `/viagens` já tem os mesmos filtros e sabe lidar com zero resultado
   * (mostra a oferta de roteiro sob medida), então não precisa duplicar
   * essa lógica aqui.
   */
  const exploreHref = useMemo(() => {
    const params = new URLSearchParams();
    if (destination && destination.slug !== unknownDestination.slug) {
      params.set("destino", destination.slug);
    }
    if (experience) {
      params.set("experiencia", experience.slug);
    }
    if (period?.type === "month") {
      params.set("periodo", String(period.month.year));
    }
    const query = params.toString();
    return query ? `/viagens?${query}` : "/viagens";
  }, [destination, experience, period]);

  return (
    <section className="border-b border-line bg-ivory py-14 md:py-20">
      <Container>
        <div className="max-w-xl">
          <SectionLabel>Curadoria Cays</SectionLabel>
          <EditorialHeading as="h2" size="md" className="mt-4">
            {content?.title || "Por onde começamos?"}
          </EditorialHeading>
          {content?.text && <p className="mt-3 text-sm leading-relaxed text-stone">{content.text}</p>}
        </div>

        <div ref={containerRef} className="relative mt-8 md:mt-10">
          <div className="flex flex-col divide-y divide-ink/10 border border-ink/15 bg-ivory lg:flex-row lg:divide-x lg:divide-y-0">
            <DestinationSelector
              isOpen={activePanel === "destination"}
              onToggle={() => togglePanel("destination")}
              onClose={closePanel}
              value={destination}
              onChange={setDestination}
              regions={regions}
            />
            <PeriodSelector
              isOpen={activePanel === "period"}
              onToggle={() => togglePanel("period")}
              onClose={closePanel}
              value={period}
              onChange={setPeriod}
            />
            <ExperienceSelector
              isOpen={activePanel === "experience"}
              onToggle={() => togglePanel("experience")}
              onClose={closePanel}
              value={experience}
              onChange={setExperience}
              emphasize={destination?.slug === unknownDestination.slug}
              experiences={experiences}
            />
            <Link
              href={exploreHref}
              onClick={closePanel}
              className="group/explore flex items-center justify-center gap-3 bg-ink px-8 py-5 text-sm font-medium tracking-[0.1em] text-ivory uppercase transition-colors duration-300 hover:bg-graphite md:py-6"
            >
              Explorar viagens
              <span
                aria-hidden
                className="transition-transform duration-300 ease-[var(--ease-editorial)] group-hover/explore:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        </div>

        <AnimatePresence>
          {activePanel && (
            <motion.div
              aria-hidden
              onClick={closePanel}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-ink/40 md:hidden"
            />
          )}
        </AnimatePresence>
      </Container>
    </section>
  );
}
