import type { Metadata } from "next";
import { Suspense } from "react";
import { ShortHero } from "@/components/ui/short-hero";
import { Container } from "@/components/ui/container";
import { ViagensTabs } from "@/components/viagens-hub/viagens-tabs";
import { InspirationGrid } from "@/components/inspiracoes/inspiration-grid";
import { DestinationFinalCTA } from "@/components/destination/destination-final-cta";
import { LinkArrow } from "@/components/ui/link-arrow";
import { getInspirations, getDestinations, getExperiences, getInspirationHub, getTravelProducts } from "@/lib/cms";
import { getActiveOrderedItems } from "@/lib/content";
import { getOpenOffers } from "@/lib/offers";
import { siteConfig } from "@/lib/site-config";

const fallbackTitle = "Inspirações | Cays Turismo";
const fallbackDescription = "Ideias de viagem em fotos e histórias curtas: lugares, momentos e experiências para inspirar o seu próximo roteiro com a Cays Turismo.";

export async function generateMetadata({ searchParams }: PageProps<"/inspiracoes">): Promise<Metadata> {
  const [params, hub] = await Promise.all([searchParams, getInspirationHub()]);
  const title = hub.seo?.title || fallbackTitle;
  const description = hub.seo?.description || fallbackDescription;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: "/inspiracoes" },
    openGraph: { title, description, url: `${siteConfig.url}/inspiracoes`, ...(hub.hero.image && { images: [{ url: hub.hero.image.src }] }) },
    robots: Object.keys(params).length > 0 ? { index: false, follow: true } : undefined,
  };
}

export default async function InspiracoesPage() {
  const [items, destinations, experiences, hub, products] = await Promise.all([
    getInspirations(),
    getDestinations(),
    getExperiences(),
    getInspirationHub(),
    getTravelProducts(),
  ]);
  const ordered = getActiveOrderedItems(items);

  return (
    <>
      <ShortHero eyebrow={hub.hero.eyebrow ?? "Inspirações"} title={hub.hero.title} subtitle={hub.hero.text} image={hub.hero.image} />
      <ViagensTabs active="inspiracoes" hasOffers={getOpenOffers(products).length > 0} />

      <section className="bg-ivory py-14 md:py-20">
        <Container>
          {ordered.length === 0 ? (
            <div className="border border-ink/10 bg-sand px-6 py-14 text-center">
              <p className="font-serif text-xl text-ink">As primeiras inspirações chegam em breve.</p>
              <p className="mx-auto mt-2 max-w-md text-sm text-stone">Enquanto isso, conte para a Cays o que você imagina viver e a gente desenha a viagem com você.</p>
              <LinkArrow href="/contato" className="mx-auto mt-5 w-fit">Planejar minha viagem</LinkArrow>
            </div>
          ) : (
            <Suspense fallback={<div className="h-64" aria-hidden />}>
              <InspirationGrid
                items={ordered}
                destinations={getActiveOrderedItems(destinations).map((d) => ({ slug: d.slug, name: d.name }))}
                experiences={getActiveOrderedItems(experiences).map((e) => ({ slug: e.slug, name: e.name }))}
              />
            </Suspense>
          )}
        </Container>
      </section>

      <DestinationFinalCTA
        title="Alguma dessas ideias combina com você?"
        supporting="Conte para a Cays o que te encantou. A gente transforma a inspiração em roteiro."
        ctaLabel="Planejar minha viagem"
        ctaHref="/contato"
      />
    </>
  );
}
