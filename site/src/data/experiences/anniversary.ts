import type { ExperienceDetail } from "@/types";
import { unsplash } from "@/data/home/shared";

// TODO CMS: substituir pelos dados reais do painel. Mesmo padrão de lua-de-mel.ts.
export const anniversary: ExperienceDetail = {
  id: "bodas",
  slug: "bodas",
  active: true,
  featured: true,
  order: 5,
  name: "Bodas",
  axis: "occasion",

  hero: {
    image: { src: unsplash("1625690988276-0a7b0cdf3d5d", 2200), alt: "Casal mais maduro brindando em um momento de celebração" },
    eyebrow: "EXPERIÊNCIAS · OCASIÃO",
    title: "Bodas",
    subtitle: "Décadas de história merecem uma viagem à altura — para celebrar, relembrar ou recomeçar.",
  },
  breadcrumb: [{ label: "Experiências", href: "/experiencias" }, { label: "Bodas" }],

  manifesto:
    "Bodas de prata, de ouro, ou simplesmente mais um ano — cada celebração de casamento carrega uma história própria. Desenhamos viagens que dão a esse tempo juntos o peso que ele merece, sem pressa e sem roteiro genérico.",

  howItWorks: [
    { title: "Contamos a história de vocês", text: "Anos juntos, lugares queridos, o que ainda não viveram." },
    { title: "Desenhamos a celebração", text: "De uma renovação de votos a uma viagem inteiramente nova." },
    { title: "Cuidamos de cada detalhe", text: "Hospedagem, experiências e pequenos gestos que marcam a data." },
  ],

  featuredDestinations: [
    { slug: "italia", name: "Itália", region: "Europa", image: { src: unsplash("1523906834658-6e24ef2386f9", 1000), alt: "Gôndola sob a Ponte Rialto em Veneza" } },
    { slug: "grecia", name: "Grécia", region: "Europa", image: { src: unsplash("1526481280693-3bfa7568e0f3", 1000), alt: "Vila branca e azul à beira-mar em Santorini" } },
    { slug: "franca", name: "França", region: "Europa", image: { src: unsplash("1502602898657-3e91760cbb34", 1000), alt: "Torre Eiffel vista de uma avenida parisiense" } },
  ],

  subtypes: [
    { slug: "renovacao-de-votos", name: "Renovação de votos", text: "Um gesto simbólico, no destino que vocês escolherem.", image: { src: unsplash("1739932905664-b7b4c0056f21", 900), alt: "Casal mais maduro em momento afetivo durante celebração" } },
    { slug: "viagem-comemorativa", name: "Viagem comemorativa", text: "Sem cerimônia — só a viagem que marca a data.", image: { src: unsplash("1723040175971-e16d4c8d5f6a", 900), alt: "Casal brindando com taças em jantar especial" } },
    { slug: "revisitar-lugares", name: "Revisitar lugares", text: "Voltar a um lugar especial, anos depois.", image: { src: unsplash("1523906834658-6e24ef2386f9", 900), alt: "Gôndola sob a Ponte Rialto em Veneza" } },
  ],

  faq: [
    { question: "Bodas precisa ter cerimônia de renovação de votos?", answer: "Não — muitos casais preferem apenas uma viagem especial, sem cerimônia. A renovação de votos é uma opção, não uma exigência." },
    { question: "Vocês organizam surpresas para a data?", answer: "Sim, sempre que possível — de um jantar especial a um upgrade de hospedagem, dentro do que cada fornecedor permite." },
    { question: "É possível levar filhos e netos na viagem de bodas?", answer: "Sim — algumas famílias preferem celebrar juntas. Nesse caso, também vale considerar combinar com o roteiro de Viagens em Família." },
    { question: "Como funciona um roteiro personalizado com a Cays?", answer: "Começamos entendendo a história de vocês e o que querem viver, desenhamos a viagem, cuidamos de cada detalhe — e vocês focam em comemorar." },
  ],

  finalCta: {
    title: "Sua viagem de bodas começa em uma conversa.",
    supporting: "Conte para a Cays a história de vocês e o que gostariam de celebrar. Nós cuidamos do caminho.",
    note: "Fale com um especialista da Cays",
  },

  seo: {
    title: "Bodas | Cays Turismo",
    description: "Viagens para celebrar bodas e aniversários de casamento — de uma escapada comemorativa a uma renovação de votos. Curadoria Cays Turismo.",
  },
};
