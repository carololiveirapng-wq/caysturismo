import type { DestinationDetail } from "@/types";
import { unsplash } from "@/data/home/shared";

// TODO CMS: substituir pelos dados reais do painel. Mesmo padrão de japan.ts.
export const turkey: DestinationDetail = {
  id: "turquia",
  slug: "turquia",
  active: true,
  featured: true,
  order: 9,
  name: "Turquia",
  type: "country",
  parent: "europa",
  breadcrumb: [
    { label: "Destinos", href: "/destinos" },
    { label: "Europa", href: "/destinos/europa" },
    { label: "Turquia" },
  ],

  hero: {
    image: {
      src: unsplash("1530789253388-582c481c54b0", 2400),
      alt: "Balões de ar quente sobre a Capadócia ao amanhecer",
    },
    eyebrow: "EUROPA · TURQUIA",
    title: "Turquia, entre dois continentes e mil séculos.",
    subtitle:
      "Istambul, Capadócia e a Riviera Turca — história bizantina e otomana, paisagens únicas e uma gastronomia própria.",
    seasonLabel: "Temporada 2026/2027",
    ctaLabel: "Planejar viagem à Turquia",
  },

  introduction: {
    heading: "Istambul é a única cidade entre dois continentes.",
    text: "De um lado a Europa, do outro a Ásia, separadas pelo Bósforo — Istambul carrega essa dualidade em cada mesquita, mercado e esquina. Poucas horas dali, a Capadócia revela vales esculpidos pelo tempo e um céu tomado por balões ao amanhecer.\n\nNa Cays, combinamos a intensidade histórica de Istambul com a paisagem única da Capadócia e, quando o roteiro pede, o litoral da Riviera Turca — um país que raramente se repete de uma região para outra.",
  },

  keyInfo: {
    bestTime: "Abr–Jun ou Set–Out (clima ameno)",
    suggestedDuration: "9 a 12 dias",
    timeZone: "5h a mais que Brasília (varia com horário de verão)",
    currency: "Lira turca (TRY)",
    language: "Turco — inglês comum em áreas turísticas",
    visa: "Verificar requisitos atuais para brasileiros",
    vaccines: "Consultar recomendações atualizadas antes da viagem",
    electricity: "230V · plugues tipo C/F — leve adaptador",
    flightFromBrazil: "Voos diretos de São Paulo para Istambul, em geral",
  },

  whyCays: {
    heading: "Uma Turquia desenhada para você.",
    image: {
      src: unsplash("1524231757912-21f4fe3a7200", 1800),
      alt: "Mesquita Azul iluminada à noite em Istambul",
    },
    items: [
      {
        title: "Istambul além do circuito turístico",
        text: "Combinamos os grandes monumentos com bairros e mercados que só quem conhece bem a cidade indica.",
      },
      {
        title: "Balonismo com curadoria",
        text: "Selecionamos operadoras confiáveis para o passeio de balão na Capadócia, o momento mais fotografado da viagem.",
      },
      {
        title: "Hospedagens com caráter",
        text: "De cave hotels na Capadócia a endereços históricos em Istambul, cada escolha passa pelo nosso olhar.",
      },
    ],
  },

  journeysHeading: "Jornadas pela Turquia",
  experiencesHeading: "O que viver na Turquia",
  monthsHeading: "Quando ir à Turquia",
  seasonCta: {
    title: "Quer viajar durante a temporada de balonismo?",
    supporting: "Montamos o período ideal para a sua viagem à Capadócia.",
  },
  finalCta: {
    title: "Sua viagem à Turquia começa em uma conversa.",
    supporting: "Conte para a Cays o que você deseja viver. Nós cuidamos do caminho.",
    note: "Fale com um especialista da Cays",
  },

  journeys: [
    {
      slug: "turquia-essencial",
      title: "Turquia Essencial",
      subtitle: "Istambul e Capadócia",
      durationLabel: "9 dias",
      typeLabel: "Roteiro guiado",
      text: "A combinação clássica entre a grande metrópole e a paisagem mais única do país.",
      image: {
        src: unsplash("1524231757912-21f4fe3a7200", 1400),
        alt: "Mesquita Azul iluminada à noite em Istambul",
      },
    },
    {
      slug: "capadocia-ao-amanhecer",
      title: "Capadócia ao Amanhecer",
      subtitle: "Balões e vales de rocha",
      durationLabel: "5 dias",
      typeLabel: "Viagem especial",
      text: "Balões sobre um vale esculpido pelo tempo, ao nascer do sol.",
      image: {
        src: unsplash("1530789253388-582c481c54b0", 1400),
        alt: "Balões de ar quente sobre a Capadócia ao amanhecer",
      },
    },
    {
      slug: "istambul-e-riviera-turca",
      title: "Istambul & Riviera Turca",
      subtitle: "Cidade e litoral",
      durationLabel: "11 dias",
      typeLabel: "Roteiro combinado",
      text: "História otomana seguida de dias de descanso no litoral do Mediterrâneo.",
      image: {
        src: unsplash("1788266168765-3c657ce029ec", 1400),
        alt: "Costa mediterrânea com águas turquesas na Riviera Turca",
      },
    },
  ],

  experiences: [
    {
      title: "Mesquita Azul e Hagia Sophia",
      text: "Dois marcos que resumem a história bizantina e otomana.",
      image: {
        src: unsplash("1524231757912-21f4fe3a7200", 1200),
        alt: "Mesquita Azul iluminada à noite em Istambul",
      },
    },
    {
      title: "Balão sobre a Capadócia",
      text: "O amanhecer mais fotografado da Turquia, visto do alto.",
      image: {
        src: unsplash("1530789253388-582c481c54b0", 1200),
        alt: "Balões de ar quente sobre a Capadócia ao amanhecer",
      },
    },
    {
      title: "Grande Bazar",
      text: "Um dos mercados cobertos mais antigos e movimentados do mundo.",
      image: {
        src: unsplash("1629212094410-e5bd12fe49c0", 1200),
        alt: "Corredores do Grande Bazar em Istambul, com lojas e lanternas",
      },
    },
    {
      title: "Casas-caverna da Capadócia",
      text: "Hospedagens esculpidas na própria rocha vulcânica.",
      image: {
        src: unsplash("1631724533937-687e6e60aafe", 1600),
        alt: "Hotel esculpido em rocha na região da Capadócia",
      },
    },
    {
      title: "Riviera Turca",
      text: "Águas turquesas e vilarejos costeiros no Mediterrâneo.",
      image: {
        src: unsplash("1788266168765-3c657ce029ec", 1600),
        alt: "Costa mediterrânea com águas turquesas na Riviera Turca",
      },
    },
  ],

  stays: [
    {
      name: "Istambul",
      region: "Entre dois continentes",
      text: "Hotéis históricos próximos à Mesquita Azul e ao Bósforo.",
      image: {
        src: unsplash("1524231757912-21f4fe3a7200", 1200),
        alt: "Mesquita Azul iluminada à noite em Istambul",
      },
    },
    {
      name: "Capadócia",
      region: "Vales de rocha",
      text: "Cave hotels com vista para os vales, ideais para o dia do balão.",
      image: {
        src: unsplash("1631724533937-687e6e60aafe", 1200),
        alt: "Hotel esculpido em rocha na região da Capadócia",
      },
    },
    {
      name: "Riviera Turca",
      region: "Litoral mediterrâneo",
      text: "Resorts à beira-mar em Bodrum ou Antalya, para dias de descanso.",
      image: {
        src: unsplash("1788266168765-3c657ce029ec", 1200),
        alt: "Costa mediterrânea com águas turquesas na Riviera Turca",
      },
    },
  ],

  months: [
    { month: 1, status: "avoid", note: "Inverno frio, especialmente na Capadócia." },
    { month: 2, status: "avoid", note: "Ainda frio, baixa temporada." },
    { month: 3, status: "good", note: "Início da primavera, clima melhorando." },
    { month: 4, status: "ideal", note: "Clima ameno, ótima época para Istambul e Capadócia." },
    { month: 5, status: "ideal", note: "Um dos melhores meses do ano." },
    { month: 6, status: "good", note: "Início do calor, bom para o litoral." },
    { month: 7, status: "avoid", note: "Calor intenso, especialmente na Capadócia durante o dia." },
    { month: 8, status: "avoid", note: "Pico do verão, alta temporada no litoral." },
    { month: 9, status: "ideal", note: "Fim do verão, clima ainda ótimo para todas as regiões." },
    { month: 10, status: "ideal", note: "Outono ameno, boa visibilidade para o balonismo." },
    { month: 11, status: "good", note: "Início do frio, menos turistas." },
    { month: 12, status: "avoid", note: "Inverno, clima frio na Capadócia e no interior." },
  ],

  faq: [
    {
      question: "Qual a melhor época para viajar à Turquia?",
      answer:
        "Abril a junho ou setembro e outubro — clima ameno em Istambul e na Capadócia, com boa visibilidade para o passeio de balão.",
    },
    {
      question: "O passeio de balão na Capadócia é seguro?",
      answer:
        "Selecionamos apenas operadoras licenciadas e com histórico consolidado — a decisão de voar no dia é sempre da própria operadora, conforme as condições do tempo.",
    },
    {
      question: "Quantos dias são recomendados para a Turquia?",
      answer:
        "Entre 9 e 12 dias permitem combinar Istambul e Capadócia com folga, ou incluir uma extensão para o litoral do Mediterrâneo.",
    },
    {
      question: "É possível combinar Turquia e Grécia na mesma viagem?",
      answer:
        "Sim, é uma combinação comum — seja por cruzeiro pelo Mediterrâneo, seja por voos curtos entre Istambul e Atenas.",
    },
    {
      question: "Como funciona um roteiro personalizado com a Cays?",
      answer:
        "Começamos entendendo como você gosta de viajar, desenhamos a jornada, cuidamos de cada detalhe — hospedagem, deslocamentos e experiências — e você foca em vivê-la.",
    },
  ],

  relatedDestinations: [
    {
      slug: "grecia",
      name: "Grécia",
      region: "Europa",
      image: {
        src: unsplash("1526481280693-3bfa7568e0f3", 900),
        alt: "Vila branca e azul à beira-mar em Santorini",
      },
    },
    {
      slug: "egito",
      name: "Egito",
      region: "África & Oriente Médio",
      image: {
        src: unsplash("1539768942893-daf53e448371", 900),
        alt: "Caravana de camelos junto às pirâmides de Gizé ao entardecer",
      },
    },
    {
      slug: "italia",
      name: "Itália",
      region: "Europa",
      image: {
        src: unsplash("1523906834658-6e24ef2386f9", 900),
        alt: "Gôndola sob a Ponte Rialto em Veneza",
      },
    },
  ],

  seo: {
    title: "Turquia | Viagens Personalizadas | Cays Turismo",
    description:
      "Descubra a Turquia com a curadoria da Cays Turismo. Istambul, Capadócia e Riviera Turca, com roteiros que combinam história e paisagem.",
  },
};
