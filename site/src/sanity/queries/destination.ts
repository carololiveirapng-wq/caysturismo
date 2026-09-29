import { imageFragment } from "./fragments";

/**
 * Reshapa o documento Sanity pro formato exato de `DestinationDetail`
 * (`src/types/destination-detail.ts`) — a página não sabe se o dado veio
 * daqui ou do mock. NÃO testado contra um dataset real (sem projeto Sanity
 * configurado neste ambiente); a forma da query segue o schema em
 * `src/sanity/schema-types/destination.ts`, mas precisa validação contra
 * conteúdo real antes de confiar em produção.
 */
const destinationProjection = `{
  "id": _id,
  "slug": slug.current,
  active,
  featured,
  order,
  name,
  type,
  "parent": parent->slug.current,
  breadcrumb,
  hero{
    "image": image${imageFragment},
    eyebrow,
    title,
    subtitle,
    seasonLabel
  },
  introduction,
  keyInfo,
  whyCays{
    heading,
    "image": image${imageFragment},
    items
  },
  "journeys": journeys[]->{
    "slug": slug.current,
    title,
    subtitle,
    "durationLabel": duration,
    "typeLabel": type,
    "image": gallery[0]${imageFragment}
  },
  "experiences": experiences[]{
    title,
    text,
    "image": image${imageFragment}
  },
  "stays": stays[]{
    name,
    region,
    text,
    "image": image${imageFragment}
  },
  months,
  "articles": articles[]->{
    "slug": slug.current,
    title,
    category,
    "image": heroImage${imageFragment}
  },
  faq,
  "relatedDestinations": relatedDestinations[]->{
    "slug": slug.current,
    name,
    "region": type,
    "image": hero.image${imageFragment}
  },
  seo
}`;

export const DESTINATION_BY_SLUG_QUERY = `*[_type == "destination" && slug.current == $slug && active == true][0]${destinationProjection}`;

export const DESTINATIONS_QUERY = `*[_type == "destination" && active == true] | order(order asc)${destinationProjection}`;

export const DESTINATION_SLUGS_QUERY = `*[_type == "destination" && active == true].slug.current`;
