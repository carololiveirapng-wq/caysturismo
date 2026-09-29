import type {
  DiscoveryDestination,
  DiscoveryExperience,
  DiscoveryMonth,
  DiscoveryRegion,
  MockJourney,
} from "@/types";
import { unsplash } from "@/data/home";

/**
 * TEMPORÁRIO — dados mockados da seção de Descoberta/Curadoria. Nenhuma
 * disponibilidade, preço ou vaga aqui é real. Isto ficará sob controle de
 * um painel administrativo futuro; por ora tudo é estático e front-end-only.
 */

/** Pseudo-destino tratado à parte — sempre a primeira opção do painel. */
export const unknownDestination: DiscoveryDestination = {
  slug: "nao-sei",
  name: "Não sei para onde ir",
  regionSlug: "",
};

export const travelRegions: DiscoveryRegion[] = [
  {
    slug: "brasil",
    name: "Brasil",
    destinations: [
      { slug: "amazonia", name: "Amazônia", regionSlug: "brasil" },
      { slug: "fernando-de-noronha", name: "Fernando de Noronha", regionSlug: "brasil" },
      { slug: "lencois-maranhenses", name: "Lençóis Maranhenses", regionSlug: "brasil" },
    ],
  },
  {
    slug: "europa",
    name: "Europa",
    destinations: [
      { slug: "italia", name: "Itália", regionSlug: "europa" },
      { slug: "franca", name: "França", regionSlug: "europa" },
      { slug: "grecia", name: "Grécia", regionSlug: "europa" },
      { slug: "portugal", name: "Portugal", regionSlug: "europa" },
    ],
  },
  {
    slug: "asia",
    name: "Ásia",
    destinations: [
      { slug: "japao", name: "Japão", regionSlug: "asia" },
      { slug: "china", name: "China", regionSlug: "asia" },
      { slug: "tailandia", name: "Tailândia", regionSlug: "asia" },
    ],
  },
  {
    slug: "africa-oriente-medio",
    name: "África & Oriente Médio",
    destinations: [
      { slug: "egito", name: "Egito", regionSlug: "africa-oriente-medio" },
      { slug: "emirados-arabes", name: "Emirados Árabes", regionSlug: "africa-oriente-medio" },
      { slug: "africa-oriental", name: "África Oriental", regionSlug: "africa-oriente-medio" },
    ],
  },
  {
    slug: "indico",
    name: "Índico",
    destinations: [
      { slug: "maldivas", name: "Maldivas", regionSlug: "indico" },
      { slug: "seychelles", name: "Seychelles", regionSlug: "indico" },
      { slug: "mauricio", name: "Maurício", regionSlug: "indico" },
    ],
  },
  {
    slug: "cruzeiros-expedicoes",
    name: "Cruzeiros & Expedições",
    destinations: [
      { slug: "mediterraneo", name: "Mediterrâneo", regionSlug: "cruzeiros-expedicoes" },
      { slug: "alasca", name: "Alasca", regionSlug: "cruzeiros-expedicoes" },
      { slug: "antartica", name: "Antártica", regionSlug: "cruzeiros-expedicoes" },
      { slug: "nilo", name: "Nilo", regionSlug: "cruzeiros-expedicoes" },
    ],
  },
];

export const travelExperiences: DiscoveryExperience[] = [
  { slug: "lua-de-mel", name: "Lua de Mel" },
  { slug: "familia", name: "Viagem em Família" },
  { slug: "destination-wedding", name: "Destination Wedding" },
  { slug: "cruzeiros", name: "Cruzeiros" },
  { slug: "expedicoes", name: "Expedições" },
  { slug: "grandes-eventos", name: "Grandes Eventos" },
  { slug: "gastronomia-cultura", name: "Gastronomia & Cultura" },
  { slug: "praia-descanso", name: "Praia & Descanso" },
  { slug: "natureza-aventura", name: "Natureza & Aventura" },
  { slug: "personalizada", name: "Viagem Personalizada" },
];

/**
 * Preparado para o caso "Não sei para onde ir": futuramente a experiência
 * poderá ser guiada por desejo em vez de destino. Não há lógica condicional
 * usando esta lista ainda — só o shape, para não travar essa evolução.
 */
export const travelDesires = [
  "Quero descansar",
  "Quero descobrir culturas",
  "Quero ver neve",
  "Quero praia",
  "Quero natureza",
  "Quero gastronomia",
  "Quero aventura",
  "Quero algo diferente",
] as const;

const MONTH_LABELS = [
  "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
  "Jul", "Ago", "Set", "Out", "Nov", "Dez",
] as const;

/**
 * "recommended" é uma curadoria editorial (período recomendado / com jornada
 * cadastrada), nunca disponibilidade real de inventário. Aplicado igual nos
 * anos mostrados por simplicidade do mock — o painel futuro poderá definir
 * isso por ano.
 */
const RECOMMENDED_MONTHS = new Set(["mar", "abr", "mai", "set", "out"]);

/** Quantos anos, a partir do atual, o seletor "Quando?" mostra. */
const YEARS_AHEAD = 3;

/** Gerado a partir do ano corrente — nunca hardcoded, continua correto sozinho. */
export const discoveryYears: number[] = Array.from(
  { length: YEARS_AHEAD },
  (_, i) => new Date().getFullYear() + i,
);

/**
 * Meses de um ano específico, com meses já passados desabilitados quando
 * `year` for o ano corrente. // TODO CMS: meses recomendados por ano virão
 * do painel.
 */
export function getMonthsForYear(year: number): DiscoveryMonth[] {
  const now = new Date();
  const isCurrentYear = year === now.getFullYear();
  const currentMonthIndex = now.getMonth();

  return MONTH_LABELS.map((label, index) => {
    const slug = label.toLowerCase();
    return {
      slug,
      label,
      year,
      status: RECOMMENDED_MONTHS.has(slug) ? "recommended" : "default",
      disabled: isCurrentYear && index < currentMonthIndex,
    };
  });
}

export const mockJourneys: MockJourney[] = [
  {
    slug: "maldivas-lua-de-mel",
    title: "Ilhas para desacelerar",
    destinationSlug: "maldivas",
    destinationName: "Maldivas",
    experienceSlug: "lua-de-mel",
    experienceName: "Lua de Mel",
    period: "Março a Maio",
    summary: "Uma seleção de ilhas e experiências pensadas para dias sem pressa.",
    image: {
      src: unsplash("1540202404-a2f29016b523"),
      alt: "Bangalôs sobre a água em atol nas Maldivas",
    },
    featured: true,
  },
  {
    slug: "italia-destination-wedding",
    title: "Uma cerimônia com vista para o canal",
    destinationSlug: "italia",
    destinationName: "Itália",
    experienceSlug: "destination-wedding",
    experienceName: "Destination Wedding",
    period: "Setembro e Outubro",
    summary: "Veneza e a Toscana como cenário para celebrar o início de uma história.",
    image: {
      src: unsplash("1523906834658-6e24ef2386f9"),
      alt: "Gôndola sob a Ponte Rialto em Veneza",
    },
    featured: true,
  },
  {
    slug: "egito-expedicao",
    title: "O deserto além das pirâmides",
    destinationSlug: "egito",
    destinationName: "Egito",
    experienceSlug: "expedicoes",
    experienceName: "Expedições",
    period: "Outubro a Março",
    summary: "Uma jornada guiada por história, areia e o silêncio do deserto.",
    image: {
      src: unsplash("1539768942893-daf53e448371"),
      alt: "Caravana de camelos junto às pirâmides de Gizé ao entardecer",
    },
    featured: true,
  },
  {
    slug: "mediterraneo-cruzeiro",
    title: "O Mediterrâneo em pequenas escalas",
    destinationSlug: "mediterraneo",
    destinationName: "Mediterrâneo",
    experienceSlug: "cruzeiros",
    experienceName: "Cruzeiros",
    period: "Maio a Setembro",
    summary: "Portos que a maioria dos roteiros comerciais não visita.",
    image: {
      src: unsplash("1548574505-5e239809ee19"),
      alt: "Navios de cruzeiro ancorados em porto tropical",
    },
  },
  {
    slug: "japao-gastronomia",
    title: "Quioto, estação a estação",
    destinationSlug: "japao",
    destinationName: "Japão",
    experienceSlug: "gastronomia-cultura",
    experienceName: "Gastronomia & Cultura",
    period: "Março a Maio",
    summary: "Templos, mercados e uma mesa reservada nos lugares certos.",
    image: {
      src: unsplash("1533105079780-92b9be482077"),
      alt: "Pagode tradicional com o Monte Fuji ao fundo",
    },
  },
  {
    slug: "tailandia-praia",
    title: "Dias devagar no sudeste asiático",
    destinationSlug: "tailandia",
    destinationName: "Tailândia",
    experienceSlug: "praia-descanso",
    experienceName: "Praia & Descanso",
    period: "Novembro a Março",
    summary: "Templos dourados de dia, praias quase vazias ao entardecer.",
    image: {
      src: unsplash("1528181304800-259b08848526"),
      alt: "Templo budista dourado em Chiang Mai",
    },
  },
  {
    slug: "alasca-natureza",
    title: "Sob as luzes do norte",
    destinationSlug: "alasca",
    destinationName: "Alasca",
    experienceSlug: "natureza-aventura",
    experienceName: "Natureza & Aventura",
    period: "Setembro a Março",
    summary: "Uma expedição pensada para quem quer ver o inesperado.",
    image: {
      src: unsplash("1531366936337-7c912a4589a7"),
      alt: "Aurora boreal verde e violeta sobre paisagem nevada",
    },
    featured: true,
  },
  {
    slug: "familia-brasil",
    title: "Gerações diferentes, um mesmo litoral",
    destinationSlug: "fernando-de-noronha",
    destinationName: "Fernando de Noronha",
    experienceSlug: "familia",
    experienceName: "Viagem em Família",
    period: "Dezembro a Fevereiro",
    summary: "Um roteiro que acompanha o ritmo de cada idade na família.",
    image: {
      src: unsplash("1507525428034-b723cf961d3e"),
      alt: "Águas turquesa e costa tropical vistas de cima",
    },
  },
];
