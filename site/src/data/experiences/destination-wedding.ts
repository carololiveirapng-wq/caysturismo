import type { ExperienceDetail } from "@/types";
import { unsplash } from "@/data/home/shared";

/**
 * A Cays organiza a VIAGEM do casamento fora de sede (logística, hospedagem,
 * jornada dos convidados, lua de mel) — não a cerimônia em si. Texto
 * deliberadamente evita se posicionar como cerimonialista/wedding planner de
 * evento; ver seção "como-funciona".
 */
// TODO CMS: substituir pelos dados reais do painel. Mesmo padrão de lua-de-mel.ts.
export const destinationWedding: ExperienceDetail = {
  id: "destination-wedding",
  slug: "destination-wedding",
  active: true,
  featured: true,
  order: 4,
  name: "Destination Wedding",
  axis: "occasion",

  hero: {
    image: { src: unsplash("1629744418692-345355518e78", 2200), alt: "Estrutura de casamento montada à beira-mar ao entardecer" },
    eyebrow: "EXPERIÊNCIAS · OCASIÃO",
    title: "Destination Wedding",
    subtitle: "Um casamento fora de sede, com a logística de viagem cuidada do início ao fim.",
  },
  breadcrumb: [{ label: "Experiências", href: "/experiencias" }, { label: "Destination Wedding" }],

  manifesto:
    "Um casamento fora de casa muda a forma como se planeja uma viagem — tem convidados para hospedar, transporte para coordenar, e um casal que precisa, acima de tudo, poder aproveitar o próprio casamento.",

  howItWorks: [
    { title: "A parte de viagem é com a Cays", text: "Cuidamos da logística: hospedagem, transporte e experiências — não da cerimônia em si." },
    { title: "Hospedagem para os convidados", text: "Negociamos blocos de quartos e opções para diferentes orçamentos." },
    { title: "Lua de mel integrada", text: "Planejamos a sequência entre o casamento e a viagem a dois, se fizer sentido para vocês." },
  ],

  featuredDestinations: [
    { slug: "italia", name: "Itália", region: "Europa", image: { src: unsplash("1523906834658-6e24ef2386f9", 1000), alt: "Gôndola sob a Ponte Rialto em Veneza" } },
    { slug: "grecia", name: "Grécia", region: "Europa", image: { src: unsplash("1526481280693-3bfa7568e0f3", 1000), alt: "Vila branca e azul à beira-mar em Santorini" } },
    { slug: "maldivas", name: "Maldivas", region: "Índico", image: { src: unsplash("1540202404-a2f29016b523", 1000), alt: "Bangalôs sobre a água em atol nas Maldivas" } },
  ],

  subtypesHeading: "A jornada dos seus convidados",
  subtypes: [
    { slug: "hospedagem", name: "Hospedagem", text: "Blocos de quarto negociados, em diferentes faixas de preço.", image: { src: unsplash("1543359905-c5d15c3a23dd", 900), alt: "Resort à beira-mar preparado para receber convidados" } },
    { slug: "transporte", name: "Transporte", text: "Traslados coordenados entre aeroporto, hotel e cerimônia.", image: { src: unsplash("1660286156087-911df708e663", 900), alt: "Estrutura de casamento à beira-mar preparada para os convidados" } },
    { slug: "pre-e-pos-evento", name: "Pré e pós-evento", text: "Passeios e experiências para os dias ao redor da celebração.", image: { src: unsplash("1636665002628-01dfd6acc8fc", 900), alt: "Grupo de convidados brindando em celebração ao ar livre" } },
    { slug: "lua-de-mel-integrada", name: "Lua de mel integrada", text: "A viagem a dois pensada em sequência com o casamento.", image: { src: unsplash("1519307212971-dd9561667ffb", 900), alt: "Casal em silhueta observando o pôr do sol na praia" } },
  ],

  journeys: [
    { slug: "casamento-na-italia", title: "Casamento na Itália", subtitle: "Toscana ou Costa Amalfitana", image: { src: unsplash("1523906834658-6e24ef2386f9", 900), alt: "Gôndola sob a Ponte Rialto em Veneza" } },
    { slug: "casamento-na-grecia", title: "Casamento na Grécia", subtitle: "Santorini ou Mykonos", image: { src: unsplash("1526481280693-3bfa7568e0f3", 900), alt: "Vila branca e azul à beira-mar em Santorini" } },
  ],

  faq: [
    { question: "A Cays organiza a cerimônia do casamento?", answer: "A Cays cuida da parte de viagem — hospedagem, transporte e experiências para vocês e seus convidados. A cerimônia em si é conduzida por fornecedores locais especializados, que ajudamos a indicar." },
    { question: "Com quanto tempo de antecedência devemos começar a planejar?", answer: "O ideal é começar de 9 a 12 meses antes, principalmente para conseguir bons blocos de hospedagem para os convidados em alta temporada." },
    { question: "É possível ajudar convidados com orçamentos diferentes?", answer: "Sim — costumamos oferecer mais de uma opção de hospedagem, para que cada convidado escolha o que cabe no seu orçamento." },
    { question: "A lua de mel pode ser no mesmo destino do casamento?", answer: "Pode ser no mesmo destino ou em outro, imediatamente após ou semanas depois — ajustamos conforme o que vocês preferirem." },
  ],

  finalCta: {
    title: "Seu destination wedding começa em uma conversa.",
    supporting: "Conte para a Cays o destino que vocês imaginam e quantos convidados esperam. Nós cuidamos da viagem.",
    note: "Fale com um especialista da Cays",
  },

  seo: {
    title: "Destination Wedding | Cays Turismo",
    description: "Logística de viagem para o seu casamento fora de sede — hospedagem, transporte e lua de mel integrada. Curadoria Cays Turismo.",
  },
};
