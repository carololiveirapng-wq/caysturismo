import type { Metadata } from "next";
import { ShortHero } from "@/components/ui/short-hero";
import { Story } from "@/components/about/story";
import { Philosophy } from "@/components/about/philosophy";
import { HowWeWork } from "@/components/about/how-we-work";
import { Team } from "@/components/about/team";
import { Credentials } from "@/components/about/credentials";
import { Positioning } from "@/components/home/positioning";
import { Testimonials } from "@/components/home/testimonials";
import { DestinationFinalCTA } from "@/components/destination/destination-final-cta";
import { aboutHero, aboutStory, aboutMilestones, aboutPillars, aboutTeamRoles } from "@/data/about";
import { getHome, getSettings, getPeople, getTestimonials } from "@/lib/cms";
import { siteConfig } from "@/lib/site-config";

const title = "Sobre a Cays | Cays Turismo";
const description = "Conheça a filosofia por trás da curadoria de viagens da Cays Turismo — escuta, curadoria e cuidado em cada roteiro.";

export const metadata: Metadata = {
  // `title` já vem completo (com "Cays Turismo" no fim) — absolute evita
  // que o template do layout raiz ("%s | Cays Turismo") duplique o nome.
  title: { absolute: title },
  description,
  alternates: { canonical: "/sobre" },
  openGraph: { title, description, url: `${siteConfig.url}/sobre` },
};

export default async function SobrePage() {
  const [home, settings, people, testimonials] = await Promise.all([
    getHome(),
    getSettings(),
    getPeople(),
    getTestimonials(),
  ]);

  const foundedYear = settings.foundedDate ? new Date(settings.foundedDate).getFullYear() : undefined;
  const milestones = foundedYear
    ? [{ label: String(foundedYear), text: "O começo." }, ...aboutMilestones]
    : aboutMilestones;

  return (
    <>
      <ShortHero eyebrow={aboutHero.eyebrow} title={aboutHero.title} image={aboutHero.image} />

      <Story heading={aboutStory.heading} text={aboutStory.text} milestones={milestones} />

      {settings.slogan && (
        <Positioning slogan={settings.slogan} foundedYear={foundedYear} positioning={home?.positioning} />
      )}

      <Philosophy pillars={aboutPillars} />

      {home?.process?.steps && home.process.steps.length > 0 && <HowWeWork steps={home.process.steps} />}

      <Team people={people} fallbackRoles={aboutTeamRoles} />

      <Credentials />

      {testimonials.length > 0 && <Testimonials reviews={testimonials} />}

      <DestinationFinalCTA
        title="Quer conversar com a gente sobre sua próxima viagem?"
        supporting="Conte para a Cays o que você imagina viver. Nós cuidamos do caminho."
        ctaLabel="Planejar minha viagem"
        ctaHref="/contato"
      />
    </>
  );
}
