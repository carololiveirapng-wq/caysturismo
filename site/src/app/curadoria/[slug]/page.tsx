import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticleBySlug, getArticleSlugs } from "@/lib/cms";
import { Container } from "@/components/ui/container";
import { ArticleHero } from "@/components/curadoria/article-hero";
import { ArticleToc } from "@/components/curadoria/article-toc";
import { ArticleBlocks } from "@/components/curadoria/article-blocks";
import { ArticleRelated } from "@/components/curadoria/article-related";
import { DestinationFaq } from "@/components/destination/destination-faq";
import { DestinationFinalCTA } from "@/components/destination/destination-final-cta";
import { PersistentMobileCTA } from "@/components/ui/persistent-mobile-cta";
import { siteConfig } from "@/lib/site-config";

export async function generateStaticParams() {
  const slugs = await getArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/curadoria/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};

  const title = article.seo?.title ?? `${article.title} | Curadoria Cays Turismo`;
  const description = article.seo?.description ?? article.excerpt;
  const canonical = `/curadoria/${article.slug}`;

  return {
    // `title` já vem completo (com "Cays Turismo" no fim) — absolute evita
    // que o template do layout raiz ("%s | Cays Turismo") duplique o nome.
    title: { absolute: title },
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}${canonical}`,
      type: "article",
      images: [{ url: article.heroImage.src }],
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
    },
  };
}

export default async function CuradoriaArticlePage({ params }: PageProps<"/curadoria/[slug]">) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const contactHref = article.relatedDestination ? `/contato?destino=${article.relatedDestination}` : "/contato";

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: article.heroImage.src,
    ...(article.author && { author: { "@type": "Organization", name: article.author } }),
    ...(article.publishedAt && { datePublished: article.publishedAt }),
    ...(article.updatedAt && { dateModified: article.updatedAt }),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <ArticleHero article={article} />

      <div className="bg-ivory py-12 md:py-16">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-3">
              <ArticleToc sections={article.sections.map(({ id, heading }) => ({ id, heading }))} />
            </div>
            <div className="max-w-2xl lg:col-span-8 lg:col-start-5">
              <div className="space-y-12">
                {article.sections.map((section) => (
                  <section key={section.id} id={section.id} className="scroll-mt-28">
                    <h2 className="font-serif text-2xl text-ink md:text-3xl">{section.heading}</h2>
                    <div className="mt-5">
                      <ArticleBlocks blocks={section.blocks} />
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>

      {article.faq && article.faq.length > 0 && <DestinationFaq id="faq" items={article.faq} />}

      <ArticleRelated
        relatedTravelProducts={article.relatedTravelProducts}
        relatedDestination={article.relatedDestination}
        relatedArticles={article.relatedArticles}
      />

      <DestinationFinalCTA
        title="Leu, gostou, quer viver isso de perto?"
        supporting="Conte para a Cays o que você imagina viver. Nós cuidamos do caminho."
        ctaLabel="Planejar minha viagem"
        ctaHref={contactHref}
      />

      <PersistentMobileCTA label="Planejar viagem" href={contactHref} />
    </>
  );
}
