import type { CuradoriaArticle } from "@/types";
import { unsplash } from "@/data/home/shared";

// TODO CMS: substituir pelos dados reais do painel.
export const kyotoAlemDosTemplos: CuradoriaArticle = {
  id: "kyoto-alem-dos-templos",
  slug: "kyoto-alem-dos-templos",
  active: true,
  featured: false,
  order: 3,
  title: "Kyoto além dos templos",
  category: "Histórias",
  destinationIds: ["japao"],
  author: "Curadoria Cays",
  publishedAt: "2026-05-02",
  updatedAt: "2026-08-20",
  readingTime: 7,
  heroImage: { src: unsplash("1764418365982-742441557a6c", 2200), alt: "Corredor de torii vermelhos no santuário Fushimi Inari, em Kyoto" },
  excerpt: "Kyoto não é só templos — é também jardins escondidos, bairros tradicionais e um ritmo que poucos visitantes param para sentir.",
  breadcrumb: [
    { label: "Curadoria", href: "/curadoria" },
    { label: "Histórias", href: "/curadoria?categoria=historias" },
    { label: "Kyoto além dos templos" },
  ],

  sections: [
    {
      id: "primeira-impressao",
      heading: "A primeira impressão engana",
      blocks: [
        {
          type: "richText",
          text: "Kyoto costuma entrar no roteiro como \"a cidade dos templos\" — e embora tenha milhares deles, reduzir a cidade a isso é perder o que a torna única: o jeito como o cotidiano convive com séculos de tradição.",
        },
        {
          type: "imageFull",
          image: { src: unsplash("1764418365982-742441557a6c", 1800), alt: "Corredor de torii vermelhos no santuário Fushimi Inari, em Kyoto" },
          caption: "O caminho de torii vermelhos do santuário Fushimi Inari.",
        },
      ],
    },
    {
      id: "bairros",
      heading: "Bairros para caminhar devagar",
      blocks: [
        {
          type: "richText",
          text: "Higashiyama e Gion guardam ruas de pedra, casas de madeira e o ocasional encontro com uma gueixa a caminho de um compromisso.",
        },
        {
          type: "imageText",
          image: { src: unsplash("1558869632-81053b328001", 1400), alt: "Casa tradicional japonesa à beira de um lago em um jardim de Kyoto" },
          heading: "Um jardim a cada esquina",
          text: "Muitos dos jardins mais bonitos de Kyoto não têm fila — só é preciso saber onde procurar.",
          imagePosition: "right",
        },
      ],
    },
    {
      id: "kinkakuji",
      heading: "Kinkaku-ji, o Pavilhão Dourado",
      blocks: [
        {
          type: "richText",
          text: "Nenhuma foto prepara para a primeira vista do Pavilhão Dourado refletido na água — mas vale chegar cedo, antes das excursões.",
        },
        { type: "quote", text: "Kyoto não se visita, se atravessa devagar.", author: "Curadoria Cays" },
      ],
    },
    {
      id: "onde-descansar",
      heading: "Onde descansar depois de caminhar",
      blocks: [
        {
          type: "richText",
          text: "Um ryokan tradicional, com tatames e um jardim próprio, muda o ritmo da estadia — é tão parte da experiência quanto os templos.",
        },
        {
          type: "gallery",
          images: [
            { src: unsplash("1632790929202-a79cd10d9076", 1200), alt: "Sala de tatame tradicional em uma casa japonesa, com vista para o jardim" },
            { src: unsplash("1531969179221-3946e6b5a5e7", 1200), alt: "Chá sendo servido em xícaras tradicionais japonesas, com vapor subindo" },
            { src: unsplash("1555574010-6a2107d14bc6", 1200), alt: "Kinkaku-ji, o Pavilhão Dourado, refletido no lago em Kyoto" },
          ],
        },
      ],
    },
  ],

  faq: [
    { question: "Quantos dias são suficientes para Kyoto?", answer: "Recomendamos ao menos 3 dias inteiros para sair do óbvio sem correria." },
    { question: "Vale ficar hospedado em Kyoto ou é melhor visitar em bate-volta de Osaka?", answer: "Ficar hospedado em Kyoto muda a experiência — permite aproveitar o início da manhã e o fim da tarde, quando os templos ficam mais vazios." },
    { question: "Kyoto é uma boa base para outros passeios?", answer: "Sim — Nara e Osaka ficam a menos de uma hora de trem." },
  ],

  relatedTravelProducts: ["japao-em-flor"],
  relatedDestination: "japao",
  relatedArticles: ["melhor-epoca-para-ir-ao-japao", "guia-de-gastronomia-japonesa"],

  seo: {
    title: "Kyoto além dos templos | Curadoria Cays Turismo",
    description: "Bairros, jardins escondidos e o Pavilhão Dourado — um outro lado de Kyoto, pela curadoria da Cays Turismo.",
  },
};
