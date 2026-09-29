import type { ExperienceDetail } from "@/types";
import { luaDeMel } from "./lua-de-mel";
import { cruzeiros } from "./cruzeiros";

// TODO CMS: cada nova experiência completa entra nesta lista.
export const experienceDetails: ExperienceDetail[] = [luaDeMel, cruzeiros];

export function getExperienceDetailBySlug(slug: string): ExperienceDetail | undefined {
  return experienceDetails.find((experience) => experience.active && experience.slug === slug);
}
