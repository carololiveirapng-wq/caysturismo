import { MessageCircle } from "lucide-react";

const PLANNING_MESSAGE = "Olá! Gostaria de começar a planejar uma viagem com a Cays.";

/** Só aparece com WhatsApp cadastrado no Settings — nunca um link de placeholder. O número vem do CMS; a mensagem é fixa. */
export function WhatsAppButton({ whatsappHref }: { whatsappHref?: string }) {
  if (!whatsappHref) return null;

  const href = `${whatsappHref}?text=${encodeURIComponent(PLANNING_MESSAGE)}`;

  return (
    <aside aria-label="Atalho para o WhatsApp" className="contents">
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar no WhatsApp"
        className="group fixed right-[max(1.25rem,env(safe-area-inset-right))] bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-40 flex h-12 w-12 items-center justify-center gap-2.5 bg-ink text-ivory transition-colors duration-300 hover:bg-magenta-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta-dark md:right-8 md:bottom-8 md:h-11 md:w-auto md:px-5"
      >
        <MessageCircle className="size-5 shrink-0 motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:-translate-y-0.5" aria-hidden />
        <span className="hidden text-sm font-medium tracking-wide whitespace-nowrap md:inline">Falar no WhatsApp</span>
      </a>
    </aside>
  );
}
