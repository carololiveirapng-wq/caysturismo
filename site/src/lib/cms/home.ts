import { fetchFromSanity } from "./sanity-fetch";
import { HOME_QUERY } from "@/sanity/queries/home";
import { allowMockFallback } from "@/sanity/env";
import { getActiveOrderedItems, getFeaturedItems } from "@/lib/content";
import {
  heroImage,
  manifesto as mockManifesto,
  journeyProcess,
  featuredJourneys,
  destinations as mockDestinations,
  experiences as mockExperiences,
  journalPosts,
} from "@/data/home";
import type { HomeContent } from "@/types";

/**
 * `home` é singleton — igual Settings, ausência não é 404 (sem
 * `fetchEntityWithFallback`, que é pra entidades com slug). Fora de
 * produção, sem o Sanity configurado ou documento ainda não publicado,
 * monta um `HomeContent` a partir dos mocks existentes pra manter a Home
 * funcionando durante o desenvolvimento — em produção, com o Sanity
 * configurado, isso nunca roda (`allowMockFallback` é sempre falso ali).
 */
export async function getHome(): Promise<HomeContent | null> {
  const fromSanity = await fetchFromSanity<HomeContent | null>(HOME_QUERY);
  if (fromSanity) return fromSanity;
  return allowMockFallback ? buildMockHome() : null;
}

function buildMockHome(): HomeContent {
  const featuredDestinations = getFeaturedItems(mockDestinations)
    .slice(0, 8)
    .map((d) => ({ slug: d.slug, name: d.name, image: d.image, region: d.region, shortDescription: d.shortDescription }));

  const featuredExperiences = getActiveOrderedItems(mockExperiences)
    .slice(0, 6)
    .map((e) => ({ slug: e.slug, name: e.title, image: e.image, shortDescription: e.shortDescription }));

  const featuredTravelProducts = getActiveOrderedItems(featuredJourneys).map((j) => ({
    slug: j.slug,
    title: j.title,
    eyebrow: j.eyebrow,
    image: j.image,
    subtitle: j.description,
  }));

  const featuredArticles = getActiveOrderedItems(journalPosts)
    .slice(0, 3)
    .map((a) => ({ slug: a.slug, title: a.title, category: a.category, image: a.image, readingTime: a.readingTime, publishedAt: a.publishedAt }));

  return {
    hero: { mediaType: "image", image: heroImage, title: "Viagens desenhadas em torno de você.", ctaLabel: "Planejar minha viagem", ctaHref: "/contato" },
    travelDiscovery: { title: "Para onde vamos?", text: "Conte o essencial e descubra possibilidades reais." },
    manifesto: { ...mockManifesto, heading: "Não começamos por um pacote.\nComeçamos por você." },
    positioning: undefined,
    process: { steps: journeyProcess },
    featuredDestinations,
    destinationCollections: [],
    featuredExperiences,
    featuredTravelProducts,
    featuredArticles,
    travelerStories: [],
    finalCta: { title: "Sua próxima viagem começa em uma conversa.", ctaLabel: "Planejar minha viagem" },
  };
}
