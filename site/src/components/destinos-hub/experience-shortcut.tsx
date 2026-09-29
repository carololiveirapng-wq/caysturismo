import Link from "next/link";
import { Container } from "@/components/ui/container";
import { EditorialHeading } from "@/components/ui/editorial-heading";
import { LinkArrow } from "@/components/ui/link-arrow";
import { ImageReveal } from "@/components/ui/image-reveal";
import { Reveal } from "@/components/ui/reveal";
import { unsplash } from "@/data/home/shared";
import { experienceHref } from "@/lib/links";

const shortcuts = [
  {
    slug: "lua-de-mel",
    name: "Lua de Mel",
    image: { src: unsplash("1519307212971-dd9561667ffb", 1000), alt: "Casal em silhueta observando o pôr do sol na praia" },
  },
  {
    slug: "cruzeiros",
    name: "Cruzeiros",
    image: { src: unsplash("1548574505-5e239809ee19", 1000), alt: "Navio de cruzeiro ancorado em um porto, visto do alto" },
  },
];

export function ExperienceShortcut() {
  return (
    <section className="bg-sand py-14 md:py-20">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <EditorialHeading as="h2" size="md">
              Viajar por experiência
            </EditorialHeading>
          </Reveal>
          <LinkArrow href="/experiencias" className="shrink-0">
            Ver todas as experiências
          </LinkArrow>
        </div>

        <div className="mt-9 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {shortcuts.map((s) => (
            <Link key={s.slug} href={experienceHref(s.slug)} className="group/card relative block">
              <div className="relative aspect-[16/10] overflow-hidden">
                <ImageReveal
                  src={s.image.src}
                  alt={s.image.alt}
                  fill
                  sizes="(min-width: 640px) 45vw, 90vw"
                  containerClassName="absolute inset-0"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/65 via-ink/0 to-transparent" />
                <h3 className="absolute bottom-4 left-4 font-serif text-2xl text-ivory">{s.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
