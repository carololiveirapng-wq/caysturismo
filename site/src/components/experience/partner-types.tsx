import { Container } from "@/components/ui/container";
import { EditorialHeading } from "@/components/ui/editorial-heading";
import { Reveal } from "@/components/ui/reveal";
import type { ExperiencePartnerType } from "@/types";

export function PartnerTypes({ id, items }: { id: string; items: ExperiencePartnerType[] }) {
  if (items.length === 0) return null;

  return (
    <section id={id} className="scroll-mt-28 bg-sand py-14 md:scroll-mt-32 md:py-20">
      <Container narrow>
        <Reveal>
          <EditorialHeading as="h2" size="md">
            Companhias selecionadas
          </EditorialHeading>
          <p className="mt-2.5 max-w-lg text-sm text-stone">
            Trabalhamos com diferentes categorias de companhia, conforme o formato de cruzeiro que combina com você.
          </p>
        </Reveal>

        <div className="mt-8 divide-y divide-ink/10 border-t border-ink/10">
          {items.map((item) => (
            <div key={item.name} className="flex flex-wrap items-baseline justify-between gap-2 py-4">
              <h3 className="font-serif text-lg text-ink">{item.name}</h3>
              {item.text && <p className="text-sm text-stone">{item.text}</p>}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
