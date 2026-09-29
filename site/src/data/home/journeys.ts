import type { FeaturedJourney } from "@/types";
import { unsplash } from "./shared";

/**
 * A Home mostra a primeira jornada active+featured (ordenada). Mais de um
 * item aqui só importa quando o painel existir de verdade; por ora é uma
 * lista de um item só, mas já no formato certo.
 */
// TODO CMS: substituir pelos dados do painel.
export const featuredJourneys: FeaturedJourney[] = [
  {
    id: "nova-forma-de-navegar",
    slug: "nova-forma-de-navegar",
    active: true,
    featured: true,
    order: 1,
    eyebrow: "EM DESTAQUE",
    title: "Uma nova forma de navegar.",
    description:
      "Cruzeiros de luxo redesenham o que significa explorar devagar — suítes voltadas para o mar, gastronomia autoral e escalas que fogem do óbvio.",
    ctaLabel: "Explorar roteiros de cruzeiro",
    ctaHref: "/experiencias/cruzeiros",
    image: {
      src: unsplash("1548574505-5e239809ee19", 2000),
      alt: "Navios de cruzeiro ancorados em porto tropical, vistos do alto",
    },
  },
];
