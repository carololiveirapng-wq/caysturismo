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

/** As 4 páginas-hub (Destinos/Experiências/Viagens/Curadoria) compartilham este shape. */
export interface HubPageContent {
  hero: { eyebrow?: string; title: string; text?: string; image: DemoImage };
  seo?: { title?: string; description?: string };
}
