import type { ExperienceDetail } from "@/types";
import { unsplash } from "@/data/home/shared";

// TODO CMS: substituir pelos dados reais do painel. Mesmo padrão de lua-de-mel.ts.
export const privateTravel: ExperienceDetail = {
  id: "privativas",
  slug: "privativas",
  active: true,
  featured: true,
  order: 10,
  name: "Viagens Privativas",
  axis: "style",

  hero: {
    image: { src: unsplash("1562281302-809108fd533c", 2200), alt: "Iate de luxo ancorado em uma marina ao entardecer" },
    eyebrow: "EXPERIÊNCIAS · ESTILO",
    title: "Viagens Privativas",
    subtitle: "Roteiro totalmente seu — tempo, ritmo e acesso definidos só por você.",
  },
  breadcrumb: [{ label: "Experiências", href: "/experiencias" }, { label: "Viagens Privativas" }],

  manifesto:
    "Uma viagem privativa não tem itinerário de grupo, horário fixo ou roteiro padrão — tem o seu tempo. Guia e motorista particulares quando fizer sentido, acesso a experiências fora do circuito comum, e a flexibilidade de mudar de plano no meio do caminho.",

  howItWorks: [
    { title: "Desenhamos do zero", text: "Nenhum roteiro pronto — a viagem parte do que você quer viver." },
    { title: "Guia e motorista particulares", text: "Quando o destino e o roteiro pedem, sem itinerário compartilhado com outros grupos." },
    { title: "Flexibilidade real", text: "Ritmo e paradas podem mudar ao longo da viagem, conforme você preferir." },
  ],

  featuredDestinations: [
    { slug: "japao", name: "Japão", region: "Ásia", image: { src: unsplash("1533105079780-92b9be482077", 1000), alt: "Pagode tradicional com o Monte Fuji ao fundo" } },
    { slug: "italia", name: "Itália", region: "Europa", image: { src: unsplash("1523906834658-6e24ef2386f9", 1000), alt: "Gôndola sob a Ponte Rialto em Veneza" } },
    { slug: "estados-unidos", name: "Estados Unidos", region: "América do Norte", image: { src: unsplash("1449034446853-66c86144b0ad", 1000), alt: "Estrada costeira ao longo do litoral da Califórnia" } },
  ],

  subtypesHeading: "O que muda em uma viagem privativa",
  subtypes: [
    { slug: "guia-e-motorista", name: "Guia e motorista particulares", text: "Sem itinerário compartilhado com outros grupos.", image: { src: unsplash("1666307552038-c9ffe36a49d6", 900), alt: "Carro de luxo preparado para viagem privativa" } },
    { slug: "acesso-exclusivo", name: "Acesso exclusivo", text: "Experiências fora do circuito turístico comum.", image: { src: unsplash("1562281302-809108fd533c", 900), alt: "Iate de luxo ancorado em uma marina ao entardecer" } },
    { slug: "flexibilidade-de-roteiro", name: "Flexibilidade de roteiro", text: "O plano pode mudar no meio da viagem.", image: { src: unsplash("1523906834658-6e24ef2386f9", 900), alt: "Gôndola sob a Ponte Rialto em Veneza" } },
    { slug: "privacidade", name: "Privacidade", text: "Tempo e espaço só seus, do início ao fim.", image: { src: unsplash("1573843981267-be1999ff37cd", 900), alt: "Villa sobre a água com deck privativo e escada para o mar" } },
  ],

  faq: [
    { question: "Viagem privativa é mais cara que um roteiro em grupo?", answer: "Em geral sim, já que envolve guia, motorista e experiências exclusivas — mas o valor entrega flexibilidade e privacidade que um roteiro compartilhado não tem." },
    { question: "É possível mudar o roteiro no meio da viagem?", answer: "Sim, essa é uma das vantagens — ajustamos paradas e ritmo conforme o que você quiser, dentro do que a logística do destino permitir." },
    { question: "Viagens privativas funcionam para grupos grandes também?", answer: "Sim, desde família reduzida até grupos maiores de amigos — o formato se adapta ao tamanho do grupo." },
    { question: "Como funciona um roteiro personalizado com a Cays?", answer: "Começamos entendendo como você gosta de viajar, desenhamos a jornada do zero, cuidamos de cada detalhe — e você foca em vivê-la." },
  ],

  finalCta: {
    title: "Sua viagem privativa começa em uma conversa.",
    supporting: "Conte para a Cays o que você imagina viver, no seu tempo. Nós cuidamos do caminho.",
    note: "Fale com um especialista da Cays",
  },

  seo: {
    title: "Viagens Privativas | Cays Turismo",
    description: "Roteiros totalmente personalizados, com guia e motorista particulares quando fizer sentido. Curadoria Cays Turismo.",
  },
};
