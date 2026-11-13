import type { Metadata } from "next";
import { Suspense } from "react";
import { ShortHero } from "@/components/ui/short-hero";
import { Container } from "@/components/ui/container";
import { Explorer } from "@/components/viagens-hub/explorer";
import { ViagensTabs } from "@/components/viagens-hub/viagens-tabs";
import { DestinationFinalCTA } from "@/components/destination/destination-final-cta";
import { LinkArrow } from "@/components/ui/link-arrow";
import { getTravelProducts, getExperiences, getDestinations, getGroupHub, getContinents } from "@/lib/cms";
import { getActiveOrderedItems } from "@/lib/content";
import { explorerContinents, explorerDestinations } from "@/lib/navigation";
import { getOpenOffers } from "@/lib/offers";
import { siteConfig } from "@/lib/site-config";

const fallbackTitle = "Grupos | Cays Turismo";
const fallbackDescription =
  "Saídas em grupo com data fixa, roteiro fechado e acompanhamento da Cays Turismo. Veja as próximas viagens e as vagas disponíveis.";

export async function generateMetadata({ searchParams }: PageProps<"/grupos">): Promise<Metadata> {
  const [params, hub] = await Promise.all([searchParams, getGroupHub()]);
  const title = hub.seo?.title || fallbackTitle;
  const description = hub.seo?.description || fallbackDescription;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: "/grupos" },
    openGraph: { title, description, url: `${siteConfig.url}/grupos`, ...(hub.hero.image && { images: [{ url: hub.hero.image.src }] }) },
    robots: Object.keys(params).length > 0 ? { index: false, follow: true } : undefined,
  };
}

export default async function GruposPage() {
  const [allProducts, experiences, destinations, continents, hub] = await Promise.all([
    getTravelProducts(),
    getExperiences(),
    getDestinations(),
    getContinents(),
    getGroupHub(),
  ]);

  // Só saídas em grupo ativas; as encerradas não aparecem (o status "Esgotado" continua visível).
  const groups = getActiveOrderedItems(allProducts).filter((p) => p.type === "group" && p.status !== "expired");
  const activeDestinations = getActiveOrderedItems(destinations);

  return (
    <>
      <ShortHero eyebrow={hub.hero.eyebrow ?? "Grupos"} title={hub.hero.title} subtitle={hub.hero.text} image={hub.hero.image} />
      <ViagensTabs active="grupos" hasOffers={getOpenOffers(allProducts).length > 0} />

      <section className="bg-ivory py-14 md:py-20">
        <Container>
          {groups.length === 0 ? (
            <div className="border border-ink/10 bg-sand px-6 py-14 text-center">
              <p className="font-serif text-xl text-ink">Nenhuma saída em grupo aberta neste momento.</p>
              <p className="mx-auto mt-2 max-w-md text-sm text-stone">
                Novas saídas aparecem aqui assim que são liberadas. Se quiser ser avisado, fale com a gente.
              </p>
              <LinkArrow href="/contato" className="mx-auto mt-5 w-fit">
                Quero saber das próximas saídas
              </LinkArrow>
            </div>
          ) : (
            <Suspense fallback={<div className="h-64" aria-hidden />}>
              <Explorer
                products={groups}
                destinations={explorerDestinations(continents, activeDestinations)}
                continents={explorerContinents(continents, activeDestinations)}
                experiences={getActiveOrderedItems(experiences).map((e) => ({ slug: e.slug, name: e.name }))}
                showTypeFilter={false}
                noun={["saída em grupo", "saídas em grupo"]}
                emptyTitle="Nenhuma saída em grupo com esses filtros."
              />
            </Suspense>
          )}
        </Container>
      </section>

      <DestinationFinalCTA
        title="Quer montar o seu próprio grupo?"
        supporting="Família, amigos ou equipe: a Cays desenha uma saída fechada só para vocês."
        ctaLabel="Planejar um grupo"
        ctaHref="/contato"
      />
    </>
  );
}
