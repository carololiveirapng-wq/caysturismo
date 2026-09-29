import type { DestinationDetail } from "@/types";
import { unsplash } from "@/data/home/shared";

/**
 * TEMPORÁRIO — conteúdo editorial de demonstração, escrito para validar o
 * template de destino individual. Dados variáveis/regulatórios (visto,
 * vacinas, duração exata de voo) foram propositalmente deixados como
 * orientação genérica, nunca como fato definitivo — não temos fonte
 * verificada para eles nesta etapa.
 */
// TODO CMS: substituir pelos dados reais do painel, destino a destino.
export const japan: DestinationDetail = {
  id: "japao",
  slug: "japao",
  active: true,
  featured: true,
  order: 1,
  name: "Japão",
  type: "country",
  parent: "asia",
  breadcrumb: [
    { label: "Destinos", href: "/destinos" },
    { label: "Ásia", href: "/destinos/asia" },
    { label: "Japão" },
  ],

  hero: {
    image: {
      src: unsplash("1533105079780-92b9be482077", 2400),
      alt: "Pagode tradicional com o Monte Fuji ao fundo",
    },
    eyebrow: "ÁSIA · JAPÃO",
    title: "Japão, entre tradição e futuro.",
    subtitle:
      "Templos silenciosos, grandes cidades, gastronomia, montanhas e uma cultura que transforma a maneira de olhar o cotidiano.",
    seasonLabel: "Temporada 2026/2027",
  },

  introduction: {
    heading: "O Japão não cabe em uma única viagem.",
    text: "Entre templos silenciosos e cruzamentos iluminados por neon, o Japão vive em contrastes que não precisam se resolver — tradição em Kyoto, um cotidiano reinventado em Tóquio, e entre as duas, montanhas, ryokans e uma gastronomia que é, ela mesma, cultura.\n\nNa Cays, não tratamos o Japão como um roteiro fechado de pontos turísticos — desenhamos jornadas no ritmo de cada viajante, com tempo para se perder em Kyoto e viver Tóquio de verdade.",
  },

  keyInfo: {
    bestTime: "Mar–Mai (cerejeiras) ou Out–Nov (outono)",
    suggestedDuration: "10 a 14 dias",
    timeZone: "12h à frente de Brasília",
    currency: "Iene japonês (JPY)",
    language: "Japonês — inglês limitado fora dos grandes centros",
    visa: "Verificar requisitos atuais para brasileiros",
    vaccines: "Consultar recomendações atualizadas antes da viagem",
    electricity: "100V · plugues tipo A/B — leve adaptador",
    flightFromBrazil: "Sem voo direto — trecho com conexão",
  },

  whyCays: {
    heading: "Um Japão desenhado para você.",
    image: {
      src: unsplash("1764418658791-771bb04efdcd", 1800),
      alt: "Vista aérea do cruzamento de Shibuya iluminado à noite, em Tóquio",
    },
    items: [
      {
        title: "Ícones e descobertas menos óbvias",
        text: "Equilibramos os pontos que você já imagina visitar com lugares que só quem conhece bem o Japão indica.",
      },
      {
        title: "Ritmo pensado, não apressado",
        text: "Alternamos grandes cidades com pausas — para você viver o Japão, não só atravessá-lo.",
      },
      {
        title: "Hospedagens e experiências com curadoria",
        text: "De ryokans tradicionais a hotéis contemporâneos, cada escolha passa pelo nosso olhar antes de chegar até você.",
      },
    ],
  },

  journeys: [
    {
      slug: "japao-essencial",
      title: "Japão Essencial",
      subtitle: "Tóquio, Kyoto e Hakone",
      durationLabel: "12 dias",
      typeLabel: "Roteiro guiado",
      text: "Uma primeira imersão que conecta a capital, a antiga corte imperial e as montanhas.",
      image: {
        src: unsplash("1764418365982-742441557a6c", 1400),
        alt: "Corredor de torii vermelhos no santuário Fushimi Inari, em Kyoto",
      },
    },
    {
      slug: "japao-em-flor",
      title: "Japão em Flor",
      subtitle: "Primavera e cerejeiras",
      durationLabel: "10 dias",
      typeLabel: "Temporada especial",
      text: "Um roteiro desenhado em torno da temporada de sakura, com paradas certas para vivê-la bem.",
      image: {
        src: unsplash("1761141954458-70e87a4a8943", 1400),
        alt: "Pagode japonês emoldurado por cerejeiras em flor",
      },
    },
    {
      slug: "sabores-do-japao",
      title: "Sabores do Japão",
      subtitle: "Gastronomia e cultura",
      durationLabel: "9 dias",
      typeLabel: "Roteiro temático",
      text: "De mercados a mesas premiadas, uma viagem construída em torno da cozinha japonesa.",
      image: {
        src: unsplash("1717988732486-285ea23a6f88", 1400),
        alt: "Seleção de sushi nigiri sobre tábua de madeira",
      },
    },
  ],

  experiences: [
    {
      title: "Cerimônia do chá",
      text: "Um ritual de séculos, vivido devagar.",
      image: {
        src: unsplash("1531969179221-3946e6b5a5e7", 1200),
        alt: "Chá sendo servido em xícaras tradicionais japonesas, com vapor subindo",
      },
    },
    {
      title: "Sabores de Tóquio",
      text: "Do ramen de bairro à alta gastronomia.",
      image: {
        src: unsplash("1632709810780-b5a4343cebec", 1200),
        alt: "Tigela de ramen com ovo, chashu e cebolinha",
      },
    },
    {
      title: "Templos de Kyoto",
      text: "Kinkaku-ji e o silêncio dos jardins.",
      image: {
        src: unsplash("1555574010-6a2107d14bc6", 1200),
        alt: "Kinkaku-ji, o Pavilhão Dourado, refletido no lago em Kyoto",
      },
    },
    {
      title: "Ryokans e onsens",
      text: "Hospedagem tradicional, à beira de um jardim.",
      image: {
        src: unsplash("1632790929202-a79cd10d9076", 1600),
        alt: "Sala de tatame tradicional em uma casa japonesa, com vista para o jardim",
      },
    },
    {
      title: "Alpes Japoneses",
      text: "Vales verdes entre montanhas, longe das multidões.",
      image: {
        src: unsplash("1754390032135-00ecfaa00cc0", 1600),
        alt: "Vale verde entre montanhas nos Alpes Japoneses, em Kamikochi",
      },
    },
  ],

  stays: [
    {
      name: "Tóquio",
      region: "Distritos urbanos",
      text: "Hotéis contemporâneos com vista para o horizonte da cidade que nunca dorme.",
      image: {
        src: unsplash("1676177364103-bf844f1819db", 1200),
        alt: "Vista noturna do horizonte de Tóquio com a Tokyo Tower ao fundo",
      },
    },
    {
      name: "Kyoto",
      region: "Antiga corte imperial",
      text: "Ryokans tradicionais junto a jardins e templos centenários.",
      image: {
        src: unsplash("1558869632-81053b328001", 1200),
        alt: "Casa tradicional japonesa à beira de um lago em um jardim de Kyoto",
      },
    },
    {
      name: "Hakone",
      region: "Montanhas e onsens",
      text: "Descanso com vista para o Monte Fuji, a poucas horas de Tóquio.",
      image: {
        src: unsplash("1618278942403-e973260cc425", 1200),
        alt: "Monte Fuji refletido em um lago, paisagem típica da região de Hakone",
      },
    },
  ],

  months: [
    { month: 1, status: "good", note: "Frio seco e céu limpo — bom para paisagens de inverno." },
    { month: 2, status: "good", note: "Ainda frio, com menos turistas." },
    { month: 3, status: "ideal", note: "Início da temporada de cerejeiras em algumas regiões." },
    { month: 4, status: "ideal", note: "Pico das cerejeiras na maior parte do país." },
    { month: 5, status: "ideal", note: "Clima ameno e paisagens verdes." },
    { month: 6, status: "avoid", note: "Início da estação chuvosa (tsuyu)." },
    { month: 7, status: "avoid", note: "Calor úmido e chuvas frequentes." },
    { month: 8, status: "avoid", note: "Verão intenso e alta temporada de viagens internas." },
    { month: 9, status: "good", note: "Transição para o outono, ainda com calor." },
    { month: 10, status: "ideal", note: "Outono chegando, temperaturas agradáveis." },
    { month: 11, status: "ideal", note: "Folhagem de outono (kōyō) em boa parte do país." },
    { month: 12, status: "good", note: "Início do inverno, iluminações de fim de ano nas cidades." },
  ],

  articles: [
    {
      slug: "melhor-epoca-para-ir-ao-japao",
      title: "Melhor época para conhecer o Japão",
      category: "Guia",
      image: {
        src: unsplash("1761141954458-70e87a4a8943", 900),
        alt: "Pagode japonês emoldurado por cerejeiras em flor",
      },
    },
    {
      slug: "guia-de-gastronomia-japonesa",
      title: "Um guia de gastronomia japonesa",
      category: "Gastronomia",
      image: {
        src: unsplash("1632709810780-b5a4343cebec", 900),
        alt: "Tigela de ramen com ovo, chashu e cebolinha",
      },
    },
    {
      slug: "kyoto-alem-dos-templos",
      title: "Kyoto além dos templos",
      category: "Destinos",
      image: {
        src: unsplash("1764418365982-742441557a6c", 900),
        alt: "Corredor de torii vermelhos no santuário Fushimi Inari, em Kyoto",
      },
    },
  ],

  faq: [
    {
      question: "Qual a melhor época para viajar ao Japão?",
      answer:
        "Recomendamos priorizar março a maio (cerejeiras) ou outubro e novembro (outono) — as datas exatas de floração e folhagem mudam a cada ano, então ajustamos o roteiro perto da viagem.",
    },
    {
      question: "Quantos dias são recomendados para conhecer o Japão?",
      answer:
        "Entre 10 e 14 dias permitem combinar Tóquio, Kyoto e ao menos uma parada de montanha ou litoral sem correria. Viagens mais curtas funcionam bem para um recorte específico do país.",
    },
    {
      question: "O Japão funciona bem para viagens em família?",
      answer:
        "Sim — é um destino seguro, organizado e com boa infraestrutura para crianças, especialmente nas grandes cidades.",
    },
    {
      question: "É possível combinar Japão e Coreia do Sul na mesma viagem?",
      answer:
        "Sim, é uma combinação comum — a distância entre Tóquio ou Osaka e Seul é curta de avião. Ajustamos a divisão de dias conforme o que você quer priorizar em cada país.",
    },
    {
      question: "Como funciona um roteiro personalizado com a Cays?",
      answer:
        "Começamos entendendo como você gosta de viajar, desenhamos a jornada, cuidamos de cada detalhe — hospedagem, deslocamentos e experiências — e você foca em vivê-la.",
    },
  ],

  relatedDestinations: [
    {
      slug: "coreia-do-sul",
      name: "Coreia do Sul",
      region: "Ásia",
      image: {
        src: unsplash("1638964663550-e2123ac8900b", 900),
        alt: "Palácio Gyeongbokgung em Seul, Coreia do Sul",
      },
    },
    {
      slug: "china",
      name: "China",
      region: "Ásia",
      image: {
        src: unsplash("1608037521277-154cd1b89191", 900),
        alt: "Grande Muralha da China serpenteando por montanhas verdes",
      },
    },
    {
      slug: "tailandia",
      name: "Tailândia",
      region: "Sudeste Asiático",
      image: {
        src: unsplash("1528181304800-259b08848526", 900),
        alt: "Templo budista dourado em Chiang Mai",
      },
    },
  ],

  seo: {
    title: "Japão | Viagens Personalizadas | Cays Turismo",
    description:
      "Descubra o Japão com a curadoria da Cays Turismo. Roteiros personalizados, experiências, hospedagens e informações para planejar sua viagem.",
  },
};
