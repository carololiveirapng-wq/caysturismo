import type { DestinationDetail } from "@/types";
import { unsplash } from "@/data/home/shared";

// TODO CMS: substituir pelos dados reais do painel. Mesmo padrão de japan.ts.
export const chile: DestinationDetail = {
  id: "chile",
  slug: "chile",
  active: true,
  featured: true,
  order: 12,
  name: "Chile",
  type: "country",
  parent: "americas",
  breadcrumb: [
    { label: "Destinos", href: "/destinos" },
    { label: "Américas", href: "/destinos/americas" },
    { label: "Chile" },
  ],

  hero: {
    image: {
      src: unsplash("1494783367193-149034c05e8f", 2400),
      alt: "Estrada reta no deserto do Atacama entre vulcões",
    },
    eyebrow: "AMÉRICAS · CHILE",
    title: "Chile, do deserto mais seco à neve mais austral.",
    subtitle:
      "Atacama, Patagônia e Santiago — paisagens extremas, vinícolas e uma faixa de terra que muda de clima a cada latitude.",
    seasonLabel: "Temporada 2026/2027",
    ctaLabel: "Planejar viagem ao Chile",
  },

  introduction: {
    heading: "Poucos países cabem em tantos climas.",
    text: "No norte, o deserto do Atacama entrega céus limpos e paisagens quase lunares. No extremo sul, a Patagônia responde com geleiras, montanhas e um silêncio raro. No meio, Santiago soma vinícolas e uma cena gastronômica em ascensão.\n\nNa Cays, ajudamos a escolher qual Chile faz sentido para a sua viagem — ou como combinar duas dessas paisagens sem perder tempo em deslocamentos longos.",
  },

  keyInfo: {
    bestTime: "Out–Abr no Atacama · Nov–Mar na Patagônia (verão austral)",
    suggestedDuration: "9 a 13 dias",
    timeZone: "1h a 2h de diferença de Brasília, conforme a época",
    currency: "Peso chileno (CLP)",
    language: "Espanhol",
    visa: "Verificar requisitos atuais para brasileiros",
    vaccines: "Consultar recomendações atualizadas antes da viagem",
    electricity: "220V · plugues tipo C/L — leve adaptador",
    flightFromBrazil: "Voos diretos de São Paulo para Santiago, em geral",
  },

  whyCays: {
    heading: "Um Chile desenhado para você.",
    image: {
      src: unsplash("1558517286-8a9cb0b8c793", 1800),
      alt: "Torres de granito no Parque Nacional Torres del Paine, na Patagônia chilena",
    },
    items: [
      {
        title: "Atacama ou Patagônia — ou os dois",
        text: "Ajudamos a decidir qual paisagem prioridade, ou como combinar as duas sem exaustão de deslocamento.",
      },
      {
        title: "Observação de estrelas e natureza extrema",
        text: "Do céu mais limpo do mundo no Atacama às geleiras da Patagônia, selecionamos experiências com o guia certo.",
      },
      {
        title: "Vinho chileno com curadoria",
        text: "Vinícolas do Valle de Colchagua e do Valle de Casablanca entram no roteiro para quem passa por Santiago.",
      },
    ],
  },

  journeysHeading: "Jornadas pelo Chile",
  experiencesHeading: "O que viver no Chile",
  monthsHeading: "Quando ir ao Chile",
  seasonCta: {
    title: "Atacama ou Patagônia — quando ir?",
    supporting: "Ajudamos a escolher a janela certa para cada região.",
  },
  finalCta: {
    title: "Sua viagem ao Chile começa em uma conversa.",
    supporting: "Conte para a Cays o que você deseja viver. Nós cuidamos do caminho.",
    note: "Fale com um especialista da Cays",
  },

  journeys: [
    {
      slug: "deserto-do-atacama",
      title: "Deserto do Atacama",
      subtitle: "Vulcões, sal e céu estrelado",
      durationLabel: "6 dias",
      typeLabel: "Viagem especial",
      text: "Estradas infinitas entre vulcões e um dos céus mais limpos do planeta.",
      image: {
        src: unsplash("1494783367193-149034c05e8f", 1400),
        alt: "Estrada reta no deserto do Atacama entre vulcões",
      },
    },
    {
      slug: "patagonia-chilena",
      title: "Patagônia Chilena",
      subtitle: "Torres del Paine",
      durationLabel: "7 dias",
      typeLabel: "Viagem de natureza",
      text: "Geleiras, montanhas de granito e trilhas em um dos parques mais impressionantes do mundo.",
      image: {
        src: unsplash("1558517286-8a9cb0b8c793", 1400),
        alt: "Torres de granito no Parque Nacional Torres del Paine, na Patagônia chilena",
      },
    },
    {
      slug: "santiago-e-vinicolas",
      title: "Santiago & Vinícolas",
      subtitle: "Cidade e vinho",
      durationLabel: "5 dias",
      typeLabel: "Roteiro temático",
      text: "A capital chilena e os vales vinícolas ao redor, entre montanhas e videiras.",
      image: {
        src: unsplash("1560493676-04071c5f467b", 1400),
        alt: "Vinhedo em fileiras na região central do Chile",
      },
    },
  ],

  experiences: [
    {
      title: "Céu estrelado do Atacama",
      text: "Um dos céus mais limpos do mundo, ideal para observação astronômica.",
      image: {
        src: unsplash("1517824806704-9040b037703b", 1200),
        alt: "Céu estrelado com a Via Láctea visível no deserto do Atacama",
      },
    },
    {
      title: "Torres del Paine",
      text: "Torres de granito emergindo entre geleiras e lagos turquesa.",
      image: {
        src: unsplash("1558517286-8a9cb0b8c793", 1200),
        alt: "Torres de granito no Parque Nacional Torres del Paine, na Patagônia chilena",
      },
    },
    {
      title: "Vale da Lua",
      text: "Formações rochosas que parecem paisagem lunar, no Atacama.",
      image: {
        src: unsplash("1557998983-d2cf1416263e", 1200),
        alt: "Formações rochosas áridas no Vale da Lua, Atacama",
      },
    },
    {
      title: "Vinícolas chilenas",
      text: "Vales entre a Cordilheira dos Andes e o Oceano Pacífico.",
      image: {
        src: unsplash("1560493676-04071c5f467b", 1600),
        alt: "Vinhedo em fileiras na região central do Chile",
      },
    },
    {
      title: "Trekking na Patagônia",
      text: "Trilhas entre geleiras, para diferentes níveis de preparo físico.",
      image: {
        src: unsplash("1552751753-0fc84ae5b6c8", 1600),
        alt: "Trilha de trekking com vista para geleira na Patagônia",
      },
    },
  ],

  stays: [
    {
      name: "San Pedro de Atacama",
      region: "Deserto",
      text: "Lodges no deserto, com observação de estrelas incluída.",
      image: {
        src: unsplash("1494783367193-149034c05e8f", 1200),
        alt: "Estrada reta no deserto do Atacama entre vulcões",
      },
    },
    {
      name: "Torres del Paine",
      region: "Patagônia",
      text: "Hospedagens com vista para as torres de granito e os lagos glaciais.",
      image: {
        src: unsplash("1558517286-8a9cb0b8c793", 1200),
        alt: "Torres de granito no Parque Nacional Torres del Paine, na Patagônia chilena",
      },
    },
    {
      name: "Santiago",
      region: "Capital e vales",
      text: "Hotéis urbanos com fácil acesso às vinícolas dos vales próximos.",
      image: {
        src: unsplash("1560493676-04071c5f467b", 1200),
        alt: "Vinhedo em fileiras na região central do Chile",
      },
    },
  ],

  months: [
    { month: 1, status: "ideal", note: "Verão austral — ótima época para a Patagônia." },
    { month: 2, status: "ideal", note: "Ainda verão, boa visibilidade em Torres del Paine." },
    { month: 3, status: "good", note: "Início do outono, Patagônia ainda acessível." },
    { month: 4, status: "good", note: "Bom para o Atacama, Patagônia entrando na baixa temporada." },
    { month: 5, status: "good", note: "Atacama segue ótimo, Patagônia mais fria." },
    { month: 6, status: "avoid", note: "Inverno na Patagônia — muitas trilhas fechadas." },
    { month: 7, status: "avoid", note: "Inverno rigoroso no sul do país." },
    { month: 8, status: "avoid", note: "Ainda inverno, Atacama frio à noite mas viável de dia." },
    { month: 9, status: "good", note: "Início da primavera, Atacama em plena temporada." },
    { month: 10, status: "ideal", note: "Bom para o Atacama, início da temporada na Patagônia." },
    { month: 11, status: "ideal", note: "Patagônia abrindo bem, clima ameno em todo o país." },
    { month: 12, status: "ideal", note: "Início do verão austral — ótima época para os dois extremos." },
  ],

  faq: [
    {
      question: "Qual a melhor época para o Atacama e a Patagônia?",
      answer:
        "O Atacama funciona bem quase o ano todo; a Patagônia é melhor de novembro a março (verão austral), quando as trilhas de Torres del Paine estão totalmente abertas.",
    },
    {
      question: "É possível combinar Atacama e Patagônia na mesma viagem?",
      answer:
        "Sim, mas exige tempo — as duas regiões ficam em extremos opostos do país. Recomendamos ao menos 12 a 14 dias para fazer justiça às duas sem exaustão.",
    },
    {
      question: "Preciso de preparo físico para visitar a Patagônia?",
      answer:
        "Depende do roteiro — há trilhas para diferentes níveis, incluindo passeios com pouca caminhada. Ajustamos a intensidade conforme seu perfil.",
    },
    {
      question: "Vale a pena incluir a Argentina na mesma viagem?",
      answer:
        "Sim, é uma combinação comum, especialmente na Patagônia — El Calafate, do lado argentino, complementa bem Torres del Paine.",
    },
    {
      question: "Como funciona um roteiro personalizado com a Cays?",
      answer:
        "Começamos entendendo como você gosta de viajar, desenhamos a jornada, cuidamos de cada detalhe — hospedagem, deslocamentos e experiências — e você foca em vivê-la.",
    },
  ],

  relatedDestinations: [
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
      slug: "peru",
      name: "Peru",
      region: "Américas",
      image: {
        src: unsplash("1526392060635-9d6019884377", 900),
        alt: "Ruínas de Machu Picchu entre montanhas no Peru",
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
    title: "Chile | Viagens Personalizadas | Cays Turismo",
    description:
      "Descubra o Chile com a curadoria da Cays Turismo. Deserto do Atacama, Patagônia e Santiago, com roteiros que combinam paisagem extrema e vinho.",
  },
};
