import Link from "next/link";
import { Container } from "@/components/ui/container";
import { EditorialHeading } from "@/components/ui/editorial-heading";
import { ImageReveal } from "@/components/ui/image-reveal";
import { Reveal } from "@/components/ui/reveal";
import { travelProductHref } from "@/lib/links";
import type { RelatedProductRef } from "@/types";

export function RelatedProducts({ items }: { items: RelatedProductRef[] }) {
  if (items.length === 0) return null;

  return (
    <section className="bg-ivory py-14 md:py-20">
      <Container>
        <Reveal>
          <EditorialHeading as="h2" size="md">
            Outras viagens
          </EditorialHeading>
        </Reveal>

        <div className="mt-9 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {items.map((item) => (
            <Link key={item.slug} href={travelProductHref(item.slug)} className="group/card relative block">
              <div className="relative aspect-[8/9] overflow-hidden">
                <ImageReveal
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="(min-width: 640px) 30vw, 90vw"
                  containerClassName="absolute inset-0"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                  <div>
                    <h3 className="font-serif text-xl text-ivory">{item.title}</h3>
                    {item.subtitle && <p className="mt-1 text-xs tracking-wide text-ivory/75 uppercase">{item.subtitle}</p>}
                  </div>
                  <span
                    aria-hidden
                    className="flex size-8 shrink-0 items-center justify-center rounded-full border border-ivory/50 text-ivory transition-all duration-500 ease-[var(--ease-editorial)] group-hover/card:translate-x-0.5 group-hover/card:border-ivory group-hover/card:bg-ivory group-hover/card:text-ink"
                  >
                    ↗
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
