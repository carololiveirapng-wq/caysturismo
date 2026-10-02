import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ShortHero } from "@/components/ui/short-hero";
import { FeaturedArticle } from "@/components/curadoria/featured-article";
import { LatestSection } from "@/components/curadoria/latest-section";
import { ByDestination } from "@/components/curadoria/by-destination";
import { ByExperience } from "@/components/curadoria/by-experience";
import { DestinationFinalCTA } from "@/components/destination/destination-final-cta";
import { curadoriaCategories } from "@/data/curadoria";
import { getArticles, getCuradoriaHub } from "@/lib/cms";
import { getActiveOrderedItems, getFeaturedItems } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";

const fallbackTitle = "Curadoria | Cays Turismo";
const fallbackDescription = "Destinos, histórias e ideias para viajar melhor — a curadoria editorial da Cays Turismo.";

export async function generateMetadata(): Promise<Metadata> {
  const hub = await getCuradoriaHub();
  const title = hub?.seo?.title || fallbackTitle;
  const description = hub?.seo?.description || fallbackDescription;
  return {
    // `title` já vem completo (com "Cays Turismo" no fim) — absolute evita
    // que o template do layout raiz ("%s | Cays Turismo") duplique o nome.
    title: { absolute: title },
    description,
    alternates: { canonical: "/curadoria" },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/curadoria`,
      ...(hub?.hero.image && { images: [{ url: hub.hero.image.src }] }),
    },
  };
}

export default async function CuradoriaHubPage() {
  const [allArticles, hub] = await Promise.all([getArticles(), getCuradoriaHub()]);
  if (!hub) notFound();
  const active = getActiveOrderedItems(allArticles);
  const featured = getFeaturedItems(allArticles)[0] ?? active[0];

  return (
    <>
      <ShortHero
        eyebrow={hub.hero.eyebrow ?? "Curadoria"}
        title={hub.hero.title}
        subtitle={hub.hero.text}
        image={hub.hero.image}
      />

      {featured && <FeaturedArticle article={featured} />}

      <LatestSection articles={active} categories={curadoriaCategories} />

      <ByDestination destinations={hub.spotlightDestinations ?? []} />
      <ByExperience experiences={hub.spotlightExperiences ?? []} />

      <DestinationFinalCTA
        title="Gostou do que leu? Vamos transformar em roteiro."
        supporting="Conte para a Cays o que você imagina viver. Nós cuidamos do caminho."
        ctaLabel="Planejar minha viagem"
        ctaHref="/contato"
      />
    </>
  );
}
