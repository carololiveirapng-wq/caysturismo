import { fetchEntityWithFallback, fetchListWithFallback } from "./sanity-fetch";
import {
  TRAVEL_PRODUCT_BY_SLUG_QUERY,
  TRAVEL_PRODUCTS_QUERY,
  TRAVEL_PRODUCT_SLUGS_QUERY,
} from "@/sanity/queries/travel-product";
import {
  travelProducts as mockTravelProducts,
  getTravelProductBySlug as getMockTravelProductBySlug,
} from "@/data/travel-products";
import { DEMO, demoGroups } from "./demo";
import type { TravelProduct } from "@/types";

export async function getTravelProductBySlug(slug: string): Promise<TravelProduct | undefined> {
  const found = await fetchEntityWithFallback(TRAVEL_PRODUCT_BY_SLUG_QUERY, { slug }, () => getMockTravelProductBySlug(slug));
  return found ?? (DEMO ? demoGroups().find((g) => g.slug === slug) : undefined);
}

export async function getTravelProducts(): Promise<TravelProduct[]> {
  const list = await fetchListWithFallback(TRAVEL_PRODUCTS_QUERY, () => mockTravelProducts);
  // Modo demonstração (só local): acrescenta grupos de exemplo se ainda não houver nenhum cadastrado.
  return DEMO && !list.some((p) => p.type === "group") ? [...list, ...demoGroups()] : list;
}

export async function getTravelProductSlugs(): Promise<string[]> {
  return fetchListWithFallback(TRAVEL_PRODUCT_SLUGS_QUERY, () => mockTravelProducts.map((p) => p.slug));
}
