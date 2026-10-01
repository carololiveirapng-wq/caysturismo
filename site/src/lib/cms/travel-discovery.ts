import { getDestinations } from "./destinations";
import { getExperiences } from "./experiences";
import { continents } from "@/data/destinations-hub";
import type { DiscoveryRegion, DiscoveryExperience } from "@/types";

/**
 * Opções reais (do CMS) pro seletor de destino/experiência da Home — não as
 * "viagens sugeridas" do widget, que seguem mockadas (ver `@/data/travel-discovery`).
 * `continents` é taxonomia fixa (slug→nome de continente), não conteúdo
 * editorial, por isso segue vindo de `@/data`.
 */
export async function getDiscoveryOptions(): Promise<{
  regions: DiscoveryRegion[];
  experiences: DiscoveryExperience[];
}> {
  const [destinations, experienceDetails] = await Promise.all([getDestinations(), getExperiences()]);

  const countries = destinations.filter((d) => d.type === "country" && d.continent);

  const regions = continents
    .map((continent) => ({
      slug: continent.slug,
      name: continent.name,
      destinations: countries
        .filter((d) => d.continent === continent.slug)
        .map((d) => ({ slug: d.slug, name: d.name, regionSlug: continent.slug })),
    }))
    .filter((region) => region.destinations.length > 0);

  const experiences = experienceDetails.map((e) => ({ slug: e.slug, name: e.name }));

  return { regions, experiences };
}
