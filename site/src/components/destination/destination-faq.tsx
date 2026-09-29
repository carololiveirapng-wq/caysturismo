import { Container } from "@/components/ui/container";
import { EditorialHeading } from "@/components/ui/editorial-heading";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { Reveal } from "@/components/ui/reveal";
import type { DestinationFaqItem } from "@/types";

export function DestinationFaq({ id, items }: { id: string; items: DestinationFaqItem[] }) {
  if (items.length === 0) return null;

  return (
    <section id={id} className="scroll-mt-28 bg-ivory py-14 md:scroll-mt-32 md:py-18">
      <Container narrow>
        <Reveal>
          <EditorialHeading as="h2" size="md">
            Perguntas frequentes
          </EditorialHeading>
        </Reveal>
        <div className="mt-7 md:mt-8">
          <FaqAccordion items={items} />
        </div>
      </Container>
    </section>
  );
}
