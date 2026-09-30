import type { DestinationDetail } from "@/types";
import { unsplash } from "@/data/home/shared";

/**
 * TEMPORÁRIO — conteúdo editorial de demonstração, mesmo padrão do Japão
 * (ver japan.ts). Dados variáveis/regulatórios (visto, vacinas, duração
 * exata de voo) ficam como orientação genérica, nunca como fato definitivo.
 */
// TODO CMS: substituir pelos dados reais do painel.
export const italy: DestinationDetail = {
  id: "italia",
  slug: "italia",
  active: true,
  featured: true,
  order: 2,
  name: "Itália",
  type: "country",
  parent: "europa",
  breadcrumb: [
    { label: "Destinos", href: "/destinos" },
    { label: "Europa", href: "/destinos/europa" },
    { label: "Itália" },
  ],

  hero: {
    image: {
      src: unsplash("1523906834658-6e24ef2386f9", 2400),
      alt: "Gôndola sob a Ponte Rialto em Veneza",
    },
    eyebrow: "EUROPA · ITÁLIA",
    title: "Itália, onde cada viagem ganha um ritmo próprio.",
    subtitle:
      "Roma, a Toscana, a Costa Amalfitana e as Dolomitas — arte, gastronomia e paisagem em um mesmo país, vividas no seu tempo.",
    seasonLabel: "Temporada 2026/2027",
    ctaLabel: "Planejar viagem à Itália",
  },

  introduction: {
    heading: "A Itália não é um roteiro — é uma escolha de ritmo.",
    text: "Entre ruínas de dois mil anos em Roma, colinas de cipreste na Toscana e penhascos sobre o mar na Costa Amalfitana, a Itália rende tanto uma primeira visita quanto a décima. Cada região tem sua própria luz, sua própria mesa e sua própria velocidade.\n\nNa Cays, desenhamos a Itália em torno do que importa para você — arte e história, gastronomia e vinho, ou o silêncio das montanhas nas Dolomitas — com tempo real para viver cada parada, não só cruzá-la.",
  },

  keyInfo: {
    bestTime: "Abr–Jun ou Set–Out (clima ameno, menos multidão)",
    suggestedDuration: "10 a 14 dias",
    timeZone: "4h a mais que Brasília (varia com horário de verão)",
    currency: "Euro (EUR)",
    language: "Italiano — inglês comum em áreas turísticas",
    visa: "Verificar requisitos atuais para brasileiros",
    vaccines: "Consultar recomendações atualizadas antes da viagem",
    electricity: "230V · plugues tipo F/L — leve adaptador",
    flightFromBrazil: "Voos diretos de São Paulo para Roma, em geral",
  },

  whyCays: {
    heading: "Uma Itália desenhada para você.",
    image: {
      src: unsplash("1499678329028-101435549a4e", 1800),
      alt: "Vista de Positano sobre a Costa Amalfitana com casas coloridas na encosta",
    },
    items: [
      {
        title: "Roma clássica e a Itália menos óbvia",
        text: "Equilibramos os grandes ícones com a Toscana rural, vilarejos costeiros e endereços que só quem conhece bem o país indica.",
      },
      {
        title: "Gastronomia como fio condutor",
        text: "Da trattoria de bairro à mesa premiada, cada refeição entra no roteiro por curadoria, não por acaso.",
      },
      {
        title: "Hospedagens com caráter",
        text: "De agriturismos na Toscana a hotéis históricos em Roma, cada escolha passa pelo nosso olhar antes de chegar até você.",
      },
    ],
  },

  journeysHeading: "Jornadas pela Itália",
  experiencesHeading: "O que viver na Itália",
  monthsHeading: "Quando ir à Itália",
  seasonCta: {
    title: "Prefere a Itália sem as multidões do verão?",
    supporting: "Ajudamos a escolher a janela certa entre primavera e outono.",
  },
  finalCta: {
    title: "A Itália que você imagina começa em uma conversa.",
    supporting: "Conte para a Cays o que você deseja viver. Nós cuidamos do caminho.",
    note: "Fale com um especialista da Cays",
  },

  journeys: [
    {
      slug: "italia-essencial",
      title: "Itália Essencial",
      subtitle: "Roma, Florença e Veneza",
      durationLabel: "12 dias",
      typeLabel: "Roteiro guiado",
      text: "As três cidades que definem a Itália clássica, em um ritmo sem pressa.",
      image: {
        src: unsplash("1531572753322-ad063cecc140", 1400),
        alt: "Coliseu de Roma sob luz dourada de fim de tarde",
      },
    },
    {
      slug: "toscana-e-costa-amalfitana",
      title: "Toscana & Costa Amalfitana",
      subtitle: "Vinho, colinas e mar",
      durationLabel: "10 dias",
      typeLabel: "Roteiro temático",
      text: "Vinícolas na Toscana e vilarejos suspensos sobre o Mediterrâneo.",
      image: {
        src: unsplash("1523531294919-4bcd7c65e216", 1400),
        alt: "Colinas verdes da Toscana com fileiras de ciprestes",
      },
    },
    {
      slug: "dolomitas-de-barco",
      title: "Dolomitas de Barco",
      subtitle: "Montanhas e lagos alpinos",
      durationLabel: "6 dias",
      typeLabel: "Viagem especial",
      text: "Um lago alpino, remo lento e montanhas ao redor — a Itália que poucos veem.",
      image: {
        src: unsplash("1476514525535-07fb3b4ae5f1", 1400),
        alt: "Barco de madeira em lago alpino cercado por montanhas nas Dolomitas",
      },
    },
  ],

  experiences: [
    {
      title: "Arte em Florença",
      text: "Da Galleria degli Uffizi às vielas renascentistas.",
      image: {
        src: unsplash("1543832923-44667a44c804", 1200),
        alt: "Ponte Vecchio sobre o Rio Arno em Florença",
      },
    },
    {
      title: "Mesa toscana",
      text: "Vinho, azeite e uma cozinha que é herança de família.",
      image: {
        src: unsplash("1782174177294-872d77096f77", 1200),
        alt: "Mesa posta com vinho e prato típico italiano ao ar livre",
      },
    },
    {
      title: "Costa Amalfitana",
      text: "Positano e Ravello vistos da estrada mais bonita da Itália.",
      image: {
        src: unsplash("1583844056361-4418a8f2a985", 1200),
        alt: "Vista panorâmica da Costa Amalfitana com casas na encosta",
      },
    },
    {
      title: "Roma histórica",
      text: "Fórum Romano, Panteão e o peso de dois mil anos.",
      image: {
        src: unsplash("1552832230-c0197dd311b5", 1600),
        alt: "Fórum Romano ao entardecer, com colunas antigas em primeiro plano",
      },
    },
    {
      title: "Vinícolas privadas",
      text: "Degustações a portas fechadas entre videiras da Toscana.",
      image: {
        src: unsplash("1560493676-04071c5f467b", 1600),
        alt: "Vinhedo em fileiras na região da Toscana ao pôr do sol",
      },
    },
  ],

  stays: [
    {
      name: "Roma",
      region: "Centro histórico",
      text: "Hotéis boutique a poucos passos das ruínas e das piazzas.",
      image: {
        src: unsplash("1515542622106-78bda8ba0e5b", 1200),
        alt: "Rua histórica no centro de Roma com prédios antigos",
      },
    },
    {
      name: "Toscana",
      region: "Campo e vinícolas",
      text: "Agriturismos e villas entre colinas, vinhedos e ciprestes.",
      image: {
        src: unsplash("1608476037397-7b53ace4c871", 1200),
        alt: "Villa rural entre colinas da Toscana",
      },
    },
    {
      name: "Costa Amalfitana",
      region: "Litoral",
      text: "Hotéis com vista para o mar em Positano e Ravello.",
      image: {
        src: unsplash("1516483638261-f4dbaf036963", 1200),
        alt: "Hotel com vista para o mar na Costa Amalfitana",
      },
    },
  ],

  months: [
    { month: 1, status: "avoid", note: "Frio e baixa temporada — bom só para quem prioriza preço." },
    { month: 2, status: "avoid", note: "Ainda frio na maior parte do país." },
    { month: 3, status: "good", note: "Início da primavera, temperaturas subindo." },
    { month: 4, status: "ideal", note: "Primavera em pleno vigor, campos floridos na Toscana." },
    { month: 5, status: "ideal", note: "Clima ameno, ainda sem o calor do pico de verão." },
    { month: 6, status: "good", note: "Início do verão, mais movimento nas cidades." },
    { month: 7, status: "avoid", note: "Calor intenso e alta temporada — cidades cheias." },
    { month: 8, status: "avoid", note: "Pico do verão europeu, muitas lojas locais fecham." },
    { month: 9, status: "ideal", note: "Fim do verão, colheita nas vinícolas da Toscana." },
    { month: 10, status: "ideal", note: "Outono ameno, boa luz para fotografia." },
    { month: 11, status: "good", note: "Baixa temporada, clima mais frio e chuvoso." },
    { month: 12, status: "good", note: "Mercados de Natal e clima festivo nas grandes cidades." },
  ],

  faq: [
    {
      question: "Qual a melhor época para viajar à Itália?",
      answer:
        "Recomendamos abril a junho ou setembro e outubro — clima ameno e menos multidão do que o pico de verão europeu.",
    },
    {
      question: "É possível combinar Roma, Toscana e Costa Amalfitana em uma única viagem?",
      answer:
        "Sim, é a combinação mais pedida — entre 10 e 14 dias permitem viver as três regiões sem correria, com deslocamentos terrestres curtos entre elas.",
    },
    {
      question: "A Itália funciona bem para viagens em família?",
      answer:
        "Sim — é um destino com boa infraestrutura, trajetos curtos entre cidades e experiências que interessam a diferentes idades, da história à gastronomia.",
    },
    {
      question: "Dá para combinar Itália e Grécia na mesma viagem?",
      answer:
        "Sim, é uma combinação comum, seja por cruzeiro pelo Mediterrâneo ou por voos curtos entre as duas regiões. Ajustamos a divisão de dias conforme sua prioridade.",
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
      slug: "turquia",
      name: "Turquia",
      region: "Europa",
      image: {
        src: unsplash("1530789253388-582c481c54b0", 900),
        alt: "Balões de ar quente sobre a Capadócia ao amanhecer",
      },
    },
    {
      slug: "franca",
      name: "França",
      region: "Europa",
      image: {
        src: unsplash("1502602898657-3e91760cbb34", 900),
        alt: "Torre Eiffel vista de uma avenida parisiense",
      },
    },
  ],

  seo: {
    title: "Itália | Viagens Personalizadas | Cays Turismo",
    description:
      "Descubra a Itália com a curadoria da Cays Turismo. Roteiros personalizados por Roma, Toscana, Costa Amalfitana e Dolomitas, com hospedagens e experiências selecionadas.",
  },
};
