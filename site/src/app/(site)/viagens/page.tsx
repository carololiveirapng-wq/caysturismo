import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ShortHero } from "@/components/ui/short-hero";
import { FeaturedProducts } from "@/components/viagens-hub/featured-products";
import { TravelProductFilters } from "@/components/viagens-hub/filters";
import { ResultsGrid } from "@/components/viagens-hub/results-grid";
import { EditorialShortcuts } from "@/components/viagens-hub/editorial-shortcuts";
import { ExploraJourneysSpotlight } from "@/components/experience/explora-journeys-spotlight";
import { DestinationFinalCTA } from "@/components/destination/destination-final-cta";
import { Container } from "@/components/ui/container";
import { getTravelProducts, getExperiences, getDestinations, getTravelHub } from "@/lib/cms";
import { getActiveOrderedItems, getFeaturedItems } from "@/lib/content";
import { filterTravelProducts, type TravelProductFilters as Filters } from "@/lib/travel-product-filters";
import { siteConfig } from "@/lib/site-config";
import type { TravelProductType } from "@/types";

const fallbackTitle = "Viagens | Cays Turismo";
const fallbackDescription = "Roteiros sob medida, cruzeiros e viagens com data fixa — descubra as viagens com a curadoria da Cays Turismo.";

const VALID_TYPES: TravelProductType[] = ["custom", "fixed-date", "offer"];

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

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

export default async function ViagensHubPage({ searchParams }: PageProps<"/viagens">) {
  const params = await searchParams;
  const rawTipo = first(params.tipo);

  const filters: Filters = {
    destino: first(params.destino),
    experiencia: first(params.experiencia),
    tipo: rawTipo && VALID_TYPES.includes(rawTipo as TravelProductType) ? (rawTipo as TravelProductType) : undefined,
    duracao: first(params.duracao),
    periodo: first(params.periodo),
  };

  const [allProducts, experiences, destinations, hub] = await Promise.all([
    getTravelProducts(),
    getExperiences(),
    getDestinations(),
    getTravelHub(),
  ]);
  if (!hub) notFound();
  const active = getActiveOrderedItems(allProducts);
  const featured = getFeaturedItems(active).slice(0, 2);
  const filtered = filterTravelProducts(active, filters);

  // Com um catálogo pequeno, "Em destaque" só faz sentido quando sobra algo
  // além dele pra descobrir na grade abaixo — senão é a mesma viagem duas
  // vezes na mesma página.
  const showFeatured = featured.length > 0 && featured.length < active.length;

  // Os dropdowns de destino/experiência só listam o que de fato tem viagem
  // associada — selecionar qualquer outra opção sempre voltaria zero
  // resultados, o que faz o catálogo parecer maior do que é.
  const availableDestinationSlugs = new Set(active.flatMap((p) => p.destinations));
  const availableExperienceSlugs = new Set(active.flatMap((p) => p.experiences));
  const filterableDestinations = destinations
    .filter((d) => d.active && availableDestinationSlugs.has(d.slug))
    .map((d) => ({ slug: d.slug, name: d.name }));
  const filterableExperiences = experiences.filter((exp) => availableExperienceSlugs.has(exp.slug));

  return (
    <>
      <ShortHero
        eyebrow={hub.hero.eyebrow ?? "Viagens"}
        title={hub.hero.title}
        subtitle={hub.hero.text}
        image={hub.hero.image}
      />

      {showFeatured && <FeaturedProducts products={featured} />}

      <section className="bg-ivory py-14 md:py-20">
        <Container>
          <TravelProductFilters
            experiences={filterableExperiences}
            destinations={filterableDestinations}
          />
          <div className="mt-10">
            <ResultsGrid products={filtered} />
          </div>
        </Container>
      </section>

      <ExploraJourneysSpotlight tone="sand" />

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
