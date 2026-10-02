import { Container } from "@/components/ui/container";
import { EditorialHeading } from "@/components/ui/editorial-heading";
import { ImageReveal } from "@/components/ui/image-reveal";
import { Reveal } from "@/components/ui/reveal";
import type { DestinationDetail } from "@/types";

export function WhyCays({
  id,
  data,
}: {
  id: string;
  data: NonNullable<DestinationDetail["whyCays"]>;
}) {
  return (
    <section id={id} className="scroll-mt-28 bg-ivory py-14 md:scroll-mt-32 md:py-20">
      <Container className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-5">
          <ImageReveal
            src={data.image.src}
            alt={data.image.alt}
            width={900}
            height={1100}
            sizes="(min-width: 1024px) 38vw, 90vw"
            containerClassName="aspect-[4/5]"
          />
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal>
            <EditorialHeading as="h2" size="md" className="max-w-md">
              {data.heading}
            </EditorialHeading>
          </Reveal>

          <div className="mt-8 divide-y divide-ink/10 border-t border-ink/10">
            {data.items.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08} className="flex gap-6 py-5">
                <span className="shrink-0 text-xs text-stone/85 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-serif text-lg text-ink md:text-xl">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-stone">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
