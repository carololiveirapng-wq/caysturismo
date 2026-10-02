import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface PersistentMobileCTAProps {
  label: string;
  href: string;
}

/** Pílula fixa inferior, só mobile — deixa espaço à direita para o botão de WhatsApp global. */
export function PersistentMobileCTA({ label, href }: PersistentMobileCTAProps) {
  return (
    <div className="fixed inset-x-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 pr-20 lg:hidden">
      <Link
        href={href}
        className="flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-xs font-medium tracking-[0.12em] text-ivory uppercase shadow-[0_10px_30px_-10px_rgba(0,0,0,0.4)] transition-colors duration-300 hover:bg-magenta-dark"
      >
        {label}
        <ArrowRight className="size-3.5" />
      </Link>
    </div>
  );
}
