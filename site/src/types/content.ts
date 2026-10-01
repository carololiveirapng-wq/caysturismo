export interface DemoImage {
  src: string;
  alt: string;
}

/**
 * Formato comum a qualquer conteúdo que um painel administrativo futuro
 * vai listar, ativar/desativar, destacar e reordenar. `slug` fica de fora
 * quando a entidade não tem página própria (ex.: GoogleReview).
 */
export interface BaseContent {
  id: string;
  slug: string;
  active: boolean;
  featured?: boolean;
  order: number;
}

export interface ProcessStep {
  number: string;
  title: string;
  text: string;
}

/**
 * Coleção editorial que a seção de Destinos (com abas) usa para agrupar
 * cards no mesmo espaço visual. Um destino pode pertencer a só uma.
 */
export type DestinationCollection = "featured" | "special" | "cruise" | "new";

export interface Destination extends BaseContent {
  name: string;
  region?: string;
  country?: string;
  image: DemoImage;
  shortDescription?: string;
  eyebrow?: string;
  collection: DestinationCollection;
}

export interface Experience extends BaseContent {
  title: string;
  image: DemoImage;
  shortDescription?: string;
  eyebrow?: string;
}

export interface JournalPost extends BaseContent {
  title: string;
  category: string;
  image: DemoImage;
  excerpt?: string;
  /** Minutos de leitura — número, não string, pra não depender de parsing na exibição. */
  readingTime?: number;
  publishedAt?: string;
}

export interface FeaturedJourney extends BaseContent {
  title: string;
  eyebrow?: string;
  image: DemoImage;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

/**
 * Formato de uma avaliação do Google (Google Business Profile / Places).
 * Sem slug de propósito — uma avaliação não tem página própria.
 *
 * Nada aqui pode ser inventado em produção: `rating` precisa refletir a nota
 * real, `authorName`/`text`/`relativeTime` vêm exatamente da fonte, e
 * `reviewUrl` só existe quando temos o link real "ver no Google". Enquanto
 * a integração não existe, os dados ficam marcados como TEMP em
 * `data/home/reviews.ts`.
 */
/** Membro real da equipe (schema `person` no Sanity) — nunca um placeholder/nome inventado. */
export interface Person {
  id: string;
  name: string;
  role?: string;
  bio?: string;
  photo?: DemoImage;
  specialties?: string[];
  active: boolean;
  order: number;
}

export type GoogleReview = Omit<BaseContent, "slug"> & {
  authorName: string;
  /** 1 a 5 — nunca assumir 5 por padrão. */
  rating: number;
  text: string;
  /** Texto relativo da própria fonte (ex. "há 2 meses"), não calculado aqui. */
  relativeTime?: string;
  /** Link "ver no Google" — só existe quando temos a URL real da avaliação. */
  reviewUrl?: string;
};
