import Link from "next/link";
import { Container } from "@/components/ui/container";
import { EditorialHeading } from "@/components/ui/editorial-heading";
import { LinkArrow } from "@/components/ui/link-arrow";
import { ImageReveal } from "@/components/ui/image-reveal";
import { Reveal } from "@/components/ui/reveal";
import type { DestinationArticle } from "@/types";

export function RelatedCuration({
  id,
  articles,
  allHref,
  heading = "Curadoria relacionada",
  ctaLabel = "Ver toda a curadoria",
}: {
  id: string;
  articles: DestinationArticle[];
  allHref: string;
  heading?: string;
  ctaLabel?: string;
}) {
  if (articles.length === 0) return null;
  const [main, ...rest] = articles;

  return (
    <section id={id} className="scroll-mt-28 bg-sand py-14 md:scroll-mt-32 md:py-20">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <EditorialHeading as="h2" size="md">
              {heading}
            </EditorialHeading>
          </Reveal>
          <LinkArrow href={allHref} className="shrink-0">
            {ctaLabel}
          </LinkArrow>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          <Link href={`/curadoria/${main.slug}`} className="group/card block md:col-span-7">
            <ImageReveal
              src={main.image.src}
              alt={main.image.alt}
              width={960}
              height={640}
              sizes="(min-width: 768px) 55vw, 90vw"
              containerClassName="aspect-[16/10]"
            />
            <div className="mt-4 border-t border-ink/10 pt-4">
              {main.category && (
                <p className="text-xs font-medium tracking-[0.15em] text-magenta-dark uppercase">
                  {main.category}
                </p>
              )}
              <h3 className="mt-2 font-serif text-2xl leading-snug text-ink md:text-3xl">{main.title}</h3>
            </div>
          </Link>

          {rest.length > 0 && (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:col-span-5 md:grid-cols-1">
              {rest.map((article) => (
                <Link key={article.slug} href={`/curadoria/${article.slug}`} className="group/card block">
                  <ImageReveal
                    src={article.image.src}
                    alt={article.image.alt}
                    width={640}
                    height={420}
                    sizes="(min-width: 768px) 22vw, 90vw"
                    containerClassName="aspect-[16/10]"
                  />
                  <div className="mt-3 border-t border-ink/10 pt-3">
                    {article.category && (
                      <p className="text-xs font-medium tracking-[0.15em] text-magenta-dark uppercase">
                        {article.category}
                      </p>
                    )}
                    <h3 className="mt-1.5 font-serif text-lg leading-snug text-ink">{article.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
