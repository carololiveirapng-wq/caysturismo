import { fetchEntityWithFallback, fetchListWithFallback } from "./sanity-fetch";
import {
  DESTINATION_BY_SLUG_QUERY,
  DESTINATIONS_QUERY,
  DESTINATION_SLUGS_QUERY,
} from "@/sanity/queries/destination";
import {
  destinationDetails as mockDestinationDetails,
  getDestinationDetailBySlug as getMockDestinationDetailBySlug,
} from "@/data/destinations";
import { withDemoThemes } from "./demo";
import type { DestinationDetail } from "@/types";

/** Tenta o Sanity primeiro; cai pro mock local só quando `allowMockFallback` permite (ver `@/sanity/env`). A página não precisa saber qual dos dois respondeu. */
export async function getDestinationBySlug(slug: string): Promise<DestinationDetail | undefined> {
  const d = await fetchEntityWithFallback(DESTINATION_BY_SLUG_QUERY, { slug }, () => getMockDestinationDetailBySlug(slug));
  return d ? withDemoThemes(d) : d;
}

export async function getDestinations(): Promise<DestinationDetail[]> {
  return (await fetchListWithFallback(DESTINATIONS_QUERY, () => mockDestinationDetails)).map(withDemoThemes);
}

export async function getDestinationSlugs(): Promise<string[]> {
  return fetchListWithFallback(DESTINATION_SLUGS_QUERY, () => mockDestinationDetails.map((d) => d.slug));
}
