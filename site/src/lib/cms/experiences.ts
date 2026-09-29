import { fetchFromSanity } from "./sanity-fetch";
import { EXPERIENCE_BY_SLUG_QUERY, EXPERIENCES_QUERY, EXPERIENCE_SLUGS_QUERY } from "@/sanity/queries/experience";
import {
  experienceDetails as mockExperienceDetails,
  getExperienceDetailBySlug as getMockExperienceDetailBySlug,
} from "@/data/experiences";
import type { ExperienceDetail } from "@/types";

export async function getExperienceBySlug(slug: string): Promise<ExperienceDetail | undefined> {
  const fromSanity = await fetchFromSanity<ExperienceDetail | null>(EXPERIENCE_BY_SLUG_QUERY, { slug });
  return fromSanity ?? getMockExperienceDetailBySlug(slug);
}

export async function getExperiences(): Promise<ExperienceDetail[]> {
  const fromSanity = await fetchFromSanity<ExperienceDetail[]>(EXPERIENCES_QUERY);
  return fromSanity && fromSanity.length > 0 ? fromSanity : mockExperienceDetails;
}

export async function getExperienceSlugs(): Promise<string[]> {
  const fromSanity = await fetchFromSanity<string[]>(EXPERIENCE_SLUGS_QUERY);
  return fromSanity && fromSanity.length > 0 ? fromSanity : mockExperienceDetails.map((e) => e.slug);
}
