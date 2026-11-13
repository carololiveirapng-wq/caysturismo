import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/container";
import { SearchBox, type SearchItem } from "@/components/busca/search-box";
import { getArticles, getDestinations, getExperiences, getInspirations, getTravelProducts } from "@/lib/cms";
import { getActiveOrderedItems } from "@/lib/content";
import { destinationHref, experienceHref, travelProductHref, curadoriaArticleHref } from "@/lib/links";
import { isOfferOpen } from "@/lib/offers";

export const metadata: Metadata = {
  title: "Buscar",
  description: "Busque destinos, experiências, viagens, inspirações e artigos da Cays Turismo.",
  alternates: { canonical: "/busca" },
  // página de busca não é destino de indexação
  robots: { index: false, follow: true },
};

export default async function BuscaPage() {
  const [destinations, experiences, products, inspirations, articles] = await Promise.all([
    getDestinations(),
    getExperiences(),
    getTravelProducts(),
    getInspirations(),
    getArticles(),
  ]);

  const destName = new Map(destinations.map((d) => [d.slug, d.name]));
  const expName = new Map(experiences.map((e) => [e.slug, e.name]));

  const items: SearchItem[] = [
    ...getActiveOrderedItems(destinations).map((d): SearchItem => ({
      kind: "Destino",
      title: d.name,
      subtitle: d.hero.subtitle ?? d.introduction?.heading,
      href: destinationHref(d.slug),
      image: d.hero.image,
      keywords: (d.themes ?? []).map((t) => expName.get(t) ?? "").join(" "),
    })),
    ...getActiveOrderedItems(experiences).map((e): SearchItem => ({
      kind: "Experiência",
      title: e.name,
      subtitle: e.manifesto ?? e.hero.subtitle,
      href: experienceHref(e.slug),
      image: e.hero.image,
    })),
    ...getActiveOrderedItems(products)
      .filter((p) => p.type !== "offer" || isOfferOpen(p))
      .map((p): SearchItem => ({
        kind: "Viagem",
        title: p.title,
        subtitle: p.subtitle,
        href: travelProductHref(p.slug),
        image: p.gallery[0],
        keywords: [...p.destinations.map((d) => destName.get(d) ?? ""), ...p.experiences.map((e) => expName.get(e) ?? ""), p.duration ?? ""].join(" "),
      })),
    ...getActiveOrderedItems(inspirations).map((i): SearchItem => ({
      kind: "Inspiração",
      title: i.title,
      subtitle: i.summary,
      href: `/inspiracoes/${i.slug}`,
      image: i.image,
      keywords: [...i.destinations.map((d) => destName.get(d) ?? ""), ...i.experiences.map((e) => expName.get(e) ?? "")].join(" "),
    })),
    ...getActiveOrderedItems(articles).map((a): SearchItem => ({
      kind: "Artigo",
      title: a.title,
      subtitle: a.excerpt,
      href: curadoriaArticleHref(a.slug),
      image: a.heroImage,
      keywords: a.category,
    })),
  ];

  return (
    <section className="bg-ivory pt-28 pb-20 md:pt-36 md:pb-28">
      <Container>
        <p className="text-sm font-medium tracking-[0.25em] text-stone uppercase">Buscar</p>
        <h1 className="mt-3 mb-10 font-serif text-[clamp(2rem,4.2vw,3rem)] leading-[1.1] text-ink">O que você quer encontrar?</h1>
        <Suspense fallback={<div className="h-40" aria-hidden />}>
          <SearchBox items={items} />
        </Suspense>
      </Container>
    </section>
  );
}
