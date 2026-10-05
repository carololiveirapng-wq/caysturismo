import { StarRating } from "@/components/ui/star-rating";
import { GoogleIcon } from "@/components/ui/google-icon";
import type { SiteSettings } from "@/lib/cms";
import type { GoogleReview } from "@/types";

const NEXT_STEPS = [
  { number: "01", title: "Entendemos sua viagem" },
  { number: "02", title: "Um especialista entra em contato" },
  { number: "03", title: "Começamos a desenhar as melhores possibilidades" },
];

const DIFFERENTIALS = [
  "Roteiro desenhado para o perfil do viajante",
  "Curadoria de hospedagens e experiências",
  "Acompanhamento próximo antes e durante a viagem",
];

/** O review mais curto de verdade do catálogo — nunca um texto inventado, e curto o bastante pra não pesar a lateral. */
function getShortestReview(reviews: GoogleReview[]) {
  if (reviews.length === 0) return null;
  return reviews.reduce((shortest, r) => (r.text.length < shortest.text.length ? r : shortest));
}

export function ContactSidebar({ settings, reviews }: { settings: SiteSettings; reviews: GoogleReview[] }) {
  const review = getShortestReview(reviews);

  return (
    <div className="flex flex-col lg:sticky lg:top-28">
      {review && (
        <div className="border border-ink/10 bg-ivory p-6">
          <StarRating rating={review.rating} />
          <blockquote className="mt-3 font-serif text-base leading-snug text-ink">&ldquo;{review.text}&rdquo;</blockquote>
          <div className="mt-4 flex items-center justify-between gap-3 border-t border-ink/10 pt-4">
            <span className="text-sm font-medium text-ink">{review.authorName}</span>
            <span className="inline-flex items-center gap-1.5 text-xs text-stone">
              <GoogleIcon className="size-3.5" />
              Google Reviews
            </span>
          </div>
        </div>
      )}

      <div className="mt-8 border-t border-ink/10 pt-8">
        <p className="font-serif text-lg text-ink">O que acontece depois</p>
        <ol className="mt-5 space-y-4">
          {NEXT_STEPS.map((step) => (
            <li key={step.number} className="flex items-start gap-3">
              <span className="pt-px text-xs font-medium text-magenta-dark">{step.number}</span>
              <span className="text-sm leading-relaxed text-ink">{step.title}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-8 border-t border-ink/10 pt-8">
        <p className="font-serif text-lg text-ink">Por que planejar com a Cays</p>
        <ul className="mt-5 space-y-3">
          {DIFFERENTIALS.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-stone">
              <span aria-hidden className="mt-2 size-1 shrink-0 bg-magenta" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {settings.whatsappHref && (
        <div className="mt-8 border-t border-ink/10 pt-8">
          <p className="font-serif text-lg text-ink">Prefere conversar agora?</p>
          <a
            href={settings.whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="group/cta mt-3 inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors duration-300 hover:text-magenta"
          >
            Falar com a Cays no WhatsApp
            <span aria-hidden className="transition-transform duration-300 group-hover/cta:translate-x-1">
              →
            </span>
          </a>
        </div>
      )}
    </div>
  );
}
