import type { ExperienceDetail } from "@/types";
import { unsplash } from "@/data/home/shared";

// TODO CMS: substituir pelos dados reais do painel.
export const luaDeMel: ExperienceDetail = {
  id: "lua-de-mel",
  slug: "lua-de-mel",
  active: true,
  featured: true,
  order: 1,
  name: "Lua de Mel",
  axis: "occasion",

  hero: {
    image: { src: unsplash("1519307212971-dd9561667ffb", 2200), alt: "Casal em silhueta observando o pôr do sol na praia" },
    eyebrow: "EXPERIÊNCIAS · OCASIÃO",
    title: "Lua de Mel",
    subtitle: "A primeira viagem como casal — desenhada para ser lembrada, não só vivida.",
  },
  breadcrumb: [{ label: "Experiências", href: "/experiencias" }, { label: "Lua de Mel" }],

  manifesto:
    "Toda lua de mel carrega uma expectativa diferente — reencontro, descanso, aventura ou uma pausa do mundo. Desenhamos cada roteiro a partir disso, não de um pacote pronto.",

  howItWorks: [
    { title: "Contamos com vocês", text: "Entendemos o que os dois querem viver nessa viagem." },
    { title: "Desenhamos o roteiro", text: "Destinos, ritmo e hospedagens pensados a dois." },
    { title: "Cuidamos dos detalhes", text: "Do voo ao jantar de aniversário de casamento." },
  ],

  monthlyPicks: [
    { month: 1, destinationName: "Maldivas", destinationSlug: "maldivas", note: "Temporada seca, mar calmo." },
    { month: 4, destinationName: "Japão", destinationSlug: "japao", note: "Cerejeiras em flor." },
    { month: 6, destinationName: "Itália", destinationSlug: "italia", note: "Verão europeu, dias longos." },
    { month: 9, destinationName: "Grécia", note: "Baixa temporada, clima ameno." },
    { month: 11, destinationName: "Egito", destinationSlug: "egito", note: "Temperaturas mais amenas no deserto." },
  ],

  featuredDestinations: [
    { slug: "maldivas", name: "Maldivas", region: "Oceano Índico", image: { src: unsplash("1540202404-a2f29016b523", 1000), alt: "Bangalôs sobre a água em atol nas Maldivas" } },
    { slug: "italia", name: "Itália", region: "Europa", image: { src: unsplash("1523906834658-6e24ef2386f9", 1000), alt: "Gôndola sob a Ponte Rialto em Veneza" } },
    { slug: "japao", name: "Japão", region: "Ásia", image: { src: unsplash("1761141954458-70e87a4a8943", 1000), alt: "Pagode japonês emoldurado por cerejeiras em flor" } },
  ],

  subtypes: [
    { slug: "praia", name: "Praia", text: "Água clara, tempo livre, o mar como cenário.", image: { src: unsplash("1540202404-a2f29016b523", 900), alt: "Bangalôs sobre a água em atol nas Maldivas" } },
    { slug: "neve", name: "Neve", text: "Montanhas, lareira e uma paisagem em silêncio.", image: { src: unsplash("1655362006878-0ce900e0a31e", 900), alt: "Casal sorridente na neve, com montanhas ao fundo" } },
    { slug: "cidade", name: "Cidade", text: "Ruas, museus e jantares em uma cidade que os dois escolhem.", image: { src: unsplash("1523906834658-6e24ef2386f9", 900), alt: "Gôndola sob a Ponte Rialto em Veneza" } },
    { slug: "aventura", name: "Aventura", text: "Trilhas, natureza e um pouco de adrenalina a dois.", image: { src: unsplash("1476514525535-07fb3b4ae5f1", 900), alt: "Barco de madeira em lago alpino cercado por montanhas nas Dolomitas" } },
    { slug: "minimoon", name: "Minimoon", text: "Uma escapada curta, para quando o tempo é o que falta.", image: { src: unsplash("1526481280693-3bfa7568e0f3", 900), alt: "Vila branca e azul à beira-mar em Santorini" } },
  ],

  journeys: [
    { slug: "japao-em-flor", title: "Japão em Flor", subtitle: "Primavera e cerejeiras", image: { src: unsplash("1761141954458-70e87a4a8943", 900), alt: "Pagode japonês emoldurado por cerejeiras em flor" } },
  ],

  articles: [
    { slug: "como-planejar-uma-lua-de-mel-sem-pressa", title: "Como planejar uma lua de mel sem pressa", category: "Guia", image: { src: unsplash("1526481280693-3bfa7568e0f3", 900), alt: "Vila branca e azul à beira-mar em Santorini" } },
    { slug: "destinos-de-lua-de-mel-fora-do-obvio", title: "Destinos de lua de mel fora do óbvio", category: "Destinos", image: { src: unsplash("1540202404-a2f29016b523", 900), alt: "Bangalôs sobre a água em atol nas Maldivas" } },
  ],

  faq: [
    { question: "Com quanto tempo de antecedência devemos planejar?", answer: "O ideal é começar de 6 a 9 meses antes, especialmente em datas de alta temporada — mas já ajudamos casais com prazos mais curtos." },
    { question: "É possível combinar dois destinos diferentes?", answer: "Sim — muitos casais combinam um destino mais urbano com um de praia ou natureza. Ajustamos a divisão de dias conforme o ritmo que vocês querem." },
    { question: "Vocês organizam surpresas ou momentos especiais?", answer: "Sim, sempre que possível — de um jantar especial a um upgrade de hospedagem, dentro do que cada fornecedor permite." },
    { question: "A lua de mel precisa ser logo após o casamento?", answer: "Não. Muitos casais preferem viajar semanas ou meses depois, sem a correria do pós-casamento." },
  ],

  seo: {
    title: "Lua de Mel | Cays Turismo",
    description: "Roteiros de lua de mel sob medida — praia, neve, cidade, aventura ou uma escapada curta. Curadoria Cays Turismo.",
  },
};
