import Link from "next/link";
import { ImageReveal } from "@/components/ui/image-reveal";
import type { MockJourney } from "@/types";

interface DiscoveryResultsProps {
  journeys: MockJourney[];
}

export function DiscoveryResults({ journeys }: DiscoveryResultsProps) {
  return (
    <div className="pt-12 md:pt-16">
      <p className="text-xs font-medium tracking-[0.2em] text-stone uppercase">
        Selecionados para você
      </p>

      <div className="mt-7 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
        {journeys.map((journey) => (
          <Link key={journey.slug} href={`/jornadas/${journey.slug}`} className="group/card block">
            <ImageReveal
              src={journey.image.src}
              alt={journey.image.alt}
              width={640}
              height={800}
              sizes="(min-width: 768px) 30vw, 90vw"
              containerClassName="aspect-[4/5]"
            />
            <div className="mt-4">
              <p className="text-[0.65rem] font-medium tracking-[0.18em] text-stone uppercase">
                {journey.destinationName}
              </p>
              <h3 className="mt-2 font-serif text-xl text-ink">{journey.title}</h3>
              <p className="mt-1.5 text-xs text-stone">
                {journey.experienceName} · {journey.period}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-stone">{journey.summary}</p>
              <span className="group/arrow mt-4 inline-flex items-center gap-2 text-sm font-medium tracking-wide text-ink">
                <span className="relative">
                  Conhecer
                  <span
                    aria-hidden
                    className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-ink transition-transform duration-500 ease-[var(--ease-editorial)] group-hover/card:scale-x-100"
                  />
                </span>
                <span
                  aria-hidden
                  className="transition-transform duration-500 ease-[var(--ease-editorial)] group-hover/card:translate-x-1"
                >
                  →
                </span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
