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
  /** Slug do continente (ver `src/data/destinations-hub.ts`) — usado pro filtro do hub /destinos. */
  continent?: string;
  /** Trilha de navegação Home › Destinos › ... › Nome. Sem isto, cai no breadcrumb genérico Home › Destinos › Nome. */
  breadcrumb?: { label: string; href?: string }[];

  hero: {
    image: DemoImage;
    eyebrow?: string;
    title: string;
    subtitle?: string;
    /** Ex.: "Temporada 2026/2027" — apoio editorial, não literal no H1. */
    seasonLabel?: string;
    /**
     * Rótulo do CTA no hero. Sem isto, o componente usa "Planejar viagem" —
     * um texto neutro de propósito, já que "Planejar viagem ao/à/às {name}"
     * exige a preposição certa em português (ao Japão, à Itália, às
     * Maldivas...) e essa concordância varia por destino.
     */
    ctaLabel?: string;
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
  /** Título da seção de Jornadas. Sem isto, usa "Jornadas sugeridas". */
  journeysHeading?: string;
  experiences?: DestinationExperienceHighlight[];
  /** Título da seção "O que viver". Sem isto, usa "O que viver". */
  experiencesHeading?: string;
  stays?: DestinationStay[];
  months?: DestinationMonthGuide[];
  /** Título da seção "Quando ir". Sem isto, usa "Quando ir". */
  monthsHeading?: string;
  articles?: DestinationArticle[];
  faq?: DestinationFaqItem[];
  relatedDestinations?: DestinationRelatedPlace[];

  /** Faixa de CTA inline exibida após a seção "Quando ir". Editorial curto, sem seção própria. */
  seasonCta?: {
    title: string;
    supporting?: string;
  };
  /** CTA final de página inteira, antes do rodapé. */
  finalCta?: {
    title: string;
    supporting?: string;
    note?: string;
  };

  seo?: {
    title?: string;
    description?: string;
  };
}
