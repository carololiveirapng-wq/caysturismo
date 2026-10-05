import { imageFragment } from "./fragments";
import { CONTINENT_LABEL_GROQ } from "./continent";

/**
 * `home` é singleton — sempre um único documento. Os arrays `featured*`
 * dereferenciam pro shape mínimo que cada seção da Home realmente usa
 * (não o objeto completo do destino/experiência/viagem/artigo), igual ao
 * padrão já usado nos hubs — ver `src/sanity/queries/destination.ts`. Todo
 * array vem com `coalesce(..., [])`: o GROQ devolve `null` (não `[]`) pra
 * um campo array totalmente ausente no documento, o que quebra `.map()` no
 * front-end — já aconteceu antes com um campo novo adicionado a um
 * documento já existente.
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
    "steps": coalesce(steps, [])
  },
  "featuredDestinations": coalesce(featuredDestinations[]->{
    "slug": slug.current,
    name,
    "image": hero.image${imageFragment},
    "region": ${CONTINENT_LABEL_GROQ},
    "shortDescription": hero.subtitle
  }, []),
  "destinationCollections": coalesce(destinationCollections[]{
    title,
    "destinations": coalesce(destinations[]->{
      "slug": slug.current,
      name,
      "image": hero.image${imageFragment},
      "region": ${CONTINENT_LABEL_GROQ},
      "shortDescription": hero.subtitle
    }, [])
  }, []),
  "featuredExperiences": coalesce(featuredExperiences[]->{
    "slug": slug.current,
    name,
    "image": hero.image${imageFragment},
    "shortDescription": hero.subtitle
  }, []),
  "featuredTravelProducts": coalesce(featuredTravelProducts[]->{
    "slug": slug.current,
    title,
    eyebrow,
    "image": gallery[0]${imageFragment},
    subtitle
  }, []),
  "featuredArticles": coalesce(featuredArticles[]->{
    "slug": slug.current,
    title,
    category,
    "image": heroImage${imageFragment},
    readingTime,
    publishedAt
  }, []),
  "travelerStories": coalesce(travelerStories[active != false] | order(order asc) {
    "image": image${imageFragment},
    caption,
    clientName,
    "destinationName": destination->name
  }, []),
  finalCta{ title, text, ctaLabel },
  seo
}`;
