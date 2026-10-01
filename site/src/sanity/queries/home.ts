import { imageFragment } from "./fragments";

/**
 * `home` é singleton — sempre um único documento. Os arrays `featured*`
 * dereferenciam pro shape mínimo que cada seção da Home realmente usa
 * (não o objeto completo do destino/experiência/viagem/artigo), igual ao
 * padrão já usado nos hubs — ver `src/sanity/queries/destination.ts`.
 */
export const HOME_QUERY = `*[_type == "home"][0]{
  hero{
    "image": image${imageFragment},
    title,
    text,
    ctaLabel,
    ctaHref
  },
  travelDiscovery{ title, text },
  manifesto{ eyebrow, heading, text },
  positioning{ heading, text },
  process{
    heading,
    intro,
    steps
  },
  "featuredDestinations": featuredDestinations[]->{
    "slug": slug.current,
    name,
    "image": hero.image${imageFragment},
    "region": type,
    "shortDescription": hero.subtitle
  },
  "featuredExperiences": featuredExperiences[]->{
    "slug": slug.current,
    name,
    "image": hero.image${imageFragment},
    "shortDescription": hero.subtitle
  },
  "featuredTravelProducts": featuredTravelProducts[]->{
    "slug": slug.current,
    title,
    eyebrow,
    "image": gallery[0]${imageFragment},
    subtitle
  },
  "featuredArticles": featuredArticles[]->{
    "slug": slug.current,
    title,
    category,
    "image": heroImage${imageFragment},
    readingTime,
    publishedAt
  },
  "travelerStories": travelerStories[]{
    "image": image${imageFragment},
    caption,
    clientName,
    "destinationName": destination->name
  },
  finalCta{ title, text, ctaLabel },
  seo
}`;
