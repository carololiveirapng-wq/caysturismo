import type { Metadata } from "next";
import { ExperienciasHero } from "@/components/experiencias-hub/experiencias-hero";
import { ExperienceCategoryGrid } from "@/components/experiencias-hub/category-grid";
import { FeaturedJourneys } from "@/components/experiencias-hub/featured-journeys";
import { DestinationFinalCTA } from "@/components/destination/destination-final-cta";
import { occasions, styles } from "@/data/experiences-hub";
import { siteConfig } from "@/lib/site-config";

const title = "Experiências | Cays Turismo";
const description =
  "Lua de mel, destination wedding, cruzeiros, safári e mais — descubra as experiências de viagem com a curadoria da Cays Turismo.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/experiencias" },
  openGraph: { title, description, url: `${siteConfig.url}/experiencias` },
};

const OCCASION_SPANS = ["md:col-span-4", "md:col-span-2", "md:col-span-3", "md:col-span-3"];
const STYLE_SPANS = ["md:col-span-4", "md:col-span-2", "md:col-span-2", "md:col-span-2", "md:col-span-2", "md:col-span-6"];

export default function ExperienciasHubPage() {
  return (
    <>
      <ExperienciasHero />
      <ExperienceCategoryGrid heading="Ocasiões" items={occasions} tileSpans={OCCASION_SPANS} />
      <ExperienceCategoryGrid heading="Estilos" items={styles} tileSpans={STYLE_SPANS} />
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
