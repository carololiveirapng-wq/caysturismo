import type { Metadata } from "next";
import { ShortHero } from "@/components/ui/short-hero";
import { FeaturedArticle } from "@/components/curadoria/featured-article";
import { LatestSection } from "@/components/curadoria/latest-section";
import { ByDestination } from "@/components/curadoria/by-destination";
import { ByExperience } from "@/components/curadoria/by-experience";
import { DestinationFinalCTA } from "@/components/destination/destination-final-cta";
import { curadoriaCategories } from "@/data/curadoria";
import { getArticles } from "@/lib/cms";
import { getActiveOrderedItems, getFeaturedItems } from "@/lib/content";
import { unsplash } from "@/data/home/shared";
import { siteConfig } from "@/lib/site-config";

const title = "Curadoria | Cays Turismo";
const description = "Destinos, histórias e ideias para viajar melhor — a curadoria editorial da Cays Turismo.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/curadoria" },
  openGraph: { title, description, url: `${siteConfig.url}/curadoria` },
};

const heroImage = {
  src: unsplash("1476514525535-07fb3b4ae5f1", 2400),
  alt: "Barco de madeira em lago alpino cercado por montanhas nas Dolomitas",
};

export default async function CuradoriaHubPage() {
  const allArticles = await getArticles();
  const active = getActiveOrderedItems(allArticles);
  const featured = getFeaturedItems(allArticles)[0] ?? active[0];

  return (
    <>
      <ShortHero
        eyebrow="Curadoria"
        title="Curadoria Cays"
        subtitle="Destinos, histórias e ideias para viajar melhor."
        image={heroImage}
      />

      {featured && <FeaturedArticle article={featured} />}

      <LatestSection articles={active} categories={curadoriaCategories} />

      <ByDestination />
      <ByExperience />

      <DestinationFinalCTA
        title="Gostou do que leu? Vamos transformar em roteiro."
        supporting="Conte para a Cays o que você imagina viver. Nós cuidamos do caminho."
        ctaLabel="Planejar minha viagem"
        ctaHref="/contato"
      />
    </>
  );
}
