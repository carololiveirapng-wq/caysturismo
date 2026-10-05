import { imageFragment } from "./fragments";
import { CONTINENT_LABEL_GROQ } from "./continent";

/**
 * Reshapa o documento Sanity pro formato exato de `DestinationDetail`
 * (`src/types/destination-detail.ts`) — a página não sabe se o dado veio
 * daqui ou do mock. `whyCays.items` é array obrigatório no tipo local
 * quando `whyCays` existe, mas nada no schema impede publicar sem
 * preencher `items` — um array dereferenciado/ausente vira `null` em
 * GROQ, não `[]`, e quebra o `.map()` do front-end (validado contra um
 * documento real, não só a estrutura da query).
 */
const destinationProjection = `{
  "id": _id,
  "slug": slug.current,
  active,
  featured,
  order,
  name,
  type,
  continent,
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
    "items": coalesce(items, [])
  },
  "journeys": journeys[]->{
    "slug": slug.current,
    title,
    subtitle,
    "durationLabel": duration,
    "typeLabel": select(
      type == "custom" => "Sob medida",
      type == "fixed-date" => "Data fixa",
      type == "offer" => "Oferta",
      type
    ),
    "image": gallery[0]${imageFragment}
  },
  "experiences": experiences[]{
    title,
    text,
    "image": image${imageFragment}
  },
  "stays": coalesce(stays[]->{
    name,
    "region": location,
    "text": shortDescription,
    "image": image${imageFragment}
  }, []),
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
    "region": ${CONTINENT_LABEL_GROQ},
    "image": hero.image${imageFragment}
  },
  seo
}`;

export const DESTINATION_BY_SLUG_QUERY = `*[_type == "destination" && slug.current == $slug && active == true][0]${destinationProjection}`;

export const DESTINATIONS_QUERY = `*[_type == "destination" && active == true] | order(order asc)${destinationProjection}`;

export const DESTINATION_SLUGS_QUERY = `*[_type == "destination" && active == true].slug.current`;
