import type { DestinationDetail } from "@/types";
import { japan } from "./japan";

// TODO CMS: cada novo destino completo entra nesta lista.
export const destinationDetails: DestinationDetail[] = [japan];

export function getDestinationDetailBySlug(slug: string): DestinationDetail | undefined {
  return destinationDetails.find((destination) => destination.active && destination.slug === slug);
}
