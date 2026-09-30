import type { ExperienceDetail } from "@/types";
import { unsplash } from "@/data/home/shared";

// TODO CMS: substituir pelos dados reais do painel. Mesmo padrão de lua-de-mel.ts.
export const gastronomy: ExperienceDetail = {
  id: "gastronomia",
  slug: "gastronomia",
  active: true,
  featured: true,
  order: 7,
  name: "Gastronomia",
  axis: "style",

  hero: {
    image: { src: unsplash("1653233797467-1a528819fd4f", 2200), alt: "Chef preparando prato em aula de culinária" },
    eyebrow: "EXPERIÊNCIAS · ESTILO",
    title: "Gastronomia",
    subtitle: "Viagens desenhadas em torno da mesa — mercados, vinhos, aulas e a cozinha de cada lugar.",
  },
  breadcrumb: [{ label: "Experiências", href: "/experiencias" }, { label: "Gastronomia" }],

  manifesto:
    "A comida conta a história de um lugar tanto quanto seus monumentos. Desenhamos roteiros em que mercados, vinícolas, aulas de culinária e mesas locais entram no itinerário por curadoria — não como um passeio a mais.",

  howItWorks: [
    { title: "Entendemos seu paladar", text: "O que vocês gostam de comer e o quanto querem se envolver na cozinha." },
    { title: "Selecionamos experiências locais", text: "De mercados a chefs, sempre com curadoria própria." },
    { title: "Equilibramos com o resto da viagem", text: "A gastronomia entra no ritmo do roteiro, sem sobrecarregar os dias." },
  ],

  featuredDestinations: [
    { slug: "italia", name: "Itália", region: "Europa", image: { src: unsplash("1523906834658-6e24ef2386f9", 1000), alt: "Gôndola sob a Ponte Rialto em Veneza" } },
    { slug: "japao", name: "Japão", region: "Ásia", image: { src: unsplash("1533105079780-92b9be482077", 1000), alt: "Pagode tradicional com o Monte Fuji ao fundo" } },
    { slug: "chile", name: "Chile", region: "América do Sul", image: { src: unsplash("1494783367193-149034c05e8f", 1000), alt: "Estrada reta no deserto do Atacama entre vulcões" } },
  ],

  subtypesHeading: "Formas de viver a gastronomia local",
  subtypes: [
    { slug: "mercados", name: "Mercados", text: "Ingredientes, cores e a vida cotidiana de cada cidade.", image: { src: unsplash("1785062776539-0855f37ad2fb", 900), alt: "Barraca de mercado local com produtos frescos" } },
    { slug: "vinhos", name: "Vinhos", text: "Vinícolas e degustações guiadas, do Velho ao Novo Mundo.", image: { src: unsplash("1560493676-04071c5f467b", 900), alt: "Vinhedo em fileiras ao pôr do sol" } },
    { slug: "aulas-de-culinaria", name: "Aulas de culinária", text: "Aprender a cozinha local com quem vive dela.", image: { src: unsplash("1572715376701-98568319fd0b", 900), alt: "Aula de culinária com chef e ingredientes sobre a bancada" } },
    { slug: "mesas-locais", name: "Mesas locais", text: "De bistrôs de bairro a endereços premiados.", image: { src: unsplash("1632709810780-b5a4343cebec", 900), alt: "Tigela de ramen com ovo, chashu e cebolinha" } },
  ],

  journeys: [
    { slug: "sabores-da-italia", title: "Sabores da Itália", subtitle: "Toscana e gastronomia regional", image: { src: unsplash("1523906834658-6e24ef2386f9", 900), alt: "Gôndola sob a Ponte Rialto em Veneza" } },
    { slug: "sabores-do-japao-gastronomia", title: "Sabores do Japão", subtitle: "Mercados, ramen e alta gastronomia", image: { src: unsplash("1632709810780-b5a4343cebec", 900), alt: "Tigela de ramen com ovo, chashu e cebolinha" } },
  ],

  articles: [
    { slug: "guia-de-gastronomia-japonesa", title: "Um guia de gastronomia japonesa", category: "Gastronomia", image: { src: unsplash("1632709810780-b5a4343cebec", 900), alt: "Tigela de ramen com ovo, chashu e cebolinha" } },
  ],

  faq: [
    { question: "As aulas de culinária são incluídas ou opcionais?", answer: "Entram no roteiro conforme o que você quer viver — podem ser um ponto central da viagem ou apenas uma experiência pontual." },
    { question: "É possível combinar gastronomia com outros estilos, como lua de mel?", answer: "Sim, é uma combinação comum — a gastronomia entra como fio condutor dentro de roteiros de lua de mel, viagens a dois ou em família." },
    { question: "Vocês consideram restrições alimentares?", answer: "Sim — contamos sobre alergias e restrições antes de montar o roteiro, para ajustar mercados, aulas e restaurantes." },
    { question: "Quais destinos são mais fortes em gastronomia no catálogo da Cays?", answer: "Itália, Japão e Chile têm roteiros gastronômicos particularmente desenvolvidos hoje — mas a curadoria funciona para praticamente qualquer destino." },
  ],

  finalCta: {
    title: "Sua viagem gastronômica começa em uma conversa.",
    supporting: "Conte para a Cays o que você gosta de comer e beber. Nós desenhamos o caminho.",
    note: "Fale com um especialista da Cays",
  },

  seo: {
    title: "Gastronomia | Cays Turismo",
    description: "Viagens desenhadas em torno da mesa — mercados, vinhos, aulas de culinária e mesas locais. Curadoria Cays Turismo.",
  },
};
