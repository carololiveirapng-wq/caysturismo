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
import type { TravelProduct } from "@/types";

export async function getTravelProductBySlug(slug: string): Promise<TravelProduct | undefined> {
  return fetchEntityWithFallback(TRAVEL_PRODUCT_BY_SLUG_QUERY, { slug }, () => getMockTravelProductBySlug(slug));
}

export async function getTravelProducts(): Promise<TravelProduct[]> {
  return fetchListWithFallback(TRAVEL_PRODUCTS_QUERY, () => mockTravelProducts);
}

export async function getTravelProductSlugs(): Promise<string[]> {
  return fetchListWithFallback(TRAVEL_PRODUCT_SLUGS_QUERY, () => mockTravelProducts.map((p) => p.slug));
}
