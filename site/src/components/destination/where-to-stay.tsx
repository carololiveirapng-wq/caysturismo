import { Container } from "@/components/ui/container";
import { EditorialHeading } from "@/components/ui/editorial-heading";
import { ImageReveal } from "@/components/ui/image-reveal";
import { Reveal } from "@/components/ui/reveal";
import { LinkArrow } from "@/components/ui/link-arrow";
import type { DestinationStay } from "@/types";
import { cn } from "@/lib/utils";

function StayCard({
  stay,
  contactHref,
  aspect,
  emphasize,
}: {
  stay: DestinationStay;
  contactHref: string;
  aspect: string;
  emphasize?: boolean;
}) {
  return (
    <div>
      <ImageReveal
        src={stay.image.src}
        alt={stay.image.alt}
        width={emphasize ? 900 : 640}
        height={emphasize ? 1080 : 480}
        sizes={emphasize ? "(min-width: 768px) 40vw, 90vw" : "(min-width: 768px) 32vw, 90vw"}
        containerClassName={aspect}
      />
      <div className="mt-4 border-t border-ink/10 pt-4">
        <h3 className={cn("font-serif text-ink", emphasize ? "text-2xl" : "text-xl")}>{stay.name}</h3>
        {stay.region && <p className="mt-1 text-xs tracking-wide text-stone uppercase">{stay.region}</p>}
        {stay.text && <p className="mt-2.5 text-sm leading-relaxed text-stone">{stay.text}</p>}
        <LinkArrow href={contactHref} className="mt-3.5 text-xs">
          Conhecer
        </LinkArrow>
      </div>
    </div>
  );
}

export function WhereToStay({
  id,
  stays,
  contactHref,
}: {
  id: string;
  stays: DestinationStay[];
  contactHref: string;
}) {
  if (stays.length === 0) return null;

  const [main, ...rest] = stays;

  return (
    <section id={id} className="scroll-mt-28 bg-ivory py-14 md:scroll-mt-32 md:py-20">
      <Container>
        <Reveal>
          <EditorialHeading as="h2" size="md">
            Onde ficar
          </EditorialHeading>
        </Reveal>

        <div className="mt-9 grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-6">
          <Reveal className="md:col-span-7">
            <StayCard stay={main} contactHref={contactHref} aspect="aspect-[4/5]" emphasize />
          </Reveal>

          {rest.length > 0 && (
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:col-span-5 md:grid-cols-1 md:gap-10">
              {rest.map((stay, i) => (
                <Reveal key={stay.name} delay={0.08 * (i + 1)}>
                  <StayCard stay={stay} contactHref={contactHref} aspect="aspect-[16/11]" />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
