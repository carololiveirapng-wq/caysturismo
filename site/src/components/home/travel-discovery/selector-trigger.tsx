"use client";

import { ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectorTriggerProps {
  id: string;
  panelId: string;
  label: string;
  placeholder: string;
  value?: string | null;
  isOpen: boolean;
  onToggle: () => void;
  onClear?: () => void;
}

export function SelectorTrigger({
  id,
  panelId,
  label,
  placeholder,
  value,
  isOpen,
  onToggle,
  onClear,
}: SelectorTriggerProps) {
  return (
    <div className="relative">
      <button
        id={id}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className={cn(
          "flex w-full items-center justify-between gap-3 px-6 py-5 text-left transition-colors duration-300 md:px-7 md:py-6",
          isOpen ? "bg-sand/70" : "hover:bg-sand/40",
        )}
      >
        <span className="flex flex-col gap-1.5">
          <span className="text-[0.65rem] font-medium tracking-[0.18em] text-stone uppercase">
            {label}
          </span>
          <span className={cn("truncate text-base", value ? "text-ink" : "text-stone/85")}>
            {value || placeholder}
          </span>
        </span>
        <ChevronDown
          aria-hidden
          className={cn(
            "size-4 shrink-0 text-stone transition-transform duration-300 ease-[var(--ease-editorial)]",
            isOpen && "rotate-180",
            value && onClear && "mr-6",
          )}
        />
      </button>

      {value && onClear && (
        <button
          type="button"
          aria-label={`Limpar ${label.toLowerCase()}`}
          onClick={(e) => {
            e.stopPropagation();
            onClear();
          }}
          className="absolute top-1/2 right-6 flex size-6 -translate-y-1/2 items-center justify-center text-stone transition-colors hover:text-ink md:right-7"
        >
          <X className="size-3.5" />
        </button>
      )}
    </div>
  );
}
