import Link from "next/link";
import { Container } from "@/components/ui/container";
import { EditorialHeading } from "@/components/ui/editorial-heading";
import { ImageReveal } from "@/components/ui/image-reveal";
import { Reveal } from "@/components/ui/reveal";
import type { TravelProduct } from "@/types";

/** Reaproveita os `travel-products` já cadastrados — nada duplicado manualmente. */
export function FeaturedProducts({ products }: { products: TravelProduct[] }) {
  if (products.length === 0) return null;

  return (
    <section className="bg-sand py-14 md:py-20">
      <Container>
        <Reveal>
          <EditorialHeading as="h2" size="md">
            Viagens em destaque
          </EditorialHeading>
        </Reveal>

        <div className="mt-9 grid grid-cols-1 gap-10 sm:grid-cols-2">
          {products.map((product) => (
            <Link key={product.slug} href={`/viagens/${product.slug}`} className="group/card block">
              <ImageReveal
                src={product.gallery[0]?.src}
                alt={product.gallery[0]?.alt ?? product.title}
                width={900}
                height={620}
                sizes="(min-width: 640px) 45vw, 90vw"
                containerClassName="aspect-[16/11]"
              />
              <div className="mt-4 border-t border-ink/10 pt-4 transition-colors duration-300 group-hover/card:border-magenta/40">
                <h3 className="font-serif text-2xl text-ink">{product.title}</h3>
                {product.subtitle && <p className="mt-1.5 text-sm text-stone">{product.subtitle}</p>}
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
