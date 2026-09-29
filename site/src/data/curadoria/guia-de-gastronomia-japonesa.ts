import type { CuradoriaArticle } from "@/types";
import { unsplash } from "@/data/home/shared";

// TODO CMS: substituir pelos dados reais do painel.
export const guiaDeGastronomiaJaponesa: CuradoriaArticle = {
  id: "guia-de-gastronomia-japonesa",
  slug: "guia-de-gastronomia-japonesa",
  active: true,
  featured: true,
  order: 2,
  title: "Um guia de gastronomia japonesa",
  category: "Guias",
  destinationIds: ["japao"],
  author: "Curadoria Cays",
  publishedAt: "2026-03-18",
  updatedAt: "2026-07-22",
  readingTime: 5,
  heroImage: { src: unsplash("1632709810780-b5a4343cebec", 2200), alt: "Tigela de ramen com ovo, chashu e cebolinha" },
  excerpt: "Do balcão de rua à alta gastronomia — um mapa de sabores para entender o Japão pela mesa.",
  breadcrumb: [
    { label: "Curadoria", href: "/curadoria" },
    { label: "Guias", href: "/curadoria?categoria=guias" },
    { label: "Um guia de gastronomia japonesa" },
  ],

  sections: [
    {
      id: "alem-do-sushi",
      heading: "Muito além do sushi",
      blocks: [
        {
          type: "richText",
          text: "Reduzir a cozinha japonesa a sushi é perder a maior parte da história. Ramen, izakaya, kaiseki e a cerimônia do chá contam versões muito diferentes da mesma cultura.",
        },
        {
          type: "imageFull",
          image: { src: unsplash("1717988732486-285ea23a6f88", 1800), alt: "Seleção de sushi nigiri sobre tábua de madeira" },
          caption: "Sushi nigiri — só uma entre muitas tradições culinárias japonesas.",
        },
      ],
    },
    {
      id: "ramen-izakaya",
      heading: "Ramen e izakaya: o dia a dia",
      blocks: [
        {
          type: "richText",
          text: "O ramen varia de região para região — do caldo leve de shoyu ao miso mais encorpado. Já os izakayas são onde a rotina japonesa desacelera, entre pequenos pratos e conversa.",
        },
        {
          type: "imageText",
          image: { src: unsplash("1632709810780-b5a4343cebec", 1400), alt: "Tigela de ramen com ovo, chashu e cebolinha" },
          heading: "Uma tigela, muitas histórias",
          text: "Cada casa de ramen tem sua própria receita de caldo, guardada às vezes por gerações.",
          imagePosition: "left",
        },
      ],
    },
    {
      id: "cerimonia-do-cha",
      heading: "A cerimônia do chá",
      blocks: [
        {
          type: "richText",
          text: "Mais que uma bebida, o chá no Japão é um ritual de atenção — cada gesto, do preparo ao servir, tem um propósito.",
        },
        {
          type: "expertNote",
          text: "Incluímos uma cerimônia do chá tradicional sempre que o roteiro passa por Kyoto — é uma das experiências que mais fica na memória de quem viaja com a gente.",
          author: "Curadoria Cays",
        },
        {
          type: "cta",
          title: "Quer viver essa experiência de perto?",
          supporting: "Incluímos paradas gastronômicas com curadoria em cada roteiro pelo Japão.",
          ctaLabel: "Planejar viagem",
          ctaHref: "/contato?destino=japao",
        },
      ],
    },
    {
      id: "alta-gastronomia",
      heading: "Kaiseki e a alta gastronomia",
      blocks: [
        {
          type: "richText",
          text: "No outro extremo, o kaiseki é uma sequência de pratos pequenos que segue a estação do ano — uma forma de comer que é também uma forma de contar o tempo.",
        },
        {
          type: "gallery",
          images: [
            { src: unsplash("1632790929202-a79cd10d9076", 1200), alt: "Sala de tatame tradicional em uma casa japonesa, com vista para o jardim" },
            { src: unsplash("1558869632-81053b328001", 1200), alt: "Casa tradicional japonesa à beira de um lago em um jardim de Kyoto" },
            { src: unsplash("1531969179221-3946e6b5a5e7", 1200), alt: "Chá sendo servido em xícaras tradicionais japonesas, com vapor subindo" },
          ],
        },
      ],
    },
  ],

  faq: [
    { question: "É preciso reservar restaurantes com antecedência?", answer: "Para casas mais concorridas ou de alta gastronomia, sim — algumas fecham reservas com semanas de antecedência." },
    { question: "Há boas opções para quem tem restrição alimentar?", answer: "Sim, mas vale avisar com antecedência — nem todo lugar tem cardápio traduzido ou opções claramente identificadas." },
    { question: "Vale a pena incluir uma aula de culinária no roteiro?", answer: "Costuma ser um dos pontos altos, principalmente em Kyoto ou Osaka." },
  ],

  relatedTravelProducts: ["japao-em-flor"],
  relatedDestination: "japao",
  relatedArticles: ["melhor-epoca-para-ir-ao-japao", "kyoto-alem-dos-templos"],

  seo: {
    title: "Um guia de gastronomia japonesa | Curadoria Cays Turismo",
    description: "Ramen, izakaya, cerimônia do chá e kaiseki — um panorama da gastronomia japonesa pela curadoria da Cays Turismo.",
  },
};
