import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Reveal } from "@/components/ui/reveal";
import { ImageReveal } from "@/components/ui/image-reveal";
import { getDestinationBySlug } from "@/lib/cms";
import type { CuradoriaArticle } from "@/types";

function formatDate(iso?: string) {
  if (!iso) return undefined;
  return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
}

export async function ArticleHero({ article }: { article: CuradoriaArticle }) {
  const destinationName = article.destinationIds?.[0]
    ? (await getDestinationBySlug(article.destinationIds[0]))?.name
    : undefined;

  return (
    <>
      <section className="bg-ivory pt-28 pb-10 md:pt-32 md:pb-12">
        <Container narrow>
          {article.breadcrumb && <Breadcrumb items={article.breadcrumb} className="mb-6" />}
          <Reveal>
            <p className="text-xs font-medium tracking-[0.15em] text-magenta-dark uppercase">
              {article.category}
              {destinationName && <span className="text-stone"> · {destinationName}</span>}
            </p>
            <h1 className="mt-3 font-serif text-3xl leading-tight text-ink md:text-5xl">{article.title}</h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-stone">{article.excerpt}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-stone">
              {article.author && <span>{article.author}</span>}
              {article.updatedAt && <span>Atualizado em {formatDate(article.updatedAt)}</span>}
              {article.readingTime && <span>{article.readingTime} min de leitura</span>}
            </div>
          </Reveal>
        </Container>
      </section>

      <Container>
        <ImageReveal
          src={article.heroImage.src}
          alt={article.heroImage.alt}
          width={1600}
          height={900}
          sizes="100vw"
          containerClassName="aspect-[16/9] md:aspect-[21/9]"
          hoverZoom={false}
        />
      </Container>
    </>
  );
}
