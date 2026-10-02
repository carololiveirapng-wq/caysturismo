import type { DemoImage } from "./content";

export interface AboutTimelineEntry {
  year?: number;
  label?: string;
  title: string;
  text?: string;
}

export interface AboutPillar {
  title: string;
  description?: string;
  order?: number;
}

export interface AboutPageContent {
  hero: { eyebrow?: string; title: string; text?: string; image?: DemoImage };
  history?: { title?: string; text?: string; timeline?: AboutTimelineEntry[] };
  positioning?: { title?: string; text?: string };
  philosophy?: { title?: string; text?: string };
  pillars: AboutPillar[];
  finalCta?: { title?: string; text?: string; ctaLabel?: string };
  seo?: { title?: string; description?: string };
}

export interface HubSpotlightItem {
  slug: string;
  name: string;
  image: DemoImage;
}

/**
 * As 4 páginas-hub (Destinos/Experiências/Viagens/Curadoria) compartilham o
 * hero+seo; `spotlightDestinations`/`spotlightExperiences` só existem em
 * quem tem o bloco de destaque correspondente (Destinos/Curadoria) — vazio
 * nos outros 2, nunca `undefined` (facilita checar `.length` sem optional
 * chaining em todo lugar).
 */
export interface HubPageContent {
  hero: { eyebrow?: string; title: string; text?: string; image: DemoImage };
  spotlightDestinations?: HubSpotlightItem[];
  spotlightExperiences?: HubSpotlightItem[];
  seo?: { title?: string; description?: string };
}
