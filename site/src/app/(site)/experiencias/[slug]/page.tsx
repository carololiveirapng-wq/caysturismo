import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getExperienceBySlug, getExperienceSlugs, getSettings } from "@/lib/cms";
import { ExperienceHero } from "@/components/experience/experience-hero";
import { TravelPlanningPanel, type TravelPlanningItem } from "@/components/commercial/travel-planning-panel";
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
import { SpecialExperienceSpotlight } from "@/components/experience/special-experience-spotlight";
import { siteConfig } from "@/lib/site-config";
import { TravelerStories } from "@/components/experiencias/traveler-stories";
import { breadcrumbJsonLd } from "@/lib/seo/structured-data";
import { jsonLdString } from "@/lib/json-ld";

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
    // `title` já vem completo (com "Cays Turismo" no fim) — absolute evita
    // que o template do layout raiz ("%s | Cays Turismo") duplique o nome.
    title: { absolute: title },
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

/** Destination Wedding tem logística própria (convidados, cerimônia) — os outros estilos usam o mesmo conjunto genérico e honesto. */
function planningItems(experience: { slug: string }): TravelPlanningItem[] {
  if (experience.slug === "destination-wedding") {
    return [
      { label: "Destino", value: "Personalizado" },
      { label: "Convidados", value: "Logística pensada para quem vai celebrar com vocês" },
      { label: "Planejamento", value: "Cuidamos de cada detalhe, do início ao grande dia" },
      { label: "Investimento", value: "Sob consulta" },
    ];
  }
  return [
    { label: "Destino", value: "Personalizado" },
    { label: "Período", value: "Quando você quiser viajar" },
    { label: "Duração", value: "Sob medida" },
    { label: "Investimento", value: "Sob consulta" },
  ];
}

export default async function ExperiencePage({ params }: PageProps<"/experiencias/[slug]">) {
  const { slug } = await params;
  const [experience, { whatsappHref }] = await Promise.all([getExperienceBySlug(slug), getSettings()]);
  if (!experience) notFound();

  const contactHref = `/contato?experiencia=${experience.slug}`;

  // "Ideal para" só com dado real: nomes dos estilos (`subtypes`) já
  // cadastrados pra essa experiência — nunca uma tag inventada.
  const planningTags = experience.subtypes?.slice(0, 4).map((s) => s.name);

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdString(breadcrumbJsonLd([{ name: "Experiências", href: "/experiencias" }, { name: experience.name, href: `/experiencias/${experience.slug}` }])),
        }}
      />
      <ExperienceHero experience={experience} contactHref={contactHref} />

      <TravelPlanningPanel
        title={`${experience.name} sob medida`}
        subtitle="Destino, hospedagem, experiências e ritmo pensados para o seu jeito de viajar."
        tags={planningTags}
        items={planningItems(experience)}
        ctaLabel="Planejar esta viagem"
        ctaHref={contactHref}
        whatsappHref={whatsappHref}
      />

      <StickySubnav items={subnavItems} ctaLabel="Planejar viagem" ctaHref={contactHref} />

      {experience.slug === "cruzeiros" && (
        <SpecialExperienceSpotlight
          href="/experiencias/cruzeiros/explora-journeys"
          image="/explora-journeys/grandstand.jpg"
          imageAlt="Navio Explora I atracado em Mônaco durante o Grande Prêmio de Fórmula 1"
          eyebrow="Experiência especial · Em parceria com a Explora Journeys"
          title="Grande Prêmio de Mônaco 2027"
          description="O Explora I atracado no Porto Hercule, a 150 metros do F1 Paddock Club — o fim de semana de corrida vivido a bordo, do primeiro ao último dia."
        />
      )}

      {experience.slug === "lua-de-mel" && (
        <SpecialExperienceSpotlight
          href="/experiencias/lua-de-mel/maldivas"
          image="/maldivas-lua-de-mel/romance-1.webp"
          imageAlt="Casal de noivos em um deck de madeira entre bangalôs sobre o mar, nas Maldivas, ao pôr do sol"
          eyebrow="Experiência especial · Lua de mel"
          title="Maldivas: a lua de mel mais desejada do mundo"
          description="Bangalôs sobre o mar, água cristalina e a privacidade de um dos destinos mais exclusivos do planeta — vivido a dois."
        />
      )}

      {experience.manifesto && <ExperienceManifesto id="visao-geral" text={experience.manifesto} />}

      {experience.howItWorks && experience.howItWorks.length > 0 && (
        <HowItWorks id={experience.manifesto ? "como-funciona" : "visao-geral"} steps={experience.howItWorks} />
      )}

      {experience.subtypes && experience.subtypes.length > 0 && (
        <Subtypes id="estilos" items={experience.subtypes} heading={experience.subtypesHeading} experienceSlug={experience.slug} />
      )}

      {experience.partnerTypes && experience.partnerTypes.length > 0 && (
        <PartnerTypes
          id="parceiros"
          items={experience.partnerTypes}
          heading={experience.partnerTypesHeading}
          text={experience.partnerTypesText}
        />
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

      {experience.slug === "destination-wedding" && <TravelerStories />}

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
        title={experience.finalCta?.title ?? "Pronto para planejar a sua viagem?"}
        supporting={
          experience.finalCta?.supporting ??
          "Conte para a Cays o que você imagina viver. Nós cuidamos do caminho."
        }
        ctaLabel="Planejar minha viagem"
        ctaHref={contactHref}
        note={experience.finalCta?.note ?? "Fale com um especialista da Cays"}
      />

      <PersistentMobileCTA label={`Planejar ${experience.name}`} href={contactHref} />
    </>
  );
}
