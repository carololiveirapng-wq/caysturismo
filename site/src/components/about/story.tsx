import { Container } from "@/components/ui/container";
import { EditorialHeading } from "@/components/ui/editorial-heading";
import { Reveal } from "@/components/ui/reveal";
import type { AboutTimelineEntry } from "@/types";

export function Story({
  heading,
  text,
  timeline,
}: {
  heading?: string;
  text?: string;
  timeline: AboutTimelineEntry[];
}) {
  return (
    <section className="bg-ivory py-14 md:py-20">
      <Container narrow>
        <Reveal>
          {heading && (
            <EditorialHeading as="h2" size="md">
              {heading}
            </EditorialHeading>
          )}
          {text && <p className="mt-5 max-w-xl text-base leading-relaxed text-stone">{text}</p>}
        </Reveal>

        {timeline.length > 0 && (
          <div className="mt-9 grid grid-cols-1 gap-6 border-t border-ink/10 pt-7 sm:grid-cols-2">
            {timeline.map((entry, i) => (
              <div key={i}>
                <p className="text-xs font-medium tracking-[0.15em] text-magenta uppercase">
                  {entry.year ?? entry.label ?? entry.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-stone">
                  {entry.year && entry.label ? `${entry.label} — ` : ""}
                  {entry.text || entry.title}
                </p>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
