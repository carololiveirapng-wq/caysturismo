import { Container } from "@/components/ui/container";
import { EditorialHeading } from "@/components/ui/editorial-heading";
import { Reveal } from "@/components/ui/reveal";
import type { TravelProduct, TravelProductDeparture } from "@/types";
import { STATUS_LABEL } from "@/lib/travel-product-status";
import { cn } from "@/lib/utils";

function DepartureRow({ departure }: { departure: TravelProductDeparture }) {
  return (
    <div className="flex items-center justify-between border-t border-ink/10 py-4 text-sm">
      <span className="text-ink">{departure.label}</span>
      <span
        className={cn(
          "inline-flex items-center gap-1.5 text-xs font-medium tracking-wide uppercase",
          departure.status === "active" && "text-stone",
          departure.status === "few-spots" && "text-magenta",
          (departure.status === "sold-out" || departure.status === "expired") && "text-stone/50",
        )}
      >
        <span
          aria-hidden
          className={cn(
            "size-1.5 rounded-full",
            departure.status === "active" && "bg-stone/40",
            departure.status === "few-spots" && "bg-magenta",
            (departure.status === "sold-out" || departure.status === "expired") && "bg-stone/30",
          )}
        />
        {STATUS_LABEL[departure.status]}
      </span>
    </div>
  );
}

export function ProductDates({
  id,
  type,
  bestMonths,
  departures,
}: {
  id: string;
  type: TravelProduct["type"];
  bestMonths?: string;
  departures?: TravelProductDeparture[];
}) {
  const hasDepartures = departures && departures.length > 0;
  if (!bestMonths && !hasDepartures) return null;

  return (
    <section id={id} className="scroll-mt-28 bg-sand py-14 md:scroll-mt-32 md:py-20">
      <Container narrow>
        <Reveal>
          <EditorialHeading as="h2" size="md">
            Datas e condições
          </EditorialHeading>
        </Reveal>

        {type === "custom" && bestMonths ? (
          <Reveal delay={0.06} className="mt-7">
            <p className="text-sm leading-relaxed text-stone">
              Sem data fixa — o período ideal para esta viagem é{" "}
              <span className="text-ink">{bestMonths.toLowerCase()}</span>, mas ajustamos junto com você conforme sua
              agenda.
            </p>
          </Reveal>
        ) : (
          hasDepartures && (
            <>
              <div className="mt-7">
                {departures!.map((departure) => (
                  <DepartureRow key={departure.label} departure={departure} />
                ))}
              </div>
              <p className="mt-6 max-w-md text-xs leading-relaxed text-stone/70">
                Valores e disponibilidade sujeitos a confirmação no momento da reserva.
              </p>
            </>
          )
        )}
      </Container>
    </section>
  );
}
