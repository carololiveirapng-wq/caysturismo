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
    spotlightExperiences: [
      { slug: "lua-de-mel", name: "Lua de Mel", image: { src: unsplash("1519307212971-dd9561667ffb", 1000), alt: "Casal em silhueta observando o pôr do sol na praia" } },
      { slug: "cruzeiros", name: "Cruzeiros", image: { src: unsplash("1548574505-5e239809ee19", 1000), alt: "Navio de cruzeiro ancorado em um porto, visto do alto" } },
    ],
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
    spotlightDestinations: [
      { slug: "japao", name: "Japão", image: { src: unsplash("1533105079780-92b9be482077", 900), alt: "Pagode tradicional com o Monte Fuji ao fundo" } },
      { slug: "maldivas", name: "Maldivas", image: { src: unsplash("1540202404-a2f29016b523", 900), alt: "Bangalôs sobre a água em atol nas Maldivas" } },
      { slug: "italia", name: "Itália", image: { src: unsplash("1523906834658-6e24ef2386f9", 900), alt: "Gôndola sob a Ponte Rialto em Veneza" } },
      { slug: "egito", name: "Egito", image: { src: unsplash("1539768942893-daf53e448371", 900), alt: "Caravana de camelos junto às pirâmides de Gizé ao entardecer" } },
    ],
    spotlightExperiences: [
      { slug: "lua-de-mel", name: "Lua de Mel", image: { src: unsplash("1519307212971-dd9561667ffb", 900), alt: "Casal em silhueta observando o pôr do sol na praia" } },
      { slug: "cruzeiros", name: "Cruzeiros", image: { src: unsplash("1548574505-5e239809ee19", 900), alt: "Navio de cruzeiro ancorado em um porto, visto do alto" } },
      { slug: "familia", name: "Família", image: { src: unsplash("1475503572774-15a45e5d60b9", 900), alt: "Família de mãos dadas caminhando à beira-mar" } },
      { slug: "grandes-eventos", name: "Grandes Eventos", image: { src: unsplash("1580657274234-7339717f4541", 900), alt: "Taças de espumante sendo servidas em uma celebração" } },
    ],
  }));
}
