import { Container } from "@/components/ui/container";
import { EditorialHeading } from "@/components/ui/editorial-heading";
import { Reveal } from "@/components/ui/reveal";

export function ProductOverview({ id, text }: { id: string; text: string }) {
  return (
    <section id={id} className="scroll-mt-28 bg-ivory py-14 md:scroll-mt-32 md:py-20">
      <Container narrow>
        <Reveal>
          <EditorialHeading as="h2" size="md">
            Visão geral
          </EditorialHeading>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-stone">{text}</p>
        </Reveal>
      </Container>
    </section>
  );
}
