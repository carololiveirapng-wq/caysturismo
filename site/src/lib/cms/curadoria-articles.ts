import { fetchEntityWithFallback, fetchListWithFallback } from "./sanity-fetch";
import {
  CURADORIA_ARTICLE_BY_SLUG_QUERY,
  CURADORIA_ARTICLES_QUERY,
  CURADORIA_ARTICLE_SLUGS_QUERY,
} from "@/sanity/queries/curadoria-article";
import {
  curadoriaArticles as mockCuradoriaArticles,
  getCuradoriaArticleBySlug as getMockCuradoriaArticleBySlug,
} from "@/data/curadoria";
import type { CuradoriaArticle } from "@/types";

export async function getArticleBySlug(slug: string): Promise<CuradoriaArticle | undefined> {
  return fetchEntityWithFallback(CURADORIA_ARTICLE_BY_SLUG_QUERY, { slug }, () => getMockCuradoriaArticleBySlug(slug));
}

export async function getArticles(): Promise<CuradoriaArticle[]> {
  return fetchListWithFallback(CURADORIA_ARTICLES_QUERY, () => mockCuradoriaArticles);
}

export async function getArticleSlugs(): Promise<string[]> {
  return fetchListWithFallback(CURADORIA_ARTICLE_SLUGS_QUERY, () => mockCuradoriaArticles.map((a) => a.slug));
}
