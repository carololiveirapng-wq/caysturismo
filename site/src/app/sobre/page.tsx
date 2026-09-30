import type { Metadata } from "next";
import { ShortHero } from "@/components/ui/short-hero";
import { Story } from "@/components/about/story";
import { Philosophy } from "@/components/about/philosophy";
import { HowWeWork } from "@/components/about/how-we-work";
import { Team } from "@/components/about/team";
import { Credentials } from "@/components/about/credentials";
import { Testimonials } from "@/components/home/testimonials";
import { DestinationFinalCTA } from "@/components/destination/destination-final-cta";
import { aboutHero, aboutStory, aboutPillars, aboutTeamRoles } from "@/data/about";
import { journeyProcess } from "@/data/home/shared";
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

export default function SobrePage() {
  return (
    <>
      <ShortHero eyebrow={aboutHero.eyebrow} title={aboutHero.title} image={aboutHero.image} />

      <Story heading={aboutStory.heading} text={aboutStory.text} milestones={aboutStory.milestones} />

      <Philosophy pillars={aboutPillars} />

      <HowWeWork steps={journeyProcess} />

      <Team roles={aboutTeamRoles} />

      <Credentials />

      <Testimonials />

      <DestinationFinalCTA
        title="Quer conversar com a gente sobre sua próxima viagem?"
        supporting="Conte para a Cays o que você imagina viver. Nós cuidamos do caminho."
        ctaLabel="Planejar minha viagem"
        ctaHref="/contato"
      />
    </>
  );
}
