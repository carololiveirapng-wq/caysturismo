/**
 * Liga/desliga seções inteiras da Home. Hoje só controla o que o
 * `page.tsx` renderiza; quando o painel existir, essas flags podem vir de
 * lá sem precisar tocar no page.tsx de novo.
 */
export const homeSections = {
  travelDiscovery: true,
  manifesto: true,
  experiences: true,
  journeyProcess: true,
  destinations: true,
  journal: true,
  featuredJourney: true,
  testimonials: true,
  finalCTA: true,
} as const;
