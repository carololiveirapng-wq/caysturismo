import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

/**
 * Faixa editorial compacta para capturar intenção de contato no meio da
 * página, sem interromper a leitura com uma seção inteira. Usada no máximo
 * duas vezes (após Jornadas e após Quando ir) — nunca em toda seção.
 */
export function InlineCtaStrip({
  title,
  supporting,
  ctaLabel,
  ctaHref,
}: {
  title: string;
  supporting?: string;
  ctaLabel: string;
  ctaHref: string;
}) {
  return (
    <div className="border-y border-line bg-ivory py-7 md:py-8">
      <Container className="flex flex-wrap items-center justify-between gap-5">
        <Reveal className="max-w-lg">
          <p className="font-serif text-lg text-ink md:text-xl">{title}</p>
          {supporting && <p className="mt-1 text-sm text-stone">{supporting}</p>}
        </Reveal>
        <Link
          href={ctaHref}
          className="group/cta inline-flex shrink-0 items-center gap-2 text-sm font-medium tracking-wide text-ink transition-colors duration-300 hover:text-magenta"
        >
          {ctaLabel}
          <ArrowRight
            aria-hidden
            className="size-4 transition-transform duration-300 group-hover/cta:translate-x-1"
          />
        </Link>
      </Container>
    </div>
  );
}
