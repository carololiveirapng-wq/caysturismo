import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExperienciasHero } from "@/components/experiencias-hub/experiencias-hero";
import { ExperienceCategoryGrid } from "@/components/experiencias-hub/category-grid";
import { FeaturedJourneys } from "@/components/experiencias-hub/featured-journeys";
import { DestinationFinalCTA } from "@/components/destination/destination-final-cta";
import { getExperiences, getExperienceHub } from "@/lib/cms";
import { siteConfig } from "@/lib/site-config";
import type { ExperienceHubCard } from "@/data/experiences-hub";

const fallbackTitle = "Experiências | Cays Turismo";
const fallbackDescription =
  "Lua de mel, destination wedding, cruzeiros, safári e mais — descubra as experiências de viagem com a curadoria da Cays Turismo.";

export async function generateMetadata(): Promise<Metadata> {
  const hub = await getExperienceHub();
  const title = hub?.seo?.title || fallbackTitle;
  const description = hub?.seo?.description || fallbackDescription;
  return {
    // `title` já vem completo (com "Cays Turismo" no fim) — absolute evita
    // que o template do layout raiz ("%s | Cays Turismo") duplique o nome.
    title: { absolute: title },
    description,
    alternates: { canonical: "/experiencias" },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/experiencias`,
      ...(hub?.hero.image && { images: [{ url: hub.hero.image.src }] }),
    },
  };
}

export default async function ExperienciasHubPage() {
  const [experiences, hub] = await Promise.all([getExperiences(), getExperienceHub()]);
  if (!hub) notFound();
  const toCard = (e: (typeof experiences)[number]): ExperienceHubCard => ({
    slug: e.slug,
    name: e.name,
    image: e.hero.image,
  });
  const occasions = experiences.filter((e) => e.axis === "occasion").map(toCard);
  const styles = experiences.filter((e) => e.axis === "style").map(toCard);

  return (
    <>
      <ExperienciasHero hero={hub.hero} />
      <ExperienceCategoryGrid heading="Ocasiões" items={occasions} columnsClass="grid-cols-2 lg:grid-cols-4" />
      <ExperienceCategoryGrid heading="Estilos" items={styles} columnsClass="grid-cols-2 lg:grid-cols-3" />
      <FeaturedJourneys />
      <DestinationFinalCTA
        title="Qual é a viagem que só vocês vão viver?"
        supporting="Conte para a Cays o que você imagina. Nós cuidamos do caminho."
        ctaLabel="Planejar minha viagem"
        ctaHref="/contato"
      />
    </>
  );
}
