import type { DestinationDetail } from "@/types";
import { unsplash } from "@/data/home/shared";

// TODO CMS: substituir pelos dados reais do painel. Mesmo padrão de japan.ts.
export const maldives: DestinationDetail = {
  id: "maldivas",
  slug: "maldivas",
  active: true,
  featured: true,
  order: 3,
  name: "Maldivas",
  type: "country",
  parent: "indico",
  breadcrumb: [
    { label: "Destinos", href: "/destinos" },
    { label: "Índico", href: "/destinos/indico" },
    { label: "Maldivas" },
  ],

  hero: {
    image: {
      src: unsplash("1540202404-a2f29016b523", 2400),
      alt: "Bangalôs sobre a água em atol nas Maldivas",
    },
    eyebrow: "ÍNDICO · MALDIVAS",
    title: "Maldivas, o oceano como único horizonte.",
    subtitle:
      "Ilhas privadas, água transparente e um silêncio que só existe longe de tudo — desenhado para casais e para quem busca privacidade de verdade.",
    seasonLabel: "Temporada 2026/2027",
    ctaLabel: "Planejar viagem às Maldivas",
  },

  introduction: {
    heading: "Um atol, uma villa, o oceano ao redor.",
    text: "As Maldivas não são um destino de passeios — são um destino de presença. Villas sobre a água, recifes a poucos metros da varanda e uma rotina que se resume a decidir entre o mar e a rede.\n\nNa Cays, escolhemos cada resort pelo que ele entrega de verdade: privacidade, serviço e a experiência de estar, literalmente, em cima do oceano Índico.",
  },

  keyInfo: {
    bestTime: "Dez–Abr (estação seca, mar mais calmo)",
    suggestedDuration: "6 a 9 dias",
    timeZone: "8h a mais que Brasília",
    currency: "Rufiyaa maldivo (MVR) — dólar amplamente aceito nos resorts",
    language: "Divehi — inglês fluente na rede hoteleira",
    visa: "Verificar requisitos atuais para brasileiros",
    vaccines: "Consultar recomendações atualizadas antes da viagem",
    electricity: "230V · plugues tipo D/G — leve adaptador",
    flightFromBrazil: "Sem voo direto — conexão via Europa ou Oriente Médio",
  },

  whyCays: {
    heading: "Maldivas desenhadas para você.",
    image: {
      src: unsplash("1602002418082-a4443e081dd1", 1800),
      alt: "Sala de estar de suíte sobre a água com vista para o mar",
    },
    items: [
      {
        title: "O atol e a villa certos para você",
        text: "Cada resort tem um caráter diferente — ajudamos a escolher entre romance, mergulho ou família antes de reservar.",
      },
      {
        title: "Privacidade de verdade",
        text: "Priorizamos ilhas de resort único, sem trânsito de outros hóspedes, para quem busca isolamento genuíno.",
      },
      {
        title: "Detalhes que fazem a diferença",
        text: "Do jantar na água ao mergulho guiado, cuidamos das experiências antes de você nem precisar perguntar.",
      },
    ],
  },

  journeysHeading: "Jornadas pelas Maldivas",
  experiencesHeading: "O que viver nas Maldivas",
  monthsHeading: "Quando ir às Maldivas",
  seasonCta: {
    title: "Pensando em lua de mel nas Maldivas?",
    supporting: "Ajudamos a escolher a ilha e a época ideais para os dois.",
  },
  finalCta: {
    title: "Sua viagem às Maldivas começa em uma conversa.",
    supporting: "Conte para a Cays o que você deseja viver. Nós cuidamos do caminho.",
    note: "Fale com um especialista da Cays",
  },

  journeys: [
    {
      slug: "maldivas-lua-de-mel",
      title: "Maldivas em Lua de Mel",
      subtitle: "Villa privativa e jantares na água",
      durationLabel: "7 dias",
      typeLabel: "Roteiro romântico",
      text: "Uma imersão a dois, sem itinerário fixo além do próprio oceano.",
      image: {
        src: unsplash("1519307212971-dd9561667ffb", 1400),
        alt: "Casal em silhueta observando o pôr do sol na praia",
      },
    },
    {
      slug: "maldivas-mergulho",
      title: "Maldivas de Mergulho",
      subtitle: "Recifes e vida marinha",
      durationLabel: "8 dias",
      typeLabel: "Roteiro temático",
      text: "Resorts com acesso direto a recifes de coral e passeios guiados.",
      image: {
        src: unsplash("1544551763-46a013bb70d5", 1400),
        alt: "Mergulhador nadando próximo a um recife de coral colorido",
      },
    },
    {
      slug: "maldivas-em-familia",
      title: "Maldivas em Família",
      subtitle: "Resorts com estrutura para crianças",
      durationLabel: "8 dias",
      typeLabel: "Roteiro em família",
      text: "Ilhas com clube infantil e atividades para todas as idades.",
      image: {
        src: unsplash("1439130490301-25e322d88054", 1400),
        alt: "Piscina infinita à beira-mar em resort tropical",
      },
    },
  ],

  experiences: [
    {
      title: "Villas sobre a água",
      text: "Acesso direto ao mar a partir da própria varanda.",
      image: {
        src: unsplash("1573843981267-be1999ff37cd", 1200),
        alt: "Villa sobre a água com deck privativo e escada para o mar",
      },
    },
    {
      title: "Mergulho e snorkel",
      text: "Recifes a poucos metros da praia, sem esforço para chegar.",
      image: {
        src: unsplash("1544551763-46a013bb70d5", 1200),
        alt: "Mergulhador nadando próximo a um recife de coral colorido",
      },
    },
    {
      title: "Jantar sobre o oceano",
      text: "Mesas montadas na água, iluminadas apenas por velas.",
      image: {
        src: unsplash("1414235077428-338989a2e8c0", 1200),
        alt: "Mesa de jantar romântica montada à beira-mar ao entardecer",
      },
    },
    {
      title: "Passeio de dhoni",
      text: "O barco tradicional maldivo, ao pôr do sol.",
      image: {
        src: unsplash("1573790387438-4da905039392", 1600),
        alt: "Barco tradicional maldivo navegando em mar turquesa",
      },
    },
    {
      title: "Spa sobre a água",
      text: "Tratamentos com o som do oceano como única trilha sonora.",
      image: {
        src: unsplash("1540555700478-4be289fbecef", 1600),
        alt: "Cabana de spa sobre a água em resort nas Maldivas",
      },
    },
  ],

  stays: [
    {
      name: "Atol de Malé Norte",
      region: "Fácil acesso",
      text: "Resorts a 20–40 minutos de barco ou hidroavião do aeroporto.",
      image: {
        src: unsplash("1573843981267-be1999ff37cd", 1200),
        alt: "Villa sobre a água com deck privativo e escada para o mar",
      },
    },
    {
      name: "Atol de Ari",
      region: "Vida marinha",
      text: "Recifes ricos, incluindo passeios com arraias e tubarões-baleia.",
      image: {
        src: unsplash("1544551763-46a013bb70d5", 1200),
        alt: "Mergulhador nadando próximo a um recife de coral colorido",
      },
    },
    {
      name: "Atóis remotos",
      region: "Privacidade máxima",
      text: "Resorts de ilha única, a mais de uma hora de hidroavião — o isolamento no seu ponto máximo.",
      image: {
        src: unsplash("1602002418082-a4443e081dd1", 1200),
        alt: "Sala de estar de suíte sobre a água com vista para o mar",
      },
    },
  ],

  months: [
    { month: 1, status: "ideal", note: "Estação seca, mar calmo e céu limpo." },
    { month: 2, status: "ideal", note: "Continuação da estação seca — uma das melhores janelas do ano." },
    { month: 3, status: "ideal", note: "Ainda seco, com temperaturas altas." },
    { month: 4, status: "good", note: "Transição, ainda com boas condições de mar." },
    { month: 5, status: "avoid", note: "Início da estação das chuvas (monção sudoeste)." },
    { month: 6, status: "avoid", note: "Mais chuva e mar agitado em vários atóis." },
    { month: 7, status: "avoid", note: "Meio da estação chuvosa." },
    { month: 8, status: "avoid", note: "Ainda dentro da monção — bom para tarifas mais baixas." },
    { month: 9, status: "avoid", note: "Transição, chuvas ainda frequentes." },
    { month: 10, status: "good", note: "Final da monção, melhorando gradualmente." },
    { month: 11, status: "good", note: "Início da estação seca se aproximando." },
    { month: 12, status: "ideal", note: "Retorno da estação seca — alta temporada." },
  ],

  faq: [
    {
      question: "Qual a melhor época para viajar às Maldivas?",
      answer:
        "Dezembro a abril, durante a estação seca, com mar mais calmo e menos chuva — também é a alta temporada, então reservamos com antecedência.",
    },
    {
      question: "Quantos dias são recomendados para as Maldivas?",
      answer:
        "Entre 6 e 9 dias é o ideal para aproveitar o resort sem pressa. Viagens mais curtas também funcionam bem, já que a experiência é concentrada em uma única ilha.",
    },
    {
      question: "As Maldivas são um bom destino para lua de mel?",
      answer:
        "Sim — é um dos destinos mais procurados para isso, com villas privativas, jantares na água e resorts pensados especificamente para casais.",
    },
    {
      question: "Funciona para viagens em família com crianças?",
      answer:
        "Sim, vários resorts têm clube infantil e estrutura para famílias — a chave é escolher a ilha certa, o que fazemos na curadoria.",
    },
    {
      question: "Como funciona o deslocamento até o resort?",
      answer:
        "Depende do atol: pode ser por barco-rápido (20 min a 2h) ou hidroavião (voo panorâmico até a própria ilha). Isso entra na escolha do resort.",
    },
  ],

  relatedDestinations: [
    {
      slug: "sri-lanka",
      name: "Sri Lanka",
      region: "Índico",
      image: {
        src: unsplash("1566296314736-6eaac1ca0cb9", 900),
        alt: "Trem passando por plantação de chá verde no Sri Lanka",
      },
    },
    {
      slug: "dubai",
      name: "Dubai",
      region: "Oriente Médio",
      image: {
        src: unsplash("1512453979798-5ea266f8880c", 900),
        alt: "Horizonte de Dubai com o Burj Khalifa ao entardecer",
      },
    },
    {
      slug: "seychelles",
      name: "Seychelles",
      region: "Índico",
      image: {
        src: unsplash("1589979481223-deb893043163", 900),
        alt: "Praia de areia branca com formações rochosas em Seychelles",
      },
    },
  ],

  seo: {
    title: "Maldivas | Viagens Personalizadas | Cays Turismo",
    description:
      "Descubra as Maldivas com a curadoria da Cays Turismo. Resorts sobre a água, lua de mel, mergulho e roteiros personalizados por atol.",
  },
};
