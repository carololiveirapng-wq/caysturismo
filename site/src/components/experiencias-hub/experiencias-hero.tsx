import { ShortHero } from "@/components/ui/short-hero";
import type { HubPageContent } from "@/types";

export function ExperienciasHero({ hero }: { hero: HubPageContent["hero"] }) {
  return <ShortHero eyebrow={hero.eyebrow ?? "Experiências"} title={hero.title} subtitle={hero.text} image={hero.image} />;
}
