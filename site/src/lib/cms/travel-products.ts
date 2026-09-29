import { fetchFromSanity } from "./sanity-fetch";
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
  const fromSanity = await fetchFromSanity<TravelProduct | null>(TRAVEL_PRODUCT_BY_SLUG_QUERY, { slug });
  return fromSanity ?? getMockTravelProductBySlug(slug);
}

export async function getTravelProducts(): Promise<TravelProduct[]> {
  const fromSanity = await fetchFromSanity<TravelProduct[]>(TRAVEL_PRODUCTS_QUERY);
  return fromSanity && fromSanity.length > 0 ? fromSanity : mockTravelProducts;
}

export async function getTravelProductSlugs(): Promise<string[]> {
  const fromSanity = await fetchFromSanity<string[]>(TRAVEL_PRODUCT_SLUGS_QUERY);
  return fromSanity && fromSanity.length > 0 ? fromSanity : mockTravelProducts.map((p) => p.slug);
}
