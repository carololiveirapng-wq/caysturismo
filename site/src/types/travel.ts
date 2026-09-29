import type { DemoImage } from "./content";

/**
 * Modelo do buscador de curadoria (seção "Descoberta"). Os campos extras
 * (active, featured, order) não têm efeito no front-end mockado — existem
 * para que o mesmo shape sirva quando um painel administrativo passar a
 * alimentar esses dados.
 */
export interface DiscoveryDestination {
  slug: string;
  name: string;
  regionSlug: string;
  active?: boolean;
  featured?: boolean;
  order?: number;
}

export interface DiscoveryRegion {
  slug: string;
  name: string;
  destinations: DiscoveryDestination[];
}

export interface DiscoveryExperience {
  slug: string;
  name: string;
  description?: string;
  active?: boolean;
}

export interface DiscoveryMonth {
  slug: string;
  label: string;
  year: number;
  /** "recommended" is a curatorial hint, never real inventory/availability. */
  status: "default" | "recommended";
  /** Mês já passado no ano corrente — não pode ser selecionado. */
  disabled?: boolean;
}

export interface MockJourney {
  slug: string;
  title: string;
  destinationSlug: string;
  destinationName: string;
  experienceSlug: string;
  experienceName: string;
  /** Free-form display period, e.g. "Março a Maio" — not a real date range. */
  period: string;
  summary: string;
  image: DemoImage;
  status?: "draft" | "published";
  featured?: boolean;
}
