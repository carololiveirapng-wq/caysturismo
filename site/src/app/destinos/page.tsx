import type { Metadata } from "next";
import { DestinosHero } from "@/components/destinos-hub/destinos-hero";
import { DestinosTabs } from "@/components/destinos-hub/destinos-tabs";
import { FeaturedDestinations } from "@/components/destinos-hub/featured-destinations";
import { WhereToGoNow } from "@/components/destinos-hub/where-to-go-now";
import { ExperienceShortcut } from "@/components/destinos-hub/experience-shortcut";
import { DestinationFinalCTA } from "@/components/destination/destination-final-cta";
import { siteConfig } from "@/lib/site-config";

const title = "Destinos | Cays Turismo";
const description =
  "Explore os destinos da curadoria Cays Turismo por continente ou em ordem alfabética, e descubra para onde ir em cada época do ano.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/destinos" },
  openGraph: { title, description, url: `${siteConfig.url}/destinos` },
};

export default function DestinosHubPage() {
  return (
    <>
      <DestinosHero />
      <DestinosTabs />
      <FeaturedDestinations />
      <WhereToGoNow />
      <ExperienceShortcut />
      <DestinationFinalCTA
        title="Ainda não sabe para onde ir?"
        supporting="Conte para a Cays o que você quer viver. A gente ajuda a decidir o destino."
        ctaLabel="Planejar minha viagem"
        ctaHref="/contato"
      />
    </>
  );
}
