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
  text: "A Cays nasceu de uma inquietação simples: viagens muito bem organizadas nem sempre são viagens bem vividas. Faltava alguém que ouvisse antes de sugerir — e que desenhasse cada roteiro a partir de quem vai viajar, não de um pacote pronto.",
  milestones: [
    { label: "Início", text: "Uma equipe nasce para repensar como se planeja uma viagem." },
    { label: "Hoje", text: "Curadoria personalizada para cada jornada, do primeiro contato ao retorno." },
  ],
};

export const aboutPillars = [
  { title: "Escuta", text: "Cada roteiro começa numa conversa, não num formulário." },
  { title: "Curadoria", text: "Cada escolha — hospedagem, experiência, ritmo — passa pelo nosso olhar." },
  { title: "Cuidado", text: "Do planejamento ao retorno, alguém acompanha cada detalhe." },
];

/** Sem nomes/fotos reais ainda — cards de placeholder, nunca perfis inventados. */
export const aboutTeamRoles = ["Curadoria de Viagens", "Planejamento & Logística", "Atendimento ao Cliente"];
