import type { DestinationDetail } from "@/types";
import { unsplash } from "@/data/home/shared";

// TODO CMS: substituir pelos dados reais do painel. Mesmo padrão de japan.ts.
export const southAfrica: DestinationDetail = {
  id: "africa-do-sul",
  slug: "africa-do-sul",
  active: true,
  featured: true,
  order: 11,
  name: "África do Sul",
  type: "country",
  parent: "africa-oriente-medio",
  breadcrumb: [
    { label: "Destinos", href: "/destinos" },
    { label: "África & Oriente Médio", href: "/destinos/africa-oriente-medio" },
    { label: "África do Sul" },
  ],

  hero: {
    image: {
      src: unsplash("1577971132997-c10be9372519", 2400),
      alt: "Elefantes avistados durante um safári fotográfico",
    },
    eyebrow: "ÁFRICA & ORIENTE MÉDIO · ÁFRICA DO SUL",
    title: "África do Sul, safári e Cidade do Cabo em uma só viagem.",
    subtitle:
      "Reservas privadas, Winelands e a Cidade do Cabo — natureza intensa, gastronomia e paisagem ao pé da Table Mountain.",
    seasonLabel: "Temporada 2026/2027",
    ctaLabel: "Planejar viagem à África do Sul",
  },

  introduction: {
    heading: "Um país que combina savana e litoral sem esforço.",
    text: "De manhã, um safári em reserva privada revela os Big Five a poucos metros do veículo. Dias depois, a Cidade do Cabo entrega Table Mountain, praias e as vinícolas da região de Winelands. Poucos destinos condensam tanta diversidade de paisagem em uma única viagem.\n\nNa Cays, combinamos reservas privadas selecionadas com a sofisticação da Cidade do Cabo — natureza intensa de um lado, boa mesa e vinho do outro.",
  },

  keyInfo: {
    bestTime: "Mai–Set (inverno seco, melhor visibilidade de safári)",
    suggestedDuration: "10 a 13 dias",
    timeZone: "5h a mais que Brasília",
    currency: "Rand sul-africano (ZAR)",
    language: "Inglês e línguas locais",
    visa: "Verificar requisitos atuais para brasileiros",
    vaccines: "Consultar recomendações atualizadas antes da viagem, incluindo áreas de risco de malária",
    electricity: "230V · plugues tipo M — leve adaptador",
    flightFromBrazil: "Voos diretos de São Paulo para Joanesburgo, em geral",
  },

  whyCays: {
    heading: "Uma África do Sul desenhada para você.",
    image: {
      src: unsplash("1516426122078-c23e76319801", 1800),
      alt: "Vista da Table Mountain a partir da Cidade do Cabo",
    },
    items: [
      {
        title: "Reservas privadas selecionadas",
        text: "Escolhemos lodges com bom histórico de avistamento e conforto real, não apenas proximidade da cidade.",
      },
      {
        title: "Safári e cidade na proporção certa",
        text: "Combinamos dias de savana com a sofisticação urbana da Cidade do Cabo, sem uma etapa pesar mais que a outra.",
      },
      {
        title: "Vinho e gastronomia de Winelands",
        text: "Vinícolas históricas entram no roteiro para quem quer somar boa mesa à experiência de safári.",
      },
    ],
  },

  journeysHeading: "Jornadas pela África do Sul",
  experiencesHeading: "O que viver na África do Sul",
  monthsHeading: "Quando ir à África do Sul",
  seasonCta: {
    title: "Quer a melhor visibilidade de safári?",
    supporting: "Montamos o período ideal entre maio e setembro.",
  },
  finalCta: {
    title: "Sua viagem à África do Sul começa em uma conversa.",
    supporting: "Conte para a Cays o que você deseja viver. Nós cuidamos do caminho.",
    note: "Fale com um especialista da Cays",
  },

  journeys: [
    {
      slug: "safari-e-cidade-do-cabo",
      title: "Safári & Cidade do Cabo",
      subtitle: "Savana e litoral",
      durationLabel: "11 dias",
      typeLabel: "Roteiro guiado",
      text: "Dias de safári em reserva privada seguidos da sofisticação da Cidade do Cabo.",
      image: {
        src: unsplash("1516426122078-c23e76319801", 1400),
        alt: "Vista da Table Mountain a partir da Cidade do Cabo",
      },
    },
    {
      slug: "safari-privativo",
      title: "Safári Privativo",
      subtitle: "Big Five em reserva exclusiva",
      durationLabel: "6 dias",
      typeLabel: "Viagem especial",
      text: "Lodges de reserva privada, com guias exclusivos e poucos veículos por safári.",
      image: {
        src: unsplash("1577971132997-c10be9372519", 1400),
        alt: "Elefantes avistados durante um safári fotográfico",
      },
    },
    {
      slug: "winelands-e-costa",
      title: "Winelands & Costa",
      subtitle: "Vinho e litoral",
      durationLabel: "7 dias",
      typeLabel: "Roteiro temático",
      text: "Vinícolas históricas e o litoral ao redor da Cidade do Cabo.",
      image: {
        src: unsplash("1560493676-04071c5f467b", 1400),
        alt: "Vinhedo na região de Stellenbosch, na África do Sul",
      },
    },
  ],

  experiences: [
    {
      title: "Safári fotográfico",
      text: "Os Big Five, vistos de perto em reserva privada.",
      image: {
        src: unsplash("1577971132997-c10be9372519", 1200),
        alt: "Elefantes avistados durante um safári fotográfico",
      },
    },
    {
      title: "Table Mountain",
      text: "Vista panorâmica da Cidade do Cabo e do Atlântico.",
      image: {
        src: unsplash("1516426122078-c23e76319801", 1200),
        alt: "Vista da Table Mountain a partir da Cidade do Cabo",
      },
    },
    {
      title: "Vinícolas de Stellenbosch",
      text: "Uma das regiões vinícolas mais respeitadas do hemisfério sul.",
      image: {
        src: unsplash("1560493676-04071c5f467b", 1200),
        alt: "Vinhedo na região de Stellenbosch, na África do Sul",
      },
    },
    {
      title: "Cabo da Boa Esperança",
      text: "O encontro simbólico entre dois oceanos.",
      image: {
        src: unsplash("1552596160-2972cb5d9fc2", 1600),
        alt: "Costa rochosa do Cabo da Boa Esperança, na África do Sul",
      },
    },
    {
      title: "Pôr do sol no lodge",
      text: "O ritual de fim de tarde entre uma volta de safári e outra.",
      image: {
        src: unsplash("1516156008625-3a9d6067fab5", 1600),
        alt: "Pôr do sol sobre a savana africana com silhuetas de acácias",
      },
    },
  ],

  stays: [
    {
      name: "Reservas privadas",
      region: "Savana",
      text: "Lodges de safári com guias exclusivos e boa relação de conforto e natureza.",
      image: {
        src: unsplash("1577971132997-c10be9372519", 1200),
        alt: "Elefantes avistados durante um safári fotográfico",
      },
    },
    {
      name: "Cidade do Cabo",
      region: "Litoral urbano",
      text: "Hotéis com vista para a Table Mountain ou para o Atlântico.",
      image: {
        src: unsplash("1516426122078-c23e76319801", 1200),
        alt: "Vista da Table Mountain a partir da Cidade do Cabo",
      },
    },
    {
      name: "Winelands",
      region: "Stellenbosch e Franschhoek",
      text: "Pousadas entre vinhedos, a menos de uma hora da Cidade do Cabo.",
      image: {
        src: unsplash("1560493676-04071c5f467b", 1200),
        alt: "Vinhedo na região de Stellenbosch, na África do Sul",
      },
    },
  ],

  months: [
    { month: 1, status: "avoid", note: "Verão sul-africano, vegetação densa dificulta o avistamento." },
    { month: 2, status: "avoid", note: "Ainda verão, calor e chuvas ocasionais." },
    { month: 3, status: "good", note: "Transição para o outono, melhorando gradualmente." },
    { month: 4, status: "good", note: "Outono, vegetação começando a ralear." },
    { month: 5, status: "ideal", note: "Início do inverno seco — boa visibilidade de safári." },
    { month: 6, status: "ideal", note: "Inverno seco, excelente para avistamento." },
    { month: 7, status: "ideal", note: "Um dos melhores meses para safári." },
    { month: 8, status: "ideal", note: "Ainda seco, ótima visibilidade." },
    { month: 9, status: "good", note: "Fim do inverno, clima ainda favorável." },
    { month: 10, status: "good", note: "Início da primavera, vegetação retornando." },
    { month: 11, status: "avoid", note: "Início das chuvas de verão." },
    { month: 12, status: "avoid", note: "Verão, alta temporada na Cidade do Cabo apesar da vegetação densa." },
  ],

  faq: [
    {
      question: "Qual a melhor época para o safári na África do Sul?",
      answer:
        "Maio a setembro, durante o inverno seco — a vegetação mais baixa facilita o avistamento dos animais nas reservas.",
    },
    {
      question: "É seguro fazer safári com crianças?",
      answer:
        "Sim, muitos lodges têm programas específicos para famílias — a idade mínima e o tipo de atividade variam por reserva, o que ajustamos na escolha do lodge.",
    },
    {
      question: "Preciso de vacina para viajar à África do Sul?",
      answer:
        "Depende da região visitada, especialmente em áreas de risco de malária — consulte recomendações atualizadas antes da viagem com um médico de viagem.",
    },
    {
      question: "Quantos dias são recomendados para a viagem?",
      answer:
        "Entre 10 e 13 dias permitem combinar dias de safári com a Cidade do Cabo e Winelands sem correria.",
    },
    {
      question: "Como funciona um roteiro personalizado com a Cays?",
      answer:
        "Começamos entendendo como você gosta de viajar, desenhamos a jornada, cuidamos de cada detalhe — hospedagem, deslocamentos e experiências — e você foca em vivê-la.",
    },
  ],

  relatedDestinations: [
    {
      slug: "namibia",
      name: "Namíbia",
      region: "África",
      image: {
        src: unsplash("1547471080-7cc2caa01a7e", 900),
        alt: "Dunas de areia vermelha no deserto da Namíbia",
      },
    },
    {
      slug: "quenia",
      name: "Quênia",
      region: "África",
      image: {
        src: unsplash("1526319238109-524eecb9b913", 900),
        alt: "Manada de zebras na savana do Quênia",
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
  ],

  seo: {
    title: "África do Sul | Viagens Personalizadas | Cays Turismo",
    description:
      "Descubra a África do Sul com a curadoria da Cays Turismo. Safári em reservas privadas, Cidade do Cabo e Winelands, com roteiros personalizados.",
  },
};
