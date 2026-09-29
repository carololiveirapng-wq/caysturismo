import type { ProcessStep } from "@/types";

/**
 * TEMPORÁRIO — banco de imagens de demonstração via Unsplash, só para avaliar
 * o design desta fase. Cada URL foi baixada e conferida visualmente (não só
 * verificada por status HTTP) nesta sessão, para evitar imagens fora do
 * universo de curadoria de viagens premium. Substituir por fotografia
 * própria da Cays antes do lançamento.
 */
export function unsplash(id: string, width = 1600) {
  return `https://images.unsplash.com/photo-${id}?w=${width}&q=80&auto=format&fit=crop`;
}

/**
 * Conteúdo institucional fixo — headline/subtítulo do Hero e o manifesto.
 * Não são listas com active/order: têm uma instância só cada, escritas
 * diretamente no texto da marca, não pelo painel. // TODO CMS: só se um
 * dia fizer sentido editar esses textos fora do código.
 */

export const heroImage = {
  src: unsplash("1507525428034-b723cf961d3e", 2400),
  alt: "Águas turquesa e costa tropical vistas de cima, luz dourada de fim de tarde",
};

export const manifesto = {
  eyebrow: "A EXPERIÊNCIA CAYS",
  text: "Entendemos como você gosta de viajar, o que deseja viver e o que quer levar dessa experiência. A partir daí, desenhamos cada detalhe da sua jornada.",
};

export const journeyProcess: ProcessStep[] = [
  {
    number: "01",
    title: "Conhecemos você",
    text: "Entendemos desejos, ritmo e expectativas.",
  },
  {
    number: "02",
    title: "Desenhamos a jornada",
    text: "Um roteiro pensado para quem vai vivê-lo.",
  },
  {
    number: "03",
    title: "Cuidamos dos detalhes",
    text: "Hospedagem, voos e experiências conectados.",
  },
  {
    number: "04",
    title: "Você aproveita",
    text: "Com tudo organizado, resta viver a viagem.",
  },
];
