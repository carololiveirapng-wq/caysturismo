import { fetchEntityWithFallback, fetchListWithFallback } from "./sanity-fetch";
import { EXPERIENCE_BY_SLUG_QUERY, EXPERIENCES_QUERY, EXPERIENCE_SLUGS_QUERY } from "@/sanity/queries/experience";
import {
  experienceDetails as mockExperienceDetails,
  getExperienceDetailBySlug as getMockExperienceDetailBySlug,
} from "@/data/experiences";
import type { ExperienceDetail } from "@/types";

export async function getExperienceBySlug(slug: string): Promise<ExperienceDetail | undefined> {
  return fetchEntityWithFallback(EXPERIENCE_BY_SLUG_QUERY, { slug }, () => getMockExperienceDetailBySlug(slug));
}

export async function getExperiences(): Promise<ExperienceDetail[]> {
  return fetchListWithFallback(EXPERIENCES_QUERY, () => mockExperienceDetails);
}

export async function getExperienceSlugs(): Promise<string[]> {
  return fetchListWithFallback(EXPERIENCE_SLUGS_QUERY, () => mockExperienceDetails.map((e) => e.slug));
}
