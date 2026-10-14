import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import type { DemoImage } from "@/types";

/** Hero curto reutilizado pelos hubs (Destinos, Experiências, Curadoria) e por Sobre. */
export function ShortHero({
  eyebrow,
  title,
  subtitle,
  image,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  image?: DemoImage;
}) {
  return (
    <section className="relative flex min-h-[max(380px,52vh)] items-end overflow-hidden bg-ink md:min-h-[58vh]">
      {image && <Image src={image.src} alt={image.alt} fill priority sizes="100vw" className="object-cover" />}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/15 to-ink/30" />
      {/*
        pt-* reserva o espaço do header fixo/transparente (h-20 md:h-24)
        mais uma folga — sem isso, títulos longos (que crescem pra cima
        nesse bloco ancorado embaixo) colidiam com a logo/menu em janelas
        largas e baixas (ex.: 1280x900). min-h na section (acima) garante
        que a section cresce se o conteúdo não couber, em vez de cortar.
      */}
      <Container className="relative z-10 pt-28 pb-12 md:pt-36 md:pb-16">
        <Reveal className="max-w-xl">
          <p className="text-xs font-medium tracking-[0.25em] text-ivory/75 uppercase">{eyebrow}</p>
          <h1 className="mt-3 font-serif text-[clamp(2.25rem,5vw,4rem)] leading-[1.05] text-balance text-ivory">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 max-w-md text-base leading-relaxed text-ivory/75">{subtitle}</p>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
