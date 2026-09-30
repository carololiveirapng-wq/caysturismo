import type { DestinationDetail } from "@/types";
import { unsplash } from "@/data/home/shared";

// TODO CMS: substituir pelos dados reais do painel. Mesmo padrão de japan.ts.
export const china: DestinationDetail = {
  id: "china",
  slug: "china",
  active: true,
  featured: true,
  order: 7,
  name: "China",
  type: "country",
  parent: "asia",
  breadcrumb: [
    { label: "Destinos", href: "/destinos" },
    { label: "Ásia", href: "/destinos/asia" },
    { label: "China" },
  ],

  hero: {
    image: {
      src: unsplash("1608037521277-154cd1b89191", 2400),
      alt: "Grande Muralha da China serpenteando por montanhas verdes",
    },
    eyebrow: "ÁSIA · CHINA",
    title: "China, a escala de uma civilização inteira.",
    subtitle:
      "Pequim, Xangai e a Grande Muralha — história milenar, paisagens monumentais e cidades que não param.",
    seasonLabel: "Temporada 2026/2027",
    ctaLabel: "Planejar viagem à China",
  },

  introduction: {
    heading: "A China não cabe em um único olhar.",
    text: "Entre a Cidade Proibida em Pequim e o horizonte futurista de Xangai, a China alterna história imperial e velocidade contemporânea sem transição. No meio do caminho, a Grande Muralha atravessa montanhas por milhares de quilômetros — um símbolo do que esse país é capaz de construir.\n\nNa Cays, desenhamos a China com tempo para as duas faces do país: a profundidade histórica de suas capitais antigas e a energia das metrópoles que a definem hoje.",
  },

  keyInfo: {
    bestTime: "Abr–Mai ou Set–Out (clima ameno)",
    suggestedDuration: "10 a 13 dias",
    timeZone: "11h a mais que Brasília",
    currency: "Yuan chinês (CNY)",
    language: "Mandarim — inglês limitado fora dos grandes centros",
    visa: "Verificar requisitos atuais para brasileiros",
    vaccines: "Consultar recomendações atualizadas antes da viagem",
    electricity: "220V · plugues tipo A/C/I — leve adaptador",
    flightFromBrazil: "Sem voo direto — trecho com conexão",
  },

  whyCays: {
    heading: "Uma China desenhada para você.",
    image: {
      src: unsplash("1548919973-5cef591cdbc9", 1800),
      alt: "Horizonte de Xangai com arranha-céus à noite, vistos do rio Huangpu",
    },
    items: [
      {
        title: "Império e contemporâneo em equilíbrio",
        text: "Combinamos Pequim histórica e Xangai futurista na proporção certa para a sua viagem.",
      },
      {
        title: "Logística cuidada de ponta a ponta",
        text: "Trens de alta velocidade, guias locais e deslocamentos planejados para um país de escala continental.",
      },
      {
        title: "Hospedagens com localização estratégica",
        text: "Hotéis bem posicionados em cada cidade, para reduzir deslocamento e ganhar tempo de viagem.",
      },
    ],
  },

  journeysHeading: "Jornadas pela China",
  experiencesHeading: "O que viver na China",
  monthsHeading: "Quando ir à China",
  seasonCta: {
    title: "Quer evitar o calor do verão chinês?",
    supporting: "Montamos o período ideal entre primavera e outono.",
  },
  finalCta: {
    title: "Sua viagem à China começa em uma conversa.",
    supporting: "Conte para a Cays o que você deseja viver. Nós cuidamos do caminho.",
    note: "Fale com um especialista da Cays",
  },

  journeys: [
    {
      slug: "china-essencial",
      title: "China Essencial",
      subtitle: "Pequim, Xi'an e Xangai",
      durationLabel: "12 dias",
      typeLabel: "Roteiro guiado",
      text: "As três cidades que resumem a história e o presente do país.",
      image: {
        src: unsplash("1508804185872-d7badad00f7d", 1400),
        alt: "Cidade Proibida em Pequim vista de um dos seus pátios internos",
      },
    },
    {
      slug: "grande-muralha-e-pequim",
      title: "Grande Muralha & Pequim",
      subtitle: "História imperial",
      durationLabel: "7 dias",
      typeLabel: "Viagem especial",
      text: "A capital histórica e um dos maiores monumentos já construídos.",
      image: {
        src: unsplash("1608037521277-154cd1b89191", 1400),
        alt: "Grande Muralha da China serpenteando por montanhas verdes",
      },
    },
    {
      slug: "xangai-contemporanea",
      title: "Xangai Contemporânea",
      subtitle: "Skyline e cultura urbana",
      durationLabel: "5 dias",
      typeLabel: "Viagem de cidade",
      text: "Arranha-céus, bairros históricos e a energia da China de hoje.",
      image: {
        src: unsplash("1548919973-5cef591cdbc9", 1400),
        alt: "Horizonte de Xangai com arranha-céus à noite, vistos do rio Huangpu",
      },
    },
  ],

  experiences: [
    {
      title: "Grande Muralha",
      text: "Trechos menos visitados, longe do turismo em massa.",
      image: {
        src: unsplash("1608037521277-154cd1b89191", 1200),
        alt: "Grande Muralha da China serpenteando por montanhas verdes",
      },
    },
    {
      title: "Cidade Proibida",
      text: "O antigo palácio imperial, no coração de Pequim.",
      image: {
        src: unsplash("1508804185872-d7badad00f7d", 1200),
        alt: "Cidade Proibida em Pequim vista de um dos seus pátios internos",
      },
    },
    {
      title: "Guerreiros de Terracota",
      text: "Milhares de esculturas milenares, em Xi'an.",
      image: {
        src: unsplash("1659466248885-8b7a03205661", 1200),
        alt: "Fileiras do exército de terracota em Xi'an, na China",
      },
    },
    {
      title: "Skyline de Xangai",
      text: "O Bund e o horizonte de Pudong, de dia e à noite.",
      image: {
        src: unsplash("1548919973-5cef591cdbc9", 1600),
        alt: "Horizonte de Xangai com arranha-céus à noite, vistos do rio Huangpu",
      },
    },
    {
      title: "Gastronomia regional",
      text: "De Pequim a Xangai, uma cozinha que muda a cada província.",
      image: {
        src: unsplash("1563245372-f21724e3856d", 1600),
        alt: "Mesa com pratos tradicionais chineses, incluindo dim sum",
      },
    },
  ],

  stays: [
    {
      name: "Pequim",
      region: "Capital histórica",
      text: "Hotéis próximos à Cidade Proibida e à Praça Tiananmen.",
      image: {
        src: unsplash("1508804185872-d7badad00f7d", 1200),
        alt: "Cidade Proibida em Pequim vista de um dos seus pátios internos",
      },
    },
    {
      name: "Xi'an",
      region: "Extensão histórica",
      text: "Base para visitar os Guerreiros de Terracota e a muralha antiga.",
      image: {
        src: unsplash("1659466248885-8b7a03205661", 1200),
        alt: "Fileiras do exército de terracota em Xi'an, na China",
      },
    },
    {
      name: "Xangai",
      region: "Metrópole contemporânea",
      text: "Hotéis com vista para o skyline, no coração do distrito financeiro.",
      image: {
        src: unsplash("1548919973-5cef591cdbc9", 1200),
        alt: "Horizonte de Xangai com arranha-céus à noite, vistos do rio Huangpu",
      },
    },
  ],

  months: [
    { month: 1, status: "avoid", note: "Inverno rigoroso no norte do país." },
    { month: 2, status: "avoid", note: "Ano-novo chinês — deslocamentos internos muito concorridos." },
    { month: 3, status: "good", note: "Início da primavera, temperaturas subindo." },
    { month: 4, status: "ideal", note: "Primavera em pleno vigor, clima ameno em quase todo o país." },
    { month: 5, status: "ideal", note: "Boa temperatura, ainda antes do calor do verão." },
    { month: 6, status: "good", note: "Início do verão, mais quente no sul." },
    { month: 7, status: "avoid", note: "Calor e umidade intensos na maior parte do país." },
    { month: 8, status: "avoid", note: "Pico do verão, alta temporada interna." },
    { month: 9, status: "ideal", note: "Início do outono, clima ameno." },
    { month: 10, status: "ideal", note: "Um dos melhores meses — atenção à Golden Week no início do mês." },
    { month: 11, status: "good", note: "Outono avançado, temperaturas caindo no norte." },
    { month: 12, status: "avoid", note: "Início do inverno, frio intenso no norte." },
  ],

  faq: [
    {
      question: "Qual a melhor época para viajar à China?",
      answer:
        "Abril, maio, setembro e outubro — clima ameno na maior parte do país, evitando o calor do verão e o frio intenso do inverno no norte.",
    },
    {
      question: "Quantos dias são recomendados para a China?",
      answer:
        "Entre 10 e 13 dias permitem combinar Pequim, uma extensão histórica (como Xi'an) e Xangai sem correria, considerando as distâncias internas.",
    },
    {
      question: "Como funciona o deslocamento entre as cidades?",
      answer:
        "Principalmente por trens-bala de alta velocidade, rápidos e confortáveis entre as principais cidades — parte do que planejamos no roteiro.",
    },
    {
      question: "A China funciona bem para uma primeira viagem à Ásia?",
      answer:
        "Sim, especialmente combinando Pequim e Xangai — cidades bem estruturadas para receber viajantes, com guias locais que ajudam bastante na comunicação.",
    },
    {
      question: "Como funciona um roteiro personalizado com a Cays?",
      answer:
        "Começamos entendendo como você gosta de viajar, desenhamos a jornada, cuidamos de cada detalhe — hospedagem, deslocamentos e experiências — e você foca em vivê-la.",
    },
  ],

  relatedDestinations: [
    {
      slug: "japao",
      name: "Japão",
      region: "Ásia",
      image: {
        src: unsplash("1533105079780-92b9be482077", 900),
        alt: "Pagode tradicional com o Monte Fuji ao fundo",
      },
    },
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
    title: "China | Viagens Personalizadas | Cays Turismo",
    description:
      "Descubra a China com a curadoria da Cays Turismo. Pequim, Xangai e a Grande Muralha, com roteiros que combinam história e cultura contemporânea.",
  },
};
