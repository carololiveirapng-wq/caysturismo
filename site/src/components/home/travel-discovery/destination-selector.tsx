"use client";

import { AnimatePresence } from "motion/react";
import { SelectorTrigger } from "./selector-trigger";
import { DiscoveryPanel } from "./discovery-panel";
import { travelRegions, unknownDestination } from "@/data/travel-discovery";
import type { DiscoveryDestination } from "@/types";
import { cn } from "@/lib/utils";

interface DestinationSelectorProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  value: DiscoveryDestination | null;
  onChange: (destination: DiscoveryDestination | null) => void;
}

const TRIGGER_ID = "discovery-destination-trigger";
const PANEL_ID = "discovery-destination-panel";

export function DestinationSelector({
  isOpen,
  onToggle,
  onClose,
  value,
  onChange,
}: DestinationSelectorProps) {
  const select = (destination: DiscoveryDestination) => {
    onChange(destination);
    onClose();
  };

  return (
    <div className="flex-1">
      <SelectorTrigger
        id={TRIGGER_ID}
        panelId={PANEL_ID}
        label="Para onde?"
        placeholder="Explore um destino"
        value={value?.name}
        isOpen={isOpen}
        onToggle={onToggle}
        onClear={value ? () => onChange(null) : undefined}
      />

      <AnimatePresence>
        {isOpen && (
          <DiscoveryPanel id={PANEL_ID} labelledBy={TRIGGER_ID}>
            <button
              type="button"
              onClick={() => select(unknownDestination)}
              className={cn(
                "mb-7 flex w-full items-center justify-between gap-4 border-b border-ink/10 pb-5 text-left transition-colors hover:text-magenta",
                value?.slug === unknownDestination.slug ? "text-magenta" : "text-ink",
              )}
            >
              <span className="font-serif text-lg md:text-xl">{unknownDestination.name}</span>
              <span
                aria-hidden
                className="text-[0.65rem] font-medium tracking-[0.15em] text-stone uppercase"
              >
                Inspire-me
              </span>
            </button>

            <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3 lg:grid-cols-6">
              {travelRegions.map((region) => (
                <div key={region.slug}>
                  <p className="text-[0.65rem] font-medium tracking-[0.18em] text-stone uppercase">
                    {region.name}
                  </p>
                  <ul className="mt-3 space-y-2.5">
                    {region.destinations.map((destination) => (
                      <li key={destination.slug}>
                        <button
                          type="button"
                          onClick={() => select(destination)}
                          className={cn(
                            "text-left text-sm transition-colors hover:text-magenta",
                            value?.slug === destination.slug ? "text-magenta" : "text-ink/80",
                          )}
                        >
                          {destination.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </DiscoveryPanel>
        )}
      </AnimatePresence>
    </div>
  );
}
