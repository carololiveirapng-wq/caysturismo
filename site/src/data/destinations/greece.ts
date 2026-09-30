import type { DestinationDetail } from "@/types";
import { unsplash } from "@/data/home/shared";

// TODO CMS: substituir pelos dados reais do painel. Mesmo padrão de japan.ts.
export const greece: DestinationDetail = {
  id: "grecia",
  slug: "grecia",
  active: true,
  featured: true,
  order: 8,
  name: "Grécia",
  type: "country",
  parent: "europa",
  breadcrumb: [
    { label: "Destinos", href: "/destinos" },
    { label: "Europa", href: "/destinos/europa" },
    { label: "Grécia" },
  ],

  hero: {
    image: {
      src: unsplash("1526481280693-3bfa7568e0f3", 2400),
      alt: "Vila branca e azul à beira-mar em Santorini",
    },
    eyebrow: "EUROPA · GRÉCIA",
    title: "Grécia, entre ruínas antigas e mar Egeu.",
    subtitle:
      "Atenas, Santorini, Mykonos e o Peloponeso — história clássica, ilhas icônicas e uma gastronomia que é puro Mediterrâneo.",
    seasonLabel: "Temporada 2026/2027",
    ctaLabel: "Planejar viagem à Grécia",
  },

  introduction: {
    heading: "A Grécia é continente e arquipélago ao mesmo tempo.",
    text: "Atenas guarda a origem da democracia ao pé da Acrópole; as ilhas do Egeu — Santorini, Mykonos e tantas outras — respondem com casas brancas, penhascos e um mar de um azul particular. Entre as duas, o Peloponeso soma história e paisagem sem as multidões das ilhas mais famosas.\n\nNa Cays, combinamos cidade, ilha e mar na medida certa — com tempo real para cada parada, não apenas mais um destino marcado no mapa.",
  },

  keyInfo: {
    bestTime: "Mai–Jun ou Set–Out (calor sem o pico de verão)",
    suggestedDuration: "9 a 12 dias",
    timeZone: "5h a mais que Brasília (varia com horário de verão)",
    currency: "Euro (EUR)",
    language: "Grego — inglês comum em áreas turísticas",
    visa: "Verificar requisitos atuais para brasileiros",
    vaccines: "Consultar recomendações atualizadas antes da viagem",
    electricity: "230V · plugues tipo C/F — leve adaptador",
    flightFromBrazil: "Sem voo direto — trecho com conexão via Europa",
  },

  whyCays: {
    heading: "Uma Grécia desenhada para você.",
    image: {
      src: unsplash("1603565816030-6b389eeb23cb", 1800),
      alt: "Ruínas do Parthenon na Acrópole de Atenas ao entardecer",
    },
    items: [
      {
        title: "Ilhas certas para o seu perfil",
        text: "Nem toda ilha grega é igual — ajudamos a escolher entre Santorini, Mykonos ou destinos menos óbvios do Egeu.",
      },
      {
        title: "História com contexto real",
        text: "Guias especializados dão profundidade à Acrópole e aos sítios clássicos, além do óbvio turístico.",
      },
      {
        title: "Hospedagens com vista",
        text: "De cave hotels em Santorini a pousadas no Peloponeso, cada escolha passa pelo nosso olhar.",
      },
    ],
  },

  journeysHeading: "Jornadas pela Grécia",
  experiencesHeading: "O que viver na Grécia",
  monthsHeading: "Quando ir à Grécia",
  seasonCta: {
    title: "Prefere a Grécia sem as multidões do verão?",
    supporting: "Ajudamos a escolher a janela certa entre maio e outubro.",
  },
  finalCta: {
    title: "Sua viagem à Grécia começa em uma conversa.",
    supporting: "Conte para a Cays o que você deseja viver. Nós cuidamos do caminho.",
    note: "Fale com um especialista da Cays",
  },

  journeys: [
    {
      slug: "atenas-e-ilhas",
      title: "Atenas & Ilhas",
      subtitle: "Acrópole, Santorini e Mykonos",
      durationLabel: "10 dias",
      typeLabel: "Roteiro guiado",
      text: "A combinação clássica entre história e o Egeu mais fotografado do mundo.",
      image: {
        src: unsplash("1603565816030-6b389eeb23cb", 1400),
        alt: "Ruínas do Parthenon na Acrópole de Atenas ao entardecer",
      },
    },
    {
      slug: "santorini-em-detalhes",
      title: "Santorini em Detalhes",
      subtitle: "Vielas brancas e o pôr do sol certo",
      durationLabel: "5 dias",
      typeLabel: "Viagem especial",
      text: "Uma imersão total na ilha mais icônica do Egeu, sem pressa.",
      image: {
        src: unsplash("1526481280693-3bfa7568e0f3", 1400),
        alt: "Vila branca e azul à beira-mar em Santorini",
      },
    },
    {
      slug: "peloponeso-e-mar",
      title: "Peloponeso & Mar",
      subtitle: "História sem as multidões",
      durationLabel: "8 dias",
      typeLabel: "Roteiro temático",
      text: "Sítios antigos e litoral, longe do circuito mais turístico das ilhas.",
      image: {
        src: unsplash("1601581875309-fafbf2d3ed3a", 1400),
        alt: "Teatro antigo de pedra ao ar livre no Peloponeso, na Grécia",
      },
    },
  ],

  experiences: [
    {
      title: "Acrópole de Atenas",
      text: "O Parthenon e a origem da civilização ocidental.",
      image: {
        src: unsplash("1603565816030-6b389eeb23cb", 1200),
        alt: "Ruínas do Parthenon na Acrópole de Atenas ao entardecer",
      },
    },
    {
      title: "Pôr do sol em Santorini",
      text: "Oia e as vielas brancas sobre a caldeira vulcânica.",
      image: {
        src: unsplash("1526481280693-3bfa7568e0f3", 1200),
        alt: "Vila branca e azul à beira-mar em Santorini",
      },
    },
    {
      title: "Mykonos e suas praias",
      text: "Moinhos de vento, ruas estreitas e um litoral sofisticado.",
      image: {
        src: unsplash("1657141462746-13f0468d5e65", 1200),
        alt: "Moinhos de vento tradicionais em Mykonos, na Grécia",
      },
    },
    {
      title: "Gastronomia mediterrânea",
      text: "Azeite, peixe fresco e mesas à beira-mar.",
      image: {
        src: unsplash("1782174177294-872d77096f77", 1600),
        alt: "Mesa posta com prato mediterrâneo e vinho ao ar livre",
      },
    },
    {
      title: "Navegar pelo Egeu",
      text: "Passeios de barco entre ilhas, com paradas para banho de mar.",
      image: {
        src: unsplash("1647278271858-41ccacc9e449", 1600),
        alt: "Veleiro navegando em mar azul-turquesa no Egeu",
      },
    },
  ],

  stays: [
    {
      name: "Atenas",
      region: "Capital histórica",
      text: "Hotéis com vista para a Acrópole, no centro da cidade.",
      image: {
        src: unsplash("1603565816030-6b389eeb23cb", 1200),
        alt: "Ruínas do Parthenon na Acrópole de Atenas ao entardecer",
      },
    },
    {
      name: "Santorini",
      region: "Ilhas do Egeu",
      text: "Cave hotels esculpidos na rocha vulcânica, com vista para a caldeira.",
      image: {
        src: unsplash("1526481280693-3bfa7568e0f3", 1200),
        alt: "Vila branca e azul à beira-mar em Santorini",
      },
    },
    {
      name: "Mykonos",
      region: "Ilhas do Egeu",
      text: "Hotéis à beira-mar, entre a Cidade Velha e praias sofisticadas.",
      image: {
        src: unsplash("1657141462746-13f0468d5e65", 1200),
        alt: "Moinhos de vento tradicionais em Mykonos, na Grécia",
      },
    },
  ],

  months: [
    { month: 1, status: "avoid", note: "Frio e chuvoso, baixa temporada nas ilhas." },
    { month: 2, status: "avoid", note: "Ainda frio, muitos hotéis de ilha fechados." },
    { month: 3, status: "good", note: "Início da primavera, clima ameno em Atenas." },
    { month: 4, status: "good", note: "Boa época para o continente, ilhas ainda abrindo a temporada." },
    { month: 5, status: "ideal", note: "Clima ideal, ilhas já em pleno funcionamento." },
    { month: 6, status: "ideal", note: "Calor agradável, antes do pico de multidão." },
    { month: 7, status: "avoid", note: "Pico do verão europeu — ilhas muito concorridas." },
    { month: 8, status: "avoid", note: "Alta temporada máxima, preços mais altos." },
    { month: 9, status: "ideal", note: "Fim do verão, ainda quente e com menos multidão." },
    { month: 10, status: "ideal", note: "Clima ameno, ótima luz para fotografia." },
    { month: 11, status: "good", note: "Baixa temporada, mais frio nas ilhas." },
    { month: 12, status: "avoid", note: "Inverno, maioria dos hotéis de ilha fechados." },
  ],

  faq: [
    {
      question: "Qual a melhor época para viajar à Grécia?",
      answer:
        "Maio, junho, setembro e outubro — calor agradável nas ilhas sem o pico de multidão e preços de julho e agosto.",
    },
    {
      question: "Vale mais a pena Santorini ou Mykonos?",
      answer:
        "São experiências diferentes: Santorini é mais cênica e romântica; Mykonos, mais social e com vida noturna. Muitos roteiros combinam as duas.",
    },
    {
      question: "É possível combinar Grécia e Itália na mesma viagem?",
      answer:
        "Sim, é uma combinação comum, seja por cruzeiro pelo Mediterrâneo ou por voos curtos entre os dois países.",
    },
    {
      question: "Quantos dias são recomendados para a Grécia?",
      answer:
        "Entre 9 e 12 dias permitem combinar Atenas com duas ilhas do Egeu sem correria, incluindo os deslocamentos de balsa ou avião entre elas.",
    },
    {
      question: "Como funciona um roteiro personalizado com a Cays?",
      answer:
        "Começamos entendendo como você gosta de viajar, desenhamos a jornada, cuidamos de cada detalhe — hospedagem, deslocamentos e experiências — e você foca em vivê-la.",
    },
  ],

  relatedDestinations: [
    {
      slug: "italia",
      name: "Itália",
      region: "Europa",
      image: {
        src: unsplash("1523906834658-6e24ef2386f9", 900),
        alt: "Gôndola sob a Ponte Rialto em Veneza",
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
      slug: "croacia",
      name: "Croácia",
      region: "Europa",
      image: {
        src: unsplash("1555990793-da11153b2473", 900),
        alt: "Cidade murada de Dubrovnik à beira-mar, na Croácia",
      },
    },
  ],

  seo: {
    title: "Grécia | Viagens Personalizadas | Cays Turismo",
    description:
      "Descubra a Grécia com a curadoria da Cays Turismo. Atenas, Santorini, Mykonos e Peloponeso, com roteiros que combinam história e mar Egeu.",
  },
};
