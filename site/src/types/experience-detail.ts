import type { BaseContent, DemoImage } from "./content";

export type ExperienceAxis = "occasion" | "style";

export interface ExperienceSubtype {
  slug: string;
  name: string;
  text?: string;
  image: DemoImage;
}

/** "Onde ir por mês" — sugestão de destino por mês, não status de clima. */
export interface ExperienceMonthlyPick {
  month: number;
  destinationName: string;
  destinationSlug?: string;
  note?: string;
}

export interface ExperienceStep {
  title: string;
  text: string;
}

/** Tipo de companhia parceira — descritivo, não nomes reais de marca. */
export interface ExperiencePartnerType {
  name: string;
  text?: string;
}

export interface ExperienceArticleRef {
  slug: string;
  title: string;
  category?: string;
  image: DemoImage;
}

export interface ExperienceDestinationRef {
  slug: string;
  name: string;
  region?: string;
  image: DemoImage;
}

export interface ExperienceJourneyRef {
  slug: string;
  title: string;
  subtitle?: string;
  image: DemoImage;
}

/**
 * Página de experiência por ocasião ("Lua de Mel") ou estilo ("Cruzeiros").
 * `axis` diferencia as duas famílias; o restante são blocos opcionais —
 * cada experiência usa só os que fazem sentido pra ela.
 */
export interface ExperienceDetail extends BaseContent {
  name: string;
  axis: ExperienceAxis;

  hero: { image: DemoImage; eyebrow?: string; title: string; subtitle?: string };
  breadcrumb?: { label: string; href?: string }[];

  manifesto?: string;
  howItWorks?: ExperienceStep[];
  monthlyPicks?: ExperienceMonthlyPick[];
  featuredDestinations?: ExperienceDestinationRef[];
  subtypes?: ExperienceSubtype[];
  partnerTypes?: ExperiencePartnerType[];
  journeys?: ExperienceJourneyRef[];
  articles?: ExperienceArticleRef[];
  faq?: { question: string; answer: string }[];

  seo?: { title?: string; description?: string };
}
