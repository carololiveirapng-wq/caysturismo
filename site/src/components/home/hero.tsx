import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import type { HomeContent } from "@/types";

export function Hero({ hero }: { hero: HomeContent["hero"] }) {
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink">
      <Image
        src={hero.image.src}
        alt={hero.image.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/15 to-ink/35"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-ink/30 via-transparent to-transparent"
      />

      <Container className="relative z-10 pb-16 md:pb-24">
        <Reveal className="max-w-xl">
          <h1 className="font-serif text-[clamp(2.375rem,5.6vw,5rem)] leading-[1.08] text-balance whitespace-pre-line text-ivory">
            {hero.title}
          </h1>

          {hero.text && (
            <p className="mt-4 max-w-[26rem] border-l border-ivory/25 pl-5 text-base leading-relaxed whitespace-pre-line text-ivory/80">
              {hero.text}
            </p>
          )}

          <div className="mt-7 flex flex-wrap items-center gap-x-10 gap-y-5">
            <Link
              href={hero.ctaHref || "/contato"}
              className="group/cta inline-flex items-center gap-4 text-sm font-medium tracking-[0.08em] text-ivory uppercase"
            >
              <span className="flex size-12 items-center justify-center rounded-full border border-ivory/70 transition-colors duration-500 ease-[var(--ease-editorial)] group-hover/cta:bg-ivory">
                <span
                  aria-hidden
                  className="text-base text-ivory transition-colors duration-500 ease-[var(--ease-editorial)] group-hover/cta:text-ink"
                >
                  ↗
                </span>
              </span>
              {hero.ctaLabel || "Comece sua jornada"}
            </Link>
            <Link
              href="/sobre"
              className="group/link inline-flex items-center gap-2 text-sm font-medium tracking-wide text-ivory/85"
            >
              <span className="relative">
                Conheça a Cays
                <span
                  aria-hidden
                  className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-ivory/70 transition-transform duration-500 ease-[var(--ease-editorial)] group-hover/link:scale-x-100"
                />
              </span>
            </Link>
          </div>
        </Reveal>
      </Container>

      <div
        aria-hidden
        className="absolute bottom-10 left-1/2 z-10 hidden -translate-x-1/2 md:block"
      >
        <span className="relative block h-10 w-px overflow-hidden bg-ivory/25">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollLine_2.2s_ease-in-out_infinite] bg-ivory/70" />
        </span>
      </div>
    </section>
  );
}
