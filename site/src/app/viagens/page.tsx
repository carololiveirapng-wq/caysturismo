import type { Metadata } from "next";
import { ShortHero } from "@/components/ui/short-hero";
import { FeaturedProducts } from "@/components/viagens-hub/featured-products";
import { TravelProductFilters } from "@/components/viagens-hub/filters";
import { ResultsGrid } from "@/components/viagens-hub/results-grid";
import { EditorialShortcuts } from "@/components/viagens-hub/editorial-shortcuts";
import { DestinationFinalCTA } from "@/components/destination/destination-final-cta";
import { Container } from "@/components/ui/container";
import { getTravelProducts, getExperiences, getDestinations } from "@/lib/cms";
import { getActiveOrderedItems, getFeaturedItems } from "@/lib/content";
import { filterTravelProducts, type TravelProductFilters as Filters } from "@/lib/travel-product-filters";
import { unsplash } from "@/data/home/shared";
import { siteConfig } from "@/lib/site-config";
import type { TravelProductType } from "@/types";

const title = "Viagens | Cays Turismo";
const description = "Roteiros sob medida, cruzeiros e viagens com data fixa — descubra as viagens com a curadoria da Cays Turismo.";

const heroImage = {
  src: unsplash("1530789253388-582c481c54b0", 2400),
  alt: "Balões de ar quente sobre a Capadócia ao amanhecer",
};

const VALID_TYPES: TravelProductType[] = ["custom", "fixed-date", "offer"];

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export async function generateMetadata({
  searchParams,
}: PageProps<"/viagens">): Promise<Metadata> {
  const params = await searchParams;
  const hasFilters = Object.keys(params).length > 0;

  return {
    // `title` já vem completo (com "Cays Turismo" no fim) — absolute evita
    // que o template do layout raiz ("%s | Cays Turismo") duplique o nome.
    title: { absolute: title },
    description,
    alternates: { canonical: "/viagens" },
    openGraph: { title, description, url: `${siteConfig.url}/viagens` },
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

  const [allProducts, experiences, destinations] = await Promise.all([
    getTravelProducts(),
    getExperiences(),
    getDestinations(),
  ]);
  const active = getActiveOrderedItems(allProducts);
  const featured = getFeaturedItems(active).slice(0, 2);
  const filtered = filterTravelProducts(active, filters);

  return (
    <>
      <ShortHero
        eyebrow="Viagens"
        title="Viagens para inspirar a próxima história."
        subtitle="Roteiros sob medida, cruzeiros e datas fixas — cada um com a mesma curadoria."
        image={heroImage}
      />

      <FeaturedProducts products={featured} />

      <section className="bg-ivory py-14 md:py-20">
        <Container>
          <TravelProductFilters
            experiences={experiences}
            destinations={destinations.filter((d) => d.active).map((d) => ({ slug: d.slug, name: d.name }))}
          />
          <div className="mt-10">
            <ResultsGrid products={filtered} />
          </div>
        </Container>
      </section>

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
