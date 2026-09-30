import type { DestinationDetail } from "@/types";
import { unsplash } from "@/data/home/shared";

// TODO CMS: substituir pelos dados reais do painel. Mesmo padrão de japan.ts.
export const thailand: DestinationDetail = {
  id: "tailandia",
  slug: "tailandia",
  active: true,
  featured: true,
  order: 5,
  name: "Tailândia",
  type: "country",
  parent: "asia",
  breadcrumb: [
    { label: "Destinos", href: "/destinos" },
    { label: "Ásia", href: "/destinos/asia" },
    { label: "Tailândia" },
  ],

  hero: {
    image: {
      src: unsplash("1528181304800-259b08848526", 2400),
      alt: "Templo budista dourado em Chiang Mai",
    },
    eyebrow: "ÁSIA · TAILÂNDIA",
    title: "Tailândia, entre templos, sabor e mar.",
    subtitle:
      "Bangkok, Chiang Mai e ilhas do sul — gastronomia de rua, cultura budista e um ritmo de vida que convida a desacelerar.",
    seasonLabel: "Temporada 2026/2027",
    ctaLabel: "Planejar viagem à Tailândia",
  },

  introduction: {
    heading: "A Tailândia vive em camadas — cidade, templo e ilha.",
    text: "Bangkok pulsa em ruídos, luzes e mercados noturnos; Chiang Mai desacelera entre templos e montanhas; as ilhas do sul devolvem o corpo ao mar. A Tailândia rende uma viagem inteira só de contrastes.\n\nNa Cays, combinamos cidade, cultura e litoral no ritmo certo para cada viajante — com espaço para gastronomia de rua, retiros de bem-estar e o silêncio de uma praia sem multidão.",
  },

  keyInfo: {
    bestTime: "Nov–Fev (seco e mais fresco)",
    suggestedDuration: "10 a 14 dias",
    timeZone: "10h a mais que Brasília",
    currency: "Baht tailandês (THB)",
    language: "Tailandês — inglês comum em áreas turísticas",
    visa: "Verificar requisitos atuais para brasileiros",
    vaccines: "Consultar recomendações atualizadas antes da viagem",
    electricity: "220V · plugues tipo A/C/O — leve adaptador",
    flightFromBrazil: "Sem voo direto — trecho com conexão",
  },

  whyCays: {
    heading: "Uma Tailândia desenhada para você.",
    image: {
      src: unsplash("1552465011-b4e21bf6e79a", 1800),
      alt: "Mercado flutuante colorido na Tailândia com barcos carregados de frutas",
    },
    items: [
      {
        title: "Cidade, templo e ilha em equilíbrio",
        text: "Combinamos Bangkok, Chiang Mai e o litoral sul na proporção certa para o seu tempo de viagem.",
      },
      {
        title: "Gastronomia com curadoria local",
        text: "De mercados de rua a jantares em casas tradicionais, escolhemos experiências que vão além do óbvio turístico.",
      },
      {
        title: "Wellness e bem-estar",
        text: "Retiros, spas e massagem tailandesa tradicional entram no roteiro sempre que fazem sentido para você.",
      },
    ],
  },

  journeysHeading: "Jornadas pela Tailândia",
  experiencesHeading: "O que viver na Tailândia",
  monthsHeading: "Quando ir à Tailândia",
  seasonCta: {
    title: "Quer fugir do calor e da chuva?",
    supporting: "Montamos o período ideal entre novembro e fevereiro.",
  },
  finalCta: {
    title: "Sua viagem à Tailândia começa em uma conversa.",
    supporting: "Conte para a Cays o que você deseja viver. Nós cuidamos do caminho.",
    note: "Fale com um especialista da Cays",
  },

  journeys: [
    {
      slug: "tailandia-essencial",
      title: "Tailândia Essencial",
      subtitle: "Bangkok, Chiang Mai e ilhas",
      durationLabel: "13 dias",
      typeLabel: "Roteiro guiado",
      text: "A combinação clássica entre capital, montanha e litoral.",
      image: {
        src: unsplash("1508009603885-50cf7c579365", 1400),
        alt: "Templo Wat Arun à beira do rio em Bangkok ao entardecer",
      },
    },
    {
      slug: "tailandia-bem-estar",
      title: "Tailândia Bem-Estar",
      subtitle: "Retiros e spas",
      durationLabel: "9 dias",
      typeLabel: "Roteiro temático",
      text: "Chiang Mai e o sul do país, com foco em descanso e bem-estar.",
      image: {
        src: unsplash("1544161515-4ab6ce6db874", 1400),
        alt: "Ambiente de spa tailandês com velas e elementos naturais",
      },
    },
    {
      slug: "ilhas-do-sul",
      title: "Ilhas do Sul",
      subtitle: "Praias e mar de Andamã",
      durationLabel: "7 dias",
      typeLabel: "Viagem de litoral",
      text: "Krabi e Phuket, com águas claras e formações rochosas icônicas.",
      image: {
        src: unsplash("1552465011-b4e21bf6e79a", 1400),
        alt: "Mercado flutuante colorido na Tailândia com barcos carregados de frutas",
      },
    },
  ],

  experiences: [
    {
      title: "Templos de Bangkok",
      text: "Wat Arun e o Grande Palácio, entre ouro e detalhes esculpidos.",
      image: {
        src: unsplash("1508009603885-50cf7c579365", 1200),
        alt: "Templo Wat Arun à beira do rio em Bangkok ao entardecer",
      },
    },
    {
      title: "Mercados de rua",
      text: "Sabores autênticos, preparados na hora, a cada esquina.",
      image: {
        src: unsplash("1559847844-5315695dadae", 1200),
        alt: "Barraca de comida de rua tailandesa iluminada à noite",
      },
    },
    {
      title: "Montanhas de Chiang Mai",
      text: "Templos no alto da colina e santuários de elefantes éticos.",
      image: {
        src: unsplash("1528181304800-259b08848526", 1200),
        alt: "Templo budista dourado em Chiang Mai",
      },
    },
    {
      title: "Praias de Krabi",
      text: "Formações de calcário emergindo de um mar transparente.",
      image: {
        src: unsplash("1552733407-5d5c46c3bb3b", 1600),
        alt: "Formações rochosas de calcário no mar de Krabi",
      },
    },
    {
      title: "Massagem tailandesa",
      text: "Uma tradição terapêutica de séculos, vivida devagar.",
      image: {
        src: unsplash("1544161515-4ab6ce6db874", 1600),
        alt: "Ambiente de spa tailandês com velas e elementos naturais",
      },
    },
  ],

  stays: [
    {
      name: "Bangkok",
      region: "Capital",
      text: "Hotéis contemporâneos à beira do Rio Chao Phraya.",
      image: {
        src: unsplash("1508009603885-50cf7c579365", 1200),
        alt: "Templo Wat Arun à beira do rio em Bangkok ao entardecer",
      },
    },
    {
      name: "Chiang Mai",
      region: "Montanhas do norte",
      text: "Resorts entre a natureza, próximos a templos e santuários.",
      image: {
        src: unsplash("1528181304800-259b08848526", 1200),
        alt: "Templo budista dourado em Chiang Mai",
      },
    },
    {
      name: "Krabi",
      region: "Litoral sul",
      text: "Praias privativas com vista para as formações de calcário.",
      image: {
        src: unsplash("1552733407-5d5c46c3bb3b", 1200),
        alt: "Formações rochosas de calcário no mar de Krabi",
      },
    },
  ],

  months: [
    { month: 1, status: "ideal", note: "Estação seca e fresca — um dos melhores meses." },
    { month: 2, status: "ideal", note: "Ainda seco, temperaturas começando a subir." },
    { month: 3, status: "good", note: "Calor aumentando, ainda viável para roteiros completos." },
    { month: 4, status: "avoid", note: "Calor intenso — período do Songkran (festival da água)." },
    { month: 5, status: "avoid", note: "Início da estação chuvosa no sul." },
    { month: 6, status: "avoid", note: "Chuvas frequentes na maior parte do país." },
    { month: 7, status: "avoid", note: "Meio da estação chuvosa." },
    { month: 8, status: "avoid", note: "Ainda dentro da temporada de monção." },
    { month: 9, status: "avoid", note: "Chuvas mais intensas do ano em algumas regiões." },
    { month: 10, status: "good", note: "Transição, chuvas diminuindo gradualmente." },
    { month: 11, status: "ideal", note: "Início da estação seca — alta temporada começando." },
    { month: 12, status: "ideal", note: "Clima seco e ameno, alta temporada." },
  ],

  faq: [
    {
      question: "Qual a melhor época para viajar à Tailândia?",
      answer:
        "Novembro a fevereiro, durante a estação seca e mais fresca — é também a alta temporada, então vale reservar com antecedência.",
    },
    {
      question: "Quantos dias são recomendados para a Tailândia?",
      answer:
        "Entre 10 e 14 dias permitem combinar Bangkok, Chiang Mai e ao menos uma parada de litoral sem correria.",
    },
    {
      question: "A Tailândia funciona bem para viagens em família?",
      answer:
        "Sim — é um destino organizado, com boa infraestrutura turística e experiências para diferentes idades, de templos a praias.",
    },
    {
      question: "É possível combinar Tailândia e Japão na mesma viagem?",
      answer:
        "Sim, embora sejam roteiros distintos — normalmente sugerimos viagens separadas para dar tempo real a cada país, mas ajustamos conforme sua disponibilidade.",
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
      slug: "vietna",
      name: "Vietnã",
      region: "Sudeste Asiático",
      image: {
        src: unsplash("1528127269322-539801943592", 900),
        alt: "Barcos tradicionais na Baía de Ha Long, no Vietnã",
      },
    },
  ],

  seo: {
    title: "Tailândia | Viagens Personalizadas | Cays Turismo",
    description:
      "Descubra a Tailândia com a curadoria da Cays Turismo. Bangkok, Chiang Mai e ilhas do sul, com gastronomia, cultura e bem-estar.",
  },
};
