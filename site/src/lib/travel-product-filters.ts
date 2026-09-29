import type { TravelProduct, TravelProductType } from "@/types";

export interface TravelProductFilters {
  destino?: string;
  experiencia?: string;
  tipo?: TravelProductType;
  duracao?: string;
  periodo?: string;
}

/** Extrai o primeiro número de um texto como "10 dias" — não há campo numérico estruturado ainda. */
function parseDurationDays(label?: string): number | undefined {
  if (!label) return undefined;
  const match = label.match(/\d+/);
  return match ? Number(match[0]) : undefined;
}

function matchesDurationBucket(days: number | undefined, bucket: string): boolean {
  if (days === undefined) return false;
  switch (bucket) {
    case "5-7":
      return days >= 5 && days <= 7;
    case "8-12":
      return days >= 8 && days <= 12;
    case "13-20":
      return days >= 13 && days <= 20;
    case "mais-20":
      return days > 20;
    default:
      return true;
  }
}

/**
 * "Período" ainda não tem um campo estruturado (datas ficam em texto livre
 * — "Mar–Mai", "14 a 22 de maio de 2027"), então o filtro faz uma busca
 * textual pelo ano dentro de `bestMonths`/`departures`. Roteiros sob medida
 * são flexíveis por definição, então sempre passam no filtro de período.
 */
function matchesPeriod(product: TravelProduct, year: string): boolean {
  if (product.type === "custom") return true;
  if (product.bestMonths?.includes(year)) return true;
  return (product.departures ?? []).some((d) => d.label.includes(year));
}

export function filterTravelProducts(products: TravelProduct[], filters: TravelProductFilters): TravelProduct[] {
  return products.filter((product) => {
    if (filters.destino && !product.destinations.includes(filters.destino)) return false;
    if (filters.experiencia && !product.experiences.includes(filters.experiencia)) return false;
    if (filters.tipo && product.type !== filters.tipo) return false;
    if (filters.duracao && !matchesDurationBucket(parseDurationDays(product.duration), filters.duracao)) return false;
    if (filters.periodo && !matchesPeriod(product, filters.periodo)) return false;
    return true;
  });
}
