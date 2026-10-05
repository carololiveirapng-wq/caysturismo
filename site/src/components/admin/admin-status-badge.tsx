import { LEAD_STATUS_LABELS, type LeadStatus } from "@/lib/leads/types";
import { cn } from "@/lib/utils";

/** Badges discretos — sem arco-íris. Só "novo" e "qualificado" ganham um toque de magenta (os dois estados que pedem atenção); o resto fica em tons neutros. */
const STATUS_STYLES: Record<LeadStatus, string> = {
  new: "border-magenta/30 bg-magenta/10 text-magenta-dark",
  contacted: "border-ink/15 bg-sand text-ink/80",
  qualified: "border-magenta/30 bg-magenta/10 text-magenta-dark",
  proposal: "border-ink/15 bg-sand text-ink/80",
  closed: "border-ink/15 bg-ink/5 text-stone",
  lost: "border-ink/10 bg-ink/5 text-stone",
};

export function AdminStatusBadge({ status, className }: { status: LeadStatus; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center border px-2.5 py-1 text-[0.65rem] font-medium tracking-[0.08em] uppercase",
        STATUS_STYLES[status],
        className,
      )}
    >
      {LEAD_STATUS_LABELS[status]}
    </span>
  );
}
