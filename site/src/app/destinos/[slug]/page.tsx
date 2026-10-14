import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDestinationBySlug, getDestinationSlugs, getSettings } from "@/lib/cms";
import { DestinationHero } from "@/components/destination/destination-hero";
import { TravelPlanningPanel } from "@/components/commercial/travel-planning-panel";
import { DestinationIntroduction } from "@/components/destination/destination-introduction";
import { KeyInfo } from "@/components/destination/key-info";
import { WhyCays } from "@/components/destination/why-cays";
import { SuggestedJourneys } from "@/components/destination/suggested-journeys";
import { WhatToLive } from "@/components/destination/what-to-live";
import { WhereToStay } from "@/components/destination/where-to-stay";
import { MonthGuide } from "@/components/destination/month-guide";
import { RelatedCuration } from "@/components/destination/related-curation";
import { DestinationFaq } from "@/components/destination/destination-faq";
import { RelatedDestinations } from "@/components/destination/related-destinations";
import { DestinationFinalCTA } from "@/components/destination/destination-final-cta";
import { InlineCtaStrip } from "@/components/destination/inline-cta-strip";
import { StickySubnav } from "@/components/ui/sticky-subnav";
import { PersistentMobileCTA } from "@/components/ui/persistent-mobile-cta";
import { siteConfig } from "@/lib/site-config";
import { jsonLdString } from "@/lib/json-ld";
import { faqJsonLd } from "@/lib/seo/structured-data";

export async function generateStaticParams() {
  const slugs = await getDestinationSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/destinos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);
  if (!destination) return {};

  const title = destination.seo?.title ?? `${destination.name} | Viagens Personalizadas | Cays Turismo`;
  const description =
    destination.seo?.description ??
    `Descubra ${destination.name} com a curadoria da Cays Turismo. Roteiros personalizados, experiências e informações para planejar sua viagem.`;
  const canonical = `/destinos/${destination.slug}`;

  return {
    // `title` já vem completo (com "Cays Turismo" no fim) — absolute evita
    // que o template do layout raiz ("%s | Cays Turismo") duplique o nome.
    title: { absolute: title },
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}${canonical}`,
      images: [{ url: destination.hero.image.src }],
    },
  };
}

export default async function DestinationPage({ params }: PageProps<"/destinos/[slug]">) {
  const { slug } = await params;
  const [destination, { whatsappHref }] = await Promise.all([getDestinationBySlug(slug), getSettings()]);
  if (!destination) notFound();

  const contactHref = `/contato?destino=${destination.slug}`;

  // "Ideal para" só com dado real: os títulos de `experiences[]` já são
  // conteúdo editorial aprovado (a mesma seção "O que viver" mais abaixo),
  // nunca uma tag genérica inventada pro painel.
  const planningTags = destination.experiences?.slice(0, 4).map((e) => e.title);

  const subnavItems = [
    destination.introduction ? { id: "visao-geral", label: "Visão geral" } : null,
    destination.journeys?.length ? { id: "viagens", label: "Viagens" } : null,
    destination.experiences?.length ? { id: "o-que-viver", label: "O que viver" } : null,
    destination.stays?.length ? { id: "onde-ficar", label: "Onde ficar" } : null,
    destination.months?.length ? { id: "quando-ir", label: "Quando ir" } : null,
    destination.articles?.length ? { id: "curadoria", label: "Curadoria" } : null,
    destination.faq?.length ? { id: "faq", label: "FAQ" } : null,
  ].filter((item): item is { id: string; label: string } => item !== null);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      ...(destination.breadcrumb ?? []).map((item, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: item.label,
        ...(item.href && { item: `${siteConfig.url}${item.href}` }),
      })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumbSchema) }}
      />
      {destination.faq?.length ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(faqJsonLd(destination.faq)) }}
        />
      ) : null}

      <DestinationHero destination={destination} />

      <TravelPlanningPanel
        title={`${destination.name} sob medida`}
        subtitle="Uma viagem desenhada de acordo com seu perfil, período e estilo."
        tags={planningTags}
        items={[
          { label: "Quando viajar", value: destination.keyInfo?.bestTime ?? "Definimos a melhor época de acordo com o que você quer viver." },
          { label: "Duração", value: "Personalizada" },
          { label: "Hospedagem", value: "Selecionada de acordo com o perfil da viagem" },
          { label: "Investimento", value: "Sob consulta" },
        ]}
        ctaLabel="Planejar esta viagem"
        ctaHref={contactHref}
        whatsappHref={whatsappHref}
      />

      <StickySubnav items={subnavItems} ctaLabel="Planejar viagem" ctaHref={contactHref} />

      {destination.introduction && (
        <DestinationIntroduction
          id="visao-geral"
          heading={destination.introduction.heading}
          text={destination.introduction.text}
        />
      )}

      {destination.keyInfo && <KeyInfo id="informacoes-chave" keyInfo={destination.keyInfo} />}

      {destination.whyCays && <WhyCays id="por-que-cays" data={destination.whyCays} />}

      {destination.journeys && destination.journeys.length > 0 && (
        <SuggestedJourneys
          id="viagens"
          journeys={destination.journeys}
          heading={destination.journeysHeading}
        />
      )}

      <InlineCtaStrip
        title="Não encontrou exatamente o que imaginou?"
        supporting="Criamos uma viagem sob medida para você."
        ctaLabel="Planejar minha viagem"
        ctaHref={contactHref}
      />

      {destination.experiences && destination.experiences.length > 0 && (
        <WhatToLive
          id="o-que-viver"
          items={destination.experiences}
          heading={destination.experiencesHeading}
          destinationSlug={destination.slug}
        />
      )}

      {destination.stays && destination.stays.length > 0 && (
        <WhereToStay id="onde-ficar" stays={destination.stays} contactHref={contactHref} />
      )}

      {destination.months && destination.months.length > 0 && (
        <MonthGuide id="quando-ir" months={destination.months} heading={destination.monthsHeading} />
      )}

      <InlineCtaStrip
        title={destination.seasonCta?.title ?? "Sabe quando quer viajar?"}
        supporting={
          destination.seasonCta?.supporting ?? "Ajudamos a escolher o período ideal para a sua viagem."
        }
        ctaLabel="Planejar viagem"
        ctaHref={contactHref}
      />

      {destination.articles && destination.articles.length > 0 && (
        <RelatedCuration
          id="curadoria"
          articles={destination.articles}
          allHref={`/curadoria?destino=${destination.slug}`}
          heading={`Curadoria sobre o ${destination.name}`}
          ctaLabel={`Ver toda a curadoria sobre o ${destination.name}`}
        />
      )}

      {destination.faq && destination.faq.length > 0 && (
        <DestinationFaq id="faq" items={destination.faq} />
      )}

      {destination.relatedDestinations && destination.relatedDestinations.length > 0 && (
        <RelatedDestinations places={destination.relatedDestinations} />
      )}

      <DestinationFinalCTA
        title={destination.finalCta?.title ?? `${destination.name}: sua próxima viagem começa aqui.`}
        supporting={
          destination.finalCta?.supporting ??
          "Conte para a Cays o que você deseja viver. Nós cuidamos do caminho."
        }
        ctaLabel="Planejar minha viagem"
        ctaHref={contactHref}
        note={destination.finalCta?.note ?? "Fale com um especialista da Cays"}
      />

      <PersistentMobileCTA label={`Planejar ${destination.name}`} href={contactHref} />
    </>
  );
}
