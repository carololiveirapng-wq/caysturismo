import type { DestinationDetail } from "@/types";
import { unsplash } from "@/data/home/shared";

// TODO CMS: substituir pelos dados reais do painel. Mesmo padrão de japan.ts.
export const australia: DestinationDetail = {
  id: "australia",
  slug: "australia",
  active: true,
  featured: true,
  order: 10,
  name: "Austrália",
  type: "country",
  parent: "oceania",
  breadcrumb: [
    { label: "Destinos", href: "/destinos" },
    { label: "Oceania", href: "/destinos/oceania" },
    { label: "Austrália" },
  ],

  hero: {
    image: {
      src: unsplash("1683606095922-cda452e83878", 2400),
      alt: "Ópera de Sydney e a Harbour Bridge vistas da baía",
    },
    eyebrow: "OCEANIA · AUSTRÁLIA",
    title: "Austrália, um continente em uma só viagem.",
    subtitle:
      "Sydney, Melbourne e a Grande Barreira de Corais — natureza monumental, vinícolas e road trips no seu próprio ritmo.",
    seasonLabel: "Temporada 2026/2027",
    ctaLabel: "Planejar viagem à Austrália",
  },

  introduction: {
    heading: "A Austrália é grande demais para pressa.",
    text: "Entre Sydney e sua baía icônica, Melbourne e sua cena cultural, e a Grande Barreira de Corais estendendo-se por milhares de quilômetros, a Austrália pede tempo e distância — road trips fazem parte da experiência, não são um detalhe.\n\nNa Cays, desenhamos roteiros que respeitam essa escala: cidade, natureza e vinho, com deslocamentos pensados para que o caminho também seja parte da viagem.",
  },

  keyInfo: {
    bestTime: "Set–Nov ou Mar–Mai (primavera e outono australianos)",
    suggestedDuration: "12 a 16 dias",
    timeZone: "13h a mais que Brasília (varia com horário de verão local)",
    currency: "Dólar australiano (AUD)",
    language: "Inglês",
    visa: "Verificar requisitos atuais para brasileiros",
    vaccines: "Consultar recomendações atualizadas antes da viagem",
    electricity: "230V · plugues tipo I — leve adaptador",
    flightFromBrazil: "Sem voo direto — trecho com conexão",
  },

  whyCays: {
    heading: "Uma Austrália desenhada para você.",
    image: {
      src: unsplash("1523482580672-f109ba8cb9be", 1800),
      alt: "Vinhedo em fileiras sob céu azul na região de Yarra Valley, Austrália",
    },
    items: [
      {
        title: "Escala continental, roteiro sem pressa",
        text: "Ajustamos distâncias reais entre cidades e regiões para que o road trip seja prazer, não cansaço.",
      },
      {
        title: "Natureza com acesso privilegiado",
        text: "Da Grande Barreira de Corais ao interior australiano, selecionamos experiências com o mínimo de multidão possível.",
      },
      {
        title: "Vinho e gastronomia local",
        text: "Vinícolas de Yarra Valley e Margaret River entram no roteiro para quem quer combinar natureza e boa mesa.",
      },
    ],
  },

  journeysHeading: "Jornadas pela Austrália",
  experiencesHeading: "O que viver na Austrália",
  monthsHeading: "Quando ir à Austrália",
  seasonCta: {
    title: "Quer evitar o verão australiano mais intenso?",
    supporting: "Montamos o período ideal entre primavera e outono locais.",
  },
  finalCta: {
    title: "Sua viagem à Austrália começa em uma conversa.",
    supporting: "Conte para a Cays o que você deseja viver. Nós cuidamos do caminho.",
    note: "Fale com um especialista da Cays",
  },

  journeys: [
    {
      slug: "australia-essencial",
      title: "Austrália Essencial",
      subtitle: "Sydney, Melbourne e Grande Barreira",
      durationLabel: "14 dias",
      typeLabel: "Roteiro guiado",
      text: "As duas grandes cidades e o maior recife de coral do mundo em uma jornada.",
      image: {
        src: unsplash("1683606095922-cda452e83878", 1400),
        alt: "Ópera de Sydney e a Harbour Bridge vistas da baía",
      },
    },
    {
      slug: "road-trip-costa-leste",
      title: "Road Trip Costa Leste",
      subtitle: "De Sydney a Cairns",
      durationLabel: "12 dias",
      typeLabel: "Viagem de estrada",
      text: "Praias, florestas e pequenas cidades ao longo da costa australiana.",
      image: {
        src: unsplash("1523482580672-f109ba8cb9be", 1400),
        alt: "Vinhedo em fileiras sob céu azul na região de Yarra Valley, Austrália",
      },
    },
    {
      slug: "grande-barreira-de-corais",
      title: "Grande Barreira de Corais",
      subtitle: "Mergulho e vida marinha",
      durationLabel: "6 dias",
      typeLabel: "Viagem especial",
      text: "Dias dedicados ao maior sistema de recifes de coral do planeta.",
      image: {
        src: unsplash("1544551763-77ef2d0cfc6c", 1400),
        alt: "Recife de coral colorido na Grande Barreira, na Austrália",
      },
    },
  ],

  experiences: [
    {
      title: "Ópera de Sydney",
      text: "O símbolo do país, à beira de uma das baías mais bonitas do mundo.",
      image: {
        src: unsplash("1683606095922-cda452e83878", 1200),
        alt: "Ópera de Sydney e a Harbour Bridge vistas da baía",
      },
    },
    {
      title: "Cena cultural de Melbourne",
      text: "Arte de rua, cafés e uma cidade que se descobre a pé.",
      image: {
        src: unsplash("1514395462725-fb4566210144", 1200),
        alt: "Rua com arte urbana (street art) em Melbourne, na Austrália",
      },
    },
    {
      title: "Grande Barreira de Corais",
      text: "Mergulho e snorkel no maior recife de coral do mundo.",
      image: {
        src: unsplash("1544551763-77ef2d0cfc6c", 1200),
        alt: "Recife de coral colorido na Grande Barreira, na Austrália",
      },
    },
    {
      title: "Vinícolas australianas",
      text: "Yarra Valley e Margaret River, entre vinhedos e boa mesa.",
      image: {
        src: unsplash("1560493676-04071c5f467b", 1600),
        alt: "Vinhedo em fileiras ao pôr do sol",
      },
    },
    {
      title: "Interior australiano",
      text: "Paisagens desérticas e formações rochosas como Uluru.",
      image: {
        src: unsplash("1548296404-93c7694b2f91", 1600),
        alt: "Formação rochosa Uluru no interior da Austrália ao entardecer",
      },
    },
  ],

  stays: [
    {
      name: "Sydney",
      region: "Costa leste",
      text: "Hotéis com vista para a baía e a Opera House.",
      image: {
        src: unsplash("1683606095922-cda452e83878", 1200),
        alt: "Ópera de Sydney e a Harbour Bridge vistas da baía",
      },
    },
    {
      name: "Melbourne",
      region: "Centro cultural",
      text: "Endereços boutique em bairros de arte e gastronomia.",
      image: {
        src: unsplash("1514395462725-fb4566210144", 1200),
        alt: "Rua com arte urbana (street art) em Melbourne, na Austrália",
      },
    },
    {
      name: "Cairns",
      region: "Porta da Grande Barreira",
      text: "Resorts com acesso direto a passeios de mergulho e snorkel.",
      image: {
        src: unsplash("1544551763-77ef2d0cfc6c", 1200),
        alt: "Recife de coral colorido na Grande Barreira, na Austrália",
      },
    },
  ],

  months: [
    { month: 1, status: "avoid", note: "Verão intenso, calor forte no interior." },
    { month: 2, status: "avoid", note: "Ainda verão, temporada de chuvas no norte tropical." },
    { month: 3, status: "ideal", note: "Início do outono australiano, clima ameno." },
    { month: 4, status: "ideal", note: "Um dos melhores meses do ano." },
    { month: 5, status: "good", note: "Outono avançado, temperaturas caindo no sul." },
    { month: 6, status: "good", note: "Início do inverno no sul — boa época para o norte tropical." },
    { month: 7, status: "good", note: "Inverno ameno, ótimo para Grande Barreira e norte do país." },
    { month: 8, status: "good", note: "Ainda inverno no sul, seco no norte." },
    { month: 9, status: "ideal", note: "Início da primavera — um dos melhores meses." },
    { month: 10, status: "ideal", note: "Primavera em pleno vigor, clima ameno em todo o país." },
    { month: 11, status: "good", note: "Fim da primavera, calor começando a subir." },
    { month: 12, status: "avoid", note: "Início do verão, alta temporada interna e preços mais altos." },
  ],

  faq: [
    {
      question: "Qual a melhor época para viajar à Austrália?",
      answer:
        "Março a maio ou setembro a novembro — primavera e outono locais, com clima ameno na maior parte do país e fora do pico de calor do verão.",
    },
    {
      question: "Quantos dias são recomendados para a Austrália?",
      answer:
        "Entre 12 e 16 dias permitem combinar Sydney, Melbourne e uma extensão para a Grande Barreira de Corais, considerando as distâncias internas.",
    },
    {
      question: "A Austrália funciona bem para viagens em família?",
      answer:
        "Sim — é um destino seguro, com boa infraestrutura e experiências que interessam a diferentes idades, de vida marinha a natureza.",
    },
    {
      question: "Vale a pena incluir a Nova Zelândia na mesma viagem?",
      answer:
        "É uma combinação comum, mas exige tempo — recomendamos ao menos 20 dias totais para fazer justiça aos dois países sem correria.",
    },
    {
      question: "Como funciona um roteiro personalizado com a Cays?",
      answer:
        "Começamos entendendo como você gosta de viajar, desenhamos a jornada, cuidamos de cada detalhe — hospedagem, deslocamentos e experiências — e você foca em vivê-la.",
    },
  ],

  relatedDestinations: [
    {
      slug: "nova-zelandia",
      name: "Nova Zelândia",
      region: "Oceania",
      image: {
        src: unsplash("1469521669194-babb45599def", 900),
        alt: "Paisagem montanhosa e lago na Nova Zelândia",
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
    {
      slug: "bali",
      name: "Bali",
      region: "Sudeste Asiático",
      image: {
        src: unsplash("1537996194471-e657df975ab4", 900),
        alt: "Terraços de arroz verdes em Bali, na Indonésia",
      },
    },
  ],

  seo: {
    title: "Austrália | Viagens Personalizadas | Cays Turismo",
    description:
      "Descubra a Austrália com a curadoria da Cays Turismo. Sydney, Melbourne e Grande Barreira de Corais, com road trips e experiências selecionadas.",
  },
};
