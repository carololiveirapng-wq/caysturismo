import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  /** 1–5. Reflete a nota real — nunca assumir 5 por padrão. */
  rating: number;
  className?: string;
}

/** Nota discreta em tom neutro — sem amarelo, sem acento de marca. */
export function StarRating({ rating, className }: StarRatingProps) {
  const rounded = Math.round(Math.min(5, Math.max(0, rating)));

  return (
    <div
      role="img"
      aria-label={`${rating} de 5 estrelas`}
      className={cn("flex items-center gap-0.5", className)}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          aria-hidden
          className={cn("size-3.5", i < rounded ? "fill-ink text-ink" : "fill-none text-ink/20")}
        />
      ))}
    </div>
  );
}
