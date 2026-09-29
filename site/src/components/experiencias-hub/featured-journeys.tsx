import Link from "next/link";
import { Container } from "@/components/ui/container";
import { EditorialHeading } from "@/components/ui/editorial-heading";
import { LinkArrow } from "@/components/ui/link-arrow";
import { ImageReveal } from "@/components/ui/image-reveal";
import { Reveal } from "@/components/ui/reveal";
import { travelProducts } from "@/data/travel-products";
import { getActiveOrderedItems } from "@/lib/content";

/** Reaproveita os produtos de viagem já cadastrados — nada duplicado manualmente. */
export function FeaturedJourneys() {
  const items = getActiveOrderedItems(travelProducts).slice(0, 3);
  if (items.length === 0) return null;

  return (
    <section className="bg-sand py-14 md:py-20">
      <Container>
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

        <div className="mt-9 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((product) => (
            <Link key={product.slug} href={`/viagens/${product.slug}`} className="group/card block">
              <ImageReveal
                src={product.gallery[0]?.src}
                alt={product.gallery[0]?.alt ?? product.title}
                width={640}
                height={800}
                sizes="(min-width: 1024px) 30vw, 85vw"
                containerClassName="aspect-[4/5]"
              />
              <div className="mt-4 border-t border-ink/10 pt-4 transition-colors duration-300 group-hover/card:border-magenta/40">
                <h3 className="font-serif text-xl text-ink">{product.title}</h3>
                {product.subtitle && <p className="mt-1 text-sm text-stone">{product.subtitle}</p>}
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
