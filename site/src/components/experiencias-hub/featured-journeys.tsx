import Link from "next/link";
import { Container } from "@/components/ui/container";
import { EditorialHeading } from "@/components/ui/editorial-heading";
import { LinkArrow } from "@/components/ui/link-arrow";
import { ImageReveal } from "@/components/ui/image-reveal";
import { Reveal } from "@/components/ui/reveal";
import { getTravelProducts } from "@/lib/cms";
import { getActiveOrderedItems } from "@/lib/content";

/**
 * Reaproveita os produtos de viagem já cadastrados — nada duplicado manualmente.
 * Com 2 viagens publicadas, a composição fica em 2 colunas centralizadas, em
 * vez de 3 colunas com uma vazia. Com 3 ou mais, segue em grade de 3.
 */
export async function FeaturedJourneys() {
  const travelProducts = await getTravelProducts();
  const items = getActiveOrderedItems(travelProducts).slice(0, 3);
  if (items.length === 0) return null;

  const pair = items.length === 2;
  const imageAspect = pair ? "aspect-[4/3]" : "aspect-[4/3] lg:aspect-[4/5]";
  const gridClass = pair
    ? "grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12"
    : "grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <section className="bg-sand py-14 md:py-20">
      <Container>
        <div className={pair ? "mx-auto max-w-5xl" : undefined}>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal>
              <EditorialHeading as="h2" size="md">
                Viagens em destaque
              </EditorialHeading>
            </Reveal>
            <LinkArrow href="/viagens" className="shrink-0">
              Ver todas as viagens
            </LinkArrow>
          </div>

          <div className={`mt-9 ${gridClass}`}>
            {items.map((product) => (
              <Link key={product.slug} href={`/viagens/${product.slug}`} className="group/card block">
                <ImageReveal
                  src={product.gallery[0]?.src}
                  alt={product.gallery[0]?.alt ?? product.title}
                  width={960}
                  height={720}
                  sizes={pair ? "(min-width: 768px) 46vw, 90vw" : "(min-width: 1024px) 30vw, 85vw"}
                  containerClassName={imageAspect}
                />
                <div className="mt-5 border-t border-ink/10 pt-5 transition-colors duration-300 group-hover/card:border-magenta/40">
                  <h3 className="font-serif text-xl text-ink md:text-2xl">{product.title}</h3>
                  {product.subtitle && <p className="mt-2 text-sm leading-relaxed text-stone">{product.subtitle}</p>}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
