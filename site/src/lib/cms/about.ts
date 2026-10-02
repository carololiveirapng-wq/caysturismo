import { fetchFromSanity } from "./sanity-fetch";
import { ABOUT_PAGE_QUERY } from "@/sanity/queries/about";
import { allowMockFallback } from "@/sanity/env";
import { aboutHero, aboutStory, aboutMilestones, aboutPillars } from "@/data/about";
import type { AboutPageContent } from "@/types";

/**
 * `aboutPage` é singleton — igual Home/Settings, ausência não é 404. Fora
 * de produção, sem o Sanity configurado ou documento ainda não publicado,
 * monta a partir dos mocks existentes (mesmo texto institucional que já
 * estava em `@/data/about`) só pra manter /sobre funcionando em dev — em
 * produção, com o Sanity configurado, isso nunca roda.
 */
export async function getAboutPage(): Promise<AboutPageContent | null> {
  const fromSanity = await fetchFromSanity<AboutPageContent | null>(ABOUT_PAGE_QUERY);
  if (fromSanity) return fromSanity;
  return allowMockFallback ? buildMockAboutPage() : null;
}

function buildMockAboutPage(): AboutPageContent {
  return {
    hero: { eyebrow: aboutHero.eyebrow, title: aboutHero.title, image: aboutHero.image },
    history: {
      title: aboutStory.heading,
      text: aboutStory.text,
      timeline: aboutMilestones.map((m) => ({ label: m.label, title: m.label, text: m.text })),
    },
    pillars: aboutPillars.map((p, i) => ({ title: p.title, description: p.text, order: i })),
    finalCta: {
      title: "Quer conversar com a gente sobre sua próxima viagem?",
      text: "Conte para a Cays o que você imagina viver. Nós cuidamos do caminho.",
      ctaLabel: "Planejar minha viagem",
    },
  };
}
