import { ShortHero } from "@/components/ui/short-hero";
import type { HubPageContent } from "@/types";

export function DestinosHero({ hero }: { hero: HubPageContent["hero"] }) {
  return <ShortHero eyebrow={hero.eyebrow ?? "Destinos"} title={hero.title} subtitle={hero.text} image={hero.image} />;
}
