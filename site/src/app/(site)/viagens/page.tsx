import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ShortHero } from "@/components/ui/short-hero";
import { FeaturedProducts } from "@/components/viagens-hub/featured-products";
import { Explorer } from "@/components/viagens-hub/explorer";
import { ViagensTabs } from "@/components/viagens-hub/viagens-tabs";
import { EditorialShortcuts } from "@/components/viagens-hub/editorial-shortcuts";
import { SpecialExperienceSpotlight } from "@/components/experience/special-experience-spotlight";
import { OnlineBookingBanner } from "@/components/booking/online-booking-banner";
import { DestinationFinalCTA } from "@/components/destination/destination-final-cta";
import { Container } from "@/components/ui/container";
import { getTravelProducts, getExperiences, getDestinations, getTravelHub, getContinents } from "@/lib/cms";
import { getActiveOrderedItems, getFeaturedItems } from "@/lib/content";
import { explorerContinents, explorerDestinations } from "@/lib/navigation";
import { getOpenOffers, isOfferOpen } from "@/lib/offers";
import { siteConfig } from "@/lib/site-config";

const fallbackTitle = "Viagens | Cays Turismo";
const fallbackDescription = "Roteiros sob medida, cruzeiros e viagens com data fixa — descubra as viagens com a curadoria da Cays Turismo.";

export async function generateMetadata({
  searchParams,
}: PageProps<"/viagens">): Promise<Metadata> {
  const [params, hub] = await Promise.all([searchParams, getTravelHub()]);
  const hasFilters = Object.keys(params).length > 0;
  const title = hub?.seo?.title || fallbackTitle;
  const description = hub?.seo?.description || fallbackDescription;

  return {
    // `title` já vem completo (com "Cays Turismo" no fim) — absolute evita
    // que o template do layout raiz ("%s | Cays Turismo") duplique o nome.
    title: { absolute: title },
    description,
    alternates: { canonical: "/viagens" },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/viagens`,
      ...(hub?.hero.image && { images: [{ url: hub.hero.image.src }] }),
    },
    // Página com filtro é uma vista derivada, não um destino de indexação próprio.
    robots: hasFilters ? { index: false, follow: true } : undefined,
  };
}

export default async function ViagensHubPage() {
  const [allProducts, experiences, destinations, continents, hub] = await Promise.all([
    getTravelProducts(),
    getExperiences(),
    getDestinations(),
    getContinents(),
    getTravelHub(),
  ]);
  if (!hub) notFound();

  // Roteiros: tudo que não é saída em grupo (tem aba própria) nem oferta vencida.
  const active = getActiveOrderedItems(allProducts).filter((p) => p.type !== "group" && (p.type !== "offer" || isOfferOpen(p)));
  const featured = getFeaturedItems(active).slice(0, 2);

  // Com um catálogo pequeno, "Em destaque" só faz sentido quando sobra algo
  // além dele pra descobrir na grade abaixo — senão é a mesma viagem duas
  // vezes na mesma página.
  const showFeatured = featured.length > 0 && featured.length < active.length;

  const activeDestinations = getActiveOrderedItems(destinations);
  const experienceOptions = getActiveOrderedItems(experiences).map((e) => ({ slug: e.slug, name: e.name }));

  return (
    <>
      <ShortHero
        eyebrow={hub.hero.eyebrow ?? "Viagens"}
        title={hub.hero.title}
        subtitle={hub.hero.text}
        image={hub.hero.image}
      />

      <ViagensTabs active="roteiros" hasOffers={getOpenOffers(allProducts).length > 0} />

      {showFeatured && <FeaturedProducts products={featured} />}

      <section className="bg-ivory py-14 md:py-20">
        <Container>
          <Suspense fallback={<div className="h-64" aria-hidden />}>
            <Explorer
              products={active}
              destinations={explorerDestinations(continents, activeDestinations)}
              continents={explorerContinents(continents, activeDestinations)}
              experiences={experienceOptions}
            />
          </Suspense>
        </Container>
      </section>

      <SpecialExperienceSpotlight
        href="/experiencias/cruzeiros/explora-journeys"
        image="/explora-journeys/grandstand.jpg"
        imageAlt="Navio Explora I atracado em Mônaco durante o Grande Prêmio de Fórmula 1"
        eyebrow="Experiência especial · Em parceria com a Explora Journeys"
        title="Grande Prêmio de Mônaco 2027"
        description="O Explora I atracado no Porto Hercule, a 150 metros do F1 Paddock Club — o fim de semana de corrida vivido a bordo, do primeiro ao último dia."
        tone="sand"
      />

      <OnlineBookingBanner />

      <EditorialShortcuts />

      <DestinationFinalCTA
        title="Toda viagem começa com uma conversa."
        supporting="Conte para a Cays o que você imagina viver. Nós cuidamos do caminho."
        ctaLabel="Planejar minha viagem"
        ctaHref="/contato"
      />
    </>
  );
}
