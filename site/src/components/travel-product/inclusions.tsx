import { Check, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { EditorialHeading } from "@/components/ui/editorial-heading";
import { Reveal } from "@/components/ui/reveal";

export function ProductInclusions({
  id,
  inclusions,
  exclusions,
}: {
  id: string;
  inclusions?: string[];
  exclusions?: string[];
}) {
  const hasInclusions = inclusions && inclusions.length > 0;
  const hasExclusions = exclusions && exclusions.length > 0;
  if (!hasInclusions && !hasExclusions) return null;

  return (
    <section id={id} className="scroll-mt-28 bg-ivory py-14 md:scroll-mt-32 md:py-20">
      <Container narrow>
        <Reveal>
          <EditorialHeading as="h2" size="md">
            O que está incluído
          </EditorialHeading>
        </Reveal>

        <div className="mt-9 grid grid-cols-1 gap-10 sm:grid-cols-2">
          {hasInclusions && (
            <div>
              <p className="text-xs font-medium tracking-[0.15em] text-stone uppercase">Inclui</p>
              <ul className="mt-4 space-y-3">
                {inclusions!.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-ink">
                    <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-magenta" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {hasExclusions && (
            <div>
              <p className="text-xs font-medium tracking-[0.15em] text-stone uppercase">Não inclui</p>
              <ul className="mt-4 space-y-3">
                {exclusions!.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-stone">
                    <X aria-hidden className="mt-0.5 size-4 shrink-0 text-stone/50" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
