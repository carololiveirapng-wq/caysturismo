import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ImageReveal } from "@/components/ui/image-reveal";
import { Reveal } from "@/components/ui/reveal";

/**
 * Card de destaque pra experiências/campanhas especiais que não são
 * travelProducts comuns (ex.: a landing da Explora Journeys, a página de
 * Maldivas em Lua de Mel) — nunca entram no grid genérico de viagens,
 * sempre com card próprio, claramente identificado como experiência
 * especial. A imagem é sempre um asset já existente, nunca gerado/trocado.
 */
export function SpecialExperienceSpotlight({
  href,
  image,
  imageAlt,
  eyebrow,
  title,
  description,
  ctaLabel = "Conhecer experiência",
  tone = "sand",
}: {
  href: string;
  image: string;
  imageAlt: string;
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel?: string;
  tone?: "sand" | "ivory";
}) {
  return (
    <section className={tone === "sand" ? "bg-sand py-14 md:py-20" : "bg-ivory py-14 md:py-20"}>
      <Container>
        <Reveal>
          <Link href={href} className="group/card grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
            <ImageReveal
              src={image}
              alt={imageAlt}
              width={960}
              height={640}
              sizes="(min-width: 768px) 45vw, 90vw"
              containerClassName="aspect-[4/3] md:aspect-[16/11]"
            />
            <div className="flex flex-col justify-center">
              <p className="text-xs font-medium tracking-[0.2em] text-magenta-dark uppercase">{eyebrow}</p>
              <h3 className="mt-3 font-serif text-2xl text-ink md:text-3xl">{title}</h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-stone">{description}</p>
              <span className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-medium tracking-wide text-ink transition-colors duration-300 group-hover/card:text-magenta-dark">
                <span className="relative">
                  {ctaLabel}
                  <span
                    aria-hidden
                    className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-ink transition-transform duration-500 ease-[var(--ease-editorial)] group-hover/card:scale-x-100 group-hover/card:bg-magenta-dark"
                  />
                </span>
                <ArrowRight
                  aria-hidden
                  className="size-4 shrink-0 transition-transform duration-500 ease-[var(--ease-editorial)] group-hover/card:translate-x-1"
                />
              </span>
            </div>
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
