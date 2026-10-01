import Image from "next/image";
import { LinkArrow } from "@/components/ui/link-arrow";
import { Reveal } from "@/components/ui/reveal";
import { travelProductHref } from "@/lib/links";
import type { HomeFeaturedTravelProduct } from "@/types";

export function FeaturedJourney({ travelProducts }: { travelProducts: HomeFeaturedTravelProduct[] }) {
  const journey = travelProducts[0];
  if (!journey) return null;

  return (
    <section className="bg-graphite md:flex md:min-h-[70svh]">
      <div className="relative h-[42svh] bg-graphite md:h-auto md:w-3/5">
        <Image
          src={journey.image.src}
          alt={journey.image.alt}
          fill
          sizes="(min-width: 768px) 60vw, 100vw"
          className="object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-graphite/50 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-graphite/30"
        />
      </div>

      <div className="flex flex-col justify-center px-6 py-14 md:w-2/5 md:px-12 lg:px-16">
        <Reveal className="max-w-md">
          {journey.eyebrow && (
            <div className="flex items-center gap-4">
              <span aria-hidden className="h-px w-10 bg-ivory/40" />
              <p className="text-xs font-medium tracking-[0.3em] text-ivory/70 uppercase">
                {journey.eyebrow}
              </p>
            </div>
          )}
          <h2 className="mt-6 font-serif text-[clamp(2rem,3.4vw,3.25rem)] leading-[1.1] text-balance text-ivory">
            {journey.title}
          </h2>
          {journey.subtitle && (
            <p className="mt-5 text-base leading-relaxed text-ivory/70">{journey.subtitle}</p>
          )}
          <LinkArrow href={travelProductHref(journey.slug)} tone="ivory" className="mt-8">
            Conhecer
          </LinkArrow>
        </Reveal>
      </div>
    </section>
  );
}
