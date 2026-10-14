import type { DemoImage } from "@/types";
import { unsplash } from "@/data/home/shared";

// TODO CMS: copy institucional real — hoje é só direção editorial, sem
// inventar ano de fundação, número de clientes ou prêmios.
export const aboutHero = {
  eyebrow: "Sobre a Cays",
  title: "Viajar bem começa por entender quem vai viajar.",
  image: {
    src: unsplash("1531969179221-3946e6b5a5e7", 2400),
    alt: "Chá sendo servido em xícaras tradicionais japonesas, com vapor subindo",
  } as DemoImage,
};

export const aboutStory = {
  heading: "Por que a Cays existe",
  text: "A Cays nasceu para cuidar de viagens com a mesma atenção de quem organiza algo pessoal — sem fórmulas prontas, sempre a partir de quem vai viajar. Ficou conhecida primeiro pelas luas de mel e destination weddings, e hoje acompanha essas mesmas histórias em novas fases: viagens a dois, em família, em grandes celebrações.",
};

/**
 * Timeline institucional — só datas reais. O ano de fundação vem de
 * `settings.foundedDate` (nunca hardcoded aqui); os três marcos seguintes
 * são deliberadamente sem data, igual pedido: nunca inventar anos
 * intermediários que a Cays não confirmou.
 */
export const aboutMilestones = [
  { label: "Lua de Mel & Destination Wedding", text: "Como a Cays se tornou conhecida." },
  { label: "Novas fases da vida", text: "As mesmas histórias continuam — a dois, em família, em novas celebrações." },
];

export const aboutPillars = [
  { title: "Escuta", text: "Cada roteiro começa entendendo você — não preenchendo um formulário." },
  { title: "Curadoria", text: "Cada escolha — hospedagem, experiência, ritmo — passa pelo nosso olhar." },
  { title: "Cuidado", text: "Do planejamento ao retorno, alguém acompanha cada detalhe." },
];
