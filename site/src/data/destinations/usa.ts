import type { DestinationDetail } from "@/types";
import { unsplash } from "@/data/home/shared";

// TODO CMS: substituir pelos dados reais do painel. Mesmo padrão de japan.ts.
export const usa: DestinationDetail = {
  id: "estados-unidos",
  slug: "estados-unidos",
  active: true,
  featured: true,
  order: 13,
  name: "Estados Unidos",
  type: "country",
  parent: "americas",
  breadcrumb: [
    { label: "Destinos", href: "/destinos" },
    { label: "Américas", href: "/destinos/americas" },
    { label: "Estados Unidos" },
  ],

  hero: {
    image: {
      src: unsplash("1531366936337-7c912a4589a7", 2400),
      alt: "Aurora boreal verde e violeta sobre paisagem nevada no Alasca",
    },
    eyebrow: "AMÉRICAS · ESTADOS UNIDOS",
    title: "Estados Unidos, um país do tamanho de vários.",
    subtitle:
      "Nova York, Califórnia, parques nacionais e o Alasca — cidades icônicas, road trips e paisagens que mudam a cada estado.",
    seasonLabel: "Temporada 2026/2027",
    ctaLabel: "Planejar viagem aos Estados Unidos",
  },

  introduction: {
    heading: "Cada região dos EUA é quase um país à parte.",
    text: "Nova York entrega intensidade urbana; a Califórnia soma litoral, vinícolas e parques nacionais; o Alasca responde com aurora boreal e paisagem selvagem. Poucos destinos oferecem tanta variedade sob uma só bandeira.\n\nNa Cays, ajudamos a decidir qual recorte dos Estados Unidos faz sentido para a sua viagem — seja uma imersão urbana, um road trip ou uma experiência de natureza extrema.",
  },

  keyInfo: {
    bestTime: "Varia por região — depende do recorte escolhido",
    suggestedDuration: "8 a 14 dias, conforme o roteiro",
    timeZone: "1h a 6h de diferença de Brasília, conforme o estado",
    currency: "Dólar americano (USD)",
    language: "Inglês",
    visa: "Verificar requisitos atuais para brasileiros",
    vaccines: "Consultar recomendações atualizadas antes da viagem",
    electricity: "120V · plugues tipo A/B — leve adaptador",
    flightFromBrazil: "Voos diretos de São Paulo e Rio para várias cidades, em geral",
  },

  whyCays: {
    heading: "Um Estados Unidos desenhado para você.",
    image: {
      src: unsplash("1496442226666-8d4d0e62e6e9", 1800),
      alt: "Horizonte de Nova York ao entardecer, visto do rio",
    },
    items: [
      {
        title: "O recorte certo para sua viagem",
        text: "Ajudamos a escolher entre cidade, road trip ou natureza — o país é grande demais para tentar tudo de uma vez.",
      },
      {
        title: "Logística de road trip pensada",
        text: "Distâncias reais, paradas certas e hospedagens que fazem sentido para cada trecho da estrada.",
      },
      {
        title: "Experiências para todas as idades",
        text: "Parques, museus e cidades combinam bem com viagens em família, sem perder sofisticação para quem viaja a dois.",
      },
    ],
  },

  journeysHeading: "Jornadas pelos Estados Unidos",
  experiencesHeading: "O que viver nos Estados Unidos",
  monthsHeading: "Quando ir aos Estados Unidos",
  seasonCta: {
    title: "Quer ver a aurora boreal no Alasca?",
    supporting: "Montamos o período ideal para essa experiência.",
  },
  finalCta: {
    title: "Sua viagem aos Estados Unidos começa em uma conversa.",
    supporting: "Conte para a Cays o que você deseja viver. Nós cuidamos do caminho.",
    note: "Fale com um especialista da Cays",
  },

  journeys: [
    {
      slug: "nova-york-essencial",
      title: "Nova York Essencial",
      subtitle: "A cidade que nunca dorme",
      durationLabel: "6 dias",
      typeLabel: "Viagem de cidade",
      text: "Museus, bairros icônicos e a energia própria de Manhattan.",
      image: {
        src: unsplash("1496442226666-8d4d0e62e6e9", 1400),
        alt: "Horizonte de Nova York ao entardecer, visto do rio",
      },
    },
    {
      slug: "road-trip-california",
      title: "Road Trip California",
      subtitle: "Litoral e parques nacionais",
      durationLabel: "10 dias",
      typeLabel: "Viagem de estrada",
      text: "De São Francisco a Los Angeles, com paradas em parques e vinícolas.",
      image: {
        src: unsplash("1449034446853-66c86144b0ad", 1400),
        alt: "Estrada costeira ao longo do litoral da Califórnia",
      },
    },
    {
      slug: "alasca-expedicao",
      title: "Alasca — Expedição",
      subtitle: "Aurora boreal e paisagem selvagem",
      durationLabel: "8 dias",
      typeLabel: "Viagem de expedição",
      text: "Gelo, silêncio e a aurora sobre uma paisagem nevada e remota.",
      image: {
        src: unsplash("1531366936337-7c912a4589a7", 1400),
        alt: "Aurora boreal verde e violeta sobre paisagem nevada no Alasca",
      },
    },
  ],

  experiences: [
    {
      title: "Manhattan e seus bairros",
      text: "Do Central Park ao Brooklyn, cada bairro com identidade própria.",
      image: {
        src: unsplash("1496442226666-8d4d0e62e6e9", 1200),
        alt: "Horizonte de Nova York ao entardecer, visto do rio",
      },
    },
    {
      title: "Parques nacionais",
      text: "Yosemite, Grand Canyon e paisagens que definem o oeste americano.",
      image: {
        src: unsplash("1502786129293-79981df4e689", 1200),
        alt: "Formações rochosas do Grand Canyon ao entardecer",
      },
    },
    {
      title: "Litoral da Califórnia",
      text: "Estradas costeiras entre penhascos e cidades litorâneas.",
      image: {
        src: unsplash("1449034446853-66c86144b0ad", 1200),
        alt: "Estrada costeira ao longo do litoral da Califórnia",
      },
    },
    {
      title: "Aurora boreal no Alasca",
      text: "Um espetáculo natural visível em noites de céu limpo.",
      image: {
        src: unsplash("1531366936337-7c912a4589a7", 1600),
        alt: "Aurora boreal verde e violeta sobre paisagem nevada no Alasca",
      },
    },
    {
      title: "Vinícolas da Califórnia",
      text: "Napa Valley e Sonoma, entre as regiões vinícolas mais respeitadas do mundo.",
      image: {
        src: unsplash("1560493676-04071c5f467b", 1600),
        alt: "Vinhedo em fileiras ao pôr do sol",
      },
    },
  ],

  stays: [
    {
      name: "Nova York",
      region: "Costa leste",
      text: "Hotéis em Manhattan, próximos aos principais bairros e museus.",
      image: {
        src: unsplash("1496442226666-8d4d0e62e6e9", 1200),
        alt: "Horizonte de Nova York ao entardecer, visto do rio",
      },
    },
    {
      name: "Califórnia",
      region: "Costa oeste",
      text: "Resorts costeiros e pousadas em Napa Valley, para road trips sem pressa.",
      image: {
        src: unsplash("1449034446853-66c86144b0ad", 1200),
        alt: "Estrada costeira ao longo do litoral da Califórnia",
      },
    },
    {
      name: "Alasca",
      region: "Expedição",
      text: "Lodges preparados para observação de aurora boreal em noites claras.",
      image: {
        src: unsplash("1531366936337-7c912a4589a7", 1200),
        alt: "Aurora boreal verde e violeta sobre paisagem nevada no Alasca",
      },
    },
  ],

  months: [
    { month: 1, status: "good", note: "Boa época para o Alasca (aurora); frio intenso na costa leste." },
    { month: 2, status: "good", note: "Ainda boa janela de aurora boreal no Alasca." },
    { month: 3, status: "good", note: "Início da primavera na costa leste e oeste." },
    { month: 4, status: "ideal", note: "Clima ameno em Nova York e na Califórnia." },
    { month: 5, status: "ideal", note: "Um dos melhores meses para road trips na Califórnia." },
    { month: 6, status: "good", note: "Início do verão, parques nacionais em plena temporada." },
    { month: 7, status: "avoid", note: "Alta temporada e calor intenso em várias regiões." },
    { month: 8, status: "avoid", note: "Ainda alta temporada, preços mais altos." },
    { month: 9, status: "ideal", note: "Fim do verão, clima ameno e menos multidão." },
    { month: 10, status: "ideal", note: "Outono com folhagem colorida na costa leste." },
    { month: 11, status: "good", note: "Início do frio, boa época para retomar o Alasca." },
    { month: 12, status: "good", note: "Clima festivo em Nova York; boa janela de aurora no Alasca." },
  ],

  faq: [
    {
      question: "Qual roteiro dos Estados Unidos vocês recomendam para uma primeira viagem?",
      answer:
        "Depende do perfil — Nova York funciona bem para uma imersão urbana curta; a Califórnia, para quem quer natureza e estrada; o Alasca, para uma experiência mais rara. Ajudamos a decidir.",
    },
    {
      question: "Quantos dias são recomendados para um road trip pela Califórnia?",
      answer:
        "Entre 8 e 12 dias permitem combinar São Francisco, a costa e Los Angeles sem correria, com paradas em parques e vinícolas no caminho.",
    },
    {
      question: "Quando é a melhor época para ver a aurora boreal no Alasca?",
      answer:
        "De setembro a abril, em noites de céu limpo e pouca luz — a visibilidade nunca é garantida, mas escolhemos locais com histórico melhor de avistamento.",
    },
    {
      question: "Os Estados Unidos funcionam bem para viagens em família?",
      answer:
        "Sim — parques nacionais, cidades grandes e boa infraestrutura tornam o país um destino sólido para diferentes idades.",
    },
    {
      question: "Como funciona um roteiro personalizado com a Cays?",
      answer:
        "Começamos entendendo como você gosta de viajar, desenhamos a jornada, cuidamos de cada detalhe — hospedagem, deslocamentos e experiências — e você foca em vivê-la.",
    },
  ],

  relatedDestinations: [
    {
      slug: "canada",
      name: "Canadá",
      region: "Américas",
      image: {
        src: unsplash("1503614472-8c93d56e92ce", 900),
        alt: "Lago Moraine entre montanhas nevadas, no Canadá",
      },
    },
    {
      slug: "mexico",
      name: "México",
      region: "Américas",
      image: {
        src: unsplash("1518638150340-f706e86654de", 900),
        alt: "Ruínas maias de Chichen Itzá, no México",
      },
    },
    {
      slug: "brasil",
      name: "Brasil",
      region: "Américas",
      image: {
        src: unsplash("1483729558449-99ef09a8c325", 900),
        alt: "Vista aérea do Pão de Açúcar e da Baía de Guanabara, Rio de Janeiro",
      },
    },
  ],

  seo: {
    title: "Estados Unidos | Viagens Personalizadas | Cays Turismo",
    description:
      "Descubra os Estados Unidos com a curadoria da Cays Turismo. Nova York, Califórnia e Alasca, com road trips e roteiros personalizados.",
  },
};
