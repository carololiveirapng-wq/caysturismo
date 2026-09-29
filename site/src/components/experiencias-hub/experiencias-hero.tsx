import { ShortHero } from "@/components/ui/short-hero";
import { unsplash } from "@/data/home/shared";

const heroImage = {
  src: unsplash("1531969179221-3946e6b5a5e7", 2400),
  alt: "Chá sendo servido em xícaras tradicionais japonesas, com vapor subindo",
};

export function ExperienciasHero() {
  return <ShortHero eyebrow="Experiências" title="Há muitas formas de viajar. Qual é a sua?" image={heroImage} />;
}
