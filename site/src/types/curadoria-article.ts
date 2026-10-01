import type { PortableTextBlock } from "@portabletext/types";
import type { BaseContent, DemoImage } from "./content";

export interface RichTextBlock {
  type: "richText";
  content: PortableTextBlock[];
}

export interface ImageFullBlock {
  type: "imageFull";
  image: DemoImage;
  caption?: string;
}

export interface ImageTextBlock {
  type: "imageText";
  image: DemoImage;
  heading?: string;
  text: string;
  imagePosition?: "left" | "right";
}

export interface GalleryBlock {
  type: "gallery";
  images: DemoImage[];
}

export interface QuoteBlock {
  type: "quote";
  text: string;
  author?: string;
}

/** "Nota do especialista" — voz editorial da Cays dentro do artigo. */
export interface ExpertNoteBlock {
  type: "expertNote";
  text: string;
  author?: string;
}

export interface CtaBlock {
  type: "cta";
  title: string;
  supporting?: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface TravelCardBlock {
  type: "travelCard";
  slug: string;
  title: string;
  subtitle?: string;
  image: DemoImage;
}

export interface DestinationCardBlock {
  type: "destinationCard";
  slug: string;
  name: string;
  region?: string;
  image: DemoImage;
}

export type ArticleBlock =
  | RichTextBlock
  | ImageFullBlock
  | ImageTextBlock
  | GalleryBlock
  | QuoteBlock
  | ExpertNoteBlock
  | CtaBlock
  | TravelCardBlock
  | DestinationCardBlock;

/** Um trecho do corpo do artigo — o heading vira também um item do índice lateral. */
export interface ArticleSection {
  id: string;
  heading: string;
  blocks: ArticleBlock[];
}

/**
 * Artigo da Curadoria. `sections` é o "corpo" em blocos (não um texto único
 * gigante) — cada seção tem um heading próprio, usado tanto no corpo quanto
 * no índice sticky. `author` é sempre uma voz institucional (ex. "Curadoria
 * Cays"), nunca uma pessoa inventada.
 */
export interface CuradoriaArticle extends BaseContent {
  title: string;
  category: string;
  destinationIds?: string[];
  experienceIds?: string[];
  author?: string;
  publishedAt?: string;
  updatedAt?: string;
  readingTime?: number;
  heroImage: DemoImage;
  excerpt: string;
  breadcrumb?: { label: string; href?: string }[];

  sections: ArticleSection[];
  faq?: { question: string; answer: string }[];

  relatedTravelProducts?: string[];
  relatedDestination?: string;
  relatedArticles?: string[];

  seo?: { title?: string; description?: string };
}
