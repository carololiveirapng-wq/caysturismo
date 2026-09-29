import { imageFragment } from "./fragments";

/** Espelha `TravelProduct` (`src/types/travel-product.ts`). Não testado contra dataset real — ver nota em `destination.ts`. */
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
  "destinations": destinations[]->slug.current,
  "experiences": experiences[]->slug.current,
  breadcrumb,
  "gallery": gallery[]${imageFragment},
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
  "stays": stays[]{
    name,
    region,
    text,
    "image": image${imageFragment}
  },
  cabinCategories,
  inclusions,
  exclusions,
  "related": related[]->{
    "slug": slug.current,
    title,
    subtitle,
    "image": gallery[0]${imageFragment}
  },
  "articles": articles[]->{
    "slug": slug.current,
    title,
    category,
    "image": heroImage${imageFragment}
  },
  faq,
  seo
}`;

export const TRAVEL_PRODUCT_BY_SLUG_QUERY = `*[_type == "travelProduct" && slug.current == $slug && active == true][0]${travelProductProjection}`;

export const TRAVEL_PRODUCTS_QUERY = `*[_type == "travelProduct" && active == true] | order(order asc)${travelProductProjection}`;

export const TRAVEL_PRODUCT_SLUGS_QUERY = `*[_type == "travelProduct" && active == true].slug.current`;
