import { STATUS_LABEL } from "@/lib/travel-product-status";
import type { TravelProductStatus } from "@/types";
import { cn } from "@/lib/utils";

export function StatusBadge({ status, className }: { status: TravelProductStatus; className?: string }) {
  if (status === "active") return null;
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 text-xs font-medium tracking-wide uppercase",
        status === "few-spots" ? "text-magenta" : "text-stone",
        className,
      )}
    >
      <span aria-hidden className={cn("size-1.5 rounded-full", status === "few-spots" ? "bg-magenta" : "bg-stone/50")} />
      {STATUS_LABEL[status]}
    </span>
  );
}
