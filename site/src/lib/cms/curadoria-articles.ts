import { fetchFromSanity } from "./sanity-fetch";
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
  const fromSanity = await fetchFromSanity<CuradoriaArticle | null>(CURADORIA_ARTICLE_BY_SLUG_QUERY, { slug });
  return fromSanity ?? getMockCuradoriaArticleBySlug(slug);
}

export async function getArticles(): Promise<CuradoriaArticle[]> {
  const fromSanity = await fetchFromSanity<CuradoriaArticle[]>(CURADORIA_ARTICLES_QUERY);
  return fromSanity && fromSanity.length > 0 ? fromSanity : mockCuradoriaArticles;
}

export async function getArticleSlugs(): Promise<string[]> {
  const fromSanity = await fetchFromSanity<string[]>(CURADORIA_ARTICLE_SLUGS_QUERY);
  return fromSanity && fromSanity.length > 0 ? fromSanity : mockCuradoriaArticles.map((a) => a.slug);
}
