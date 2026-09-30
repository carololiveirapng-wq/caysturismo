import type { DestinationDetail } from "@/types";
import { unsplash } from "@/data/home/shared";

// TODO CMS: substituir pelos dados reais do painel. Mesmo padrão de japan.ts.
export const southKorea: DestinationDetail = {
  id: "coreia-do-sul",
  slug: "coreia-do-sul",
  active: true,
  featured: true,
  order: 6,
  name: "Coreia do Sul",
  type: "country",
  parent: "asia",
  breadcrumb: [
    { label: "Destinos", href: "/destinos" },
    { label: "Ásia", href: "/destinos/asia" },
    { label: "Coreia do Sul" },
  ],

  hero: {
    image: {
      src: unsplash("1638964663550-e2123ac8900b", 2400),
      alt: "Palácio Gyeongbokgung em Seul, Coreia do Sul",
    },
    eyebrow: "ÁSIA · COREIA DO SUL",
    title: "Coreia do Sul, tradição e contemporâneo lado a lado.",
    subtitle:
      "Seul e Busan — palácios centenários, gastronomia de rua, cultura pop e um cotidiano em constante reinvenção.",
    seasonLabel: "Temporada 2026/2027",
    ctaLabel: "Planejar viagem à Coreia do Sul",
  },

  introduction: {
    heading: "Seul não escolhe entre tradição e futuro — vive os dois.",
    text: "Palácios reais dividem bairro com torres de vidro, mercados centenários com cafés de design. Busan, no litoral, soma o mar a essa mesma equação. A Coreia do Sul é um país que reinventa o cotidiano sem apagar sua própria história.\n\nNa Cays, desenhamos a Coreia com espaço para os dois lados — gastronomia, moda e cultura pop ao lado de templos, hanoks e tradições que atravessam gerações.",
  },

  keyInfo: {
    bestTime: "Abr–Mai (cerejeiras) ou Set–Nov (outono)",
    suggestedDuration: "8 a 11 dias",
    timeZone: "12h a mais que Brasília",
    currency: "Won sul-coreano (KRW)",
    language: "Coreano — inglês limitado fora dos grandes centros",
    visa: "Verificar requisitos atuais para brasileiros",
    vaccines: "Consultar recomendações atualizadas antes da viagem",
    electricity: "220V · plugues tipo C/F — leve adaptador",
    flightFromBrazil: "Sem voo direto — trecho com conexão",
  },

  whyCays: {
    heading: "Uma Coreia do Sul desenhada para você.",
    image: {
      src: unsplash("1517154421773-0529f29ea451", 1800),
      alt: "Rua iluminada por neon em bairro contemporâneo de Seul à noite",
    },
    items: [
      {
        title: "Seul além do óbvio",
        text: "Combinamos os grandes ícones com bairros e experiências que só quem conhece bem o país indica.",
      },
      {
        title: "Gastronomia como experiência central",
        text: "De mercados tradicionais a restaurantes contemporâneos, a mesa entra no roteiro por curadoria.",
      },
      {
        title: "Hospedagens com caráter",
        text: "De hanoks tradicionais a hotéis de design em Seul, cada escolha passa pelo nosso olhar.",
      },
    ],
  },

  journeysHeading: "Jornadas pela Coreia do Sul",
  experiencesHeading: "O que viver na Coreia do Sul",
  monthsHeading: "Quando ir à Coreia do Sul",
  seasonCta: {
    title: "Quer viajar durante as cerejeiras ou o outono?",
    supporting: "Montamos o período ideal para a sua viagem.",
  },
  finalCta: {
    title: "Sua viagem à Coreia do Sul começa em uma conversa.",
    supporting: "Conte para a Cays o que você deseja viver. Nós cuidamos do caminho.",
    note: "Fale com um especialista da Cays",
  },

  journeys: [
    {
      slug: "coreia-essencial",
      title: "Coreia Essencial",
      subtitle: "Seul e Busan",
      durationLabel: "10 dias",
      typeLabel: "Roteiro guiado",
      text: "A capital contemporânea e o litoral coreano em uma só jornada.",
      image: {
        src: unsplash("1517154421773-0529f29ea451", 1400),
        alt: "Rua iluminada por neon em bairro contemporâneo de Seul à noite",
      },
    },
    {
      slug: "coreia-gastronomica",
      title: "Coreia Gastronômica",
      subtitle: "Mercados e cultura culinária",
      durationLabel: "8 dias",
      typeLabel: "Roteiro temático",
      text: "De churrasqueiras coreanas a mercados centenários, uma viagem pelo sabor.",
      image: {
        src: unsplash("1498654200943-1088dd4438ae", 1400),
        alt: "Prato de churrasco coreano (Korean barbecue) sendo preparado na mesa",
      },
    },
    {
      slug: "coreia-tradicional",
      title: "Coreia Tradicional",
      subtitle: "Palácios e hanoks",
      durationLabel: "9 dias",
      typeLabel: "Roteiro temático",
      text: "Vila de Bukchon Hanok, palácios reais e templos budistas.",
      image: {
        src: unsplash("1638964663550-e2123ac8900b", 1400),
        alt: "Palácio Gyeongbokgung em Seul, Coreia do Sul",
      },
    },
  ],

  experiences: [
    {
      title: "Palácio Gyeongbokgung",
      text: "O maior dos cinco grandes palácios reais de Seul.",
      image: {
        src: unsplash("1638964663550-e2123ac8900b", 1200),
        alt: "Palácio Gyeongbokgung em Seul, Coreia do Sul",
      },
    },
    {
      title: "Vila de Bukchon Hanok",
      text: "Casas tradicionais coreanas em meio a uma metrópole moderna.",
      image: {
        src: unsplash("1535189043414-47a3c49a0bed", 1200),
        alt: "Casas tradicionais coreanas (hanok) na vila de Bukchon, em Seul",
      },
    },
    {
      title: "Gastronomia coreana",
      text: "Do churrasco à mesa às barracas de rua de Myeongdong.",
      image: {
        src: unsplash("1498654200943-1088dd4438ae", 1200),
        alt: "Prato de churrasco coreano (Korean barbecue) sendo preparado na mesa",
      },
    },
    {
      title: "Busan e o litoral",
      text: "Praias urbanas e mercado de peixe fresco à beira-mar.",
      image: {
        src: unsplash("1591520284162-8e64eceebacf", 1600),
        alt: "Vista do litoral e edifícios costeiros de Busan, Coreia do Sul",
      },
    },
    {
      title: "Bairros contemporâneos",
      text: "Moda, design e a cultura pop coreana em seu ambiente natural.",
      image: {
        src: unsplash("1517154421773-0529f29ea451", 1600),
        alt: "Rua iluminada por neon em bairro contemporâneo de Seul à noite",
      },
    },
  ],

  stays: [
    {
      name: "Seul",
      region: "Distritos urbanos",
      text: "Hotéis de design em bairros como Gangnam e Jongno.",
      image: {
        src: unsplash("1517154421773-0529f29ea451", 1200),
        alt: "Rua iluminada por neon em bairro contemporâneo de Seul à noite",
      },
    },
    {
      name: "Bukchon",
      region: "Bairro histórico",
      text: "Hanoks reformados, junto a palácios e vielas tradicionais.",
      image: {
        src: unsplash("1535189043414-47a3c49a0bed", 1200),
        alt: "Casas tradicionais coreanas (hanok) na vila de Bukchon, em Seul",
      },
    },
    {
      name: "Busan",
      region: "Litoral",
      text: "Hotéis com vista para o mar, a poucas horas de trem de Seul.",
      image: {
        src: unsplash("1591520284162-8e64eceebacf", 1200),
        alt: "Vista do litoral e edifícios costeiros de Busan, Coreia do Sul",
      },
    },
  ],

  months: [
    { month: 1, status: "avoid", note: "Inverno frio e seco." },
    { month: 2, status: "good", note: "Ainda frio, com menos turistas." },
    { month: 3, status: "good", note: "Início da primavera, temperaturas subindo." },
    { month: 4, status: "ideal", note: "Temporada de cerejeiras em Seul e arredores." },
    { month: 5, status: "ideal", note: "Clima ameno e paisagens verdes." },
    { month: 6, status: "good", note: "Início do calor, antes da estação chuvosa." },
    { month: 7, status: "avoid", note: "Estação chuvosa (jangma)." },
    { month: 8, status: "avoid", note: "Calor úmido e alta temporada interna." },
    { month: 9, status: "good", note: "Transição para o outono, ainda quente." },
    { month: 10, status: "ideal", note: "Outono com folhagem colorida — um dos melhores meses." },
    { month: 11, status: "ideal", note: "Continuação do outono, temperaturas amenas." },
    { month: 12, status: "good", note: "Início do inverno, iluminações de fim de ano em Seul." },
  ],

  faq: [
    {
      question: "Qual a melhor época para viajar à Coreia do Sul?",
      answer:
        "Abril e maio para as cerejeiras, ou setembro a novembro para o outono — as duas estações mais procuradas pelo clima ameno e pela paisagem.",
    },
    {
      question: "Quantos dias são recomendados para a Coreia do Sul?",
      answer:
        "Entre 8 e 11 dias permitem combinar Seul com uma extensão para Busan ou outra cidade do interior sem correria.",
    },
    {
      question: "A Coreia do Sul funciona bem para viagens em família?",
      answer:
        "Sim — é um destino seguro, organizado e com boa infraestrutura, incluindo transporte público eficiente entre as cidades.",
    },
    {
      question: "É possível combinar Coreia do Sul e Japão na mesma viagem?",
      answer:
        "Sim, é uma combinação comum — a distância entre Seul e Tóquio ou Osaka é curta de avião. Ajustamos a divisão de dias conforme o que você quer priorizar em cada país.",
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
      slug: "china",
      name: "China",
      region: "Ásia",
      image: {
        src: unsplash("1608037521277-154cd1b89191", 900),
        alt: "Grande Muralha da China serpenteando por montanhas verdes",
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
    title: "Coreia do Sul | Viagens Personalizadas | Cays Turismo",
    description:
      "Descubra a Coreia do Sul com a curadoria da Cays Turismo. Seul e Busan, entre tradição, gastronomia e cultura contemporânea.",
  },
};
