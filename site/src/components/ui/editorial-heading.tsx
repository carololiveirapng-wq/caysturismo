import { cn } from "@/lib/utils";

const sizes = {
  hero: "text-[clamp(2.75rem,6vw,5.75rem)] leading-[1.02]",
  xl: "text-[clamp(2.25rem,4.5vw,4.5rem)] leading-[1.05]",
  lg: "text-[clamp(1.875rem,3.2vw,3rem)] leading-[1.1]",
  md: "text-[clamp(1.5rem,2.4vw,2.25rem)] leading-[1.15]",
} as const;

interface EditorialHeadingProps extends React.ComponentProps<"h2"> {
  as?: "h1" | "h2" | "h3";
  size?: keyof typeof sizes;
  balance?: boolean;
}

export function EditorialHeading({
  as: Tag = "h2",
  size = "lg",
  balance = true,
  className,
  ...props
}: EditorialHeadingProps) {
  return (
    <Tag
      className={cn(
        "font-serif font-normal tracking-tight text-ink whitespace-pre-line",
        balance && "text-balance",
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
