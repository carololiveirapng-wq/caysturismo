"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const NAO_SEI = "nao-sei";

export function DestinationMultiSelect({
  value,
  onChange,
  destinations,
}: {
  value: string[];
  onChange: (value: string[]) => void;
  destinations: { slug: string; name: string }[];
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onClickOutside(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function toggle(slug: string) {
    if (slug === NAO_SEI) {
      onChange(value.includes(NAO_SEI) ? [] : [NAO_SEI]);
      return;
    }
    const withoutNaoSei = value.filter((v) => v !== NAO_SEI);
    onChange(withoutNaoSei.includes(slug) ? withoutNaoSei.filter((v) => v !== slug) : [...withoutNaoSei, slug]);
  }

  const selectedNames = value
    .map((slug) => (slug === NAO_SEI ? "Ainda não sei" : destinations.find((d) => d.slug === slug)?.name))
    .filter((name): name is string => Boolean(name));

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="flex w-full items-center justify-between gap-3 border-0 border-b border-ink/20 bg-transparent py-2.5 text-left text-base outline-none transition-colors duration-300 focus:border-ink"
      >
        <span className={cn("truncate", selectedNames.length === 0 ? "text-stone" : "text-ink")}>
          {selectedNames.length > 0 ? selectedNames.join(", ") : "Escolha um ou mais destinos"}
        </span>
        <ChevronDown
          aria-hidden
          className={cn("size-4 shrink-0 text-stone transition-transform duration-300", open && "rotate-180")}
        />
      </button>

      {open && (
        <div
          role="listbox"
          aria-multiselectable="true"
          className="absolute top-full left-0 z-20 mt-2 max-h-72 w-full overflow-y-auto border border-ink/15 bg-ivory shadow-[0_20px_40px_-20px_rgba(0,0,0,0.25)]"
        >
          <button
            type="button"
            role="option"
            aria-selected={value.includes(NAO_SEI)}
            onClick={() => toggle(NAO_SEI)}
            className="flex w-full items-center justify-between border-b border-ink/10 px-4 py-2.5 text-left text-sm text-ink transition-colors duration-200 hover:bg-sand"
          >
            Ainda não sei
            {value.includes(NAO_SEI) && <Check className="size-4 text-magenta" aria-hidden />}
          </button>
          {destinations.map((d) => (
            <button
              key={d.slug}
              type="button"
              role="option"
              aria-selected={value.includes(d.slug)}
              onClick={() => toggle(d.slug)}
              className="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm text-ink transition-colors duration-200 hover:bg-sand"
            >
              {d.name}
              {value.includes(d.slug) && <Check className="size-4 text-magenta" aria-hidden />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
