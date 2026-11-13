import { SplitSection } from "./split-section";
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
          (departure.status === "sold-out" || departure.status === "expired") && "text-stone",
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
    <SplitSection id={id} title="Datas e condições" tone="sand">
      {type === "custom" && bestMonths ? (
        <p className="max-w-2xl text-lg leading-relaxed text-ink/80">
          Sem data fixa. O período ideal para esta viagem é <span className="text-ink">{bestMonths.toLowerCase()}</span>, mas ajustamos junto com você conforme
          sua agenda.
        </p>
      ) : (
        hasDepartures && (
          <>
            <div className="border-b border-ink/10">
              {departures!.map((departure) => (
                <DepartureRow key={departure.label} departure={departure} />
              ))}
            </div>
            <p className="mt-6 max-w-md text-xs leading-relaxed text-stone">Valores e disponibilidade sujeitos a confirmação no momento da reserva.</p>
          </>
        )
      )}
    </SplitSection>
  );
}
