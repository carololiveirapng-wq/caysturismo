"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCarousel } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

/** Minimal prev/next pair for editorial carousels — no floating circles. */
export function CarouselNav({ className }: { className?: string }) {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } = useCarousel();

  const base =
    "flex size-10 items-center justify-center border border-ink/15 text-ink transition-colors duration-300 hover:border-ink/40 disabled:opacity-30 disabled:hover:border-ink/15";

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <button
        type="button"
        aria-label="Anterior"
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        className={base}
      >
        <ArrowLeft className="size-4" />
      </button>
      <button
        type="button"
        aria-label="Próximo"
        onClick={scrollNext}
        disabled={!canScrollNext}
        className={base}
      >
        <ArrowRight className="size-4" />
      </button>
    </div>
  );
}
