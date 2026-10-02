import { imageFragment } from "./fragments";

const heroAndSeoFields = `hero{
    eyebrow,
    title,
    text,
    "image": image${imageFragment}
  },
  seo`;

const spotlightExperiencesField = `"spotlightExperiences": coalesce(spotlightExperiences[]->{ "slug": slug.current, name, "image": hero.image${imageFragment} }, [])`;
const spotlightDestinationsField = `"spotlightDestinations": coalesce(spotlightDestinations[]->{ "slug": slug.current, name, "image": hero.image${imageFragment} }, [])`;

export const DESTINATION_HUB_QUERY = `*[_type == "destinationHub"][0]{
  ${heroAndSeoFields},
  ${spotlightExperiencesField}
}`;

export const EXPERIENCE_HUB_QUERY = `*[_type == "experienceHub"][0]{
  ${heroAndSeoFields}
}`;

export const TRAVEL_HUB_QUERY = `*[_type == "travelHub"][0]{
  ${heroAndSeoFields}
}`;

export const CURADORIA_HUB_QUERY = `*[_type == "curadoriaHub"][0]{
  ${heroAndSeoFields},
  ${spotlightDestinationsField},
  ${spotlightExperiencesField}
}`;
