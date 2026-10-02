"use client";

import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { SelectorTrigger } from "./selector-trigger";
import { DiscoveryPanel } from "./discovery-panel";
import { discoveryYears, getMonthsForYear } from "@/data/travel-discovery";
import type { DiscoveryMonth } from "@/types";
import { cn } from "@/lib/utils";

export type PeriodValue =
  | { type: "any" }
  | { type: "beyond" }
  | { type: "month"; month: DiscoveryMonth }
  | { type: "dates"; from: string; to: string };

export function formatPeriodValue(value: PeriodValue | null): string | undefined {
  if (!value) return undefined;
  if (value.type === "any") return "Qualquer período";
  if (value.type === "beyond") return "Mais adiante";
  if (value.type === "month") return `${value.month.label} · ${value.month.year}`;
  if (!value.from && !value.to) return undefined;
  const short = (iso: string) => {
    if (!iso) return "—";
    const [, m, d] = iso.split("-");
    return `${d}/${m}`;
  };
  return `${short(value.from)} – ${short(value.to)}`;
}

interface PeriodSelectorProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  value: PeriodValue | null;
  onChange: (value: PeriodValue | null) => void;
}

const TRIGGER_ID = "discovery-period-trigger";
const PANEL_ID = "discovery-period-panel";

export function PeriodSelector({ isOpen, onToggle, onClose, value, onChange }: PeriodSelectorProps) {
  const [tab, setTab] = useState<"meses" | "datas">("meses");
  const [selectedYear, setSelectedYear] = useState(discoveryYears[0]);
  const [fromDraft, setFromDraft] = useState(value?.type === "dates" ? value.from : "");
  const [toDraft, setToDraft] = useState(value?.type === "dates" ? value.to : "");

  const months = getMonthsForYear(selectedYear);

  const selectMonth = (month: DiscoveryMonth) => {
    if (month.disabled) return;
    onChange({ type: "month", month });
    onClose();
  };

  const selectAny = () => {
    onChange({ type: "any" });
    onClose();
  };

  const selectBeyond = () => {
    onChange({ type: "beyond" });
    onClose();
  };

  const applyDates = () => {
    if (!fromDraft && !toDraft) return;
    onChange({ type: "dates", from: fromDraft, to: toDraft });
    onClose();
  };

  return (
    <div className="relative flex-1">
      <SelectorTrigger
        id={TRIGGER_ID}
        panelId={PANEL_ID}
        label="Quando?"
        placeholder="Quando você pretende viajar?"
        value={formatPeriodValue(value)}
        isOpen={isOpen}
        onToggle={onToggle}
        onClear={value ? () => onChange(null) : undefined}
      />

      <AnimatePresence>
        {isOpen && (
          <DiscoveryPanel
            id={PANEL_ID}
            labelledBy={TRIGGER_ID}
            align="left"
            widthClassName="md:w-[24rem]"
          >
            <div className="flex items-center gap-6 border-b border-ink/10 pb-4">
              {(["meses", "datas"] as const).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setTab(key)}
                  className={cn(
                    "text-xs font-medium tracking-[0.15em] uppercase transition-colors",
                    tab === key ? "text-ink" : "text-stone hover:text-ink",
                  )}
                >
                  {key === "meses" ? "Meses" : "Datas"}
                </button>
              ))}
            </div>

            {tab === "meses" ? (
              <div className="mt-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex gap-1" role="tablist" aria-label="Ano">
                    {discoveryYears.map((year) => (
                      <button
                        key={year}
                        type="button"
                        role="tab"
                        aria-selected={year === selectedYear}
                        onClick={() => setSelectedYear(year)}
                        className={cn(
                          "px-2.5 py-1 font-serif text-base transition-colors",
                          year === selectedYear ? "text-ink" : "text-stone/80 hover:text-ink",
                        )}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                  <button
                    type="button"
                    onClick={selectAny}
                    className={cn(
                      "text-xs font-medium tracking-[0.1em] uppercase transition-colors hover:text-magenta",
                      value?.type === "any" ? "text-magenta" : "text-stone",
                    )}
                  >
                    Qualquer período
                  </button>
                  <button
                    type="button"
                    onClick={selectBeyond}
                    className={cn(
                      "text-xs font-medium tracking-[0.1em] uppercase transition-colors hover:text-magenta",
                      value?.type === "beyond" ? "text-magenta" : "text-stone",
                    )}
                  >
                    Mais adiante
                  </button>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-3 md:grid-cols-4">
                  {months.map((month) => {
                    const selected =
                      value?.type === "month" &&
                      value.month.slug === month.slug &&
                      value.month.year === month.year;
                    return (
                      <button
                        key={month.slug}
                        type="button"
                        onClick={() => selectMonth(month)}
                        disabled={month.disabled}
                        aria-label={
                          month.status === "recommended"
                            ? `${month.label}, período recomendado`
                            : month.label
                        }
                        title={month.status === "recommended" ? "Período recomendado" : undefined}
                        className={cn(
                          "relative border border-ink/10 py-3 text-sm transition-colors",
                          month.disabled
                            ? "cursor-not-allowed text-stone/30"
                            : selected
                              ? "border-ink bg-ink text-ivory"
                              : "text-ink/80 hover:border-ink/30",
                        )}
                      >
                        {month.label}
                        {month.status === "recommended" && !selected && !month.disabled && (
                          <span
                            aria-hidden
                            className="absolute top-1.5 right-1.5 size-1 rounded-full bg-magenta"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="mt-6">
                <div className="grid grid-cols-2 gap-5">
                  <label className="flex flex-col gap-2">
                    <span className="text-[0.65rem] font-medium tracking-[0.15em] text-stone uppercase">
                      Data de ida
                    </span>
                    <input
                      type="date"
                      value={fromDraft}
                      onChange={(e) => setFromDraft(e.target.value)}
                      className="border-b border-ink/20 bg-transparent py-2 text-sm text-ink outline-none focus:border-ink"
                    />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="text-[0.65rem] font-medium tracking-[0.15em] text-stone uppercase">
                      Data de volta
                    </span>
                    <input
                      type="date"
                      value={toDraft}
                      onChange={(e) => setToDraft(e.target.value)}
                      className="border-b border-ink/20 bg-transparent py-2 text-sm text-ink outline-none focus:border-ink"
                    />
                  </label>
                </div>
                <button
                  type="button"
                  onClick={applyDates}
                  disabled={!fromDraft && !toDraft}
                  className="mt-7 text-xs font-medium tracking-[0.1em] text-ink uppercase underline underline-offset-4 disabled:pointer-events-none disabled:text-stone/50"
                >
                  Aplicar período
                </button>
              </div>
            )}
          </DiscoveryPanel>
        )}
      </AnimatePresence>
    </div>
  );
}
