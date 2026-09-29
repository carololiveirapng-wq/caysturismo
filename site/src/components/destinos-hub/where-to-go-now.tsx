import { Container } from "@/components/ui/container";
import { EditorialHeading } from "@/components/ui/editorial-heading";
import { ImageReveal } from "@/components/ui/image-reveal";
import { Reveal } from "@/components/ui/reveal";
import { getWhereToGoNow } from "@/data/destinations-hub";

const MONTH_NAMES = [
  "janeiro", "fevereiro", "março", "abril", "maio", "junho",
  "julho", "agosto", "setembro", "outubro", "novembro", "dezembro",
];

export function WhereToGoNow() {
  const picks = getWhereToGoNow();
  if (picks.length === 0) return null;
  const monthName = MONTH_NAMES[new Date().getMonth()];

  return (
    <section className="bg-ivory py-14 md:py-20">
      <Container>
        <Reveal>
          <EditorialHeading as="h2" size="md">
            Onde ir agora
          </EditorialHeading>
          <p className="mt-2.5 text-sm text-stone">Uma seleção pensada para quem parte em {monthName}.</p>
        </Reveal>

        <div className="mt-9 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {picks.map((pick) => (
            <div key={pick.slug}>
              <ImageReveal
                src={pick.image.src}
                alt={pick.image.alt}
                width={480}
                height={600}
                sizes="(min-width: 768px) 22vw, 45vw"
                containerClassName="aspect-[4/5]"
              />
              <div className="mt-3 border-t border-ink/10 pt-3">
                <h3 className="font-serif text-lg text-ink">{pick.name}</h3>
                <p className="mt-1 text-xs leading-snug text-stone">{pick.note}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
