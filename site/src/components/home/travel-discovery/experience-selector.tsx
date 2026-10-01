"use client";

import { AnimatePresence } from "motion/react";
import { SelectorTrigger } from "./selector-trigger";
import { DiscoveryPanel } from "./discovery-panel";
import type { DiscoveryExperience } from "@/types";
import { cn } from "@/lib/utils";

interface ExperienceSelectorProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  value: DiscoveryExperience | null;
  onChange: (experience: DiscoveryExperience | null) => void;
  /** true quando "Não sei para onde ir" está selecionado — este campo passa a liderar a busca. */
  emphasize?: boolean;
  experiences: DiscoveryExperience[];
}

const TRIGGER_ID = "discovery-experience-trigger";
const PANEL_ID = "discovery-experience-panel";

export function ExperienceSelector({
  isOpen,
  onToggle,
  onClose,
  value,
  onChange,
  emphasize,
  experiences,
}: ExperienceSelectorProps) {
  const select = (experience: DiscoveryExperience) => {
    onChange(experience);
    onClose();
  };

  return (
    <div className="relative flex-1">
      <SelectorTrigger
        id={TRIGGER_ID}
        panelId={PANEL_ID}
        label="Como quer viajar?"
        placeholder="Escolha uma experiência"
        value={value?.name}
        isOpen={isOpen}
        onToggle={onToggle}
        onClear={value ? () => onChange(null) : undefined}
      />

      <AnimatePresence>
        {isOpen && (
          <DiscoveryPanel
            id={PANEL_ID}
            labelledBy={TRIGGER_ID}
            align="right"
            widthClassName="md:w-[30rem]"
          >
            {emphasize && (
              <p className="mb-6 max-w-sm font-serif text-lg text-ink">
                Que tipo de viagem você procura?
              </p>
            )}
            <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
              {experiences.map((experience, i) => (
                <button
                  key={experience.slug}
                  type="button"
                  onClick={() => select(experience)}
                  className={cn(
                    "flex items-baseline gap-3 border-b border-ink/10 pb-3 text-left transition-colors hover:text-magenta",
                    value?.slug === experience.slug ? "text-magenta" : "text-ink/85",
                  )}
                >
                  <span className="text-xs text-stone/70 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[0.95rem]">{experience.name}</span>
                </button>
              ))}
            </div>
          </DiscoveryPanel>
        )}
      </AnimatePresence>
    </div>
  );
}
