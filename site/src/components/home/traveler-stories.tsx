import Image from "next/image";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { EditorialHeading } from "@/components/ui/editorial-heading";
import { Reveal } from "@/components/ui/reveal";
import type { HomeTravelerStory } from "@/types";

export function TravelerStories({ stories }: { stories: HomeTravelerStory[] }) {
  if (stories.length === 0) return null;

  return (
    <section className="bg-sand py-16 md:py-20">
      <Container>
        <Reveal className="max-w-md">
          <SectionLabel>Quem viajou com a Cays</SectionLabel>
          <EditorialHeading as="h2" size="md" className="mt-4">
            Histórias de viajantes.
          </EditorialHeading>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:mt-12 lg:grid-cols-3">
          {stories.map((story, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={story.image.src}
                  alt={story.image.alt}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                  className="object-cover"
                />
              </div>
              <p className="mt-3.5 text-sm leading-relaxed text-stone">{story.caption}</p>
              {(story.clientName || story.destinationName) && (
                <p className="mt-1 text-xs text-stone/85">
                  {[story.clientName, story.destinationName].filter(Boolean).join(" — ")}
                </p>
              )}
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
