import type { MetadataRoute } from "next";
import { fetchFromSanity } from "@/lib/cms/sanity-fetch";
import { siteConfig } from "@/lib/site-config";
import { LAST_UPDATED } from "@/lib/legal/content";
import { getDestinationSlugs, getExperienceSlugs, getTravelProductSlugs, getArticleSlugs, getTravelProducts, getInspirationSlugs } from "@/lib/cms";
import { getOpenOffers } from "@/lib/offers";

/**
 * Mesmos filtros "ativo" das consultas de slug (`*_SLUGS_QUERY`), mais a data
 * de atualização do próprio documento, para o `lastModified` do sitemap.
 * Quando o Sanity não responde, cai para a lista sem data — o sitemap nunca
 * quebra por causa disso.
 */
const SITEMAP_ENTRIES = {
  destinations: `*[_type == "destination" && active == true]{ "slug": slug.current, "updatedAt": _updatedAt }`,
  experiences: `*[_type == "experience" && active == true]{ "slug": slug.current, "updatedAt": _updatedAt }`,
  travelProducts: `*[_type == "travelProduct" && active == true]{ "slug": slug.current, "updatedAt": _updatedAt }`,
  articles: `*[_type == "curadoriaArticle" && active == true]{ "slug": slug.current, "updatedAt": _updatedAt }`,
  inspirations: `*[_type == "inspiration" && active == true]{ "slug": slug.current, "updatedAt": _updatedAt }`,
} as const;

type Entry = { slug: string; updatedAt?: string };

async function dated(query: string, fallbackSlugs: () => Promise<string[]>): Promise<Entry[]> {
  const fromSanity = await fetchFromSanity<Entry[]>(query);
  if (fromSanity && fromSanity.length > 0) return fromSanity.filter((e) => e.slug);
  return (await fallbackSlugs()).map((slug) => ({ slug }));
}

/**
 * Páginas dinâmicas usam a data do Sanity; estáticas usam a data de publicação
 * do próprio conteúdo ou ficam sem `lastModified` quando não há uma data real.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [destinations, experiences, travelProducts, articles, inspirations] = await Promise.all([
    dated(SITEMAP_ENTRIES.destinations, getDestinationSlugs),
    dated(SITEMAP_ENTRIES.experiences, getExperienceSlugs),
    dated(SITEMAP_ENTRIES.travelProducts, getTravelProductSlugs),
    dated(SITEMAP_ENTRIES.articles, getArticleSlugs),
    dated(SITEMAP_ENTRIES.inspirations, getInspirationSlugs),
  ]);

  const temOfertas = getOpenOffers(await getTravelProducts()).length > 0;
  const base = siteConfig.url;
  const toDate = (iso?: string) => (iso ? new Date(iso) : undefined);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/sobre`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/destinos`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/experiencias`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/viagens`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/grupos`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/inspiracoes`, changeFrequency: "weekly", priority: 0.7 },
    ...(temOfertas ? [{ url: `${base}/oportunidades`, changeFrequency: "daily" as const, priority: 0.8 }] : []),
    { url: `${base}/curadoria`, changeFrequency: "weekly", priority: 0.7 },
    // Landing da especialidade (principal URL de lua de mel em destino específico) e página especial da Explora Journeys.
    { url: `${base}/experiencias/lua-de-mel/maldivas`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/experiencias/cruzeiros/explora-journeys`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contato`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/privacidade`, lastModified: new Date(LAST_UPDATED), changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/termos`, lastModified: new Date(LAST_UPDATED), changeFrequency: "yearly", priority: 0.3 },
  ];

  return [
    ...staticRoutes,
    ...destinations.map((e) => ({ url: `${base}/destinos/${e.slug}`, lastModified: toDate(e.updatedAt), changeFrequency: "monthly" as const, priority: 0.7 })),
    ...experiences.map((e) => ({ url: `${base}/experiencias/${e.slug}`, lastModified: toDate(e.updatedAt), changeFrequency: "monthly" as const, priority: 0.7 })),
    ...travelProducts.map((e) => ({ url: `${base}/viagens/${e.slug}`, lastModified: toDate(e.updatedAt), changeFrequency: "weekly" as const, priority: 0.7 })),
    ...articles.map((e) => ({ url: `${base}/curadoria/${e.slug}`, lastModified: toDate(e.updatedAt), changeFrequency: "monthly" as const, priority: 0.6 })),
    ...inspirations.map((e) => ({ url: `${base}/inspiracoes/${e.slug}`, lastModified: toDate(e.updatedAt), changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
