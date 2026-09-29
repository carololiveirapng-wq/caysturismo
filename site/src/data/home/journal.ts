import type { JournalPost } from "@/types";
import { unsplash } from "./shared";

/** TEMPORÁRIO — conteúdo fictício só para demonstrar o layout editorial. */
// TODO CMS: substituir pelos dados do painel.
export const journalPosts: JournalPost[] = [
  {
    id: "expedicao-alasca",
    slug: "expedicao-alasca",
    active: true,
    featured: true,
    order: 1,
    category: "Expedições",
    title: "O que levar para uma expedição pelo Alasca",
    readingTime: 6,
    image: {
      src: unsplash("1531366936337-7c912a4589a7"),
      alt: "Aurora boreal verde e violeta sobre paisagem nevada",
    },
  },
  {
    id: "egito-alem-das-piramides",
    slug: "egito-alem-das-piramides",
    active: true,
    featured: true,
    order: 2,
    category: "Destinos",
    title: "Egito além das pirâmides",
    readingTime: 5,
    image: {
      src: unsplash("1568322445389-f64ac2515020"),
      alt: "A Esfinge com a Grande Pirâmide de Gizé ao fundo",
    },
  },
  {
    id: "nova-forma-mediterraneo",
    slug: "nova-forma-mediterraneo",
    active: true,
    featured: true,
    order: 3,
    category: "Roteiros",
    title: "Uma nova forma de conhecer o Mediterrâneo",
    readingTime: 7,
    image: {
      src: unsplash("1526481280693-3bfa7568e0f3"),
      alt: "Vila branca e azul à beira-mar em Santorini",
    },
  },
];
