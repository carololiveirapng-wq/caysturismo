import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import type { HomeContent } from "@/types";

export function FinalCTA({ finalCta }: { finalCta: NonNullable<HomeContent["finalCta"]> }) {
  return (
    <section className="bg-graphite py-24 md:py-32">
      <Container className="flex flex-col items-center text-center">
        <Reveal className="flex flex-col items-center">
          {finalCta.title && (
            <h2 className="max-w-xl font-serif text-[clamp(2rem,4.2vw,3.75rem)] leading-[1.1] text-balance whitespace-pre-line text-ivory">
              {finalCta.title}
            </h2>
          )}
          {finalCta.text && (
            <p className="mt-6 max-w-md text-base leading-relaxed text-ivory/70">{finalCta.text}</p>
          )}

          <Link
            href="/contato"
            className="group/cta mt-10 inline-flex items-center gap-4 text-sm font-medium tracking-[0.08em] text-ivory uppercase"
          >
            <span className="flex size-12 items-center justify-center rounded-full border border-ivory/70 transition-colors duration-500 ease-[var(--ease-editorial)] group-hover/cta:bg-ivory">
              <span
                aria-hidden
                className="text-base text-ivory transition-colors duration-500 ease-[var(--ease-editorial)] group-hover/cta:text-ink"
              >
                ↗
              </span>
            </span>
            {finalCta.ctaLabel || "Planejar minha viagem"}
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
