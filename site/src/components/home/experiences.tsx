"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { EditorialHeading } from "@/components/ui/editorial-heading";
import { LinkArrow } from "@/components/ui/link-arrow";
import { ImageReveal } from "@/components/ui/image-reveal";
import { Reveal } from "@/components/ui/reveal";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { CarouselCircleNav } from "@/components/ui/carousel-circle-nav";
import { experienceHref } from "@/lib/links";
import type { HomeFeaturedExperience } from "@/types";

function ExperienceCard({ experience }: { experience: HomeFeaturedExperience }) {
  return (
    <Link
      href={experienceHref(experience.slug)}
      className="group/card relative block size-full overflow-hidden"
    >
      <ImageReveal
        src={experience.image.src}
        alt={experience.image.alt}
        fill
        sizes="(min-width: 1024px) 34vw, 78vw"
        containerClassName="absolute inset-0"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink/65 via-ink/0 to-transparent transition-opacity duration-500 group-hover/card:from-ink/75"
      />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 md:p-6">
        <div>
          <h3 className="font-serif text-xl text-ivory md:text-2xl">{experience.name}</h3>
          {experience.shortDescription && (
            <p className="mt-1.5 max-w-[22ch] text-sm leading-snug text-ivory/80">
              {experience.shortDescription}
            </p>
          )}
        </div>
        <span
          aria-hidden
          className="flex size-8 shrink-0 items-center justify-center rounded-full border border-ivory/50 text-ivory transition-all duration-500 ease-[var(--ease-editorial)] group-hover/card:translate-x-0.5 group-hover/card:border-ivory group-hover/card:bg-ivory group-hover/card:text-ink"
        >
          ↗
        </span>
      </div>
    </Link>
  );
}

export function Experiences({ experiences }: { experiences: HomeFeaturedExperience[] }) {
  const [reducedMotion, setReducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReducedMotion(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const [autoplay] = useState(() =>
    Autoplay({
      delay: 6000,
      stopOnMouseEnter: true,
      stopOnFocusIn: true,
      stopOnInteraction: false,
      playOnInit: false,
    }),
  );
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    // A instância do plugin só fica utilizável depois que o Embla termina de
    // inicializar (é isso que `api` sinaliza) — chamar .play()/.stop() antes
    // disso quebra ("internalEngine" undefined).
    if (!api) return;
    const plugin = api.plugins().autoplay;
    if (!plugin) return;

    if (reducedMotion) {
      plugin.stop();
      return;
    }
    plugin.play();

    const onVisibility = () => {
      if (document.hidden) plugin.stop();
      else plugin.play();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [api, reducedMotion]);

  if (experiences.length === 0) return null;

  return (
    <section className="overflow-hidden bg-ivory py-24 md:py-32">
      <Carousel opts={{ align: "start", loop: true }} plugins={[autoplay]} setApi={setApi}>
        <Container>
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-14">
            <div className="lg:w-[30%] lg:shrink-0">
              <Reveal>
                <SectionLabel>Experiências</SectionLabel>
                <EditorialHeading as="h2" size="lg" className="mt-5">
                  Há muitas formas de conhecer o mundo.
                  <br />
                  Encontre a sua.
                </EditorialHeading>
                <LinkArrow href="/experiencias" className="mt-7">
                  Explorar experiências
                </LinkArrow>
              </Reveal>
            </div>

            <div className="relative flex-1">
              <CarouselContent className="-ml-5">
                {experiences.map((experience) => (
                  <CarouselItem
                    key={experience.slug}
                    className="aspect-[3/4] basis-[80%] pl-5 sm:basis-[55%] lg:basis-[34%]"
                  >
                    <ExperienceCard experience={experience} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselCircleNav tone="light" />
            </div>
          </div>
        </Container>
      </Carousel>
    </section>
  );
}
