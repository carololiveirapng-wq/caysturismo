import type { DestinationDetail } from "@/types";
import { japan } from "./japan";
import { italy } from "./italy";
import { maldives } from "./maldives";
import { egypt } from "./egypt";
import { thailand } from "./thailand";
import { southKorea } from "./south-korea";
import { china } from "./china";
import { greece } from "./greece";
import { turkey } from "./turkey";
import { australia } from "./australia";
import { southAfrica } from "./south-africa";
import { chile } from "./chile";
import { usa } from "./usa";
import { brazil } from "./brazil";

// TODO CMS: cada novo destino completo entra nesta lista.
export const destinationDetails: DestinationDetail[] = [
  japan,
  italy,
  maldives,
  egypt,
  thailand,
  southKorea,
  china,
  greece,
  turkey,
  australia,
  southAfrica,
  chile,
  usa,
  brazil,
];

export function getDestinationDetailBySlug(slug: string): DestinationDetail | undefined {
  return destinationDetails.find((destination) => destination.active && destination.slug === slug);
}
