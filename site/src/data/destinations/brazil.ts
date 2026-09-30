import type { DestinationDetail } from "@/types";
import { unsplash } from "@/data/home/shared";

// TODO CMS: substituir pelos dados reais do painel. Mesmo padrão de japan.ts.
export const brazil: DestinationDetail = {
  id: "brasil",
  slug: "brasil",
  active: true,
  featured: true,
  order: 14,
  name: "Brasil",
  type: "country",
  parent: "americas",
  breadcrumb: [
    { label: "Destinos", href: "/destinos" },
    { label: "Américas", href: "/destinos/americas" },
    { label: "Brasil" },
  ],

  hero: {
    image: {
      src: unsplash("1483729558449-99ef09a8c325", 2400),
      alt: "Vista aérea do Pão de Açúcar e da Baía de Guanabara, Rio de Janeiro",
    },
    eyebrow: "AMÉRICAS · BRASIL",
    title: "Brasil, um luxo que começa na paisagem.",
    subtitle:
      "Amazônia, Pantanal, Lençóis Maranhenses e Fernando de Noronha — natureza rara e hospedagens de experiência, vistas com outros olhos.",
    seasonLabel: "Temporada 2026/2027",
    ctaLabel: "Planejar viagem pelo Brasil",
  },

  introduction: {
    heading: "O Brasil que poucos brasileiros conhecem de verdade.",
    text: "Lodges na Amazônia com conforto real, safáris fluviais no Pantanal, dunas e lagoas nos Lençóis Maranhenses, o arquipélago protegido de Fernando de Noronha — o país guarda uma versão de si mesmo que raramente aparece no roteiro turístico convencional.\n\nNa Cays, tratamos o Brasil com a mesma curadoria que qualquer destino internacional — hospedagens de experiência, guias especializados e um olhar que vai além do óbvio.",
  },

  keyInfo: {
    bestTime: "Varia por região — seca na Amazônia e no Pantanal entre Jun–Set",
    suggestedDuration: "7 a 12 dias, conforme o roteiro",
    timeZone: "Fuso local — sem diferença ou diferença de 1h a 2h, conforme a região",
    currency: "Real (BRL)",
    language: "Português",
    visa: "Não aplicável para brasileiros",
    vaccines: "Consultar recomendações atualizadas para febre amarela em algumas regiões",
    electricity: "127V/220V, conforme o estado · plugues tipo N",
    flightFromBrazil: "Voos internos regulares para todos os destinos abaixo",
  },

  whyCays: {
    heading: "Um Brasil desenhado para você.",
    image: {
      src: unsplash("1500530855697-b586d89ba3ee", 1800),
      alt: "Lodge de experiência à beira de um rio na Amazônia brasileira",
    },
    items: [
      {
        title: "O Brasil como destino de curadoria",
        text: "Aplicamos ao Brasil o mesmo padrão de seleção que usamos em qualquer destino internacional — sem concessões.",
      },
      {
        title: "Guias e lodges especializados",
        text: "Na Amazônia e no Pantanal, a experiência depende do guia certo — selecionamos por conhecimento local real.",
      },
      {
        title: "Hospedagens de experiência",
        text: "De lodges na floresta a pousadas em Noronha, cada escolha entrega paisagem e conforto na mesma medida.",
      },
    ],
  },

  journeysHeading: "Jornadas pelo Brasil",
  experiencesHeading: "O que viver no Brasil",
  monthsHeading: "Quando ir ao Brasil",
  seasonCta: {
    title: "Quer ver o Pantanal na seca, quando a vida selvagem se concentra?",
    supporting: "Montamos o período ideal para cada região do roteiro.",
  },
  finalCta: {
    title: "Sua viagem pelo Brasil começa em uma conversa.",
    supporting: "Conte para a Cays o que você deseja viver. Nós cuidamos do caminho.",
    note: "Fale com um especialista da Cays",
  },

  journeys: [
    {
      slug: "amazonia-de-experiencia",
      title: "Amazônia de Experiência",
      subtitle: "Lodges na floresta",
      durationLabel: "6 dias",
      typeLabel: "Viagem de natureza",
      text: "Rios, copa da floresta e uma imersão guiada na maior floresta tropical do mundo.",
      image: {
        src: unsplash("1500530855697-b586d89ba3ee", 1400),
        alt: "Lodge de experiência à beira de um rio na Amazônia brasileira",
      },
    },
    {
      slug: "pantanal-safari",
      title: "Pantanal Safári",
      subtitle: "Vida selvagem na maior planície inundável do mundo",
      durationLabel: "5 dias",
      typeLabel: "Viagem de natureza",
      text: "Onças, aves e um safári fluvial na estação seca, quando a vida selvagem se concentra.",
      image: {
        src: unsplash("1566544496485-02b11e54229b", 1400),
        alt: "Onça-pintada avistada às margens de um rio no Pantanal",
      },
    },
    {
      slug: "lencois-e-noronha",
      title: "Lençóis & Noronha",
      subtitle: "Dunas e arquipélago protegido",
      durationLabel: "8 dias",
      typeLabel: "Roteiro combinado",
      text: "Lagoas entre dunas no Maranhão e mergulho em Fernando de Noronha.",
      image: {
        src: unsplash("1591870510323-e20965f14d69", 1400),
        alt: "Lagoas de água doce entre dunas de areia branca nos Lençóis Maranhenses",
      },
    },
  ],

  experiences: [
    {
      title: "Copa da floresta amazônica",
      text: "Torres de observação acima do dossel, ao amanhecer.",
      image: {
        src: unsplash("1500530855697-b586d89ba3ee", 1200),
        alt: "Lodge de experiência à beira de um rio na Amazônia brasileira",
      },
    },
    {
      title: "Safári fluvial no Pantanal",
      text: "Onças, jacarés e centenas de espécies de aves.",
      image: {
        src: unsplash("1566544496485-02b11e54229b", 1200),
        alt: "Onça-pintada avistada às margens de um rio no Pantanal",
      },
    },
    {
      title: "Lençóis Maranhenses",
      text: "Lagoas de água doce entre dunas, formadas pela chuva.",
      image: {
        src: unsplash("1591870510323-e20965f14d69", 1200),
        alt: "Lagoas de água doce entre dunas de areia branca nos Lençóis Maranhenses",
      },
    },
    {
      title: "Mergulho em Fernando de Noronha",
      text: "Águas protegidas com uma das melhores visibilidades do Atlântico Sul.",
      image: {
        src: unsplash("1544644181-1484b3fdfc62", 1600),
        alt: "Baía com águas claras e formação rochosa em Fernando de Noronha",
      },
    },
    {
      title: "Praias do Nordeste",
      text: "Falésias, piscinas naturais e vilarejos de pescadores.",
      image: {
        src: unsplash("1544025162-d76694265947", 1600),
        alt: "Falésias coloridas à beira-mar no litoral nordestino brasileiro",
      },
    },
  ],

  stays: [
    {
      name: "Amazônia",
      region: "Lodges de floresta",
      text: "Hospedagens com guias naturalistas e acesso direto ao rio e à floresta.",
      image: {
        src: unsplash("1500530855697-b586d89ba3ee", 1200),
        alt: "Lodge de experiência à beira de um rio na Amazônia brasileira",
      },
    },
    {
      name: "Pantanal",
      region: "Fazendas e lodges de safári",
      text: "Bases especializadas em observação de vida selvagem, com guias locais.",
      image: {
        src: unsplash("1566544496485-02b11e54229b", 1200),
        alt: "Onça-pintada avistada às margens de um rio no Pantanal",
      },
    },
    {
      name: "Fernando de Noronha",
      region: "Arquipélago protegido",
      text: "Pousadas de charme, com acesso limitado que preserva a experiência.",
      image: {
        src: unsplash("1544644181-1484b3fdfc62", 1200),
        alt: "Baía com águas claras e formação rochosa em Fernando de Noronha",
      },
    },
  ],

  months: [
    { month: 1, status: "avoid", note: "Cheia na Amazônia e no Pantanal — bom para outras regiões." },
    { month: 2, status: "avoid", note: "Ainda período de chuvas no Centro-Oeste e Norte." },
    { month: 3, status: "good", note: "Transição, ainda com chuvas ocasionais." },
    { month: 4, status: "good", note: "Início do período mais seco em algumas regiões." },
    { month: 5, status: "good", note: "Boa época para Lençóis Maranhenses, com lagoas ainda formadas." },
    { month: 6, status: "ideal", note: "Início da seca no Pantanal — vida selvagem se concentra." },
    { month: 7, status: "ideal", note: "Um dos melhores meses para Pantanal e Amazônia." },
    { month: 8, status: "ideal", note: "Seca no Pantanal, ótima visibilidade de fauna." },
    { month: 9, status: "ideal", note: "Ainda excelente para Pantanal e Amazônia." },
    { month: 10, status: "good", note: "Início das chuvas, Lençóis com lagoas secando." },
    { month: 11, status: "avoid", note: "Chuvas retornando ao Centro-Oeste e Norte." },
    { month: 12, status: "avoid", note: "Início da estação chuvosa na maior parte do país." },
  ],

  faq: [
    {
      question: "Qual a melhor época para Amazônia e Pantanal?",
      answer:
        "Junho a setembro, na estação seca — no Pantanal, é quando a vida selvagem se concentra nas margens dos rios, facilitando o avistamento.",
    },
    {
      question: "Fernando de Noronha tem restrição de visitantes?",
      answer:
        "Sim, o arquipélago tem controle de acesso e taxa de preservação ambiental — reservamos com antecedência por conta dessa limitação.",
    },
    {
      question: "É possível combinar Amazônia e Pantanal na mesma viagem?",
      answer:
        "Sim, embora sejam regiões distintas — recomendamos ao menos 10 a 12 dias para viver as duas sem correria, com voo interno entre elas.",
    },
    {
      question: "O Brasil funciona bem para viagens em família?",
      answer:
        "Sim — Pantanal e Lençóis Maranhenses, em particular, costumam funcionar bem para famílias que gostam de natureza, com estrutura adequada.",
    },
    {
      question: "Como funciona um roteiro personalizado com a Cays?",
      answer:
        "Começamos entendendo como você gosta de viajar, desenhamos a jornada, cuidamos de cada detalhe — hospedagem, deslocamentos e experiências — e você foca em vivê-la.",
    },
  ],

  relatedDestinations: [
    {
      slug: "chile",
      name: "Chile",
      region: "Américas",
      image: {
        src: unsplash("1494783367193-149034c05e8f", 900),
        alt: "Estrada reta no deserto do Atacama entre vulcões",
      },
    },
    {
      slug: "argentina",
      name: "Argentina",
      region: "Américas",
      image: {
        src: unsplash("1638500551033-a0f60c8e768e", 900),
        alt: "Geleira Perito Moreno na Patagônia argentina",
      },
    },
    {
      slug: "estados-unidos",
      name: "Estados Unidos",
      region: "Américas",
      image: {
        src: unsplash("1531366936337-7c912a4589a7", 900),
        alt: "Aurora boreal verde e violeta sobre paisagem nevada no Alasca",
      },
    },
  ],

  seo: {
    title: "Brasil | Viagens Personalizadas | Cays Turismo",
    description:
      "Descubra o Brasil com a curadoria da Cays Turismo. Amazônia, Pantanal, Lençóis Maranhenses e Fernando de Noronha, com hospedagens de experiência.",
  },
};
