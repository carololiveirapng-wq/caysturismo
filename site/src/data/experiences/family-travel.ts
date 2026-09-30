import type { ExperienceDetail } from "@/types";
import { unsplash } from "@/data/home/shared";

// TODO CMS: substituir pelos dados reais do painel. Mesmo padrão de lua-de-mel.ts.
export const familyTravel: ExperienceDetail = {
  id: "familia",
  slug: "familia",
  active: true,
  featured: true,
  order: 3,
  name: "Viagens em Família",
  axis: "style",

  hero: {
    image: { src: unsplash("1721840432289-d0041522103d", 2200), alt: "Família caminhando junta em uma praia tropical" },
    eyebrow: "EXPERIÊNCIAS · ESTILO",
    title: "Viagens em Família",
    subtitle: "Viajar em família é criar histórias que continuam depois da volta.",
  },
  breadcrumb: [{ label: "Experiências", href: "/experiencias" }, { label: "Viagens em Família" }],

  manifesto:
    "Três gerações, ritmos diferentes, uma só viagem. Desenhamos roteiros que equilibram descanso e atividade, para que avós, pais e filhos voltem com a mesma vontade de viajar juntos de novo.",

  howItWorks: [
    { title: "Entendemos o grupo", text: "Idades, interesses e o que cada geração espera da viagem." },
    { title: "Ajustamos a logística", text: "Quartos conectados, deslocamentos curtos, ritmo sem pressa." },
    { title: "Equilibramos o roteiro", text: "Atividades para todos, com espaço para descanso de cada um." },
  ],

  featuredDestinations: [
    { slug: "brasil", name: "Brasil", region: "América do Sul", image: { src: unsplash("1483729558449-99ef09a8c325", 1000), alt: "Vista aérea do Pão de Açúcar e da Baía de Guanabara, Rio de Janeiro" } },
    { slug: "estados-unidos", name: "Estados Unidos", region: "América do Norte", image: { src: unsplash("1496442226666-8d4d0e62e6e9", 1000), alt: "Horizonte de Nova York ao entardecer, visto do rio" } },
    { slug: "grecia", name: "Grécia", region: "Europa", image: { src: unsplash("1526481280693-3bfa7568e0f3", 1000), alt: "Vila branca e azul à beira-mar em Santorini" } },
  ],

  subtypesHeading: "Uma viagem para cada fase da família",
  subtypes: [
    { slug: "criancas-pequenas", name: "Crianças pequenas", text: "Trajetos curtos, resorts com estrutura e ritmo tranquilo.", image: { src: unsplash("1574744918163-6cef6f4a31b0", 900), alt: "Piscina de resort com crianças brincando" } },
    { slug: "adolescentes", name: "Adolescentes", text: "Atividades, autonomia e destinos com algo para descobrir.", image: { src: unsplash("1648090272983-440e86555e8e", 900), alt: "Família em atividade ao ar livre em resort" } },
    { slug: "multigeracional", name: "Multigeracional", text: "Avós, pais e filhos no mesmo roteiro, sem abrir mão do conforto de ninguém.", image: { src: unsplash("1605656816284-e3031500e190", 900), alt: "Família de três gerações reunida em viagem" } },
    { slug: "avos-e-netos", name: "Avós e netos", text: "Uma viagem só dos dois, criando uma memória própria.", image: { src: unsplash("1625690988276-0a7b0cdf3d5d", 900), alt: "Avós sorrindo em momento de celebração em família" } },
  ],

  journeys: [
    { slug: "brasil-em-familia", title: "Brasil em Família", subtitle: "Natureza e praia para todas as idades", image: { src: unsplash("1483729558449-99ef09a8c325", 900), alt: "Vista aérea do Pão de Açúcar e da Baía de Guanabara, Rio de Janeiro" } },
    { slug: "eua-em-familia", title: "Estados Unidos em Família", subtitle: "Parques, cidades e road trip", image: { src: unsplash("1496442226666-8d4d0e62e6e9", 900), alt: "Horizonte de Nova York ao entardecer, visto do rio" } },
  ],

  faq: [
    { question: "Qual a idade mínima recomendada para viajar em família?", answer: "Não há uma idade mínima — já organizamos viagens com bebês e com avós de mais de 80 anos. O roteiro se ajusta ao grupo, não o contrário." },
    { question: "Como funcionam os quartos para grupos grandes?", answer: "Priorizamos hospedagens com quartos conectados ou suítes familiares, sempre que a estrutura do destino permitir." },
    { question: "É possível equilibrar atividade e descanso no mesmo roteiro?", answer: "Sim — é exatamente esse o objetivo: dias com programação para o grupo e momentos livres para quem prefere descansar." },
    { question: "Vocês organizam viagens multigeracionais com orçamentos diferentes por família?", answer: "Sim, é comum — ajustamos categorias de hospedagem e experiências conforme o que cada núcleo familiar do grupo prefere." },
  ],

  finalCta: {
    title: "Sua próxima viagem em família começa em uma conversa.",
    supporting: "Conte para a Cays quem vai, as idades e o que vocês imaginam viver. Nós cuidamos do caminho.",
    note: "Fale com um especialista da Cays",
  },

  seo: {
    title: "Viagens em Família | Cays Turismo",
    description: "Roteiros multigeracionais sob medida — avós, pais e filhos, cada um no seu ritmo. Curadoria Cays Turismo.",
  },
};
