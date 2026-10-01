import type { Metadata } from "next";
import { DestinosHero } from "@/components/destinos-hub/destinos-hero";
import { DestinosTabs } from "@/components/destinos-hub/destinos-tabs";
import { FeaturedDestinations } from "@/components/destinos-hub/featured-destinations";
import { WhereToGoNow, type WhereToGoPick } from "@/components/destinos-hub/where-to-go-now";
import { ExperienceShortcut } from "@/components/destinos-hub/experience-shortcut";
import { DestinationFinalCTA } from "@/components/destination/destination-final-cta";
import { getDestinations } from "@/lib/cms";
import { siteConfig } from "@/lib/site-config";
import type { AZDestination } from "@/data/destinations-hub";

const title = "Destinos | Cays Turismo";
const description =
  "Explore os destinos da curadoria Cays Turismo por continente ou em ordem alfabética, e descubra para onde ir em cada época do ano.";

export const metadata: Metadata = {
  // `title` já vem completo (com "Cays Turismo" no fim) — absolute evita
  // que o template do layout raiz ("%s | Cays Turismo") duplique o nome.
  title: { absolute: title },
  description,
  alternates: { canonical: "/destinos" },
  openGraph: { title, description, url: `${siteConfig.url}/destinos` },
};

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
  const destinations = await getDestinations();

  const azItems: AZDestination[] = destinations
    .filter((d) => d.continent)
    .map((d) => ({ slug: d.slug, name: d.name, image: d.hero.image, continentSlug: d.continent! }));

  const featuredItems = destinations
    .filter((d) => d.featured)
    .slice(0, 4)
    .map((d) => ({ slug: d.slug, name: d.name, image: d.hero.image }));

  const currentMonth = new Date().getMonth() + 1;
  const whereToGoPicks = buildWhereToGoNow(destinations, currentMonth);

  return (
    <>
      <DestinosHero />
      <DestinosTabs items={azItems} />
      <FeaturedDestinations items={featuredItems} />
      <WhereToGoNow picks={whereToGoPicks} />
      <ExperienceShortcut />
      <DestinationFinalCTA
        title="Ainda não sabe para onde ir?"
        supporting="Conte para a Cays o que você quer viver. A gente ajuda a decidir o destino."
        ctaLabel="Planejar minha viagem"
        ctaHref="/contato"
      />
    </>
  );
}
