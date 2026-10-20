import { imageFragment } from "./fragments";

/**
 * Espelha `TravelProduct` (`src/types/travel-product.ts`). `destinations`,
 * `experiences` e `gallery` são arrays OBRIGATÓRIOS no tipo local (sem
 * `?`), mas nada no schema do Sanity impede um editor publicar o
 * documento com esses campos vazios — e um array dereferenciado vazio
 * vira `null` em GROQ, não `[]`. `coalesce(..., [])` garante que a
 * página nunca recebe `null` onde o front-end espera sempre um array
 * (achado validando um documento de teste de verdade, não só a
 * estrutura da query — virava erro 500 em produção).
 */
const travelProductProjection = `{
  "id": _id,
  "slug": slug.current,
  active,
  featured,
  order,
  type,
  status,
  title,
  eyebrow,
  "destinations": coalesce(destinations[]->slug.current, []),
  "experiences": coalesce(experiences[]->slug.current, []),
  breadcrumb,
  "gallery": coalesce(gallery[]${imageFragment}, []),
  subtitle,
  duration,
  bestMonths,
  departures,
  priceFrom,
  supplier,
  ship,
  embarkation,
  disembarkation,
  overview,
  highlights,
  itinerary,
  "stays": coalesce(stays[]->{
    name,
    "region": location,
    "text": shortDescription,
    "image": image${imageFragment}
  }, []),
  cabinCategories,
  inclusions,
  exclusions,
  "related": coalesce(related[]->{
    "slug": slug.current,
    title,
    subtitle,
    "image": gallery[0]${imageFragment}
  }, []),
  "articles": coalesce(articles[]->{
    "slug": slug.current,
    title,
    category,
    "image": heroImage${imageFragment}
  }, []),
  "faq": coalesce(faq, []),
  seo
}`;

export const TRAVEL_PRODUCT_BY_SLUG_QUERY = `*[_type == "travelProduct" && slug.current == $slug && active == true][0]${travelProductProjection}`;

export const TRAVEL_PRODUCTS_QUERY = `*[_type == "travelProduct" && active == true] | order(order asc)${travelProductProjection}`;

export const TRAVEL_PRODUCT_SLUGS_QUERY = `*[_type == "travelProduct" && active == true].slug.current`;
