import type { ExperienceDetail } from "@/types";
import { luaDeMel } from "./lua-de-mel";
import { cruzeiros } from "./cruzeiros";
import { familyTravel } from "./family-travel";
import { destinationWedding } from "./destination-wedding";
import { anniversary } from "./anniversary";
import { majorEvents } from "./major-events";
import { gastronomy } from "./gastronomy";
import { natureAdventure } from "./nature-adventure";
import { safari } from "./safari";
import { privateTravel } from "./private-travel";

// TODO CMS: cada nova experiência completa entra nesta lista.
export const experienceDetails: ExperienceDetail[] = [
  luaDeMel,
  cruzeiros,
  familyTravel,
  destinationWedding,
  anniversary,
  majorEvents,
  gastronomy,
  natureAdventure,
  safari,
  privateTravel,
];

export function getExperienceDetailBySlug(slug: string): ExperienceDetail | undefined {
  return experienceDetails.find((experience) => experience.active && experience.slug === slug);
}
