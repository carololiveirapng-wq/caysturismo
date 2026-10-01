/**
 * Reshapa `testimonial` pro mesmo formato que os componentes de depoimento
 * já esperavam do mock (`GoogleReview`: id/active/order/authorName/rating/
 * text/relativeTime/reviewUrl) — zero mudança nos componentes, só troca de
 * onde o dado vem.
 */
const testimonialProjection = `{
  "id": _id,
  active,
  featured,
  order,
  "authorName": clientName,
  rating,
  text,
  "relativeTime": date,
  reviewUrl
}`;

export const TESTIMONIALS_QUERY = `*[_type == "testimonial" && active == true] | order(order asc)${testimonialProjection}`;
