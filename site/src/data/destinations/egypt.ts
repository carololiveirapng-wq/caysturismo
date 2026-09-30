import type { DestinationDetail } from "@/types";
import { unsplash } from "@/data/home/shared";

// TODO CMS: substituir pelos dados reais do painel. Mesmo padrão de japan.ts.
export const egypt: DestinationDetail = {
  id: "egito",
  slug: "egito",
  active: true,
  featured: true,
  order: 4,
  name: "Egito",
  type: "country",
  parent: "africa-oriente-medio",
  breadcrumb: [
    { label: "Destinos", href: "/destinos" },
    { label: "África & Oriente Médio", href: "/destinos/africa-oriente-medio" },
    { label: "Egito" },
  ],

  hero: {
    image: {
      src: unsplash("1539768942893-daf53e448371", 2400),
      alt: "Caravana de camelos junto às pirâmides de Gizé ao entardecer",
    },
    eyebrow: "ÁFRICA & ORIENTE MÉDIO · EGITO",
    title: "Egito, cinco mil anos diante dos seus olhos.",
    subtitle:
      "Cairo, Luxor e o Rio Nilo — arqueologia, história viva e um cruzeiro que atravessa o deserto devagar.",
    seasonLabel: "Temporada 2026/2027",
    ctaLabel: "Planejar viagem ao Egito",
  },

  introduction: {
    heading: "O Egito não se visita — se atravessa, de barco.",
    text: "Das pirâmides de Gizé aos templos de Luxor, o Egito guarda a maior concentração de história antiga ainda de pé no mundo. Entre uma parada e outra, o Nilo segue como fio condutor — a mesma água que sustentou essa civilização por milênios.\n\nNa Cays, combinamos Cairo, um cruzeiro pelo Nilo e hospedagens históricas para que a viagem tenha o mesmo peso e a mesma reverência que o próprio destino pede.",
  },

  keyInfo: {
    bestTime: "Out–Mar (temperaturas mais amenas no deserto)",
    suggestedDuration: "8 a 11 dias",
    timeZone: "5h a mais que Brasília",
    currency: "Libra egípcia (EGP)",
    language: "Árabe — inglês comum em áreas turísticas",
    visa: "Verificar requisitos atuais para brasileiros",
    vaccines: "Consultar recomendações atualizadas antes da viagem",
    electricity: "220V · plugues tipo C/F — leve adaptador",
    flightFromBrazil: "Sem voo direto — conexão via Europa ou Oriente Médio",
  },

  whyCays: {
    heading: "Um Egito desenhado para você.",
    image: {
      src: unsplash("1568322445389-f64ac2515020", 1800),
      alt: "Templo egípcio antigo com colunas esculpidas em Luxor",
    },
    items: [
      {
        title: "Guias especializados em egiptologia",
        text: "Cada templo e tumba ganha contexto real, contado por quem entende a história a fundo.",
      },
      {
        title: "Cruzeiro pelo Nilo com curadoria",
        text: "Selecionamos embarcações menores e mais confortáveis, com paradas certas ao longo do rio.",
      },
      {
        title: "Hospedagens históricas",
        text: "De hotéis centenários no Cairo a barcos com caráter, cada escolha passa pelo nosso olhar.",
      },
    ],
  },

  journeysHeading: "Jornadas pelo Egito",
  experiencesHeading: "O que viver no Egito",
  monthsHeading: "Quando ir ao Egito",
  seasonCta: {
    title: "Quer evitar o calor do deserto?",
    supporting: "Montamos o período ideal entre outono e início da primavera.",
  },
  finalCta: {
    title: "Sua viagem ao Egito começa em uma conversa.",
    supporting: "Conte para a Cays o que você deseja viver. Nós cuidamos do caminho.",
    note: "Fale com um especialista da Cays",
  },

  journeys: [
    {
      slug: "egito-essencial",
      title: "Egito Essencial",
      subtitle: "Cairo, Luxor e Assuã",
      durationLabel: "9 dias",
      typeLabel: "Roteiro guiado",
      text: "Pirâmides, templos e um cruzeiro pelo Nilo em uma única jornada.",
      image: {
        src: unsplash("1539650116574-8efeb43e2750", 1400),
        alt: "Templo de Karnak em Luxor com colunas monumentais",
      },
    },
    {
      slug: "cruzeiro-pelo-nilo",
      title: "Cruzeiro pelo Nilo",
      subtitle: "De Luxor a Assuã",
      durationLabel: "5 dias",
      typeLabel: "Viagem de cruzeiro",
      text: "O deserto e os templos vistos devagar, à beira-rio.",
      image: {
        src: unsplash("1539768942893-daf53e448371", 1400),
        alt: "Caravana de camelos junto às pirâmides de Gizé ao entardecer",
      },
    },
    {
      slug: "egito-e-mar-vermelho",
      title: "Egito & Mar Vermelho",
      subtitle: "História e praia",
      durationLabel: "11 dias",
      typeLabel: "Roteiro combinado",
      text: "Arqueologia no Cairo e Luxor, seguida de dias de descanso no Mar Vermelho.",
      image: {
        src: unsplash("1693523783087-e75073f36860", 1400),
        alt: "Recife de coral e mar azul-turquesa no Mar Vermelho",
      },
    },
  ],

  experiences: [
    {
      title: "Pirâmides de Gizé",
      text: "A última das sete maravilhas do mundo antigo, ainda de pé.",
      image: {
        src: unsplash("1539650116574-8efeb43e2750", 1200),
        alt: "Pirâmides de Gizé vistas de perto sob céu limpo",
      },
    },
    {
      title: "Vale dos Reis",
      text: "Tumbas subterrâneas decoradas há mais de três mil anos.",
      image: {
        src: unsplash("1553913861-c0fddf2619ee", 1200),
        alt: "Paisagem árida do Vale dos Reis próximo a Luxor",
      },
    },
    {
      title: "Museu Egípcio",
      text: "Do Cairo ao Grande Museu Egípcio — os tesouros de Tutancâmon.",
      image: {
        src: unsplash("1568322445389-f64ac2515020", 1200),
        alt: "Templo egípcio antigo com colunas esculpidas em Luxor",
      },
    },
    {
      title: "Navegar pelo Nilo",
      text: "Vilarejos e paisagens do deserto vistos da água.",
      image: {
        src: unsplash("1684100096410-fd39cdff91a3", 1600),
        alt: "Barco à vela tradicional (felucca) navegando no Rio Nilo",
      },
    },
    {
      title: "Templo de Abu Simbel",
      text: "Estátuas colossais talhadas na rocha, no extremo sul do país.",
      image: {
        src: unsplash("1595079676339-1534801ad6cf", 1600),
        alt: "Fachada monumental do templo de Abu Simbel",
      },
    },
  ],

  stays: [
    {
      name: "Cairo",
      region: "Capital histórica",
      text: "Hotéis centenários com vista para o Nilo, a poucos minutos das pirâmides.",
      image: {
        src: unsplash("1572252009286-268acec5ca0a", 1200),
        alt: "Horizonte do Cairo à beira do Rio Nilo ao entardecer",
      },
    },
    {
      name: "Cruzeiro pelo Nilo",
      region: "Luxor a Assuã",
      text: "Embarcações selecionadas, com cabines confortáveis e paradas certas.",
      image: {
        src: unsplash("1539768942893-daf53e448371", 1200),
        alt: "Caravana de camelos junto às pirâmides de Gizé ao entardecer",
      },
    },
    {
      name: "Mar Vermelho",
      region: "Extensão de praia",
      text: "Resorts à beira-mar para descansar após os dias de arqueologia.",
      image: {
        src: unsplash("1693523783087-e75073f36860", 1200),
        alt: "Recife de coral e mar azul-turquesa no Mar Vermelho",
      },
    },
  ],

  months: [
    { month: 1, status: "ideal", note: "Temperaturas amenas — um dos melhores meses do ano." },
    { month: 2, status: "ideal", note: "Ainda fresco, boa visibilidade para passeios ao ar livre." },
    { month: 3, status: "good", note: "Início do calor, ainda tolerável durante o dia." },
    { month: 4, status: "good", note: "Temperaturas subindo, ventos de areia ocasionais." },
    { month: 5, status: "avoid", note: "Calor forte no deserto." },
    { month: 6, status: "avoid", note: "Início do verão, temperaturas muito altas." },
    { month: 7, status: "avoid", note: "Pico do calor — pouco recomendado para passeios longos." },
    { month: 8, status: "avoid", note: "Ainda no pico do verão egípcio." },
    { month: 9, status: "good", note: "Início do outono, calor começando a ceder." },
    { month: 10, status: "ideal", note: "Temperaturas mais amenas, boa época para o cruzeiro." },
    { month: 11, status: "ideal", note: "Clima agradável, alta temporada começando." },
    { month: 12, status: "ideal", note: "Um dos melhores meses, com clima fresco pela manhã." },
  ],

  faq: [
    {
      question: "Qual a melhor época para viajar ao Egito?",
      answer:
        "Outubro a março, quando as temperaturas no deserto ficam mais amenas — o verão local é muito quente para a maioria dos roteiros ao ar livre.",
    },
    {
      question: "É seguro viajar ao Egito?",
      answer:
        "As áreas turísticas do Cairo, Luxor, Assuã e Mar Vermelho recebem viajantes normalmente, com estrutura estabelecida. Ajustamos guias e transporte para cada trecho da viagem.",
    },
    {
      question: "Como funciona o cruzeiro pelo Nilo?",
      answer:
        "Embarcações navegam entre Luxor e Assuã, com paradas em templos ao longo do caminho — geralmente 3 a 5 noites, incluídas dentro do roteiro maior pelo Egito.",
    },
    {
      question: "Vale a pena combinar Egito e Jordânia na mesma viagem?",
      answer:
        "Sim, é uma combinação comum de história antiga na região — a logística varia conforme a época; conversamos sobre isso ao montar o roteiro.",
    },
    {
      question: "Como funciona um roteiro personalizado com a Cays?",
      answer:
        "Começamos entendendo como você gosta de viajar, desenhamos a jornada, cuidamos de cada detalhe — hospedagem, deslocamentos e experiências — e você foca em vivê-la.",
    },
  ],

  relatedDestinations: [
    {
      slug: "jordania",
      name: "Jordânia",
      region: "Oriente Médio",
      image: {
        src: unsplash("1579606032821-4e6161c81bd3", 900),
        alt: "Fachada esculpida na rocha em Petra, na Jordânia",
      },
    },
    {
      slug: "turquia",
      name: "Turquia",
      region: "Europa",
      image: {
        src: unsplash("1530789253388-582c481c54b0", 900),
        alt: "Balões de ar quente sobre a Capadócia ao amanhecer",
      },
    },
    {
      slug: "marrocos",
      name: "Marrocos",
      region: "África",
      image: {
        src: unsplash("1489493887464-892be6d1daae", 900),
        alt: "Vielas coloridas da medina de Chefchaouen, no Marrocos",
      },
    },
  ],

  seo: {
    title: "Egito | Viagens Personalizadas | Cays Turismo",
    description:
      "Descubra o Egito com a curadoria da Cays Turismo. Cairo, Luxor e cruzeiro pelo Nilo, com guias especializados e hospedagens históricas.",
  },
};
