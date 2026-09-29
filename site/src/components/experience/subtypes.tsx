import { Container } from "@/components/ui/container";
import { EditorialHeading } from "@/components/ui/editorial-heading";
import { ImageReveal } from "@/components/ui/image-reveal";
import { Reveal } from "@/components/ui/reveal";
import type { ExperienceSubtype } from "@/types";

export function Subtypes({ id, items }: { id: string; items: ExperienceSubtype[] }) {
  if (items.length === 0) return null;

  return (
    <section id={id} className="scroll-mt-28 bg-ivory py-14 md:scroll-mt-32 md:py-20">
      <Container>
        <Reveal>
          <EditorialHeading as="h2" size="md">
            Qual estilo combina com vocês?
          </EditorialHeading>
        </Reveal>

        <div className="mt-9 grid grid-cols-2 gap-4 md:grid-cols-5 md:gap-5">
          {items.map((item, i) => (
            <Reveal key={item.slug} delay={i * 0.05} className="group/tile relative aspect-[3/4] overflow-hidden">
              <ImageReveal
                src={item.image.src}
                alt={item.image.alt}
                fill
                sizes="(min-width: 768px) 18vw, 45vw"
                containerClassName="absolute inset-0"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/5 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3.5">
                <h3 className="font-serif text-base text-ivory md:text-lg">{item.name}</h3>
                {item.text && <p className="mt-1 hidden text-xs leading-snug text-ivory/80 md:block">{item.text}</p>}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
