import { imageFragment } from "./fragments";

/**
 * Histórias de viajante autorizadas e ativas ligadas à experiência Destination
 * Wedding. Campos internos (authorization, internalNote, seo, gallery) não são
 * buscados, e drafts ficam de fora pelo prefixo do _id.
 */
export const DESTINATION_WEDDING_STORIES_QUERY = `*[
  _type == "travelerStory"
  && active == true
  && authorization.status == "autorizada"
  && !(_id in path("drafts.**"))
  && references(*[_type == "experience" && slug.current == "destination-wedding"]._id)
] | order(coalesce(order, 999) asc, travelYear desc) {
  "slug": slug.current,
  title,
  summary,
  travelYear,
  displayName,
  highlightQuote,
  "destinationName": destination->name,
  "image": mainImage${imageFragment}
}`;
