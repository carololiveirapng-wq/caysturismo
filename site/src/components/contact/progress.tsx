import { cn } from "@/lib/utils";

export function ContactProgress({ step, total = 2 }: { step: number; total?: number }) {
  return (
    <div>
      <p className="text-xs tracking-[0.15em] text-stone uppercase">
        Etapa {step} de {total}
      </p>
      <div className="mt-2.5 flex gap-1.5">
        {Array.from({ length: total }, (_, i) => i + 1).map((i) => (
          <span key={i} className={cn("h-[3px] flex-1", i <= step ? "bg-magenta" : "bg-ink/10")} />
        ))}
      </div>
    </div>
  );
}
