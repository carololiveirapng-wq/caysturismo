import { fetchFromSanity } from "./sanity-fetch";
import { DESTINATION_WEDDING_STORIES_QUERY } from "@/sanity/queries/traveler-story";
import type { DemoImage } from "@/types";

export interface TravelerStoryCard {
  slug: string;
  title: string;
  summary?: string;
  travelYear?: number;
  displayName?: string;
  highlightQuote?: string;
  destinationName?: string;
  image: DemoImage;
}

/**
 * Sem histórias autorizadas e ativas, retorna null — a seção inteira não é
 * renderizada. Sem fallback de mock: história fake nunca entra no site.
 */
export async function getDestinationWeddingStories(): Promise<TravelerStoryCard[] | null> {
  const stories = await fetchFromSanity<TravelerStoryCard[]>(DESTINATION_WEDDING_STORIES_QUERY);
  const valid = (stories ?? []).filter((s) => s.slug && s.title && s.image?.src);
  return valid.length > 0 ? valid : null;
}
