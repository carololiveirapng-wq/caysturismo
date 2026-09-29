import Link from "next/link";
import { Container } from "@/components/ui/container";
import { EditorialHeading } from "@/components/ui/editorial-heading";
import { ImageReveal } from "@/components/ui/image-reveal";
import { Reveal } from "@/components/ui/reveal";
import { unsplash } from "@/data/home/shared";

const shortcuts = [
  {
    label: "Sob medida",
    href: "/viagens?tipo=custom",
    image: { src: unsplash("1761141954458-70e87a4a8943", 900), alt: "Pagode japonês emoldurado por cerejeiras em flor" },
  },
  {
    label: "Cruzeiros",
    href: "/viagens?experiencia=cruzeiros",
    image: { src: unsplash("1548574505-5e239809ee19", 900), alt: "Navio de cruzeiro ancorado em um porto, visto do alto" },
  },
  {
    label: "Data fixa",
    href: "/viagens?tipo=fixed-date",
    image: { src: unsplash("1526481280693-3bfa7568e0f3", 900), alt: "Vila branca e azul à beira-mar em Santorini" },
  },
];

export function EditorialShortcuts() {
  return (
    <section className="bg-ivory py-14 md:py-20">
      <Container>
        <Reveal>
          <EditorialHeading as="h2" size="md">
            Comece por aqui
          </EditorialHeading>
        </Reveal>

        <div className="mt-9 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {shortcuts.map((s) => (
            <Link key={s.label} href={s.href} className="group/card relative block">
              <div className="relative aspect-[4/3] overflow-hidden">
                <ImageReveal
                  src={s.image.src}
                  alt={s.image.alt}
                  fill
                  sizes="(min-width: 640px) 30vw, 90vw"
                  containerClassName="absolute inset-0"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/0 to-transparent" />
                <h3 className="absolute inset-x-0 bottom-0 p-4 font-serif text-lg text-ivory">{s.label}</h3>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
