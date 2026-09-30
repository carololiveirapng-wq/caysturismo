"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";
import { EditorialHeading } from "@/components/ui/editorial-heading";
import { Reveal } from "@/components/ui/reveal";
import type { DestinationMonthGuide } from "@/types";
import { cn } from "@/lib/utils";

const MONTH_LABELS = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];

const STATUS_STYLES: Record<DestinationMonthGuide["status"], string> = {
  ideal: "bg-magenta",
  good: "bg-ink/35",
  avoid: "bg-ink/10",
};

const STATUS_LEGEND: { status: DestinationMonthGuide["status"]; label: string }[] = [
  { status: "ideal", label: "Ideal" },
  { status: "good", label: "Bom" },
  { status: "avoid", label: "Menos indicado" },
];

export function MonthGuide({
  id,
  months,
  heading = "Quando ir",
}: {
  id: string;
  months: DestinationMonthGuide[];
  heading?: string;
}) {
  const defaultActive = months.find((m) => m.status === "ideal") ?? months[0];
  const [activeMonth, setActiveMonth] = useState(defaultActive?.month);

  if (months.length === 0) return null;
  const active = months.find((m) => m.month === activeMonth);

  return (
    <section id={id} className="scroll-mt-28 bg-sand py-14 md:scroll-mt-32 md:py-20">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <EditorialHeading as="h2" size="md">
              {heading}
            </EditorialHeading>
          </Reveal>
          <div className="flex items-center gap-5 text-xs text-stone">
            {STATUS_LEGEND.map(({ status, label }) => (
              <span key={status} className="flex items-center gap-2">
                <span aria-hidden className={cn("h-[2px] w-4", STATUS_STYLES[status])} />
                {label}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-4 gap-2 sm:grid-cols-6 md:mt-10 md:grid-cols-12 md:gap-2.5">
          {months.map((m) => (
            <button
              key={m.month}
              type="button"
              title={m.note}
              aria-label={`${MONTH_LABELS[m.month - 1]}${m.note ? ` — ${m.note}` : ""}`}
              onMouseEnter={() => setActiveMonth(m.month)}
              onFocus={() => setActiveMonth(m.month)}
              onClick={() => setActiveMonth(m.month)}
              className={cn(
                "flex flex-col items-center gap-2.5 border-none px-1 py-2.5 text-xs font-medium tracking-[0.1em] transition-colors duration-300",
                activeMonth === m.month ? "bg-ivory text-ink" : "bg-transparent text-stone/70 hover:bg-ivory/60 hover:text-ink",
              )}
            >
              {MONTH_LABELS[m.month - 1]}
              <span
                aria-hidden
                className={cn(
                  "w-full transition-all duration-300",
                  STATUS_STYLES[m.status],
                  activeMonth === m.month ? "h-1 opacity-100" : "h-[3px] opacity-70",
                )}
              />
            </button>
          ))}
        </div>

        {active?.note && (
          <p className="mt-7 max-w-md border-t border-ink/10 pt-4 text-sm leading-relaxed text-stone">
            <span className="mr-2 font-medium text-ink">{MONTH_LABELS[active.month - 1]}</span>
            {active.note}
          </p>
        )}
      </Container>
    </section>
  );
}
