import type { ExperienceDetail } from "@/types";
import { unsplash } from "@/data/home/shared";

/**
 * Sem datas, preços ou disponibilidade de ingresso reais — apenas a
 * estrutura de como a Cays organiza a viagem ao redor de um evento.
 * Confirmação de ingresso sempre depende do parceiro/organizador do evento.
 */
// TODO CMS: substituir pelos dados reais do painel. Mesmo padrão de lua-de-mel.ts.
export const majorEvents: ExperienceDetail = {
  id: "grandes-eventos",
  slug: "grandes-eventos",
  active: true,
  featured: true,
  order: 6,
  name: "Grandes Eventos",
  axis: "occasion",

  hero: {
    image: { src: unsplash("1652090379496-4219a00c8ebf", 2200), alt: "Pista de corrida de Fórmula 1 vista das arquibancadas" },
    eyebrow: "EXPERIÊNCIAS · OCASIÃO",
    title: "Grandes Eventos",
    subtitle: "Fórmula 1, tênis, shows e grandes eventos — a viagem organizada ao redor do que você quer viver ao vivo.",
  },
  breadcrumb: [{ label: "Experiências", href: "/experiencias" }, { label: "Grandes Eventos" }],

  manifesto:
    "Ver um Grande Prêmio, uma final de Grand Slam ou um show ao vivo muda de categoria quando a viagem ao redor também é bem pensada — hospedagem próxima, deslocamento sem estresse e tempo livre para viver o destino além do evento.",

  howItWorks: [
    { title: "Contamos com o que você quer ver", text: "O evento, a data e o quanto a viagem gira em torno dele." },
    { title: "Verificamos com parceiros locais", text: "Ingressos e pacotes de hospitalidade, quando disponíveis, sempre via fornecedores oficiais." },
    { title: "Desenhamos a viagem completa", text: "Hospedagem, deslocamento e tempo livre para o destino, não só o evento." },
  ],

  subtypesHeading: "Tipos de evento",
  subtypes: [
    { slug: "formula-1", name: "Fórmula 1", text: "Grandes Prêmios ao redor do mundo.", image: { src: unsplash("1652090379496-4219a00c8ebf", 900), alt: "Pista de corrida de Fórmula 1 vista das arquibancadas" } },
    { slug: "tenis", name: "Tênis", text: "Grand Slams e torneios internacionais.", image: { src: unsplash("1683380399873-9d2b43947728", 900), alt: "Quadra de tênis durante partida em torneio internacional" } },
    { slug: "shows", name: "Shows", text: "Turnês internacionais em grandes cidades.", image: { src: unsplash("1459749411175-04bf5292ceea", 900), alt: "Multidão em show ao vivo com luzes de palco" } },
    { slug: "eventos-culturais", name: "Eventos culturais", text: "Festivais, temporadas de ópera e mostras internacionais.", image: { src: unsplash("1580657274234-7339717f4541", 900), alt: "Taças de espumante sendo servidas em uma celebração" } },
  ],

  faq: [
    { question: "A Cays garante ingressos para o evento?", answer: "Ingressos e pacotes de hospitalidade dependem de disponibilidade junto aos parceiros e organizadores oficiais de cada evento — verificamos a viabilidade caso a caso, sem prometer disponibilidade antes de confirmar." },
    { question: "Vocês organizam só a viagem, sem o ingresso?", answer: "Sim — muitos clientes já têm o ingresso resolvido e querem apenas a viagem (hospedagem, deslocamento, experiências) organizada ao redor do evento." },
    { question: "Com quanto tempo de antecedência devo planejar?", answer: "Para eventos de alta demanda (Grandes Prêmios, finais de torneio), o ideal é começar assim que o calendário do evento for divulgado — hospedagem próxima esgota rápido." },
    { question: "É possível combinar o evento com o resto de uma viagem maior?", answer: "Sim, é comum — o evento vira uma parada dentro de um roteiro mais amplo pelo destino ou região." },
  ],

  finalCta: {
    title: "Seu próximo grande evento começa em uma conversa.",
    supporting: "Conte para a Cays qual evento você quer viver. Nós cuidamos da viagem ao redor dele.",
    note: "Fale com um especialista da Cays",
  },

  seo: {
    title: "Grandes Eventos | Cays Turismo",
    description: "Viagens organizadas ao redor de Fórmula 1, tênis, shows e grandes eventos internacionais. Curadoria Cays Turismo.",
  },
};
