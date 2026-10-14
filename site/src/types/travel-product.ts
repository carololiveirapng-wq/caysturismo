import type { BaseContent, DemoImage } from "./content";

export type TravelProductType = "custom" | "fixed-date" | "offer";
export type TravelProductStatus = "active" | "few-spots" | "sold-out" | "expired" | "check-availability";

export interface TravelProductHighlight {
  title: string;
  text: string;
}

/** Uma parada do roteiro — "Dias 1–3" (sob medida) ou "Dia 1" (data fixa/cruzeiro). */
export interface ItineraryStop {
  label: string;
  place: string;
  text?: string;
  /** "Embarque" / "Desembarque" — só cruzeiros. */
  tag?: string;
}

export interface TravelProductStay {
  name: string;
  region?: string;
  text?: string;
  image: DemoImage;
}

export interface TravelProductDeparture {
  label: string;
  status: TravelProductStatus;
}

export interface TravelProductArticleRef {
  slug: string;
  title: string;
  category?: string;
  image: DemoImage;
}

export interface RelatedProductRef {
  slug: string;
  title: string;
  subtitle?: string;
  image: DemoImage;
}

/**
 * Produto de viagem — sob medida, data fixa (ex.: cruzeiro) ou oferta.
 * Um único tipo cobre os dois modos: campos que só fazem sentido num modo
 * (ex.: `departures` para data fixa, `bestMonths` para sob medida) ficam
 * opcionais e o template só renderiza o que existe.
 */
export interface TravelProduct extends BaseContent {
  type: TravelProductType;
  status: TravelProductStatus;
  title: string;
  eyebrow?: string;

  /** Slugs de destinos relacionados (Home/`/destinos/[slug]`). */
  destinations: string[];
  /** Slugs de experiências relacionadas (`/experiencias/[slug]`). */
  experiences: string[];

  breadcrumb?: { label: string; href?: string }[];
  gallery: DemoImage[];
  subtitle?: string;

  duration?: string;
  /** Sob medida: "Mar–Mai" etc. */
  bestMonths?: string;
  /** Data fixa: datas de saída com status próprio. */
  departures?: TravelProductDeparture[];
  priceFrom?: string;
  supplier?: string;
  ship?: string;
  embarkation?: string;
  disembarkation?: string;

  overview?: string;
  highlights?: TravelProductHighlight[];
  itinerary?: ItineraryStop[];
  stays?: TravelProductStay[];
  cabinCategories?: { name: string; text?: string }[];
  inclusions?: string[];
  exclusions?: string[];
  related?: RelatedProductRef[];
  articles?: TravelProductArticleRef[];
  faq?: { question: string; answer: string }[];

  seo?: { title?: string; description?: string };
}
