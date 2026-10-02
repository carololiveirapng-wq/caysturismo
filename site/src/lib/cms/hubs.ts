import { fetchFromSanity } from "./sanity-fetch";
import {
  DESTINATION_HUB_QUERY,
  EXPERIENCE_HUB_QUERY,
  TRAVEL_HUB_QUERY,
  CURADORIA_HUB_QUERY,
} from "@/sanity/queries/hub-pages";
import { allowMockFallback } from "@/sanity/env";
import { heroImage, unsplash } from "@/data/home";
import type { HubPageContent } from "@/types";

/**
 * As 4 páginas-hub (Destinos/Experiências/Viagens/Curadoria) seguem o mesmo
 * padrão: singleton, sem fallback pra mock em produção. O mock de cada uma
 * reaproveita exatamente a mesma copy/imagem que já estava hardcoded nos
 * componentes antes desta migração — só muda de onde vem.
 */
async function getHubPage(query: string, fallback: () => HubPageContent): Promise<HubPageContent | null> {
  const fromSanity = await fetchFromSanity<HubPageContent | null>(query);
  if (fromSanity) return fromSanity;
  return allowMockFallback ? fallback() : null;
}

export function getDestinationHub() {
  return getHubPage(DESTINATION_HUB_QUERY, () => ({
    hero: { eyebrow: "Destinos", title: "Para onde a Cays pode levar você.", image: heroImage },
  }));
}

export function getExperienceHub() {
  return getHubPage(EXPERIENCE_HUB_QUERY, () => ({
    hero: {
      eyebrow: "Experiências",
      title: "Há muitas formas de viajar. Qual é a sua?",
      image: { src: unsplash("1531969179221-3946e6b5a5e7", 2400), alt: "Chá sendo servido em xícaras tradicionais japonesas, com vapor subindo" },
    },
  }));
}

export function getTravelHub() {
  return getHubPage(TRAVEL_HUB_QUERY, () => ({
    hero: {
      eyebrow: "Viagens",
      title: "Viagens para inspirar a próxima história.",
      text: "Roteiros sob medida, cruzeiros e datas fixas — cada um com a mesma curadoria.",
      image: { src: unsplash("1530789253388-582c481c54b0", 2400), alt: "Balões de ar quente sobre a Capadócia ao amanhecer" },
    },
  }));
}

export function getCuradoriaHub() {
  return getHubPage(CURADORIA_HUB_QUERY, () => ({
    hero: {
      eyebrow: "Curadoria",
      title: "Curadoria Cays",
      text: "Destinos, histórias e ideias para viajar melhor.",
      image: { src: unsplash("1476514525535-07fb3b4ae5f1", 2400), alt: "Barco de madeira em lago alpino cercado por montanhas nas Dolomitas" },
    },
  }));
}
