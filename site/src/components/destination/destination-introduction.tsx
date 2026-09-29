import { Container } from "@/components/ui/container";
import { EditorialHeading } from "@/components/ui/editorial-heading";
import { Reveal } from "@/components/ui/reveal";

export function DestinationIntroduction({
  id,
  heading,
  text,
}: {
  id: string;
  heading: string;
  /** Parágrafo principal e parágrafo de posicionamento Cays, separados por linha em branco. */
  text: string;
}) {
  const [main, positioning] = text.split("\n\n");

  return (
    <section id={id} className="scroll-mt-28 bg-ivory py-14 md:scroll-mt-32 md:py-20">
      <Container narrow>
        <Reveal>
          <EditorialHeading as="h2" size="md" className="max-w-lg">
            {heading}
          </EditorialHeading>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-stone">{main}</p>
          {positioning && (
            <p className="mt-4 max-w-md border-l border-magenta/30 pl-4 text-sm leading-relaxed text-ink/70">
              {positioning}
            </p>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
