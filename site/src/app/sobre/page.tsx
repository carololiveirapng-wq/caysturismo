import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ShortHero } from "@/components/ui/short-hero";
import { Story } from "@/components/about/story";
import { Philosophy } from "@/components/about/philosophy";
import { HowWeWork } from "@/components/about/how-we-work";
import { Team } from "@/components/about/team";
import { Credentials } from "@/components/about/credentials";
import { Positioning } from "@/components/home/positioning";
import { Testimonials } from "@/components/home/testimonials";
import { DestinationFinalCTA } from "@/components/destination/destination-final-cta";
import { aboutTeamRoles } from "@/data/about";
import { getAboutPage, getHome, getSettings, getPeople, getTestimonials } from "@/lib/cms";
import { siteConfig } from "@/lib/site-config";

const fallbackTitle = "Sobre a Cays | Cays Turismo";
const fallbackDescription = "Conheça a filosofia por trás da curadoria de viagens da Cays Turismo — escuta, curadoria e cuidado em cada roteiro.";

export async function generateMetadata(): Promise<Metadata> {
  const about = await getAboutPage();
  const title = about?.seo?.title || fallbackTitle;
  const description = about?.seo?.description || fallbackDescription;
  return {
    // `title` já vem completo (com "Cays Turismo" no fim) — absolute evita
    // que o template do layout raiz ("%s | Cays Turismo") duplique o nome.
    title: { absolute: title },
    description,
    alternates: { canonical: "/sobre" },
    openGraph: { title, description, url: `${siteConfig.url}/sobre` },
  };
}

export default async function SobrePage() {
  const [about, home, settings, people, testimonials] = await Promise.all([
    getAboutPage(),
    getHome(),
    getSettings(),
    getPeople(),
    getTestimonials(),
  ]);
  if (!about) notFound();

  const foundedYear = settings.foundedDate ? new Date(settings.foundedDate).getFullYear() : undefined;
  const timeline = about.history?.timeline ?? [];

  return (
    <>
      <ShortHero
        eyebrow={about.hero.eyebrow ?? "Sobre a Cays"}
        title={about.hero.title}
        subtitle={about.hero.text}
        image={about.hero.image}
      />

      <Story heading={about.history?.title} text={about.history?.text} timeline={timeline} />

      {settings.slogan && (
        <Positioning
          slogan={settings.slogan}
          foundedYear={foundedYear}
          positioning={{ heading: about.positioning?.title, text: about.positioning?.text }}
        />
      )}

      {about.pillars.length > 0 && (
        <Philosophy
          title={about.philosophy?.title}
          text={about.philosophy?.text}
          pillars={about.pillars.map((p) => ({ title: p.title, text: p.description ?? "" }))}
        />
      )}

      {home?.process?.steps && home.process.steps.length > 0 && <HowWeWork steps={home.process.steps} />}

      <Team people={people} fallbackRoles={aboutTeamRoles} />

      <Credentials />

      {testimonials.length > 0 && <Testimonials reviews={testimonials} />}

      {about.finalCta && (
        <DestinationFinalCTA
          title={about.finalCta.title ?? ""}
          supporting={about.finalCta.text ?? ""}
          ctaLabel={about.finalCta.ctaLabel || "Planejar minha viagem"}
          ctaHref="/contato"
        />
      )}
    </>
  );
}
