"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Container } from "@/components/ui/container";
import { ContinentGrid } from "./continent-grid";
import { AZList } from "./az-list";
import { cn } from "@/lib/utils";

const TABS = [
  { key: "continente", label: "Por continente" },
  { key: "az", label: "A–Z" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

export function DestinosTabs() {
  const [activeTab, setActiveTab] = useState<TabKey>("continente");
  const [continentFilter, setContinentFilter] = useState<string | null>(null);

  const selectContinent = (slug: string) => {
    setContinentFilter(slug);
    setActiveTab("az");
  };

  return (
    <section className="bg-ivory py-14 md:py-20">
      <Container>
        <div role="tablist" aria-label="Explorar destinos" className="flex gap-8 border-b border-line">
          {TABS.map((tab) => {
            const selected = tab.key === activeTab;
            return (
              <button
                key={tab.key}
                role="tab"
                aria-selected={selected}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  "relative pb-4 text-sm font-medium tracking-wide transition-colors duration-300",
                  selected ? "text-ink" : "text-stone hover:text-ink",
                )}
              >
                {tab.label}
                {selected && (
                  <motion.span
                    layoutId="destinos-hub-tab-underline"
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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 md:mt-10"
          >
            {activeTab === "continente" ? (
              <ContinentGrid onSelect={selectContinent} />
            ) : (
              <AZList filterContinent={continentFilter} onClearFilter={() => setContinentFilter(null)} />
            )}
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  );
}
