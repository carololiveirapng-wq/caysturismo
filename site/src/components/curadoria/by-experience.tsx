import Link from "next/link";
import { Container } from "@/components/ui/container";
import { EditorialHeading } from "@/components/ui/editorial-heading";
import { ImageReveal } from "@/components/ui/image-reveal";
import { Reveal } from "@/components/ui/reveal";
import { experienceHref } from "@/lib/links";
import { unsplash } from "@/data/home/shared";

const items = [
  { slug: "lua-de-mel", name: "Lua de Mel", image: { src: unsplash("1519307212971-dd9561667ffb", 900), alt: "Casal em silhueta observando o pôr do sol na praia" } },
  { slug: "cruzeiros", name: "Cruzeiros", image: { src: unsplash("1548574505-5e239809ee19", 900), alt: "Navio de cruzeiro ancorado em um porto, visto do alto" } },
  { slug: "familia", name: "Família", image: { src: unsplash("1475503572774-15a45e5d60b9", 900), alt: "Família de mãos dadas caminhando à beira-mar" } },
  { slug: "grandes-eventos", name: "Grandes Eventos", image: { src: unsplash("1580657274234-7339717f4541", 900), alt: "Taças de espumante sendo servidas em uma celebração" } },
];

export function ByExperience() {
  return (
    <section className="bg-ivory py-14 md:py-20">
      <Container>
        <Reveal>
          <EditorialHeading as="h2" size="md">
            Por experiência
          </EditorialHeading>
        </Reveal>

        <div className="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {items.map((item) => (
            <Link key={item.slug} href={experienceHref(item.slug)} className="group/card relative block">
              <div className="relative aspect-[4/5] overflow-hidden">
                <ImageReveal
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="(min-width: 640px) 22vw, 45vw"
                  containerClassName="absolute inset-0"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/65 via-ink/0 to-transparent" />
                <h3 className="absolute inset-x-0 bottom-0 p-3.5 font-serif text-lg text-ivory">{item.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
