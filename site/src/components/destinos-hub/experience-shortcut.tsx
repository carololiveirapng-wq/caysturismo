import Link from "next/link";
import { Container } from "@/components/ui/container";
import { EditorialHeading } from "@/components/ui/editorial-heading";
import { LinkArrow } from "@/components/ui/link-arrow";
import { ImageReveal } from "@/components/ui/image-reveal";
import { Reveal } from "@/components/ui/reveal";
import { experienceHref } from "@/lib/links";
import type { HubSpotlightItem } from "@/types";

export function ExperienceShortcut({ experiences }: { experiences: HubSpotlightItem[] }) {
  if (experiences.length === 0) return null;

  return (
    <section className="bg-sand py-14 md:py-20">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <EditorialHeading as="h2" size="md">
              Viajar por experiência
            </EditorialHeading>
          </Reveal>
          <LinkArrow href="/experiencias" className="shrink-0">
            Ver todas as experiências
          </LinkArrow>
        </div>

        <div className="mt-9 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {experiences.map((s) => (
            <Link key={s.slug} href={experienceHref(s.slug)} className="group/card relative block">
              <div className="relative aspect-[16/10] overflow-hidden">
                <ImageReveal
                  src={s.image.src}
                  alt={s.image.alt}
                  fill
                  sizes="(min-width: 640px) 45vw, 90vw"
                  containerClassName="absolute inset-0"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/65 via-ink/0 to-transparent" />
                <h3 className="absolute bottom-4 left-4 font-serif text-2xl text-ivory">{s.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
