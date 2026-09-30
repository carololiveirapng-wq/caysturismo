import type { LucideIcon } from "lucide-react";
import { MessageCircle, Phone, Clock, MapPin } from "lucide-react";
import { siteConfig, whatsappHref } from "@/lib/site-config";
import { StarRating } from "@/components/ui/star-rating";
import { GoogleIcon } from "@/components/ui/google-icon";
import { getActiveOrderedItems } from "@/lib/content";
import { reviews as allReviews } from "@/data/home";

interface SidebarItem {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
}

/** O review mais curto de verdade do catálogo — nunca um texto inventado, e curto o bastante pra não pesar a lateral. */
function getShortestReview() {
  const reviews = getActiveOrderedItems(allReviews);
  if (reviews.length === 0) return null;
  return reviews.reduce((shortest, r) => (r.text.length < shortest.text.length ? r : shortest));
}

export function ContactSidebar() {
  const items: SidebarItem[] = [];
  if (whatsappHref) items.push({ icon: MessageCircle, label: "WhatsApp", value: siteConfig.whatsapp, href: whatsappHref });
  if (siteConfig.phone) items.push({ icon: Phone, label: "Telefone", value: siteConfig.phone });
  if (siteConfig.hours) items.push({ icon: Clock, label: "Horário", value: siteConfig.hours });
  if (siteConfig.address) items.push({ icon: MapPin, label: "Endereço", value: siteConfig.address });

  const review = getShortestReview();

  return (
    <div className="flex flex-col gap-6 lg:sticky lg:top-28">
      {items.length > 0 && (
        <div className="border border-ink/10 bg-sand p-6">
          <p className="font-serif text-lg text-ink">Prefere conversar agora?</p>
          <p className="mt-1.5 text-sm text-stone">Fale diretamente com a equipe Cays.</p>

          <ul className="mt-5 space-y-4">
            {items.map((item) => (
              <li key={item.label} className="flex items-start gap-3">
                <item.icon aria-hidden className="mt-0.5 size-4 shrink-0 text-stone" />
                <div>
                  <p className="text-xs text-stone">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noreferrer" className="text-sm text-ink hover:text-magenta">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm text-ink">{item.value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {review && (
        <div className="border border-ink/10 bg-ivory p-6">
          <StarRating rating={review.rating} />
          <blockquote className="mt-3 font-serif text-base leading-snug text-ink">&ldquo;{review.text}&rdquo;</blockquote>
          <div className="mt-4 flex items-center justify-between gap-3 border-t border-ink/10 pt-4">
            <span className="text-sm font-medium text-ink">{review.authorName}</span>
            <span className="inline-flex items-center gap-1.5 text-xs text-stone/80">
              <GoogleIcon className="size-3.5" />
              Google Reviews
            </span>
          </div>
        </div>
      )}

      <p className="px-1 text-sm leading-relaxed text-stone">
        Planejamento personalizado.
        <br />
        Sem roteiros prontos.
      </p>
    </div>
  );
}
