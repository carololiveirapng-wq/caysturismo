import { cn } from "@/lib/utils";

export function SectionLabel({
  className,
  children,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "text-xs font-medium tracking-[0.2em] text-stone uppercase",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}
