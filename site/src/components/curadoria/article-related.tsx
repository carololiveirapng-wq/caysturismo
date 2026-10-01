import Link from "next/link";
import { Container } from "@/components/ui/container";
import { EditorialHeading } from "@/components/ui/editorial-heading";
import { ImageReveal } from "@/components/ui/image-reveal";
import { Reveal } from "@/components/ui/reveal";
import { destinationHref, travelProductHref, curadoriaArticleHref } from "@/lib/links";
import { getTravelProductBySlug, getDestinationBySlug, getArticleBySlug } from "@/lib/cms";
import { cn } from "@/lib/utils";

export async function ArticleRelated({
  relatedTravelProducts,
  relatedDestination,
  relatedArticles,
}: {
  relatedTravelProducts?: string[];
  relatedDestination?: string;
  relatedArticles?: string[];
}) {
  const [product, destination, articlesResult] = await Promise.all([
    relatedTravelProducts?.[0] ? getTravelProductBySlug(relatedTravelProducts[0]) : undefined,
    relatedDestination ? getDestinationBySlug(relatedDestination) : undefined,
    Promise.all((relatedArticles ?? []).map((slug) => getArticleBySlug(slug))),
  ]);
  const articles = articlesResult.filter((article) => article !== undefined);

  const hasCards = Boolean(product || destination);
  if (!hasCards && articles.length === 0) return null;

  return (
    <section className="bg-sand py-14 md:py-20">
      <Container>
        {hasCards && (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {destination && (
              <Link href={destinationHref(destination.slug)} className="group/card relative block aspect-[16/10] overflow-hidden">
                <ImageReveal
                  src={destination.hero.image.src}
                  alt={destination.hero.image.alt}
                  fill
                  sizes="(min-width: 640px) 45vw, 90vw"
                  containerClassName="absolute inset-0"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-transparent" />
                <div className="absolute bottom-0 left-0 p-5">
                  <p className="text-xs tracking-wide text-ivory/75 uppercase">Destino</p>
                  <h3 className="mt-1 font-serif text-xl text-ivory">{destination.name}</h3>
                </div>
              </Link>
            )}
            {product && (
              <Link href={travelProductHref(product.slug)} className="group/card relative block aspect-[16/10] overflow-hidden">
                <ImageReveal
                  src={product.gallery[0]?.src}
                  alt={product.gallery[0]?.alt ?? product.title}
                  fill
                  sizes="(min-width: 640px) 45vw, 90vw"
                  containerClassName="absolute inset-0"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-transparent" />
                <div className="absolute bottom-0 left-0 p-5">
                  <p className="text-xs tracking-wide text-ivory/75 uppercase">Viagem</p>
                  <h3 className="mt-1 font-serif text-xl text-ivory">{product.title}</h3>
                </div>
              </Link>
            )}
          </div>
        )}

        {articles.length > 0 && (
          <div className={cn(hasCards && "mt-12")}>
            <Reveal>
              <EditorialHeading as="h2" size="md">
                Continue lendo
              </EditorialHeading>
            </Reveal>
            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
              {articles.map((article) => (
                <Link key={article.slug} href={curadoriaArticleHref(article.slug)} className="group/card block">
                  <ImageReveal
                    src={article.heroImage.src}
                    alt={article.heroImage.alt}
                    width={480}
                    height={320}
                    sizes="(min-width: 640px) 30vw, 90vw"
                    containerClassName="aspect-[16/10]"
                  />
                  <div className="mt-3 border-t border-ink/10 pt-3">
                    <p className="text-xs font-medium tracking-[0.15em] text-magenta uppercase">{article.category}</p>
                    <h3 className="mt-1.5 font-serif text-lg leading-snug text-ink">{article.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
