import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { EditorialHeading } from "@/components/ui/editorial-heading";
import { LinkArrow } from "@/components/ui/link-arrow";
import { ImageReveal } from "@/components/ui/image-reveal";
import { Reveal } from "@/components/ui/reveal";
import { curadoriaArticleHref } from "@/lib/links";
import type { HomeFeaturedArticle } from "@/types";

export function Journal({ articles }: { articles: HomeFeaturedArticle[] }) {
  if (articles.length === 0) return null;
  const [featured, ...rest] = articles;

  return (
    <section className="bg-ivory py-24 md:py-32">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-6">
          <Reveal className="max-w-xl">
            <SectionLabel>Curadoria Cays</SectionLabel>
            <EditorialHeading as="h2" size="lg" className="mt-4">
              Destinos, histórias e ideias para viajar melhor.
            </EditorialHeading>
          </Reveal>
          <LinkArrow href="/curadoria" className="shrink-0">
            Ver toda a curadoria
          </LinkArrow>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-12 md:mt-16 md:grid-cols-12 md:gap-8">
          <Link
            href={curadoriaArticleHref(featured.slug)}
            className="group/card block md:col-span-7"
          >
            <ImageReveal
              src={featured.image.src}
              alt={featured.image.alt}
              width={960}
              height={1080}
              sizes="(min-width: 768px) 55vw, 90vw"
              containerClassName="aspect-[4/5] md:aspect-[16/11]"
            />
            <div className="mt-5 max-w-lg border-t border-ink/10 pt-5">
              <p className="text-xs font-medium tracking-[0.15em] text-magenta-dark uppercase">
                {featured.category}
              </p>
              <h3 className="mt-3 font-serif text-2xl leading-snug text-ink md:text-3xl">
                {featured.title}
              </h3>
              {featured.readingTime && (
                <p className="mt-3 text-xs text-stone">{featured.readingTime} min de leitura</p>
              )}
            </div>
          </Link>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:col-span-5 md:grid-cols-1">
            {rest.map((post) => (
              <Link key={post.slug} href={curadoriaArticleHref(post.slug)} className="group/card block">
                <ImageReveal
                  src={post.image.src}
                  alt={post.image.alt}
                  width={640}
                  height={420}
                  sizes="(min-width: 768px) 22vw, 90vw"
                  containerClassName="aspect-[16/10]"
                />
                <div className="mt-4 border-t border-ink/10 pt-4">
                  <p className="text-xs font-medium tracking-[0.15em] text-magenta-dark uppercase">
                    {post.category}
                  </p>
                  <h3 className="mt-2 font-serif text-xl leading-snug text-ink">{post.title}</h3>
                  {post.readingTime && (
                    <p className="mt-2 text-xs text-stone">{post.readingTime} min de leitura</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
