import type { Metadata } from "next";
import { ExploraHeader } from "@/components/explora-journeys/header";
import { ExploraHero } from "@/components/explora-journeys/hero";
import { ExploraThreeWays } from "@/components/explora-journeys/three-ways";
import { ExploraGrandPrixGallery } from "@/components/explora-journeys/grand-prix-gallery";
import { ExploraOnboardExperience } from "@/components/explora-journeys/onboard-experience";
import { ExploraShip } from "@/components/explora-journeys/ship";
import { ExploraSuites } from "@/components/explora-journeys/suites";
import { ExploraInclusions } from "@/components/explora-journeys/inclusions";
import { ExploraTransfers } from "@/components/explora-journeys/transfers";
import { ExploraFinalCta } from "@/components/explora-journeys/final-cta";
import { ExploraFooter } from "@/components/explora-journeys/footer";
import { siteConfig } from "@/lib/site-config";

const title = "Explora I no Grande Prêmio de Mônaco 2027 · Explora Journeys Brasil";
const description =
  "Explora I no Grande Prêmio de Mônaco 2027 · Explora Journeys Brasil. Atracado no Porto Hercule de 2 a 7 de junho de 2027, a 150 metros do F1 Paddock Club.";
const ogImage =
  "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/lovp_57yd1xrwbg82pt9ec6ax7nh01a/5d61b81784d496b1b440186b25fa9320_1789680521826.png";
const path = "/experiencias/cruzeiros/explora-journeys";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: {
    type: "website",
    title,
    description,
    url: `${siteConfig.url}${path}`,
    siteName: "Cays Turismo",
    images: [{ url: ogImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Explora I no Grande Prêmio de Mônaco 2027",
    description: "Mônaco no seu terraço. EXPLORA I no Porto Hercule, 2 a 7 de junho de 2027.",
    images: [ogImage],
  },
};

/**
 * Clone 1:1 da landing que a Explora Journeys publicou em parceria com a
 * Cays (explorajourneysbrasil.com.br/cays-turismo) para o Grande Prêmio de
 * Mônaco 2027 — layout, textos, imagens e CTAs do original preservados.
 * Página de campanha autocontida: chrome próprio (ver layout.tsx da
 * (explora) route group), sem Header/Footer/WhatsApp da Cays.
 */
export default function ExploraJourneysPage() {
  return (
    <>
      <ExploraHeader />
      <ExploraHero />
      <ExploraThreeWays />
      <ExploraGrandPrixGallery />
      <ExploraOnboardExperience />
      <ExploraShip />
      <ExploraSuites />
      <ExploraInclusions />
      <ExploraTransfers />
      <ExploraFinalCta />
      <ExploraFooter />
    </>
  );
}
