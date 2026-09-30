"use client";

import { useCarousel } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface CarouselCircleNavProps {
  /** "dark" para setas sobre fotografia; "light" sobre fundo ivory/sand. */
  tone?: "dark" | "light";
  /**
   * "inset" (padrão): setas 8px para dentro da área do carrossel — pensado
   * para carrosséis de imagem em largura cheia, onde sobrepor a própria
   * foto é o efeito pretendido. "outset": setas deslocadas para fora,
   * dentro do gutter lateral do Container — use quando o conteúdo do slide
   * é texto (cards), onde a seta nunca pode cobrir o conteúdo.
   */
  edge?: "inset" | "outset";
  className?: string;
}

/** Par de setas circulares discretas — pequenas, borda fina, sem botão grande. */
export function CarouselCircleNav({ tone = "dark", edge = "inset", className }: CarouselCircleNavProps) {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } = useCarousel();

  const base = cn(
    "absolute top-1/2 z-10 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border backdrop-blur-sm transition-colors duration-300 md:flex",
    tone === "dark"
      ? "border-ivory/40 bg-ink/20 text-ivory hover:bg-ivory hover:text-ink"
      : "border-ink/15 bg-ivory/80 text-ink hover:border-ink/30 hover:bg-ivory",
  );

  // "outset" empurra a seta pro gutter do Container (px-10 no md, px-16 no
  // lg) em vez de para dentro da faixa de cards — por isso os deslocamentos
  // ficam sempre menores que o padding do Container naquele breakpoint.
  const prevOffset = edge === "outset" ? "md:-left-8 lg:-left-12" : "left-2";
  const nextOffset = edge === "outset" ? "md:-right-8 lg:-right-12" : "right-2";

  return (
    <div className={className}>
      {canScrollPrev && (
        <button type="button" aria-label="Anterior" onClick={scrollPrev} className={cn(base, prevOffset)}>
          ←
        </button>
      )}
      {canScrollNext && (
        <button type="button" aria-label="Próximo" onClick={scrollNext} className={cn(base, nextOffset)}>
          →
        </button>
      )}
    </div>
  );
}
