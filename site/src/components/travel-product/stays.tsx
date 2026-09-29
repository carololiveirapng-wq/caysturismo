import { Container } from "@/components/ui/container";
import { EditorialHeading } from "@/components/ui/editorial-heading";
import { ImageReveal } from "@/components/ui/image-reveal";
import { Reveal } from "@/components/ui/reveal";
import type { TravelProductStay } from "@/types";

interface ProductStaysProps {
  id: string;
  /** Sob medida: hotéis/ryokans com imagem. */
  stays?: TravelProductStay[];
  /** Cruzeiro: categorias de cabine — sem imagem, sem preço inventado. */
  cabinCategories?: { name: string; text?: string }[];
}

export function ProductStays({ id, stays, cabinCategories }: ProductStaysProps) {
  const hasStays = stays && stays.length > 0;
  const hasCabins = cabinCategories && cabinCategories.length > 0;
  if (!hasStays && !hasCabins) return null;

  return (
    <section id={id} className="scroll-mt-28 bg-sand py-14 md:scroll-mt-32 md:py-20">
      <Container>
        <Reveal>
          <EditorialHeading as="h2" size="md">
            {hasStays ? "Onde ficar" : "Categorias de cabine"}
          </EditorialHeading>
        </Reveal>

        {hasStays && (
          <div className="mt-9 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {stays!.map((stay) => (
              <div key={stay.name}>
                <ImageReveal
                  src={stay.image.src}
                  alt={stay.image.alt}
                  width={640}
                  height={480}
                  sizes="(min-width: 640px) 30vw, 90vw"
                  containerClassName="aspect-[4/3]"
                />
                <div className="mt-3.5 border-t border-ink/10 pt-3.5">
                  <h3 className="font-serif text-xl text-ink">{stay.name}</h3>
                  {stay.region && <p className="mt-1 text-xs tracking-wide text-stone uppercase">{stay.region}</p>}
                  {stay.text && <p className="mt-2 text-sm leading-relaxed text-stone">{stay.text}</p>}
                </div>
              </div>
            ))}
          </div>
        )}

        {hasCabins && (
          <div className="mt-9 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {cabinCategories!.map((cabin, i) => (
              <div key={cabin.name} className="border-t border-ink/10 pt-5">
                <span className="text-xs text-stone/70 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-1.5 font-serif text-xl text-ink">{cabin.name}</h3>
                {cabin.text && <p className="mt-2 text-sm leading-relaxed text-stone">{cabin.text}</p>}
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
