import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface LinkArrowProps extends React.ComponentProps<typeof Link> {
  tone?: "ink" | "ivory";
}

export function LinkArrow({
  className,
  children,
  tone = "ink",
  ...props
}: LinkArrowProps) {
  return (
    <Link
      className={cn(
        "group/arrow inline-flex w-fit items-center gap-2 text-sm font-medium tracking-wide",
        tone === "ink" ? "text-ink" : "text-ivory",
        className,
      )}
      {...props}
    >
      <span className="relative">
        {children}
        <span
          aria-hidden
          className={cn(
            "absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 transition-transform duration-500 ease-[var(--ease-editorial)] group-hover/arrow:scale-x-100",
            tone === "ink" ? "bg-ink" : "bg-ivory",
          )}
        />
      </span>
      <ArrowRight
        aria-hidden
        className="size-4 shrink-0 transition-transform duration-500 ease-[var(--ease-editorial)] group-hover/arrow:translate-x-1"
      />
    </Link>
  );
}
