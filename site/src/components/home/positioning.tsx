import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import type { HomeContent } from "@/types";

interface PositioningProps {
  slogan: string;
  foundedYear?: number;
  positioning?: HomeContent["positioning"];
}

export function Positioning({ slogan, foundedYear, positioning }: PositioningProps) {
  if (!slogan) return null;

  return (
    <section className="bg-ink py-20 md:py-28">
      <Container className="flex flex-col items-center text-center">
        <Reveal className="flex flex-col items-center">
          {(positioning?.heading || foundedYear) && (
            <p className="text-xs font-medium tracking-[0.3em] text-ivory/60 uppercase">
              {positioning?.heading || (foundedYear && `Desde ${foundedYear}`)}
            </p>
          )}
          <h2 className="mt-5 max-w-2xl font-serif text-[clamp(1.75rem,3.6vw,3rem)] leading-[1.15] text-balance text-ivory">
            {slogan}
          </h2>
          {positioning?.heading && foundedYear && (
            <p className="mt-2 text-xs font-medium tracking-[0.3em] text-ivory/60 uppercase">
              Desde {foundedYear}
            </p>
          )}
          {positioning?.text && (
            <p className="mt-6 max-w-lg text-base leading-relaxed text-ivory/70">
              {positioning.text}
            </p>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
