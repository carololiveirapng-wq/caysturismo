import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export function ExperienceManifesto({ id, text }: { id: string; text: string }) {
  return (
    <section id={id} className="scroll-mt-28 bg-ivory py-14 md:scroll-mt-32 md:py-20">
      <Container narrow>
        <Reveal>
          <p className="max-w-2xl font-serif text-2xl leading-snug text-ink md:text-3xl">{text}</p>
        </Reveal>
      </Container>
    </section>
  );
}
