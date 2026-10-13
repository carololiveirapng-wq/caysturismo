import type { DiscoveryDestination, DiscoveryMonth } from "@/types";

/**
 * TEMPORÁRIO — dados mockados da seção de Descoberta/Curadoria (os valores
 * do seletor "Quando?"). A seção não mostra mais resultados "curados" aqui
 * dentro — o botão "Explorar viagens" leva direto pro catálogo real em
 * /viagens, já filtrado.
 */

/** Pseudo-destino tratado à parte — sempre a primeira opção do painel. */
export const unknownDestination: DiscoveryDestination = {
  slug: "nao-sei",
  name: "Não sei para onde ir",
  regionSlug: "",
};

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
 * "recommended" é uma curadoria editorial (período de alta temporada/boa
 * época), nunca disponibilidade real de inventário. Aplicado igual nos anos
 * mostrados por simplicidade do mock — o painel futuro poderá definir isso
 * por ano.
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
