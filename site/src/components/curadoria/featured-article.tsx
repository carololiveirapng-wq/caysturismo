import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ImageReveal } from "@/components/ui/image-reveal";
import { Reveal } from "@/components/ui/reveal";
import { LinkArrow } from "@/components/ui/link-arrow";
import { getDestinationDetailBySlug } from "@/data/destinations";
import type { CuradoriaArticle } from "@/types";

export function FeaturedArticle({ article }: { article: CuradoriaArticle }) {
  const destinationName = article.destinationIds?.[0]
    ? getDestinationDetailBySlug(article.destinationIds[0])?.name
    : undefined;

  return (
    <section className="bg-ivory py-14 md:py-20">
      <Container>
        <Reveal className="grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-10">
          <Link href={`/curadoria/${article.slug}`} className="group/card block md:col-span-7">
            <ImageReveal
              src={article.heroImage.src}
              alt={article.heroImage.alt}
              width={1100}
              height={750}
              sizes="(min-width: 768px) 55vw, 90vw"
              containerClassName="aspect-[16/11]"
            />
          </Link>
          <div className="md:col-span-5">
            <p className="text-xs font-medium tracking-[0.15em] text-magenta uppercase">
              {article.category}
              {destinationName && <span className="text-stone"> · {destinationName}</span>}
            </p>
            <Link href={`/curadoria/${article.slug}`} className="group/card block">
              <h2 className="mt-3 font-serif text-2xl leading-snug text-ink transition-colors duration-300 group-hover/card:text-magenta md:text-4xl">
                {article.title}
              </h2>
            </Link>
            <p className="mt-4 max-w-md text-base leading-relaxed text-stone">{article.excerpt}</p>
            {article.readingTime && (
              <p className="mt-4 text-xs text-stone/70">{article.readingTime} min de leitura</p>
            )}
            <LinkArrow href={`/curadoria/${article.slug}`} className="mt-6">
              Ler artigo
            </LinkArrow>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
