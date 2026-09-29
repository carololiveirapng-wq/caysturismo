import { MessageCircle } from "lucide-react";
import { whatsappHref } from "@/lib/site-config";

/** Hidden until a real WhatsApp number is set in siteConfig — never a placeholder link. */
export function WhatsAppButton() {
  if (!whatsappHref) return null;

  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed right-5 bottom-5 z-40 flex size-12 items-center justify-center rounded-full bg-ink text-ivory shadow-[0_10px_30px_-10px_rgba(0,0,0,0.4)] transition-colors duration-300 hover:bg-magenta"
    >
      <MessageCircle className="size-5" />
    </a>
  );
}
