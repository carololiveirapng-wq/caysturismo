import type { CuradoriaArticle } from "@/types";
import { unsplash } from "@/data/home/shared";

// TODO CMS: substituir pelos dados reais do painel.
export const melhorEpocaParaIrAoJapao: CuradoriaArticle = {
  id: "melhor-epoca-para-ir-ao-japao",
  slug: "melhor-epoca-para-ir-ao-japao",
  active: true,
  featured: true,
  order: 1,
  title: "Melhor época para ir ao Japão",
  category: "Melhor época",
  destinationIds: ["japao"],
  author: "Curadoria Cays",
  publishedAt: "2026-02-12",
  updatedAt: "2026-08-05",
  readingTime: 6,
  heroImage: { src: unsplash("1761141954458-70e87a4a8943", 2200), alt: "Pagode japonês emoldurado por cerejeiras em flor" },
  excerpt: "Cerejeiras, outono ou inverno silencioso — como escolher o momento certo para conhecer o Japão.",
  breadcrumb: [
    { label: "Curadoria", href: "/curadoria" },
    { label: "Melhor época", href: "/curadoria?categoria=melhor-epoca" },
    { label: "Melhor época para ir ao Japão" },
  ],

  sections: [
    {
      id: "estacoes",
      heading: "As quatro estações, quatro Japões diferentes",
      blocks: [
        {
          type: "richText",
          text: "O Japão muda de personalidade a cada estação — e isso importa mais do que em boa parte dos destinos. A primavera traz as cerejeiras; o outono, o kōyō (folhas vermelhas); o verão, calor úmido; o inverno, céu limpo e paisagens de neve nas montanhas.",
        },
        {
          type: "imageFull",
          image: { src: unsplash("1761141954458-70e87a4a8943", 1800), alt: "Pagode japonês emoldurado por cerejeiras em flor" },
          caption: "Sakura em Kyoto, geralmente entre março e abril.",
        },
      ],
    },
    {
      id: "cerejeiras",
      heading: "Quando ver as cerejeiras",
      blocks: [
        {
          type: "richText",
          text: "A floração (sakura) não tem uma data fixa — varia a cada ano e por região, geralmente entre fins de março e início de abril no sul e centro do país, um pouco mais tarde ao norte.",
        },
        {
          type: "expertNote",
          text: "Não recomendamos fechar hospedagem apenas na expectativa de floração exata — desenhamos o roteiro numa janela de alta probabilidade, com Tóquio e Kyoto como base.",
          author: "Curadoria Cays",
        },
        {
          type: "cta",
          title: "Quer ver as cerejeiras no Japão?",
          supporting: "Montamos um roteiro no período ideal para você.",
          ctaLabel: "Planejar viagem",
          ctaHref: "/contato?destino=japao",
        },
      ],
    },
    {
      id: "outono",
      heading: "O outono, uma alternativa mais tranquila",
      blocks: [
        {
          type: "richText",
          text: "Entre outubro e novembro, o kōyō pinta parques e templos de vermelho e laranja — com menos multidões do que a primavera.",
        },
        {
          type: "imageText",
          image: { src: unsplash("1558869632-81053b328001", 1400), alt: "Casa tradicional japonesa à beira de um lago em um jardim de Kyoto" },
          heading: "Menos turistas, o mesmo encanto",
          text: "Kyoto no outono tem o mesmo ritmo contemplativo dos jardins, com filas mais curtas nos templos mais procurados.",
          imagePosition: "right",
        },
      ],
    },
    {
      id: "inverno-verao",
      heading: "Inverno e verão: para quem foge do óbvio",
      blocks: [
        {
          type: "richText",
          text: "O inverno favorece paisagens nevadas e onsens ao ar livre; o verão, mais quente e úmido, ainda assim é a temporada de festivais tradicionais.",
        },
        {
          type: "gallery",
          images: [
            { src: unsplash("1754390032135-00ecfaa00cc0", 1200), alt: "Vale verde entre montanhas nos Alpes Japoneses, em Kamikochi" },
            { src: unsplash("1632790929202-a79cd10d9076", 1200), alt: "Sala de tatame tradicional em uma casa japonesa, com vista para o jardim" },
            { src: unsplash("1531969179221-3946e6b5a5e7", 1200), alt: "Chá sendo servido em xícaras tradicionais japonesas, com vapor subindo" },
          ],
        },
      ],
    },
    {
      id: "leve-para-o-roteiro",
      heading: "Leve isso para o seu roteiro",
      blocks: [
        {
          type: "travelCard",
          slug: "japao-em-flor",
          title: "Japão em Flor",
          subtitle: "Primavera e cerejeiras",
          image: { src: unsplash("1761141954458-70e87a4a8943", 900), alt: "Pagode japonês emoldurado por cerejeiras em flor" },
        },
      ],
    },
  ],

  faq: [
    { question: "É possível prever a data exata da floração?", answer: "Não com precisão — institutos japoneses publicam previsões a partir de janeiro, mas a data final só fica confiável poucas semanas antes." },
    { question: "Vale a pena ir fora da primavera?", answer: "Sim — outono e inverno têm menos multidões e paisagens igualmente marcantes, cada uma com seu próprio caráter." },
    { question: "Quantos dias são ideais para pegar a temporada de cerejeiras?", answer: "Entre 10 e 14 dias dão margem para se deslocar entre regiões caso a floração atrase ou antecipe em alguma delas." },
  ],

  relatedTravelProducts: ["japao-em-flor"],
  relatedDestination: "japao",
  relatedArticles: ["kyoto-alem-dos-templos", "guia-de-gastronomia-japonesa"],

  seo: {
    title: "Melhor época para ir ao Japão | Curadoria Cays Turismo",
    description: "Cerejeiras, outono, inverno ou verão — um guia da Cays Turismo para escolher a melhor época para conhecer o Japão.",
  },
};
