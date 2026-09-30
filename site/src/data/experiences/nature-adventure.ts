import type { ExperienceDetail } from "@/types";
import { unsplash } from "@/data/home/shared";

// TODO CMS: substituir pelos dados reais do painel. Mesmo padrão de lua-de-mel.ts.
export const natureAdventure: ExperienceDetail = {
  id: "natureza-aventura",
  slug: "natureza-aventura",
  active: true,
  featured: true,
  order: 8,
  name: "Natureza & Aventura",
  axis: "style",

  hero: {
    image: { src: unsplash("1629185752152-fe65698ddee4", 2200), alt: "Grupo caminhando em trilha de montanha" },
    eyebrow: "EXPERIÊNCIAS · ESTILO",
    title: "Natureza & Aventura",
    subtitle: "Trilhas, montanhas, deserto — natureza intensa, sempre com o conforto de uma curadoria premium.",
  },
  breadcrumb: [{ label: "Experiências", href: "/experiencias" }, { label: "Natureza & Aventura" }],

  manifesto:
    "Aventura não precisa significar abrir mão de conforto. Combinamos trilhas, montanhas e paisagens extremas com hospedagens e uma logística que cuida de cada detalhe — para que a energia fique para explorar, não para resolver problemas.",

  howItWorks: [
    { title: "Entendemos seu nível", text: "Preparo físico, experiência prévia e o quanto de intensidade vocês querem." },
    { title: "Selecionamos guias especializados", text: "Conhecimento local real em cada trilha ou expedição." },
    { title: "Cuidamos do conforto ao redor", text: "Hospedagens com caráter antes e depois de cada dia intenso." },
  ],

  featuredDestinations: [
    { slug: "chile", name: "Chile", region: "América do Sul", image: { src: unsplash("1494783367193-149034c05e8f", 1000), alt: "Estrada reta no deserto do Atacama entre vulcões" } },
    { slug: "australia", name: "Austrália", region: "Oceania", image: { src: unsplash("1683606095922-cda452e83878", 1000), alt: "Ópera de Sydney e a Harbour Bridge vistas da baía" } },
    { slug: "africa-do-sul", name: "África do Sul", region: "África", image: { src: unsplash("1577971132997-c10be9372519", 1000), alt: "Elefantes avistados durante um safári fotográfico" } },
  ],

  subtypesHeading: "Tipos de experiência",
  subtypes: [
    { slug: "trilhas-e-montanhas", name: "Trilhas e montanhas", text: "De caminhadas leves a trekkings de múltiplos dias.", image: { src: unsplash("1578592391689-0e3d1a1b52b9", 900), alt: "Trilha de montanha com vista panorâmica" } },
    { slug: "deserto", name: "Deserto", text: "Paisagens áridas, céu limpo e silêncio.", image: { src: unsplash("1680715363920-a9f9a767f794", 900), alt: "Paisagem de deserto com dunas ao entardecer" } },
    { slug: "expedicoes", name: "Expedições", text: "Regiões remotas, com logística especializada.", image: { src: unsplash("1567323998917-ecfddb912147", 900), alt: "Veleiro de expedição entre icebergs em paisagem polar" } },
    { slug: "natureza-selvagem", name: "Natureza selvagem", text: "Observação de vida selvagem em seu habitat.", image: { src: unsplash("1577971132997-c10be9372519", 900), alt: "Elefantes avistados durante um safári fotográfico" } },
  ],

  journeys: [
    { slug: "atacama-e-patagonia", title: "Atacama & Patagônia", subtitle: "Os dois extremos do Chile", image: { src: unsplash("1494783367193-149034c05e8f", 900), alt: "Estrada reta no deserto do Atacama entre vulcões" } },
  ],

  faq: [
    { question: "Preciso de preparo físico para essas viagens?", answer: "Depende do roteiro — há opções para diferentes níveis, de trilhas leves a trekkings mais intensos. Ajustamos conforme seu preparo." },
    { question: "Essas viagens são compatíveis com hospedagem confortável?", answer: "Sim — o objetivo é justamente combinar aventura real com lodges e hotéis de caráter, não acampamento improvisado." },
    { question: "Vocês organizam viagens de observação de vida selvagem?", answer: "Sim, principalmente em destinos como África do Sul — sempre com guias especializados e sem promessas de avistamento garantido." },
    { question: "Dá para combinar natureza com outros estilos, como gastronomia?", answer: "Sim, é uma combinação comum, especialmente em destinos como Chile, que soma deserto, montanha e boa mesa." },
  ],

  finalCta: {
    title: "Sua próxima aventura começa em uma conversa.",
    supporting: "Conte para a Cays o tipo de natureza que você quer viver. Nós cuidamos do caminho.",
    note: "Fale com um especialista da Cays",
  },

  seo: {
    title: "Natureza & Aventura | Cays Turismo",
    description: "Trilhas, montanhas, deserto e expedições — natureza intensa, com curadoria premium. Cays Turismo.",
  },
};
