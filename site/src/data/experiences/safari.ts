import type { ExperienceDetail } from "@/types";
import { unsplash } from "@/data/home/shared";

/** Sem prometer avistamento garantido de animais — natureza selvagem não se controla. */
// TODO CMS: substituir pelos dados reais do painel. Mesmo padrão de lua-de-mel.ts.
export const safari: ExperienceDetail = {
  id: "safari",
  slug: "safari",
  active: true,
  featured: true,
  order: 9,
  name: "Safari",
  axis: "style",

  hero: {
    image: { src: unsplash("1577971132997-c10be9372519", 2200), alt: "Elefantes avistados durante um safári fotográfico" },
    eyebrow: "EXPERIÊNCIAS · ESTILO",
    title: "Safari",
    subtitle: "A savana africana vista de perto, em reservas privadas selecionadas pela curadoria Cays.",
  },
  breadcrumb: [{ label: "Experiências", href: "/experiencias" }, { label: "Safari" }],

  manifesto:
    "Um safári bem desenhado combina reservas com bom histórico de avistamento, guias que conhecem o território de verdade e lodges que entregam conforto sem tirar o foco da natureza ao redor.",

  howItWorks: [
    { title: "Escolhemos a reserva certa", text: "Priorizamos histórico de avistamento e conforto real, não só proximidade." },
    { title: "Guias exclusivos", text: "Conhecimento local que faz diferença entre um passeio e uma experiência." },
    { title: "Combinamos com cidade ou praia", text: "Dias de savana seguidos de litoral ou uma capital sofisticada, se fizer sentido." },
  ],

  featuredDestinations: [
    { slug: "africa-do-sul", name: "África do Sul", region: "África", image: { src: unsplash("1577971132997-c10be9372519", 1000), alt: "Elefantes avistados durante um safári fotográfico" } },
  ],

  subtypesHeading: "Formas de viver o safári",
  subtypes: [
    { slug: "reserva-privada", name: "Reserva privada", text: "Poucos veículos por safári, guias exclusivos.", image: { src: unsplash("1779216175784-a67b6da108bb", 900), alt: "Lodge de safári com vista para a savana" } },
    { slug: "safari-em-familia", name: "Safári em família", text: "Lodges com programas específicos para crianças.", image: { src: unsplash("1779218449605-792bf0bef5e0", 900), alt: "Suíte de lodge de safári preparada para hóspedes" } },
    { slug: "safari-e-praia", name: "Safári & praia", text: "Savana seguida de dias de litoral.", image: { src: unsplash("1547471080-7cc2caa01a7e", 900), alt: "Dunas de areia vermelha no deserto da Namíbia" } },
    { slug: "safari-e-cidade", name: "Safári & cidade", text: "Reserva combinada com a sofisticação da Cidade do Cabo.", image: { src: unsplash("1516426122078-c23e76319801", 900), alt: "Vista da Table Mountain a partir da Cidade do Cabo" } },
  ],

  journeys: [
    { slug: "safari-e-cidade-do-cabo-experiencia", title: "Safári & Cidade do Cabo", subtitle: "Savana e litoral", image: { src: unsplash("1516426122078-c23e76319801", 900), alt: "Vista da Table Mountain a partir da Cidade do Cabo" } },
  ],

  faq: [
    { question: "É garantido ver os Big Five no safári?", answer: "Não — é vida selvagem em seu habitat natural, sem garantias. O que garantimos é escolher reservas com bom histórico de avistamento e guias experientes, o que aumenta bastante as chances." },
    { question: "Safári funciona bem para crianças?", answer: "Sim, em lodges preparados para isso — a idade mínima e o tipo de atividade variam por reserva, o que ajustamos na escolha do lodge." },
    { question: "Qual a melhor época para o safári?", answer: "Em geral, a estação seca (inverno no hemisfério sul) oferece melhor visibilidade, já que a vegetação fica mais baixa." },
    { question: "É possível combinar safári com praia?", answer: "Sim, é uma combinação comum — dias de savana seguidos de litoral, com voo interno entre os dois." },
  ],

  finalCta: {
    title: "Seu safári começa em uma conversa.",
    supporting: "Conte para a Cays o que você imagina viver na savana. Nós cuidamos do caminho.",
    note: "Fale com um especialista da Cays",
  },

  seo: {
    title: "Safari | Cays Turismo",
    description: "Safáris privados em reservas selecionadas na África do Sul, com guias exclusivos e lodges de experiência. Curadoria Cays Turismo.",
  },
};
