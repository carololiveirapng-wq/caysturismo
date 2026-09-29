import { fetchFromSanity } from "./sanity-fetch";
import {
  DESTINATION_BY_SLUG_QUERY,
  DESTINATIONS_QUERY,
  DESTINATION_SLUGS_QUERY,
} from "@/sanity/queries/destination";
import {
  destinationDetails as mockDestinationDetails,
  getDestinationDetailBySlug as getMockDestinationDetailBySlug,
} from "@/data/destinations";
import type { DestinationDetail } from "@/types";

/** Tenta o Sanity primeiro; sem CMS configurado ou sem conteúdo lá, cai pro mock local. A página não precisa saber qual dos dois respondeu. */
export async function getDestinationBySlug(slug: string): Promise<DestinationDetail | undefined> {
  const fromSanity = await fetchFromSanity<DestinationDetail | null>(DESTINATION_BY_SLUG_QUERY, { slug });
  return fromSanity ?? getMockDestinationDetailBySlug(slug);
}

export async function getDestinations(): Promise<DestinationDetail[]> {
  const fromSanity = await fetchFromSanity<DestinationDetail[]>(DESTINATIONS_QUERY);
  return fromSanity && fromSanity.length > 0 ? fromSanity : mockDestinationDetails;
}

export async function getDestinationSlugs(): Promise<string[]> {
  const fromSanity = await fetchFromSanity<string[]>(DESTINATION_SLUGS_QUERY);
  return fromSanity && fromSanity.length > 0 ? fromSanity : mockDestinationDetails.map((d) => d.slug);
}
