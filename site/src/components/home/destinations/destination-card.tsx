import Link from "next/link";
import { ImageReveal } from "@/components/ui/image-reveal";
import { destinationHref } from "@/lib/links";
import type { DemoImage } from "@/types";

interface DestinationCardData {
  slug: string;
  name: string;
  image: DemoImage;
  region?: string;
  shortDescription?: string;
}

export function DestinationCard({ destination }: { destination: DestinationCardData }) {
  return (
    <Link href={destinationHref(destination.slug)} className="group/card block">
      <div className="relative h-[340px] overflow-hidden md:h-[380px] lg:h-[400px]">
        <ImageReveal
          src={destination.image.src}
          alt={destination.image.alt}
          fill
          sizes="(min-width: 1024px) 264px, 55vw"
          containerClassName="absolute inset-0"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-transparent"
        />
        {destination.region && (
          <span className="absolute right-3.5 bottom-3.5 text-[0.6rem] font-medium tracking-[0.15em] text-ivory/80 uppercase">
            {destination.region}
          </span>
        )}
      </div>
      <div className="mt-3.5 border-t border-ink/10 pt-3">
        <div className="flex items-baseline justify-between">
          <h3 className="font-serif text-lg text-ink">{destination.name}</h3>
          <span
            aria-hidden
            className="text-stone transition-transform duration-300 group-hover/card:translate-x-1"
          >
            →
          </span>
        </div>
        {destination.shortDescription && (
          <p className="mt-1.5 text-sm text-stone">{destination.shortDescription}</p>
        )}
      </div>
    </Link>
  );
}
