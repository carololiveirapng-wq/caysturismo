import type { MetadataRoute } from "next";
import { getDestinationSlugs, getExperienceSlugs, getTravelProductSlugs, getArticleSlugs } from "@/lib/cms";
import { siteConfig } from "@/lib/site-config";

/**
 * Deriva do Sanity (via os mesmos `get*Slugs()` que alimentam
 * `generateStaticParams`) — já filtrados por `active == true`, então um
 * conteúdo despublicado some do sitemap sozinho, sem lista manual.
 * `/admin`, `/studio`, `/contato/obrigado` ficam de fora de propósito (ver
 * `src/app/robots.ts`).
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [destinations, experiences, travelProducts, articles] = await Promise.all([
    getDestinationSlugs(),
    getExperienceSlugs(),
    getTravelProductSlugs(),
    getArticleSlugs(),
  ]);

  const base = siteConfig.url;
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/sobre`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/destinos`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/experiencias`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/viagens`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/curadoria`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/contato`, changeFrequency: "monthly", priority: 0.6 },
  ];

  return [
    ...staticRoutes,
    ...destinations.map((slug) => ({ url: `${base}/destinos/${slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...experiences.map((slug) => ({ url: `${base}/experiencias/${slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...travelProducts.map((slug) => ({ url: `${base}/viagens/${slug}`, changeFrequency: "weekly" as const, priority: 0.7 })),
    ...articles.map((slug) => ({ url: `${base}/curadoria/${slug}`, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
