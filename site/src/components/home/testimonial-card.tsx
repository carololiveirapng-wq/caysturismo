"use client";

import { useEffect, useRef, useState } from "react";
import { StarRating } from "@/components/ui/star-rating";
import { GoogleIcon } from "@/components/ui/google-icon";
import { LinkArrow } from "@/components/ui/link-arrow";
import { cn } from "@/lib/utils";
import type { GoogleReview } from "@/types";

interface TestimonialCardProps {
  review: GoogleReview;
  onReadMore: (review: GoogleReview, trigger: HTMLButtonElement) => void;
}

/**
 * Todos os cards precisam ter exatamente a mesma altura, nunca desnivelados
 * — por isso o bloco de citação tem min-h fixo (equivalente às 6 linhas do
 * line-clamp-6 abaixo) em vez de altura natural do texto: reviews curtos
 * sobram espaço em branco reservado, reviews longos estouram o clamp e
 * ganham o botão "Ler depoimento completo". O botão fica sempre no DOM
 * (visibility, não display) pra reservar a mesma altura de rodapé nos dois
 * casos — só aparece quando o texto REALMENTE estoura o clamp, detectado
 * comparando scrollHeight x clientHeight do próprio blockquote depois de
 * renderizado (não dá pra saber só pelo tamanho da string, já que a largura
 * do card muda por breakpoint).
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
    <figure className="flex h-full min-w-0 flex-col border border-ink/10 bg-ivory p-7 md:p-8">
      <div className="min-w-0">
        <StarRating rating={review.rating} />
        <blockquote
          ref={quoteRef}
          className="mt-4 line-clamp-6 min-h-[9.5rem] w-full min-w-0 font-serif text-lg leading-snug break-words whitespace-pre-line text-ink md:min-h-[10.25rem] md:text-[1.15rem] md:leading-[1.45]"
        >
          &ldquo;{review.text}&rdquo;
        </blockquote>
        <div className={cn("mt-2.5 h-4", !isTruncated && "invisible")}>
          <button
            type="button"
            tabIndex={isTruncated ? 0 : -1}
            onClick={(e) => onReadMore(review, e.currentTarget)}
            className="text-xs font-medium tracking-wide text-stone underline underline-offset-4 transition-colors duration-300 hover:text-ink"
          >
            Ler depoimento completo
          </button>
        </div>
      </div>

      <div className="mt-7">
        <figcaption className="text-sm text-stone">
          <span className="block font-medium text-ink">{review.authorName}</span>
          {review.relativeTime && <span className="mt-0.5 block">{review.relativeTime}</span>}
        </figcaption>

        <div className="mt-4 flex items-center justify-between gap-4 border-t border-ink/10 pt-4">
          <span className="inline-flex items-center gap-1.5 text-xs text-stone">
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
