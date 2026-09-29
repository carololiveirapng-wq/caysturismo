import type { TravelProduct } from "@/types";
import { unsplash } from "@/data/home/shared";

// TODO CMS: substituir pelos dados reais do painel — fornecedor, navio e
// datas de saída aqui são ilustrativos, não uma parceria real confirmada.
export const cruzeiroMediterraneo: TravelProduct = {
  id: "cruzeiro-mediterraneo",
  slug: "cruzeiro-mediterraneo",
  active: true,
  featured: true,
  order: 2,
  type: "fixed-date",
  status: "active",
  title: "Cruzeiro pelo Mediterrâneo",
  eyebrow: "CRUZEIRO · DATA FIXA",

  destinations: ["italia"],
  experiences: ["cruzeiros"],

  breadcrumb: [{ label: "Viagens", href: "/viagens" }, { label: "Cruzeiro pelo Mediterrâneo" }],

  gallery: [
    { src: unsplash("1548574505-5e239809ee19", 1800), alt: "Navio de cruzeiro ancorado em um porto, visto do alto" },
    { src: unsplash("1523906834658-6e24ef2386f9", 1800), alt: "Gôndola sob a Ponte Rialto em Veneza" },
    { src: unsplash("1526481280693-3bfa7568e0f3", 1800), alt: "Vila branca e azul à beira-mar em Santorini" },
  ],
  subtitle: "Uma semana navegando entre Itália e Grécia, com o Mediterrâneo como paisagem constante.",

  duration: "8 dias",
  supplier: "Companhia marítima parceira",
  ship: "Navio de categoria premium",
  embarkation: "Veneza, Itália",
  disembarkation: "Atenas (Pireu), Grécia",
  priceFrom: "Sob consulta",

  departures: [
    { label: "14 a 22 de maio de 2027", status: "active" },
    { label: "9 a 17 de julho de 2027", status: "few-spots" },
    { label: "3 a 11 de setembro de 2027", status: "sold-out" },
  ],

  overview:
    "Uma travessia que liga Veneza a Atenas em oito dias, com escalas na costa adriática e nas ilhas gregas — o Mediterrâneo vivido devagar, a bordo.",

  highlights: [
    { title: "Duas culturas, um só roteiro", text: "Itália e Grécia conectadas pelo mesmo mar." },
    { title: "Escalas com curadoria", text: "Portos escolhidos pelo que oferecem, não só pela logística." },
    { title: "Tempo a bordo", text: "Dias de navegação para descansar entre uma escala e outra." },
  ],

  itinerary: [
    { label: "Dia 1", place: "Veneza, Itália", text: "Embarque no fim da tarde.", tag: "Embarque" },
    { label: "Dia 2", place: "Navegando", text: "Dia a bordo, rumo ao sul do Adriático." },
    { label: "Dia 3", place: "Kotor, Montenegro", text: "Escala na baía cercada de montanhas." },
    { label: "Dia 4", place: "Navegando", text: "Dia de mar, rumo ao mar Jônico." },
    { label: "Dia 5", place: "Santorini, Grécia", text: "A caldera e os vilarejos brancos sobre o mar." },
    { label: "Dia 6", place: "Mykonos, Grécia", text: "Vielas, moinhos e o litoral das Cíclades." },
    { label: "Dia 7", place: "Navegando", text: "Último dia a bordo, rumo a Atenas." },
    { label: "Dia 8", place: "Atenas (Pireu), Grécia", text: "Desembarque pela manhã.", tag: "Desembarque" },
  ],

  cabinCategories: [
    { name: "Cabine Interna", text: "Categoria de entrada, ideal para quem passa o dia explorando o navio e os portos." },
    { name: "Cabine com Varanda", text: "Vista para o mar, mais espaço e luz natural." },
    { name: "Suíte", text: "A categoria mais ampla, com áreas de estar separadas." },
  ],

  inclusions: ["Hospedagem a bordo", "Pensão completa no navio", "Entretenimento e áreas comuns", "Taxas portuárias"],
  exclusions: ["Passagens aéreas até o embarque", "Excursões em terra", "Bebidas premium e gorjetas"],

  related: [
    {
      slug: "japao-em-flor",
      title: "Japão em Flor",
      subtitle: "Primavera e cerejeiras",
      image: { src: unsplash("1761141954458-70e87a4a8943", 900), alt: "Pagode japonês emoldurado por cerejeiras em flor" },
    },
    {
      slug: "cruzeiro-caribe",
      title: "Rotas do Caribe",
      subtitle: "Portos tropicais em pequenas escalas",
      image: { src: unsplash("1548574505-5e239809ee19", 900), alt: "Navio de cruzeiro ancorado em um porto, visto do alto" },
    },
  ],

  articles: [
    {
      slug: "como-escolher-sua-categoria-de-cabine",
      title: "Como escolher sua categoria de cabine",
      category: "Guia",
      image: { src: unsplash("1548574505-5e239809ee19", 900), alt: "Navio de cruzeiro ancorado em um porto, visto do alto" },
    },
    {
      slug: "italia-ou-grecia-por-onde-comecar",
      title: "Itália ou Grécia: por onde começar",
      category: "Destinos",
      image: { src: unsplash("1526481280693-3bfa7568e0f3", 900), alt: "Vila branca e azul à beira-mar em Santorini" },
    },
  ],

  faq: [
    {
      question: "O que acontece se a data que eu queria estiver esgotada?",
      answer: "Colocamos você na lista de espera dessa saída e sugerimos as próximas datas disponíveis com o mesmo roteiro.",
    },
    {
      question: "Como escolher a categoria de cabine certa?",
      answer: "Depende do quanto tempo você pretende passar a bordo e do orçamento — ajudamos a comparar as opções antes de fechar.",
    },
    {
      question: "As excursões em terra estão incluídas?",
      answer: "Não — ficam à parte, para você escolher só as que fazem sentido em cada porto.",
    },
    {
      question: "É possível combinar o cruzeiro com dias em terra antes ou depois?",
      answer: "Sim, é comum estender a estadia em Veneza antes do embarque ou em Atenas depois do desembarque — montamos essa extensão junto com o cruzeiro.",
    },
  ],

  seo: {
    title: "Cruzeiro pelo Mediterrâneo | Cays Turismo",
    description:
      "Cruzeiro de 8 dias entre Itália e Grécia, com escalas em Kotor, Santorini e Mykonos. Datas de saída e curadoria Cays Turismo.",
  },
};
