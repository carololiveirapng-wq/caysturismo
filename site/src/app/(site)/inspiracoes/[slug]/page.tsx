import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShortHero } from "@/components/ui/short-hero";
import { Container } from "@/components/ui/container";
import { LinkArrow } from "@/components/ui/link-arrow";
import { DestinationFinalCTA } from "@/components/destination/destination-final-cta";
import { getInspirationBySlug, getInspirationSlugs, getInspirations, getDestinations, getExperiences } from "@/lib/cms";
import { destinationHref, experienceHref, travelProductHref } from "@/lib/links";
import { getActiveOrderedItems } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";

export async function generateStaticParams() {
  const slugs = await getInspirationSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/inspiracoes/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const item = await getInspirationBySlug(slug);
  if (!item) return {};
  const title = item.seo?.title ?? `${item.title} | Inspirações | Cays Turismo`;
  const description = item.seo?.description ?? item.summary;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/inspiracoes/${item.slug}` },
    openGraph: { title, description, url: `${siteConfig.url}/inspiracoes/${item.slug}`, images: [{ url: item.image.src }] },
  };
}

export default async function InspirationPage({ params }: PageProps<"/inspiracoes/[slug]">) {
  const { slug } = await params;
  const [item, all, destinations, experiences] = await Promise.all([
    getInspirationBySlug(slug),
    getInspirations(),
    getDestinations(),
    getExperiences(),
  ]);
  if (!item) notFound();

  const destinationLinks = destinations.filter((d) => item.destinations.includes(d.slug));
  const experienceLinks = experiences.filter((e) => item.experiences.includes(e.slug));
  const more = getActiveOrderedItems(all).filter((i) => i.slug !== item.slug).slice(0, 3);
  const paragraphs = (item.text ?? "").split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

  const planParams = new URLSearchParams();
  if (item.destinations[0]) planParams.set("destino", item.destinations[0]);
  if (experienceLinks[0]) planParams.set("estilo", experienceLinks[0].name);
  const planHref = `/contato${planParams.toString() ? `?${planParams.toString()}` : ""}`;

  return (
    <>
      <ShortHero eyebrow="Inspiração" title={item.title} subtitle={item.summary} image={item.image} />

      <section className="bg-ivory py-14 md:py-20">
        <Container narrow>
          <p className="text-xs tracking-wide text-stone">
            <Link href="/viagens" className="hover:text-ink">Viagens</Link>
            <span aria-hidden className="px-2">›</span>
            <Link href="/inspiracoes" className="hover:text-ink">Inspirações</Link>
            <span aria-hidden className="px-2">›</span>
            <span className="text-ink">{item.title}</span>
          </p>

          {paragraphs.length > 0 && (
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink/85">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          )}

          {(destinationLinks.length > 0 || experienceLinks.length > 0) && (
            <div className="mt-10 flex flex-wrap gap-2.5 border-t border-line pt-8">
              {destinationLinks.map((d) => (
                <Link key={d.slug} href={destinationHref(d.slug)} className="border border-ink/15 px-4 py-2 text-sm text-ink/80 transition-colors hover:border-ink/40 hover:text-ink">
                  {d.name}
                </Link>
              ))}
              {experienceLinks.map((e) => (
                <Link key={e.slug} href={experienceHref(e.slug)} className="border border-ink/15 px-4 py-2 text-sm text-ink/80 transition-colors hover:border-ink/40 hover:text-ink">
                  {e.name}
                </Link>
              ))}
            </div>
          )}

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <LinkArrow href={planHref}>Quero uma viagem assim</LinkArrow>
            {item.relatedTrip && <LinkArrow href={travelProductHref(item.relatedTrip.slug)}>Ver a viagem: {item.relatedTrip.title}</LinkArrow>}
          </div>
        </Container>

        {item.gallery.length > 0 && (
          <Container className="mt-14">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {item.gallery.map((g) => (
                <div key={g.src} className="relative aspect-[4/3] overflow-hidden">
                  <Image src={g.src} alt={g.alt} fill sizes="(min-width: 1024px) 30vw, 90vw" className="object-cover" />
                </div>
              ))}
            </div>
          </Container>
        )}
      </section>

      {more.length > 0 && (
        <section className="bg-sand py-14 md:py-20">
          <Container>
            <h2 className="font-serif text-2xl text-ink md:text-3xl">Mais inspirações</h2>
            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
              {more.map((m) => (
                <Link key={m.slug} href={`/inspiracoes/${m.slug}`} className="group/card block">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image src={m.image.src} alt={m.image.alt} fill sizes="(min-width: 640px) 30vw, 90vw" className="object-cover transition-transform duration-700 group-hover/card:scale-[1.03]" />
                  </div>
                  <p className="mt-3 font-serif text-lg text-ink">{m.title}</p>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      <DestinationFinalCTA
        title="Transforme esta ideia em roteiro."
        supporting="Conte para a Cays o que te encantou. A gente desenha cada detalhe com você."
        ctaLabel="Planejar minha viagem"
        ctaHref={planHref}
      />
    </>
  );
}
