import type { BaseContent, DemoImage } from "./content";

/**
 * Nível geográfico do destino. A hierarquia real (o que é filho de quê) vem
 * de `parent`, não da URL — `/destinos/[slug]` funciona para qualquer nível.
 */
export type GeographyType = "continent" | "country" | "region" | "city";

/**
 * Cada campo é opcional de propósito: dado não confirmado não deve virar
 * afirmação de fato (visto, vacina, duração de voo). Quando não houver dado
 * verificado, a própria página mostra um texto neutro de orientação em vez
 * do campo — a decisão de omitir x mostrar-placeholder fica no componente.
 */
export interface DestinationKeyInfo {
  bestTime?: string;
  suggestedDuration?: string;
  timeZone?: string;
  currency?: string;
  language?: string;
  visa?: string;
  vaccines?: string;
  electricity?: string;
  flightFromBrazil?: string;
}

export interface DestinationArgument {
  title: string;
  text: string;
}

export interface DestinationJourney {
  slug: string;
  title: string;
  subtitle?: string;
  durationLabel?: string;
  typeLabel?: string;
  text?: string;
  image: DemoImage;
}

export interface DestinationExperienceHighlight {
  title: string;
  text: string;
  image: DemoImage;
}

export interface DestinationStay {
  name: string;
  region?: string;
  text?: string;
  image: DemoImage;
}

export interface DestinationMonthGuide {
  /** 1–12. */
  month: number;
  status: "ideal" | "good" | "avoid";
  note?: string;
}

export interface DestinationArticle {
  slug: string;
  title: string;
  category?: string;
  image: DemoImage;
}

export interface DestinationFaqItem {
  question: string;
  answer: string;
}

export interface DestinationRelatedPlace {
  slug: string;
  name: string;
  region?: string;
  image: DemoImage;
}

/**
 * Conteúdo completo da página-pilar de um destino (`/destinos/[slug]`).
 * Sem `slug` de página própria porque já herda de BaseContent — o slug é
 * o mesmo usado nos cards de Destino da Home (mesmo `id`/`slug` do Japão
 * em `data/home/destinations.ts`), para os dois nunca divergirem.
 *
 * Nenhuma seção é obrigatória além de `hero`: a página só renderiza os
 * blocos para os quais há dado, então um destino "incompleto" no painel
 * futuro simplesmente mostra menos seções, nunca uma seção vazia.
 */
export interface DestinationDetail extends BaseContent {
  name: string;
  type: GeographyType;
  /** Slug do destino "pai" na hierarquia (ex.: Kyoto → "japao"). */
  parent?: string;
  /** Trilha de navegação Home › Destinos › ... › Nome. Sem isto, cai no breadcrumb genérico Home › Destinos › Nome. */
  breadcrumb?: { label: string; href?: string }[];

  hero: {
    image: DemoImage;
    eyebrow?: string;
    title: string;
    subtitle?: string;
    /** Ex.: "Temporada 2026/2027" — apoio editorial, não literal no H1. */
    seasonLabel?: string;
  };

  introduction?: {
    heading: string;
    text: string;
  };

  keyInfo?: DestinationKeyInfo;
  whyCays?: {
    heading: string;
    image: DemoImage;
    items: DestinationArgument[];
  };
  journeys?: DestinationJourney[];
  experiences?: DestinationExperienceHighlight[];
  stays?: DestinationStay[];
  months?: DestinationMonthGuide[];
  articles?: DestinationArticle[];
  faq?: DestinationFaqItem[];
  relatedDestinations?: DestinationRelatedPlace[];

  seo?: {
    title?: string;
    description?: string;
  };
}
