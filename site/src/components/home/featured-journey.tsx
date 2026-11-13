"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { LinkArrow } from "@/components/ui/link-arrow";
import { travelProductHref } from "@/lib/links";
import { cn } from "@/lib/utils";
import type { HomeFeaturedTravelProduct } from "@/types";

const AUTOPLAY_MS = 7000;

/**
 * Viagens em destaque na Home, em slide: foto à esquerda, texto à direita, troca sozinha a cada 7 s
 * (para quando o mouse está em cima ou o foco está dentro, e não troca se o visitante prefere menos movimento).
 * Com uma viagem só, fica fixo como antes. Slides sem foto são ignorados.
 */
export function FeaturedJourney({ travelProducts }: { travelProducts: HomeFeaturedTravelProduct[] }) {
  const slides = travelProducts.filter((j) => j.image?.src);
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;

  const go = useCallback((to: number) => setIndex(((to % count) + count) % count), [count]);

  useEffect(() => {
    if (count < 2 || paused || reduceMotion) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [index, count, paused, reduceMotion]);

  if (count === 0) return null;

  return (
    <section
      aria-roledescription="carrossel"
      aria-label="Viagens em destaque"
      className="bg-graphite md:flex md:min-h-[70svh]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(e) => {
        if (count < 2) return;
        if (e.key === "ArrowRight") go(index + 1);
        if (e.key === "ArrowLeft") go(index - 1);
      }}
    >
      <div className="relative h-[42svh] bg-graphite md:h-auto md:w-3/5">
        {slides.map((s, i) => (
          <Image
            key={s.slug}
            src={s.image!.src}
            alt={s.image!.alt}
            fill
            sizes="(min-width: 768px) 60vw, 100vw"
            priority={i === 0}
            className={cn("object-cover transition-opacity duration-[900ms] ease-[var(--ease-editorial)]", i === index ? "opacity-100" : "opacity-0")}
            aria-hidden={i !== index}
          />
        ))}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-graphite/50 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-graphite/30"
        />
      </div>

      <div className="flex flex-col justify-center px-6 py-14 md:w-2/5 md:px-12 lg:px-16">
        <div className="max-w-md" aria-live={paused ? "polite" : "off"}>
          {/* Todos os textos ficam empilhados na mesma célula (a altura é a do maior) e só o ativo aparece: troca por CSS, sem depender de animação em JS. */}
          <div className="grid">
            {slides.map((s, i) => {
              const active = i === index;
              return (
                <div
                  key={s.slug}
                  aria-hidden={!active}
                  className={cn(
                    "[grid-area:1/1] transition-[opacity,transform] duration-500 ease-[var(--ease-editorial)] motion-reduce:transition-none",
                    active ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
                  )}
                >
                  {s.eyebrow && (
                    <div className="flex items-center gap-4">
                      <span aria-hidden className="h-px w-10 bg-ivory/40" />
                      <p className="text-sm font-medium tracking-[0.3em] text-ivory/70 uppercase">{s.eyebrow}</p>
                    </div>
                  )}
                  <h2 className="mt-6 font-serif text-[clamp(2rem,3.4vw,3.25rem)] leading-[1.1] text-balance text-ivory">{s.title}</h2>
                  {s.subtitle && <p className="mt-5 text-base leading-relaxed text-ivory/70">{s.subtitle}</p>}
                  <LinkArrow href={travelProductHref(s.slug)} tone="ivory" className="mt-8" tabIndex={active ? 0 : -1}>
                    Conhecer
                  </LinkArrow>
                </div>
              );
            })}
          </div>

          {count > 1 && (
            <div className="mt-10 flex items-center gap-5">
              <button type="button" aria-label="Viagem anterior" onClick={() => go(index - 1)} className="flex size-10 items-center justify-center border border-ivory/30 text-ivory transition-colors hover:border-ivory">
                <ChevronLeft className="size-4" />
              </button>
              <button type="button" aria-label="Próxima viagem" onClick={() => go(index + 1)} className="flex size-10 items-center justify-center border border-ivory/30 text-ivory transition-colors hover:border-ivory">
                <ChevronRight className="size-4" />
              </button>
              <div className="flex items-center gap-2" role="tablist" aria-label="Escolher viagem">
                {slides.map((s, i) => (
                  <button
                    key={s.slug}
                    type="button"
                    role="tab"
                    aria-selected={i === index}
                    aria-label={`Ver ${s.title}`}
                    onClick={() => go(i)}
                    className={cn("h-0.5 transition-all duration-500", i === index ? "w-10 bg-ivory" : "w-5 bg-ivory/35 hover:bg-ivory/60")}
                  />
                ))}
              </div>
              <span className="ml-auto text-xs tracking-[0.2em] text-ivory/60 tabular-nums">
                {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
