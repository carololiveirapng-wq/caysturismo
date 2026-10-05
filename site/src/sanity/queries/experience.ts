import { imageFragment } from "./fragments";
import { CONTINENT_LABEL_GROQ } from "./continent";

/** Espelha `ExperienceDetail` (`src/types/experience-detail.ts`). Não testado contra dataset real — ver nota em `destination.ts`. */
const experienceProjection = `{
  "id": _id,
  "slug": slug.current,
  active,
  featured,
  order,
  name,
  axis,
  breadcrumb,
  hero{
    "image": image${imageFragment},
    eyebrow,
    title,
    subtitle
  },
  manifesto,
  "howItWorks": steps,
  "featuredDestinations": destinations[]->{
    "slug": slug.current,
    name,
    "region": ${CONTINENT_LABEL_GROQ},
    "image": hero.image${imageFragment}
  },
  "subtypes": subtypes[]{
    "slug": name,
    name,
    text,
    "image": image${imageFragment}
  },
  "monthlyPicks": monthlyPicks[]{
    month,
    "destinationName": destination->name,
    "destinationSlug": destination->slug.current,
    note
  },
  partnerTypes,
  "journeys": journeys[]->{
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

export const EXPERIENCE_BY_SLUG_QUERY = `*[_type == "experience" && slug.current == $slug && active == true][0]${experienceProjection}`;

export const EXPERIENCES_QUERY = `*[_type == "experience" && active == true] | order(order asc)${experienceProjection}`;

export const EXPERIENCE_SLUGS_QUERY = `*[_type == "experience" && active == true].slug.current`;
