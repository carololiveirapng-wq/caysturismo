import Link from "next/link";
import { Container } from "@/components/ui/container";
import { EditorialHeading } from "@/components/ui/editorial-heading";
import { ImageReveal } from "@/components/ui/image-reveal";
import { Reveal } from "@/components/ui/reveal";
import type { ExperienceHubCard } from "@/data/experiences-hub";
import { experienceHref } from "@/lib/links";

/**
 * Grade uniforme: todos os cards têm a mesma largura e a mesma proporção
 * (3/4). Antes, spans variáveis combinados com proporção fixa faziam o card
 * de 6 colunas ficar com o dobro da altura dos demais.
 */
export function ExperienceCategoryGrid({
  heading,
  items,
  columnsClass,
}: {
  heading: string;
  items: ExperienceHubCard[];
  /** Colunas por breakpoint (classes Tailwind completas, ex.: "grid-cols-2 lg:grid-cols-4"). */
  columnsClass: string;
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

        <div className={`mt-9 grid gap-4 md:gap-5 ${columnsClass}`}>
          {items.map((item, i) => (
            <Reveal key={item.slug} delay={(i % 3) * 0.05}>
              <Link href={experienceHref(item.slug)} className="group/card relative block aspect-[3/4] overflow-hidden">
                <ImageReveal
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, 45vw"
                  containerClassName="absolute inset-0"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 md:p-5">
                  <h3 className="font-serif text-lg leading-tight text-ivory md:text-xl">{item.name}</h3>
                  <span
                    aria-hidden
                    className="flex size-8 shrink-0 items-center justify-center rounded-full border border-ivory/50 text-ivory transition-all duration-500 ease-[var(--ease-editorial)] motion-safe:group-hover/card:translate-x-0.5 group-hover/card:border-ivory group-hover/card:bg-ivory group-hover/card:text-ink"
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
