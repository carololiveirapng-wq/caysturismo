import { SectionLabel } from "@/components/ui/section-label";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { manifesto } from "@/data/home";

export function Manifesto() {
  return (
    <section className="bg-ivory py-16 md:py-20">
      <Container className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-center md:gap-6">
        <div className="md:col-span-3">
          <Reveal>
            <SectionLabel>{manifesto.eyebrow}</SectionLabel>
          </Reveal>
        </div>

        <Reveal delay={0.05} className="md:col-span-5">
          <h2 className="font-serif text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.15] text-balance text-ink">
            Não começamos por um pacote.
            <br />
            Começamos <em className="italic">por você</em>.
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-4">
          <p className="text-base leading-relaxed text-stone">{manifesto.text}</p>
        </Reveal>
      </Container>
    </section>
  );
}
