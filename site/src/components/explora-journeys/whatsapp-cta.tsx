const PHONE = "5561981998280";

/** Mesmo número de WhatsApp da Cays (settings.whatsapp) — já era esse no site original, confirmado. */
function waHref(message: string) {
  return `https://api.whatsapp.com/send?phone=${PHONE}&text=${encodeURIComponent(message)}`;
}

export function WhatsAppCta({
  message,
  children,
  variant = "dark",
  className = "",
}: {
  message: string;
  children: React.ReactNode;
  variant?: "dark" | "light" | "outline";
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2.5 rounded-md px-6 py-3.5 text-[15px] tracking-wide transition-colors duration-300";
  const styles =
    variant === "dark"
      ? "text-white"
      : variant === "outline"
        ? "border border-[#1b2232]/20 text-[#1b2232] hover:bg-[#1b2232]/5"
        : "bg-white text-[#1b2232] shadow-[0_8px_30px_-8px_hsla(220,30%,15%,0.12)] hover:bg-[#fcfaf8]";

  return (
    <a
      href={waHref(message)}
      target="_blank"
      rel="noreferrer"
      className={`${base} ${styles} ${className}`}
      style={
        variant === "dark"
          ? { backgroundImage: "linear-gradient(135deg, #1f3851 0%, #2e526b 100%)" }
          : undefined
      }
    >
      {children}
    </a>
  );
}

export function ChatBubbleIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} aria-hidden>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}
