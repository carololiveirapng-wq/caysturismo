import { Check, X } from "lucide-react";
import { SplitSection } from "./split-section";
import { cn } from "@/lib/utils";

export function ProductInclusions({
  id,
  inclusions,
  exclusions,
}: {
  id: string;
  inclusions?: string[];
  exclusions?: string[];
}) {
  const hasInclusions = Boolean(inclusions && inclusions.length > 0);
  const hasExclusions = Boolean(exclusions && exclusions.length > 0);
  if (!hasInclusions && !hasExclusions) return null;
  const both = hasInclusions && hasExclusions;

  return (
    <SplitSection id={id} title="O que está incluído" note="O que já está no valor da viagem e o que fica por sua conta.">
      <div className={cn("grid grid-cols-1 gap-x-12 gap-y-10", both && "sm:grid-cols-2")}>
        {hasInclusions && <ListColumns title="Inclui" items={inclusions!} kind="yes" wide={!both} />}
        {hasExclusions && <ListColumns title="Não inclui" items={exclusions!} kind="no" wide={!both} />}
      </div>
    </SplitSection>
  );
}

/** Lista que se divide em 2 colunas quando é a única (para não deixar metade da tela vazia). */
function ListColumns({ title, items, kind, wide }: { title: string; items: string[]; kind: "yes" | "no"; wide: boolean }) {
  return (
    <div>
      <p className="text-xs font-medium tracking-[0.15em] text-stone uppercase">{title}</p>
      <ul className={cn("mt-4", wide ? "sm:columns-2 sm:gap-x-12" : "space-y-3")}>
        {items.map((item) => (
          <li key={item} className={cn("flex items-start gap-2.5 text-sm", wide && "mb-3 break-inside-avoid", kind === "yes" ? "text-ink" : "text-stone")}>
            {kind === "yes" ? <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-magenta" /> : <X aria-hidden className="mt-0.5 size-4 shrink-0 text-stone" />}
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
