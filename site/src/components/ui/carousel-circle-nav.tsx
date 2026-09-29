"use client";

import { useCarousel } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface CarouselCircleNavProps {
  /** "dark" para setas sobre fotografia; "light" sobre fundo ivory/sand. */
  tone?: "dark" | "light";
  className?: string;
}

/** Par de setas circulares discretas — pequenas, borda fina, sem botão grande. */
export function CarouselCircleNav({ tone = "dark", className }: CarouselCircleNavProps) {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } = useCarousel();

  const base = cn(
    "absolute top-1/2 z-10 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border backdrop-blur-sm transition-colors duration-300 md:flex",
    tone === "dark"
      ? "border-ivory/40 bg-ink/20 text-ivory hover:bg-ivory hover:text-ink"
      : "border-ink/15 bg-ivory/80 text-ink hover:border-ink/30 hover:bg-ivory",
  );

  return (
    <div className={className}>
      {canScrollPrev && (
        <button type="button" aria-label="Anterior" onClick={scrollPrev} className={cn(base, "left-2")}>
          ←
        </button>
      )}
      {canScrollNext && (
        <button type="button" aria-label="Próximo" onClick={scrollNext} className={cn(base, "right-2")}>
          →
        </button>
      )}
    </div>
  );
}
