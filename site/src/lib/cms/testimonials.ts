import { fetchListWithFallback } from "./sanity-fetch";
import { TESTIMONIALS_QUERY } from "@/sanity/queries/testimonial";
import { reviews as mockReviews } from "@/data/home";
import type { GoogleReview } from "@/types";

/**
 * Curadoria pras áreas comerciais (Home etc.): já são ~29 avaliações reais do
 * Google, mostrar todas de uma vez vira parede de texto em vez de prova
 * social. Esta lista cobre os temas que mais pesam em quem tá decidindo
 * contratar — visto, seguro viagem, lua de mel, família/Orlando, cruzeiro,
 * viagem em grupo — sem alterar o texto original de nenhuma. Se um dia
 * existir curadoria editorial no Sanity (`featured`), ela tem prioridade
 * sobre esta lista.
 */
const CURATED_REVIEW_IDS = [
  "testimonial-google-review-meiri-silva",
  "testimonial-google-review-antonio-neto",
  "testimonial-google-review-stefen-stephani",
  "testimonial-google-review-fausto-freire",
  "testimonial-google-review-ana-oliveira",
  "testimonial-google-review-rafael-delbons",
  "testimonial-google-review-natalia-rezende-jordao",
  "testimonial-google-review-aclesio-bezerra-moreira",
];

export async function getTestimonials(): Promise<GoogleReview[]> {
  const all = await fetchListWithFallback(TESTIMONIALS_QUERY, () => mockReviews);

  const featured = all.filter((review) => review.featured);
  if (featured.length > 0) return featured;

  const curated = CURATED_REVIEW_IDS.map((id) => all.find((review) => review.id === id)).filter(
    (review): review is GoogleReview => review !== undefined,
  );
  return curated.length > 0 ? curated : all;
}
