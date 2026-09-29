import Link from "next/link";
import { Container } from "@/components/ui/container";
import { EditorialHeading } from "@/components/ui/editorial-heading";
import { ImageReveal } from "@/components/ui/image-reveal";
import { Reveal } from "@/components/ui/reveal";
import { destinationHref } from "@/lib/links";
import { unsplash } from "@/data/home/shared";

const items = [
  { slug: "japao", name: "Japão", image: { src: unsplash("1533105079780-92b9be482077", 900), alt: "Pagode tradicional com o Monte Fuji ao fundo" } },
  { slug: "maldivas", name: "Maldivas", image: { src: unsplash("1540202404-a2f29016b523", 900), alt: "Bangalôs sobre a água em atol nas Maldivas" } },
  { slug: "italia", name: "Itália", image: { src: unsplash("1523906834658-6e24ef2386f9", 900), alt: "Gôndola sob a Ponte Rialto em Veneza" } },
  { slug: "egito", name: "Egito", image: { src: unsplash("1539768942893-daf53e448371", 900), alt: "Caravana de camelos junto às pirâmides de Gizé ao entardecer" } },
];

export function ByDestination() {
  return (
    <section className="bg-sand py-14 md:py-20">
      <Container>
        <Reveal>
          <EditorialHeading as="h2" size="md">
            Por destino
          </EditorialHeading>
        </Reveal>

        <div className="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {items.map((item) => (
            <Link key={item.slug} href={destinationHref(item.slug)} className="group/card relative block">
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
