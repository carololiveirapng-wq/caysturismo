import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTravelProductBySlug, getTravelProductSlugs, getExperienceBySlug, getSettings } from "@/lib/cms";
import { TravelProductHero } from "@/components/travel-product/travel-product-hero";
import { ProductOverview } from "@/components/travel-product/overview";
import { ProductHighlights } from "@/components/travel-product/highlights";
import { ProductItinerary } from "@/components/travel-product/itinerary";
import { ProductStays } from "@/components/travel-product/stays";
import { ProductInclusions } from "@/components/travel-product/inclusions";
import { ProductDates } from "@/components/travel-product/dates";
import { RelatedProducts } from "@/components/travel-product/related-products";
import { RelatedCuration } from "@/components/destination/related-curation";
import { DestinationFaq } from "@/components/destination/destination-faq";
import { DestinationFinalCTA } from "@/components/destination/destination-final-cta";
import { InlineCtaStrip } from "@/components/destination/inline-cta-strip";
import { StickySubnav } from "@/components/ui/sticky-subnav";
import { PersistentMobileCTA } from "@/components/ui/persistent-mobile-cta";
import { siteConfig } from "@/lib/site-config";

export async function generateStaticParams() {
  const slugs = await getTravelProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/viagens/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = await getTravelProductBySlug(slug);
  if (!product) return {};

  const title = product.seo?.title ?? `${product.title} | Cays Turismo`;
  const description =
    product.seo?.description ?? product.subtitle ?? `Conheça ${product.title}, com a curadoria da Cays Turismo.`;
  const canonical = `/viagens/${product.slug}`;

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
      images: [{ url: product.gallery[0]?.src }],
    },
  };
}

export default async function TravelProductPage({ params }: PageProps<"/viagens/[slug]">) {
  const { slug } = await params;
  const product = await getTravelProductBySlug(slug);
  if (!product) notFound();

  const contactHref = `/contato?viagem=${product.slug}`;
  const { whatsappHref } = await getSettings();
  const relatedExperiences = (
    await Promise.all(product.experiences.map((expSlug) => getExperienceBySlug(expSlug)))
  )
    .filter((experience) => experience !== undefined)
    .map((experience) => ({ slug: experience.slug, name: experience.name }));

  const subnavItems = [
    product.overview || (product.highlights && product.highlights.length > 0)
      ? { id: "visao-geral", label: "Visão geral" }
      : null,
    product.itinerary?.length ? { id: "roteiro", label: "Roteiro" } : null,
    (product.stays && product.stays.length > 0) || (product.cabinCategories && product.cabinCategories.length > 0)
      ? { id: "hospedagem", label: "Hospedagem" }
      : null,
    (product.inclusions && product.inclusions.length > 0) || (product.exclusions && product.exclusions.length > 0)
      ? { id: "inclui", label: "Inclui" }
      : null,
    product.bestMonths || (product.departures && product.departures.length > 0)
      ? { id: "datas", label: "Datas" }
      : null,
    product.articles?.length ? { id: "curadoria", label: "Curadoria" } : null,
    product.faq?.length ? { id: "faq", label: "FAQ" } : null,
  ].filter((item): item is { id: string; label: string } => item !== null);

  return (
    <>
      <TravelProductHero
        product={product}
        contactHref={contactHref}
        relatedExperiences={relatedExperiences}
        whatsappHref={whatsappHref}
      />

      <StickySubnav items={subnavItems} ctaLabel="Planejar viagem" ctaHref={contactHref} />

      {(product.overview || (product.highlights && product.highlights.length > 0)) && (
        <>
          {product.overview && <ProductOverview id="visao-geral" text={product.overview} />}
          {product.highlights && product.highlights.length > 0 && (
            <ProductHighlights id={product.overview ? "destaques" : "visao-geral"} items={product.highlights} />
          )}
        </>
      )}

      {product.itinerary && product.itinerary.length > 0 && (
        <ProductItinerary id="roteiro" stops={product.itinerary} />
      )}

      <ProductStays id="hospedagem" stays={product.stays} cabinCategories={product.cabinCategories} />

      <ProductInclusions id="inclui" inclusions={product.inclusions} exclusions={product.exclusions} />

      <ProductDates id="datas" type={product.type} bestMonths={product.bestMonths} departures={product.departures} />

      <InlineCtaStrip
        title="Quer ajustar esse roteiro?"
        supporting="Podemos adaptar hospedagem, duração e paradas ao seu ritmo."
        ctaLabel="Personalizar esta viagem"
        ctaHref={contactHref}
      />

      {product.articles && product.articles.length > 0 && (
        <RelatedCuration
          id="curadoria"
          articles={product.articles}
          allHref="/curadoria"
          heading="Curadoria relacionada"
          ctaLabel="Ver toda a curadoria"
        />
      )}

      {product.faq && product.faq.length > 0 && <DestinationFaq id="faq" items={product.faq} />}

      {product.related && product.related.length > 0 && <RelatedProducts items={product.related} />}

      <DestinationFinalCTA
        title={`Pronto para viver ${product.title}?`}
        supporting="Conte para a Cays como você imagina essa viagem. Nós cuidamos do caminho."
        ctaLabel="Planejar minha viagem"
        ctaHref={contactHref}
        note="Fale com um especialista da Cays"
      />

      <PersistentMobileCTA label="Planejar viagem" href={contactHref} />
    </>
  );
}
