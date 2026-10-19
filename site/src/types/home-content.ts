import type { DemoImage, ProcessStep } from "./content";

export interface HomeFeaturedDestination {
  slug: string;
  name: string;
  image: DemoImage;
  region?: string;
  shortDescription?: string;
}

export interface HomeFeaturedExperience {
  slug: string;
  name: string;
  image: DemoImage;
  shortDescription?: string;
}

export interface HomeFeaturedTravelProduct {
  slug: string;
  title: string;
  eyebrow?: string;
  image: DemoImage;
  subtitle?: string;
}

export interface HomeFeaturedArticle {
  slug: string;
  title: string;
  category: string;
  image: DemoImage;
  readingTime?: number;
  publishedAt?: string;
}

export interface HomeTravelerStory {
  image: DemoImage;
  caption: string;
  clientName?: string;
  destinationName?: string;
}

export interface HomeDestinationCollection {
  title: string;
  destinations: HomeFeaturedDestination[];
}

export interface HomeBeyondItinerary {
  heading?: string;
  text?: string;
  items: string[];
}

/**
 * Conteúdo da Home vindo do singleton `home` no Sanity (ou do fallback
 * mock montado em `src/lib/cms/home.ts` quando o CMS não está
 * configurado). O slogan e "desde {ano}" NÃO estão aqui — vêm de
 * `SiteSettings` (`slogan`/`foundedDate`), fonte única reaproveitada
 * também em /sobre.
 */
export interface HomeContent {
  hero: {
    mediaType: "image" | "images" | "video";
    image?: DemoImage;
    images?: DemoImage[];
    video?: string;
    videoPoster?: DemoImage;
    title: string;
    text?: string;
    ctaLabel?: string;
    ctaHref?: string;
  };
  travelDiscovery?: { title?: string; text?: string };
  manifesto?: { eyebrow?: string; heading?: string; text: string };
  positioning?: { heading?: string; text?: string };
  process?: { heading?: string; intro?: string; steps?: ProcessStep[] };
  featuredDestinations: HomeFeaturedDestination[];
  destinationCollections: HomeDestinationCollection[];
  featuredExperiences: HomeFeaturedExperience[];
  featuredTravelProducts: HomeFeaturedTravelProduct[];
  featuredArticles: HomeFeaturedArticle[];
  travelerStories: HomeTravelerStory[];
  beyondItinerary?: HomeBeyondItinerary;
  finalCta?: { title?: string; text?: string; ctaLabel?: string };
  seo?: { title?: string; description?: string };
}
