import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getExperienceBySlug, getExperienceSlugs } from "@/lib/cms";
import { ExperienceHero } from "@/components/experience/experience-hero";
import { ExperienceManifesto } from "@/components/experience/manifesto";
import { HowItWorks } from "@/components/experience/how-it-works";
import { MonthlyPicks } from "@/components/experience/monthly-picks";
import { ExperienceFeaturedDestinations } from "@/components/experience/featured-destinations";
import { Subtypes } from "@/components/experience/subtypes";
import { PartnerTypes } from "@/components/experience/partner-types";
import { ExperienceJourneys } from "@/components/experience/experience-journeys";
import { RelatedCuration } from "@/components/destination/related-curation";
import { DestinationFaq } from "@/components/destination/destination-faq";
import { DestinationFinalCTA } from "@/components/destination/destination-final-cta";
import { StickySubnav } from "@/components/ui/sticky-subnav";
import { PersistentMobileCTA } from "@/components/ui/persistent-mobile-cta";
import { siteConfig } from "@/lib/site-config";

export async function generateStaticParams() {
  const slugs = await getExperienceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/experiencias/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const experience = await getExperienceBySlug(slug);
  if (!experience) return {};

  const title = experience.seo?.title ?? `${experience.name} | Cays Turismo`;
  const description =
    experience.seo?.description ?? experience.hero.subtitle ?? `${experience.name}, com a curadoria da Cays Turismo.`;
  const canonical = `/experiencias/${experience.slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}${canonical}`,
      images: [{ url: experience.hero.image.src }],
    },
  };
}

export default async function ExperiencePage({ params }: PageProps<"/experiencias/[slug]">) {
  const { slug } = await params;
  const experience = await getExperienceBySlug(slug);
  if (!experience) notFound();

  const contactHref = `/contato?experiencia=${experience.slug}`;

  const subnavItems = [
    experience.manifesto || (experience.howItWorks && experience.howItWorks.length > 0)
      ? { id: "visao-geral", label: "Visão geral" }
      : null,
    experience.subtypes?.length ? { id: "estilos", label: "Estilos" } : null,
    experience.monthlyPicks?.length ? { id: "onde-ir", label: "Onde ir" } : null,
    experience.featuredDestinations?.length ? { id: "destinos", label: "Destinos" } : null,
    experience.journeys?.length ? { id: "viagens", label: "Viagens" } : null,
    experience.articles?.length ? { id: "curadoria", label: "Curadoria" } : null,
    experience.faq?.length ? { id: "faq", label: "FAQ" } : null,
  ].filter((item): item is { id: string; label: string } => item !== null);

  return (
    <>
      <ExperienceHero experience={experience} contactHref={contactHref} />

      <StickySubnav items={subnavItems} ctaLabel="Planejar viagem" ctaHref={contactHref} />

      {experience.manifesto && <ExperienceManifesto id="visao-geral" text={experience.manifesto} />}

      {experience.howItWorks && experience.howItWorks.length > 0 && (
        <HowItWorks id={experience.manifesto ? "como-funciona" : "visao-geral"} steps={experience.howItWorks} />
      )}

      {experience.subtypes && experience.subtypes.length > 0 && (
        <Subtypes id="estilos" items={experience.subtypes} />
      )}

      {experience.partnerTypes && experience.partnerTypes.length > 0 && (
        <PartnerTypes id="parceiros" items={experience.partnerTypes} />
      )}

      {experience.monthlyPicks && experience.monthlyPicks.length > 0 && (
        <MonthlyPicks id="onde-ir" picks={experience.monthlyPicks} />
      )}

      {experience.featuredDestinations && experience.featuredDestinations.length > 0 && (
        <ExperienceFeaturedDestinations id="destinos" items={experience.featuredDestinations} />
      )}

      {experience.journeys && experience.journeys.length > 0 && (
        <ExperienceJourneys id="viagens" items={experience.journeys} />
      )}

      {experience.articles && experience.articles.length > 0 && (
        <RelatedCuration
          id="curadoria"
          articles={experience.articles}
          allHref="/curadoria"
          heading="Curadoria relacionada"
          ctaLabel="Ver toda a curadoria"
        />
      )}

      {experience.faq && experience.faq.length > 0 && <DestinationFaq id="faq" items={experience.faq} />}

      <DestinationFinalCTA
        title={`Pronto para planejar sua ${experience.name}?`}
        supporting="Conte para a Cays o que você imagina viver. Nós cuidamos do caminho."
        ctaLabel="Planejar minha viagem"
        ctaHref={contactHref}
        note="Fale com um especialista da Cays"
      />

      <PersistentMobileCTA label={`Planejar ${experience.name}`} href={contactHref} />
    </>
  );
}
