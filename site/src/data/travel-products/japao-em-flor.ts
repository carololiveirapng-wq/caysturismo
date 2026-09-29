import type { TravelProduct } from "@/types";
import { unsplash } from "@/data/home/shared";

// TODO CMS: substituir pelos dados reais do painel.
export const japaoEmFlor: TravelProduct = {
  id: "japao-em-flor",
  slug: "japao-em-flor",
  active: true,
  featured: true,
  order: 1,
  type: "custom",
  status: "active",
  title: "Japão em Flor",
  eyebrow: "SOB MEDIDA",

  destinations: ["japao"],
  experiences: [],

  breadcrumb: [{ label: "Viagens", href: "/viagens" }, { label: "Japão em Flor" }],

  gallery: [
    { src: unsplash("1761141954458-70e87a4a8943", 1800), alt: "Pagode japonês emoldurado por cerejeiras em flor" },
    { src: unsplash("1764418365982-742441557a6c", 1800), alt: "Corredor de torii vermelhos no santuário Fushimi Inari, em Kyoto" },
    { src: unsplash("1531969179221-3946e6b5a5e7", 1800), alt: "Chá sendo servido em xícaras tradicionais japonesas, com vapor subindo" },
    { src: unsplash("1676177364103-bf844f1819db", 1800), alt: "Vista noturna do horizonte de Tóquio com a Tokyo Tower ao fundo" },
    { src: unsplash("1558869632-81053b328001", 1800), alt: "Casa tradicional japonesa à beira de um lago em um jardim de Kyoto" },
  ],
  subtitle: "Tóquio, Kyoto e Hakone na temporada de cerejeiras — um roteiro sob medida, ajustável ao seu ritmo.",

  duration: "10 dias",
  bestMonths: "Março a maio",
  priceFrom: "Sob consulta",

  overview:
    "Um roteiro desenhado em torno da primavera japonesa — templos, jardins e cidades vividos no tempo certo para ver as cerejeiras florescerem, com pausas para realmente estar em cada lugar.",

  highlights: [
    { title: "Sakura no tempo certo", text: "Paradas ajustadas à previsão de floração de cada região." },
    { title: "Tóquio, Kyoto e Hakone", text: "O contraste entre grandes cidades e a pausa nas montanhas." },
    { title: "Hospedagens com curadoria", text: "De hotéis contemporâneos a ryokans tradicionais." },
  ],

  itinerary: [
    { label: "Dias 1–4", place: "Tóquio", text: "Chegada, bairros, gastronomia e os primeiros parques floridos." },
    { label: "Dias 5–8", place: "Kyoto", text: "Templos, jardins e o ritmo mais lento da antiga capital." },
    { label: "Dias 9–10", place: "Hakone", text: "Montanhas, onsens e vista para o Monte Fuji antes da volta." },
  ],

  stays: [
    {
      name: "Tóquio",
      region: "Distritos urbanos",
      text: "Hotel contemporâneo, base para explorar a cidade.",
      image: { src: unsplash("1676177364103-bf844f1819db", 1200), alt: "Vista noturna do horizonte de Tóquio com a Tokyo Tower ao fundo" },
    },
    {
      name: "Kyoto",
      region: "Antiga corte imperial",
      text: "Ryokan tradicional junto a um jardim.",
      image: { src: unsplash("1558869632-81053b328001", 1200), alt: "Casa tradicional japonesa à beira de um lago em um jardim de Kyoto" },
    },
  ],

  inclusions: [
    "Hospedagem selecionada",
    "Traslados privativos",
    "Roteiro personalizado",
    "Suporte Cays durante a viagem",
  ],
  exclusions: ["Passagens aéreas internacionais", "Refeições não especificadas", "Seguro viagem"],

  related: [
    {
      slug: "cruzeiro-mediterraneo",
      title: "Cruzeiro pelo Mediterrâneo",
      subtitle: "Itália e Grécia, em 8 dias",
      image: { src: unsplash("1526481280693-3bfa7568e0f3", 900), alt: "Vila branca e azul à beira-mar em Santorini" },
    },
    {
      slug: "japao-essencial",
      title: "Japão Essencial",
      subtitle: "Tóquio, Kyoto e Hakone",
      image: { src: unsplash("1764418365982-742441557a6c", 900), alt: "Corredor de torii vermelhos no santuário Fushimi Inari, em Kyoto" },
    },
    {
      slug: "sabores-do-japao",
      title: "Sabores do Japão",
      subtitle: "Gastronomia e cultura",
      image: { src: unsplash("1717988732486-285ea23a6f88", 900), alt: "Seleção de sushi nigiri sobre tábua de madeira" },
    },
  ],

  articles: [
    {
      slug: "melhor-epoca-para-ir-ao-japao",
      title: "Melhor época para conhecer o Japão",
      category: "Guia",
      image: { src: unsplash("1761141954458-70e87a4a8943", 900), alt: "Pagode japonês emoldurado por cerejeiras em flor" },
    },
    {
      slug: "guia-de-gastronomia-japonesa",
      title: "Um guia de gastronomia japonesa",
      category: "Gastronomia",
      image: { src: unsplash("1632709810780-b5a4343cebec", 900), alt: "Tigela de ramen com ovo, chashu e cebolinha" },
    },
  ],

  faq: [
    {
      question: "As datas se ajustam à floração das cerejeiras?",
      answer:
        "Ajustamos o período pelo previsto, mas a floração exata (sakura) varia a cada ano e não pode ser garantida com precisão — desenhamos o roteiro na janela de maior probabilidade.",
    },
    {
      question: "Por que o preço está como \"sob consulta\"?",
      answer:
        "Cada roteiro sob medida muda de valor conforme hospedagem, época e nível de personalização — preferimos calcular com você a montar um preço genérico que não reflete a viagem real.",
    },
    {
      question: "Dá para ajustar a duração ou os destinos?",
      answer: "Sim — este roteiro é um ponto de partida. Dias, cidades e ritmo podem ser adaptados ao que você quer viver.",
    },
    {
      question: "Preciso fechar tudo de uma vez?",
      answer: "Não. Começamos com uma conversa para entender o que você busca e vamos ajustando o roteiro até fazer sentido para você.",
    },
  ],

  seo: {
    title: "Japão em Flor | Viagem Sob Medida | Cays Turismo",
    description:
      "Roteiro sob medida pelo Japão na temporada de cerejeiras — Tóquio, Kyoto e Hakone, com curadoria Cays Turismo.",
  },
};
