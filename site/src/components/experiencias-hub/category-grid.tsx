import Link from "next/link";
import { Container } from "@/components/ui/container";
import { EditorialHeading } from "@/components/ui/editorial-heading";
import { ImageReveal } from "@/components/ui/image-reveal";
import { Reveal } from "@/components/ui/reveal";
import type { ExperienceHubCard } from "@/data/experiences-hub";
import { experienceHref } from "@/lib/links";
import { cn } from "@/lib/utils";

export function ExperienceCategoryGrid({
  heading,
  items,
  tileSpans,
}: {
  heading: string;
  items: ExperienceHubCard[];
  /** Padrão de largura (em colunas de 6) por item — cria o ritmo assimétrico. */
  tileSpans: string[];
}) {
  if (items.length === 0) return null;

  return (
    <section className="bg-ivory py-14 md:py-20">
      <Container>
        <Reveal>
          <EditorialHeading as="h2" size="md">
            {heading}
          </EditorialHeading>
        </Reveal>

        <div className="mt-9 grid grid-cols-2 gap-4 md:grid-cols-6 md:gap-5">
          {items.map((item, i) => (
            <Reveal
              key={item.slug}
              delay={(i % 3) * 0.05}
              className={cn("col-span-2", tileSpans[i % tileSpans.length])}
            >
              <Link href={experienceHref(item.slug)} className="group/card relative block aspect-[3/4] overflow-hidden">
                <ImageReveal
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="(min-width: 768px) 40vw, 90vw"
                  containerClassName="absolute inset-0"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/5 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 md:p-5">
                  <h3 className="font-serif text-lg text-ivory md:text-xl">{item.name}</h3>
                  <span
                    aria-hidden
                    className="flex size-8 shrink-0 items-center justify-center rounded-full border border-ivory/50 text-ivory transition-all duration-500 ease-[var(--ease-editorial)] group-hover/card:translate-x-0.5 group-hover/card:border-ivory group-hover/card:bg-ivory group-hover/card:text-ink"
                  >
                    ↗
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
