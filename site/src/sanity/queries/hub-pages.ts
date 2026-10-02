import { imageFragment } from "./fragments";

/** As 4 páginas-hub compartilham a mesma projeção (hero + seo) — só muda o `_type` consultado. */
function hubQuery(type: string) {
  return `*[_type == "${type}"][0]{
    hero{
      eyebrow,
      title,
      text,
      "image": image${imageFragment}
    },
    seo
  }`;
}

export const DESTINATION_HUB_QUERY = hubQuery("destinationHub");
export const EXPERIENCE_HUB_QUERY = hubQuery("experienceHub");
export const TRAVEL_HUB_QUERY = hubQuery("travelHub");
export const CURADORIA_HUB_QUERY = hubQuery("curadoriaHub");
