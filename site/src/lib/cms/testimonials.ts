import { fetchListWithFallback } from "./sanity-fetch";
import { TESTIMONIALS_QUERY } from "@/sanity/queries/testimonial";
import { reviews as mockReviews } from "@/data/home";
import type { GoogleReview } from "@/types";

export async function getTestimonials(): Promise<GoogleReview[]> {
  return fetchListWithFallback(TESTIMONIALS_QUERY, () => mockReviews);
}
