import type { DemoImage } from "@/types";
import { unsplash } from "@/data/home/shared";

export interface ContinentGroup {
  slug: string;
  name: string;
  image: DemoImage;
}

// TODO CMS: substituir pela contagem real de destinos por continente.
export const continents: ContinentGroup[] = [
  { slug: "americas", name: "Américas", image: { src: unsplash("1483729558449-99ef09a8c325"), alt: "Vista aérea do Pão de Açúcar e da Baía de Guanabara, Rio de Janeiro" } },
  { slug: "europa", name: "Europa", image: { src: unsplash("1523906834658-6e24ef2386f9"), alt: "Gôndola sob a Ponte Rialto em Veneza" } },
  { slug: "asia", name: "Ásia", image: { src: unsplash("1608037521277-154cd1b89191"), alt: "Grande Muralha da China serpenteando por montanhas verdes" } },
  { slug: "africa-oriente-medio", name: "África & Oriente Médio", image: { src: unsplash("1539768942893-daf53e448371"), alt: "Caravana de camelos junto às pirâmides de Gizé ao entardecer" } },
  { slug: "indico", name: "Índico", image: { src: unsplash("1540202404-a2f29016b523"), alt: "Bangalôs sobre a água em atol nas Maldivas" } },
  { slug: "oceania", name: "Oceania", image: { src: unsplash("1683606095922-cda452e83878"), alt: "Ópera de Sydney e a Harbour Bridge vistas da baía" } },
];

export interface AZDestination {
  slug: string;
  name: string;
  image: DemoImage;
  continentSlug: string;
}

/**
 * Lista A–Z curada manualmente: reaproveita as mesmas imagens já verificadas
 * em `data/home/destinations.ts` e `data/destinations/japan.ts` (nunca
 * baixa/verifica de novo), mas precisa existir como lista própria porque o
 * card da Home não carrega continente — dado que essa página é a primeira a
 * precisar dele.
 */
export const azDestinations: AZDestination[] = [
  { slug: "africa-do-sul", name: "África do Sul", continentSlug: "africa-oriente-medio", image: { src: unsplash("1577971132997-c10be9372519"), alt: "Elefantes avistados durante um safári fotográfico" } },
  { slug: "australia", name: "Austrália", continentSlug: "oceania", image: { src: unsplash("1683606095922-cda452e83878"), alt: "Ópera de Sydney e a Harbour Bridge vistas da baía" } },
  { slug: "brasil", name: "Brasil", continentSlug: "americas", image: { src: unsplash("1483729558449-99ef09a8c325"), alt: "Vista aérea do Pão de Açúcar e da Baía de Guanabara, Rio de Janeiro" } },
  { slug: "chile", name: "Chile", continentSlug: "americas", image: { src: unsplash("1494783367193-149034c05e8f"), alt: "Estrada reta no deserto do Atacama entre vulcões" } },
  { slug: "china", name: "China", continentSlug: "asia", image: { src: unsplash("1608037521277-154cd1b89191"), alt: "Grande Muralha da China serpenteando por montanhas verdes" } },
  { slug: "coreia-do-sul", name: "Coreia do Sul", continentSlug: "asia", image: { src: unsplash("1638964663550-e2123ac8900b"), alt: "Palácio Gyeongbokgung em Seul, Coreia do Sul" } },
  { slug: "egito", name: "Egito", continentSlug: "africa-oriente-medio", image: { src: unsplash("1539768942893-daf53e448371"), alt: "Caravana de camelos junto às pirâmides de Gizé ao entardecer" } },
  { slug: "estados-unidos", name: "Estados Unidos", continentSlug: "americas", image: { src: unsplash("1531366936337-7c912a4589a7"), alt: "Aurora boreal verde e violeta sobre paisagem nevada no Alasca" } },
  { slug: "grecia", name: "Grécia", continentSlug: "europa", image: { src: unsplash("1526481280693-3bfa7568e0f3"), alt: "Vila branca e azul à beira-mar em Santorini" } },
  { slug: "italia", name: "Itália", continentSlug: "europa", image: { src: unsplash("1523906834658-6e24ef2386f9"), alt: "Gôndola sob a Ponte Rialto em Veneza" } },
  { slug: "japao", name: "Japão", continentSlug: "asia", image: { src: unsplash("1533105079780-92b9be482077"), alt: "Pagode tradicional com o Monte Fuji ao fundo" } },
  { slug: "maldivas", name: "Maldivas", continentSlug: "indico", image: { src: unsplash("1540202404-a2f29016b523"), alt: "Bangalôs sobre a água em atol nas Maldivas" } },
  { slug: "tailandia", name: "Tailândia", continentSlug: "asia", image: { src: unsplash("1528181304800-259b08848526"), alt: "Templo budista dourado em Chiang Mai" } },
  { slug: "turquia", name: "Turquia", continentSlug: "europa", image: { src: unsplash("1530789253388-582c481c54b0"), alt: "Balões de ar quente sobre a Capadócia ao amanhecer" } },
];

interface SeasonalPick {
  slug: string;
  name: string;
  note: string;
  image: DemoImage;
  bestMonths: number[];
}

/**
 * "Onde ir agora" cruza o mês real (via `getWhereToGoNow`) com uma janela
 * de meses por destino — mock editorial, mas já estruturado para os dados
 * virem de `bestMonths` no painel no futuro, como pedido.
 */
const seasonalPicks: SeasonalPick[] = [
  { slug: "maldivas", name: "Maldivas", note: "Temporada seca, mar calmo.", bestMonths: [12, 1, 2, 3, 4], image: { src: unsplash("1540202404-a2f29016b523"), alt: "Bangalôs sobre a água em atol nas Maldivas" } },
  { slug: "japao", name: "Japão", note: "Temporada de cerejeiras.", bestMonths: [3, 4], image: { src: unsplash("1761141954458-70e87a4a8943"), alt: "Pagode japonês emoldurado por cerejeiras em flor" } },
  { slug: "turquia", name: "Capadócia", note: "Céu limpo, boa época para balonismo.", bestMonths: [4, 5, 9, 10], image: { src: unsplash("1530789253388-582c481c54b0"), alt: "Balões de ar quente sobre a Capadócia ao amanhecer" } },
  { slug: "chile", name: "Atacama", note: "Noites claras, boa época para o deserto.", bestMonths: [3, 4, 5, 9, 10, 11], image: { src: unsplash("1494783367193-149034c05e8f"), alt: "Estrada reta no deserto do Atacama entre vulcões" } },
  { slug: "estados-unidos", name: "Alasca", note: "Temporada de aurora boreal.", bestMonths: [9, 10, 11, 12, 1, 2, 3], image: { src: unsplash("1531366936337-7c912a4589a7"), alt: "Aurora boreal verde e violeta sobre paisagem nevada no Alasca" } },
  { slug: "italia", name: "Dolomitas", note: "Trilhas e lagos alpinos no verão europeu.", bestMonths: [6, 7, 8, 9], image: { src: unsplash("1476514525535-07fb3b4ae5f1"), alt: "Barco de madeira em lago alpino cercado por montanhas nas Dolomitas" } },
  { slug: "grecia", name: "Santorini", note: "Fora do pico de verão, com clima ameno.", bestMonths: [5, 6, 9, 10], image: { src: unsplash("1526481280693-3bfa7568e0f3"), alt: "Vila branca e azul à beira-mar em Santorini" } },
  { slug: "egito", name: "Egito", note: "Temperaturas mais amenas no deserto.", bestMonths: [10, 11, 12, 1, 2, 3], image: { src: unsplash("1539768942893-daf53e448371"), alt: "Caravana de camelos junto às pirâmides de Gizé ao entardecer" } },
];

export function getWhereToGoNow(date: Date = new Date()) {
  const month = date.getMonth() + 1;
  const matches = seasonalPicks.filter((pick) => pick.bestMonths.includes(month));
  return (matches.length > 0 ? matches : seasonalPicks.slice(0, 4)).slice(0, 4);
}
