import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export function DestinationFinalCTA({
  title,
  supporting,
  ctaLabel,
  ctaHref,
  note,
}: {
  title: string;
  supporting?: string;
  ctaLabel: string;
  ctaHref: string;
  /** Linha muito discreta abaixo do CTA — ex. "Atendimento personalizado". */
  note?: string;
}) {
  return (
    <section className="bg-graphite py-20 md:py-28">
      <Container className="flex flex-col items-center text-center">
        <Reveal className="flex flex-col items-center">
          <h2 className="max-w-xl font-serif text-[clamp(2rem,4.2vw,3.75rem)] leading-[1.1] text-balance text-ivory">
            {title}
          </h2>
          {supporting && (
            <p className="mt-5 max-w-md text-base leading-relaxed text-ivory/70">{supporting}</p>
          )}

          <Link
            href={ctaHref}
            className="group/cta mt-9 inline-flex items-center gap-4 text-sm font-medium tracking-[0.08em] text-ivory uppercase"
          >
            <span className="flex size-12 items-center justify-center rounded-full border border-ivory/70 transition-colors duration-500 ease-[var(--ease-editorial)] group-hover/cta:bg-ivory">
              <span
                aria-hidden
                className="text-base text-ivory transition-colors duration-500 ease-[var(--ease-editorial)] group-hover/cta:text-ink"
              >
                ↗
              </span>
            </span>
            {ctaLabel}
          </Link>

          {note && <p className="mt-4 text-xs tracking-wide text-ivory/70">{note}</p>}
        </Reveal>
      </Container>
    </section>
  );
}
