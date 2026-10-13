"use client";

import Link from "next/link";
import { Container } from "@/components/ui/container";
import { EditorialHeading } from "@/components/ui/editorial-heading";
import { ImageReveal } from "@/components/ui/image-reveal";
import { Reveal } from "@/components/ui/reveal";
import { trackTravelStyleSelected } from "@/lib/analytics";
import type { ExperienceSubtype } from "@/types";

export function Subtypes({
  id,
  items,
  heading = "Qual estilo combina com vocês?",
  experienceSlug,
}: {
  id: string;
  items: ExperienceSubtype[];
  heading?: string;
  /** Usado pro prefill do /contato (?experiencia=) e pro evento de analytics. */
  experienceSlug: string;
}) {
  if (items.length === 0) return null;

  return (
    <section id={id} className="scroll-mt-28 bg-ivory py-14 md:scroll-mt-32 md:py-20">
      <Container>
        <Reveal>
          <EditorialHeading as="h2" size="md">
            {heading}
          </EditorialHeading>
        </Reveal>

        <div className="mt-9 grid grid-cols-2 gap-4 md:grid-cols-5 md:gap-5">
          {items.map((item, i) => (
            <Reveal key={item.slug} delay={i * 0.05} className="group/tile relative aspect-[3/4] overflow-hidden">
              <Link
                href={`/contato?experiencia=${experienceSlug}&estilo=${encodeURIComponent(item.name)}`}
                onClick={() => trackTravelStyleSelected({ pageType: "experiencia", pageSlug: experienceSlug, style: item.name, experience: experienceSlug })}
                aria-label={`${item.name} — planejar viagem com esse estilo`}
                className="absolute inset-0 block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta-dark"
              >
                <ImageReveal
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="(min-width: 768px) 18vw, 45vw"
                  containerClassName="absolute inset-0 transition-transform duration-500 ease-[var(--ease-editorial)] group-hover/tile:scale-[1.04]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent transition-colors duration-300 group-hover/tile:from-ink/90"
                />
                <div className="absolute inset-x-0 bottom-0 p-3.5">
                  <h3 className="font-serif text-base text-ivory md:text-lg">{item.name}</h3>
                  {item.text && <p className="mt-1 hidden text-xs leading-snug text-ivory/80 md:block">{item.text}</p>}
                </div>
                <span
                  aria-hidden
                  className="absolute top-3 right-3 flex size-7 items-center justify-center rounded-full border border-ivory/60 text-ivory opacity-0 transition-opacity duration-300 group-hover/tile:opacity-100"
                >
                  ↗
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
