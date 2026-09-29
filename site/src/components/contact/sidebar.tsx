import type { LucideIcon } from "lucide-react";
import { MessageCircle, Phone, Clock, MapPin } from "lucide-react";
import { siteConfig, whatsappHref } from "@/lib/site-config";

interface SidebarItem {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
}

/** Só mostra o que existir de verdade em siteConfig — nunca um placeholder inventado. */
export function ContactSidebar() {
  const items: SidebarItem[] = [];
  if (whatsappHref) items.push({ icon: MessageCircle, label: "WhatsApp", value: siteConfig.whatsapp, href: whatsappHref });
  if (siteConfig.phone) items.push({ icon: Phone, label: "Telefone", value: siteConfig.phone });
  if (siteConfig.hours) items.push({ icon: Clock, label: "Horário", value: siteConfig.hours });
  if (siteConfig.address) items.push({ icon: MapPin, label: "Endereço", value: siteConfig.address });

  if (items.length === 0) return null;

  return (
    <div className="border border-ink/10 bg-sand p-6">
      <p className="text-xs font-medium tracking-[0.15em] text-stone uppercase">Outros canais</p>
      <ul className="mt-4 space-y-4">
        {items.map((item) => (
          <li key={item.label} className="flex items-start gap-3">
            <item.icon aria-hidden className="mt-0.5 size-4 shrink-0 text-stone" />
            <div>
              <p className="text-xs text-stone">{item.label}</p>
              {"href" in item && item.href ? (
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
  );
}
