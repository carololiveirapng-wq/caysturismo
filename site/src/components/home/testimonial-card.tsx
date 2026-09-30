"use client";

import { useEffect, useRef, useState } from "react";
import { StarRating } from "@/components/ui/star-rating";
import { GoogleIcon } from "@/components/ui/google-icon";
import { LinkArrow } from "@/components/ui/link-arrow";
import type { GoogleReview } from "@/types";

interface TestimonialCardProps {
  review: GoogleReview;
  onReadMore: (review: GoogleReview, trigger: HTMLButtonElement) => void;
}

/**
 * Preview de até ~6 linhas via line-clamp. O botão "Ler depoimento completo"
 * só aparece quando o texto REALMENTE estoura o clamp — detectado
 * comparando scrollHeight x clientHeight do próprio blockquote depois de
 * renderizado (a técnica padrão pra isso; não dá pra saber só pelo
 * tamanho da string, já que a largura do card muda por breakpoint).
 */
export function TestimonialCard({ review, onReadMore }: TestimonialCardProps) {
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const el = quoteRef.current;
    if (!el) return;

    function measure() {
      if (!el) return;
      setIsTruncated(el.scrollHeight - el.clientHeight > 1);
    }

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [review.text]);

  return (
    <figure className="flex h-full min-w-0 flex-col justify-between border border-ink/10 bg-ivory p-7 md:p-8">
      <div className="min-w-0">
        <StarRating rating={review.rating} />
        <blockquote
          ref={quoteRef}
          className="mt-4 line-clamp-6 w-full min-w-0 font-serif text-lg leading-snug break-words whitespace-pre-line text-ink md:text-[1.15rem] md:leading-[1.45]"
        >
          &ldquo;{review.text}&rdquo;
        </blockquote>
        {isTruncated && (
          <button
            type="button"
            onClick={(e) => onReadMore(review, e.currentTarget)}
            className="mt-2.5 text-xs font-medium tracking-wide text-stone underline underline-offset-4 transition-colors duration-300 hover:text-ink"
          >
            Ler depoimento completo
          </button>
        )}
      </div>

      <div className="mt-7">
        <figcaption className="text-sm text-stone">
          <span className="block font-medium text-ink">{review.authorName}</span>
          {review.relativeTime && <span className="mt-0.5 block">{review.relativeTime}</span>}
        </figcaption>

        <div className="mt-4 flex items-center justify-between gap-4 border-t border-ink/10 pt-4">
          <span className="inline-flex items-center gap-1.5 text-xs text-stone/80">
            <GoogleIcon className="size-3.5" />
            Google Reviews
          </span>
          {review.reviewUrl && (
            <LinkArrow href={review.reviewUrl} target="_blank" rel="noopener noreferrer" className="text-xs">
              Ver no Google
            </LinkArrow>
          )}
        </div>
      </div>
    </figure>
  );
}
