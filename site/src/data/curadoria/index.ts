import type { CuradoriaArticle } from "@/types";
import { melhorEpocaParaIrAoJapao } from "./melhor-epoca-para-ir-ao-japao";
import { guiaDeGastronomiaJaponesa } from "./guia-de-gastronomia-japonesa";
import { kyotoAlemDosTemplos } from "./kyoto-alem-dos-templos";

// TODO CMS: cada novo artigo completo entra nesta lista.
export const curadoriaArticles: CuradoriaArticle[] = [
  melhorEpocaParaIrAoJapao,
  guiaDeGastronomiaJaponesa,
  kyotoAlemDosTemplos,
];

export function getCuradoriaArticleBySlug(slug: string): CuradoriaArticle | undefined {
  return curadoriaArticles.find((article) => article.active && article.slug === slug);
}

export function getArticlesByCategory(category: string): CuradoriaArticle[] {
  return curadoriaArticles.filter((article) => article.active && article.category === category);
}

export function getArticlesByDestination(destinationSlug: string): CuradoriaArticle[] {
  return curadoriaArticles.filter(
    (article) => article.active && article.destinationIds?.includes(destinationSlug),
  );
}

export function getArticlesByExperience(experienceSlug: string): CuradoriaArticle[] {
  return curadoriaArticles.filter(
    (article) => article.active && article.experienceIds?.includes(experienceSlug),
  );
}
