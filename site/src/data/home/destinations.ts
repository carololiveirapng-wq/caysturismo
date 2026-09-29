import type { Destination } from "@/types";
import { unsplash } from "./shared";

// TODO CMS: substituir pelos dados do painel.
export const destinations: Destination[] = [
  // ---- Destinos em destaque ----
  {
    id: "maldivas",
    slug: "maldivas",
    active: true,
    order: 1,
    collection: "featured",
    name: "Maldivas",
    region: "Oceano Índico",
    image: {
      src: unsplash("1540202404-a2f29016b523"),
      alt: "Bangalôs sobre a água em atol nas Maldivas",
    },
  },
  {
    id: "egito",
    slug: "egito",
    active: true,
    order: 2,
    collection: "featured",
    name: "Egito",
    region: "Norte da África",
    image: {
      src: unsplash("1539768942893-daf53e448371"),
      alt: "Caravana de camelos junto às pirâmides de Gizé ao entardecer",
    },
  },
  {
    id: "italia",
    slug: "italia",
    active: true,
    order: 3,
    collection: "featured",
    name: "Itália",
    region: "Europa",
    image: {
      src: unsplash("1523906834658-6e24ef2386f9"),
      alt: "Gôndola sob a Ponte Rialto em Veneza",
    },
  },
  {
    id: "japao",
    slug: "japao",
    active: true,
    order: 4,
    collection: "featured",
    name: "Japão",
    region: "Ásia",
    image: {
      src: unsplash("1533105079780-92b9be482077"),
      alt: "Pagode tradicional com o Monte Fuji ao fundo",
    },
  },
  {
    id: "tailandia",
    slug: "tailandia",
    active: true,
    order: 5,
    collection: "featured",
    name: "Tailândia",
    region: "Sudeste Asiático",
    image: {
      src: unsplash("1528181304800-259b08848526"),
      alt: "Templo budista dourado em Chiang Mai",
    },
  },
  {
    id: "brasil",
    slug: "brasil",
    active: true,
    order: 6,
    collection: "featured",
    name: "Brasil",
    region: "América do Sul",
    image: {
      src: unsplash("1483729558449-99ef09a8c325"),
      alt: "Vista aérea do Pão de Açúcar e da Baía de Guanabara, Rio de Janeiro",
    },
  },

  // ---- Viagens especiais ----
  {
    id: "capadocia",
    slug: "capadocia",
    active: true,
    order: 1,
    collection: "special",
    name: "Capadócia ao amanhecer",
    region: "Turquia",
    shortDescription: "Balões sobre um vale de rocha esculpida pelo tempo.",
    image: {
      src: unsplash("1530789253388-582c481c54b0"),
      alt: "Balões de ar quente sobre a Capadócia ao amanhecer",
    },
  },
  {
    id: "dolomitas",
    slug: "dolomitas",
    active: true,
    order: 2,
    collection: "special",
    name: "Dolomitas de barco",
    region: "Itália",
    shortDescription: "Um lago alpino, remo lento e montanhas ao redor.",
    image: {
      src: unsplash("1476514525535-07fb3b4ae5f1"),
      alt: "Barco de madeira em lago alpino cercado por montanhas nas Dolomitas",
    },
  },
  {
    id: "santorini",
    slug: "santorini-especial",
    active: true,
    order: 3,
    collection: "special",
    name: "Santorini em detalhes",
    region: "Grécia",
    shortDescription: "Vielas brancas, o mar Egeu e o pôr do sol certo.",
    image: {
      src: unsplash("1526481280693-3bfa7568e0f3"),
      alt: "Vila branca e azul à beira-mar em Santorini",
    },
  },

  // ---- Cruzeiros & Expedições ----
  {
    id: "cruzeiro-caribe",
    slug: "cruzeiro-caribe",
    active: true,
    order: 1,
    collection: "cruise",
    name: "Rotas do Caribe",
    region: "Cruzeiro",
    shortDescription: "Portos tropicais encadeados em pequenas escalas.",
    image: {
      src: unsplash("1548574505-5e239809ee19"),
      alt: "Navios de cruzeiro ancorados em porto tropical, vistos do alto",
    },
  },
  {
    id: "expedicao-alasca-cruise",
    slug: "expedicao-alasca",
    active: true,
    order: 2,
    collection: "cruise",
    name: "Expedição no Alasca",
    region: "Expedição",
    shortDescription: "Gelo, silêncio e a aurora sobre a paisagem nevada.",
    image: {
      src: unsplash("1531366936337-7c912a4589a7"),
      alt: "Aurora boreal verde e violeta sobre paisagem nevada no Alasca",
    },
  },
  {
    id: "cruzeiro-nilo",
    slug: "cruzeiro-nilo",
    active: true,
    order: 3,
    collection: "cruise",
    name: "Cruzeiro pelo Nilo",
    region: "Egito",
    shortDescription: "O deserto e as pirâmides vistos devagar, à beira-rio.",
    image: {
      src: unsplash("1539768942893-daf53e448371"),
      alt: "Caravana de camelos junto às pirâmides de Gizé ao entardecer",
    },
  },

  // ---- Novidades ----
  {
    id: "atacama",
    slug: "atacama",
    active: true,
    order: 1,
    collection: "new",
    name: "Deserto do Atacama",
    region: "Nova rota",
    shortDescription: "Estradas infinitas entre vulcões e céu limpo.",
    image: {
      src: unsplash("1494783367193-149034c05e8f"),
      alt: "Estrada reta no deserto do Atacama entre vulcões",
    },
  },
  {
    id: "acampamento-estrelado",
    slug: "acampamento-sob-as-estrelas",
    active: true,
    order: 2,
    collection: "new",
    name: "Acampar sob as estrelas",
    region: "Nova experiência",
    shortDescription: "Uma noite ao relento, longe de qualquer luz artificial.",
    image: {
      src: unsplash("1517824806704-9040b037703b"),
      alt: "Barraca iluminada sob um céu estrelado com a Via Láctea",
    },
  },
  {
    id: "suites-sobre-agua",
    slug: "suites-sobre-a-agua",
    active: true,
    order: 3,
    collection: "new",
    name: "Suítes sobre a água",
    region: "Nova parceria",
    shortDescription: "Uma sala de estar com o oceano como vizinho.",
    image: {
      src: unsplash("1602002418082-a4443e081dd1"),
      alt: "Sala de estar de suíte sobre a água com vista para o mar",
    },
  },
];
