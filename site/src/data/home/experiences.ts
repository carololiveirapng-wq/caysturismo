import type { Experience } from "@/types";
import { unsplash } from "./shared";

// TODO CMS: substituir pelos dados do painel.
export const experiences: Experience[] = [
  {
    id: "lua-de-mel",
    slug: "lua-de-mel",
    active: true,
    order: 1,
    title: "Lua de Mel",
    shortDescription: "O início de uma história, desenhado a dois.",
    image: {
      src: unsplash("1571003123894-1f0594d2b5d9"),
      alt: "Cabanas de resort à beira da piscina ao entardecer",
    },
  },
  {
    id: "viagens-em-familia",
    slug: "viagens-em-familia",
    active: true,
    order: 2,
    title: "Viagens em Família",
    shortDescription: "Gerações diferentes, uma mesma jornada.",
    image: {
      src: unsplash("1519046904884-53103b34b206"),
      alt: "Praia tropical com veleiro e coqueiros",
    },
  },
  {
    id: "destination-weddings",
    slug: "destination-weddings",
    active: true,
    order: 3,
    title: "Destination Weddings",
    shortDescription: "Uma celebração, um destino à altura dela.",
    image: {
      src: unsplash("1530789253388-582c481c54b0"),
      alt: "Casal observando balões de ar quente sobre a Capadócia",
    },
  },
  {
    id: "cruzeiros-expedicoes",
    slug: "cruzeiros-expedicoes",
    active: true,
    order: 4,
    title: "Cruzeiros & Expedições",
    shortDescription: "O mundo visto devagar, de arquipélago em arquipélago.",
    image: {
      src: unsplash("1512100356356-de1b84283e18"),
      alt: "Hidroavião sobrevoando atol e resort nas Maldivas",
    },
  },
  {
    id: "jornadas-especiais",
    slug: "jornadas-especiais",
    active: true,
    order: 5,
    title: "Jornadas Especiais",
    shortDescription: "Roteiros fora do comum, para quem já viu o comum.",
    image: {
      src: unsplash("1476514525535-07fb3b4ae5f1"),
      alt: "Barco de madeira em lago alpino cercado por montanhas",
    },
  },
];
