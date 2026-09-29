import { Container } from "@/components/ui/container";
import { EditorialHeading } from "@/components/ui/editorial-heading";
import { ImageReveal } from "@/components/ui/image-reveal";
import { Reveal } from "@/components/ui/reveal";
import type { DestinationExperienceHighlight } from "@/types";
import { cn } from "@/lib/utils";

/** Padrão assimétrico: 3 blocos retrato numa fileira + 2 blocos largos na seguinte. */
const TILE_SPAN = [
  "md:col-span-2 aspect-[3/4]",
  "md:col-span-2 aspect-[3/4]",
  "md:col-span-2 aspect-[3/4]",
  "md:col-span-3 aspect-[4/3]",
  "md:col-span-3 aspect-[4/3]",
];

export function WhatToLive({ id, items }: { id: string; items: DestinationExperienceHighlight[] }) {
  if (items.length === 0) return null;

  return (
    <section id={id} className="scroll-mt-28 bg-sand py-14 md:scroll-mt-32 md:py-20">
      <Container>
        <Reveal>
          <EditorialHeading as="h2" size="md">
            O que viver no Japão
          </EditorialHeading>
        </Reveal>

        <div className="mt-9 grid grid-cols-2 gap-4 md:grid-cols-6 md:gap-5">
          {items.map((item, i) => (
            <Reveal
              key={item.title}
              delay={(i % 3) * 0.06}
              className={cn(
                "group/tile relative col-span-2 overflow-hidden transition-transform duration-500 ease-[var(--ease-editorial)] hover:-translate-y-0.5",
                TILE_SPAN[i % TILE_SPAN.length],
              )}
            >
              <ImageReveal
                src={item.image.src}
                alt={item.image.alt}
                fill
                sizes="(min-width: 768px) 40vw, 90vw"
                containerClassName="absolute inset-0"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/5 to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                <h3 className="font-serif text-lg text-ivory md:text-xl">{item.title}</h3>
                <p className="mt-1 text-sm leading-snug text-ivory/80">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
