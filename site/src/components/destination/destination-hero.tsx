import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Reveal } from "@/components/ui/reveal";
import type { DestinationDetail } from "@/types";

export function DestinationHero({ destination }: { destination: DestinationDetail }) {
  const { hero, breadcrumb, name, slug } = destination;

  return (
    <section className="relative flex min-h-[92svh] items-end overflow-hidden bg-ink">
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
        className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-ink/40"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-ink/30 via-transparent to-transparent"
      />

      <Container className="relative z-10 pb-14 md:pb-20">
        <Reveal className="max-w-2xl">
          {breadcrumb && breadcrumb.length > 0 && (
            <Breadcrumb items={breadcrumb} tone="light" className="mb-6" />
          )}

          {hero.eyebrow && (
            <p className="text-xs font-medium tracking-[0.25em] text-ivory/75 uppercase">
              {hero.eyebrow}
            </p>
          )}

          <h1 className="mt-3 font-serif text-[clamp(2.5rem,6vw,5.25rem)] leading-[1.05] text-balance text-ivory">
            {hero.title}
          </h1>

          {hero.seasonLabel && (
            <p className="mt-3 text-xs tracking-[0.15em] text-ivory/55 uppercase">{hero.seasonLabel}</p>
          )}

          {hero.subtitle && (
            <p className="mt-5 max-w-lg border-l border-ivory/25 pl-5 text-base leading-relaxed text-ivory/80">
              {hero.subtitle}
            </p>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-5">
            <Link
              href={`/contato?destino=${slug}`}
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
              Planejar viagem ao {name}
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
