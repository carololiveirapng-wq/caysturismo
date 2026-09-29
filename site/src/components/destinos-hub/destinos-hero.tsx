import { ShortHero } from "@/components/ui/short-hero";
import { heroImage } from "@/data/home";

export function DestinosHero() {
  return <ShortHero eyebrow="Destinos" title="Para onde a Cays pode levar você." image={heroImage} />;
}
