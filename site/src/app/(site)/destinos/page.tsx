import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { DestinosHero } from "@/components/destinos-hub/destinos-hero";
import { DestinosExplorer } from "@/components/destinos-hub/destinos-explorer";
import { WhereToGoNow, type WhereToGoPick } from "@/components/destinos-hub/where-to-go-now";
import { DestinationFinalCTA } from "@/components/destination/destination-final-cta";
import { getDestinations, getDestinationHub, getContinents, getExperiences, getTravelProducts } from "@/lib/cms";
import { continentsWithCountries, themesByDestination } from "@/lib/navigation";
import { getActiveOrderedItems } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";

const fallbackTitle = "Destinos | Cays Turismo";
const fallbackDescription =
  "Explore os destinos da curadoria Cays Turismo por continente ou por tema, e descubra para onde ir em cada época do ano.";

export async function generateMetadata(): Promise<Metadata> {
  const hub = await getDestinationHub();
  const title = hub?.seo?.title || fallbackTitle;
  const description = hub?.seo?.description || fallbackDescription;
  return {
    // `title` já vem completo (com "Cays Turismo" no fim) — absolute evita
    // que o template do layout raiz ("%s | Cays Turismo") duplique o nome.
    title: { absolute: title },
    description,
    alternates: { canonical: "/destinos" },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/destinos`,
      ...(hub?.hero.image && { images: [{ url: hub.hero.image.src }] }),
    },
  };
}

/** "Onde ir agora" derivado do `months[]` real de cada destino (status "ideal" no mês atual) — nada inventado, sem precisar de um segundo schema de "seasonal picks". */
function buildWhereToGoNow(destinations: Awaited<ReturnType<typeof getDestinations>>, month: number): WhereToGoPick[] {
  const picks: WhereToGoPick[] = [];
  for (const d of destinations) {
    const monthGuide = d.months?.find((m) => m.month === month && m.status === "ideal");
    if (monthGuide) picks.push({ slug: d.slug, name: d.name, note: monthGuide.note ?? "", image: d.hero.image });
  }
  return picks.slice(0, 4);
}

export default async function DestinosHubPage() {
  const [destinations, hub, continents, experiences, products] = await Promise.all([
    getDestinations(),
    getDestinationHub(),
    getContinents(),
    getExperiences(),
    getTravelProducts(),
  ]);
  if (!hub) notFound();

  // `continent` é opcional no schema: um destino sem continente conhecido cai em "Outros destinos" em vez de sumir do hub.
  const known = new Set(continents.map((c) => c.slug));
  const themesMap = themesByDestination(destinations, products);
  const activeExperiences = getActiveOrderedItems(experiences);
  const explorerItems = getActiveOrderedItems(destinations).map((d) => ({
    slug: d.slug,
    name: d.name,
    image: d.hero.image,
    continent: d.continent && known.has(d.continent) ? d.continent : "outros",
    parent: d.parent,
    themes: (themesMap.get(d.slug) ?? []).filter((t) => activeExperiences.some((e) => e.slug === t)),
  }));
  // "Por tema": só temas que têm pelo menos um destino.
  const usedThemes = new Set(explorerItems.flatMap((d) => d.themes));
  const themeOptions = activeExperiences.filter((e) => usedThemes.has(e.slug)).map((e) => ({ slug: e.slug, name: e.name }));

  const currentMonth = new Date().getMonth() + 1;
  const whereToGoPicks = buildWhereToGoNow(destinations, currentMonth);

  return (
    <>
      <DestinosHero hero={hub.hero} />
      <Suspense fallback={<div className="h-96" aria-hidden />}>
        <DestinosExplorer destinations={explorerItems} continents={continentsWithCountries(continents, destinations)} themes={themeOptions} />
      </Suspense>
      <WhereToGoNow picks={whereToGoPicks} />
      <DestinationFinalCTA
        title="Ainda não sabe para onde ir?"
        supporting="Conte para a Cays o que você quer viver. A gente ajuda a decidir o destino."
        ctaLabel="Planejar minha viagem"
        ctaHref="/contato"
      />
    </>
  );
}
