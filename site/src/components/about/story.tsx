import { Container } from "@/components/ui/container";
import { EditorialHeading } from "@/components/ui/editorial-heading";
import { Reveal } from "@/components/ui/reveal";

export function Story({
  heading,
  text,
  milestones,
}: {
  heading: string;
  text: string;
  milestones: { label: string; text: string }[];
}) {
  return (
    <section className="bg-ivory py-14 md:py-20">
      <Container narrow>
        <Reveal>
          <EditorialHeading as="h2" size="md">
            {heading}
          </EditorialHeading>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-stone">{text}</p>
        </Reveal>

        <div className="mt-9 grid grid-cols-1 gap-6 border-t border-ink/10 pt-7 sm:grid-cols-2">
          {milestones.map((milestone) => (
            <div key={milestone.label}>
              <p className="text-xs font-medium tracking-[0.15em] text-magenta uppercase">{milestone.label}</p>
              <p className="mt-2 text-sm leading-relaxed text-stone">{milestone.text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
