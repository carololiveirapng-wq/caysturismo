import type { ExperienceDetail } from "@/types";
import { unsplash } from "@/data/home/shared";

// TODO CMS: substituir pelos dados reais do painel. "partnerTypes" descreve
// categorias de companhia, não parcerias reais confirmadas.
export const cruzeiros: ExperienceDetail = {
  id: "cruzeiros",
  slug: "cruzeiros",
  active: true,
  featured: true,
  order: 2,
  name: "Cruzeiros",
  axis: "style",

  hero: {
    image: { src: unsplash("1548574505-5e239809ee19", 2200), alt: "Navio de cruzeiro ancorado em um porto, visto do alto" },
    eyebrow: "EXPERIÊNCIAS · ESTILO",
    title: "Cruzeiros",
    subtitle: "Paisagens que mudam todos os dias, sem desfazer a mala uma única vez.",
  },
  breadcrumb: [{ label: "Experiências", href: "/experiencias" }, { label: "Cruzeiros" }],

  manifesto:
    "De grandes navios a expedições em águas remotas, cruzeiro não é um único jeito de viajar. A Cays ajuda a escolher o formato certo para o que vocês querem ver — e sentir.",

  subtypes: [
    { slug: "oceanico", name: "Oceânico", text: "Grandes navios, rotas clássicas, dias inteiros no mar.", image: { src: unsplash("1548574505-5e239809ee19", 900), alt: "Navio de cruzeiro ancorado em um porto, visto do alto" } },
    { slug: "expedicao", name: "Expedição", text: "Paisagens polares e remotas, em embarcações menores.", image: { src: unsplash("1567323998917-ecfddb912147", 900), alt: "Veleiro de expedição entre icebergs em paisagem polar" } },
    { slug: "fluvial", name: "Fluvial", text: "Rios europeus, cidades históricas margem a margem.", image: { src: unsplash("1567187155374-cd9135b1f247", 900), alt: "Barco de passeio navegando pelo rio Sena, em Paris" } },
    { slug: "iate", name: "Iate Privativo", text: "Roteiro próprio, sem itinerário fixo.", image: { src: unsplash("1562281302-809108fd533c", 900), alt: "Iate de luxo ancorado em uma marina ao entardecer" } },
  ],

  partnerTypes: [
    { name: "Linhas de luxo oceânico", text: "Cabines amplas e roteiros clássicos entre continentes." },
    { name: "Expedição polar", text: "Embarcações pequenas preparadas para regiões remotas." },
    { name: "Boutique fluvial", text: "Navios íntimos navegando os rios da Europa." },
  ],

  featuredDestinations: [
    { slug: "italia", name: "Mediterrâneo", region: "Europa", image: { src: unsplash("1526481280693-3bfa7568e0f3", 1000), alt: "Vila branca e azul à beira-mar em Santorini" } },
    { slug: "egito", name: "Rio Nilo", region: "Egito", image: { src: unsplash("1539768942893-daf53e448371", 1000), alt: "Caravana de camelos junto às pirâmides de Gizé ao entardecer" } },
    { slug: "brasil", name: "Alasca", region: "Expedição", image: { src: unsplash("1531366936337-7c912a4589a7", 1000), alt: "Aurora boreal verde e violeta sobre paisagem nevada no Alasca" } },
  ],

  journeys: [
    { slug: "cruzeiro-mediterraneo", title: "Cruzeiro pelo Mediterrâneo", subtitle: "Itália e Grécia, em 8 dias", image: { src: unsplash("1548574505-5e239809ee19", 900), alt: "Navio de cruzeiro ancorado em um porto, visto do alto" } },
  ],

  articles: [
    { slug: "como-escolher-sua-categoria-de-cabine", title: "Como escolher sua categoria de cabine", category: "Guia", image: { src: unsplash("1548574505-5e239809ee19", 900), alt: "Navio de cruzeiro ancorado em um porto, visto do alto" } },
    { slug: "italia-ou-grecia-por-onde-comecar", title: "Itália ou Grécia: por onde começar", category: "Destinos", image: { src: unsplash("1526481280693-3bfa7568e0f3", 900), alt: "Vila branca e azul à beira-mar em Santorini" } },
  ],

  faq: [
    { question: "Qual a diferença entre cruzeiro oceânico e de expedição?", answer: "O oceânico prioriza conforto e rotas clássicas em navios grandes; a expedição usa embarcações menores para chegar a lugares remotos, com foco na paisagem e na natureza." },
    { question: "Cruzeiro fluvial serve para quem nunca fez um cruzeiro?", answer: "Sim — costuma ser uma boa porta de entrada, com navios menores, menos ondulação e paradas diárias em cidades." },
    { question: "É possível reservar um iate só para o grupo?", answer: "Sim, o iate privativo é sob medida — data, roteiro e duração ficam a critério do grupo." },
    { question: "As datas de saída são fixas em todos os formatos?", answer: "Nos oceânicos e fluviais, sim, seguem calendário do navio. Já o iate privativo é sob consulta, sem data fixa." },
  ],

  seo: {
    title: "Cruzeiros | Cays Turismo",
    description: "Cruzeiros oceânicos, de expedição, fluviais ou em iate privativo — curadoria Cays Turismo para escolher o formato certo.",
  },
};
