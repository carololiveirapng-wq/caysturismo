import type { TravelProduct } from "@/types";
import { japaoEmFlor } from "./japao-em-flor";
import { cruzeiroMediterraneo } from "./cruzeiro-mediterraneo";

// TODO CMS: cada novo produto completo entra nesta lista.
export const travelProducts: TravelProduct[] = [japaoEmFlor, cruzeiroMediterraneo];

export function getTravelProductBySlug(slug: string): TravelProduct | undefined {
  return travelProducts.find((product) => product.active && product.slug === slug);
}

export function getProductsByDestination(destinationSlug: string): TravelProduct[] {
  return travelProducts.filter((product) => product.active && product.destinations.includes(destinationSlug));
}

export function getProductsByExperience(experienceSlug: string): TravelProduct[] {
  return travelProducts.filter((product) => product.active && product.experiences.includes(experienceSlug));
}
