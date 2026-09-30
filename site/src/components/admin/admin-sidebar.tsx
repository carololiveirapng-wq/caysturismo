"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  MapPin,
  Compass,
  Plane,
  Newspaper,
  UserRound,
  MessageSquareQuote,
  Settings,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const STUDIO_URL = "/studio";

const mainLinks = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Leads", href: "/admin/leads", icon: Users },
];

const contentLinks = [
  { label: "Destinos", href: STUDIO_URL, icon: MapPin },
  { label: "Experiências", href: STUDIO_URL, icon: Compass },
  { label: "Viagens", href: STUDIO_URL, icon: Plane },
  { label: "Curadoria", href: STUDIO_URL, icon: Newspaper },
];

const managementLinks = [
  { label: "Equipe", href: STUDIO_URL, icon: UserRound },
  { label: "Depoimentos", href: STUDIO_URL, icon: MessageSquareQuote },
  { label: "Configurações", href: STUDIO_URL, icon: Settings },
];

function NavGroup({
  heading,
  links,
  pathname,
  onNavigate,
}: {
  heading?: string;
  links: { label: string; href: string; icon: typeof LayoutDashboard }[];
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <div>
      {heading && (
        <p className="px-3 text-[0.65rem] font-medium tracking-[0.15em] text-ivory/40 uppercase">{heading}</p>
      )}
      <nav className={cn("flex flex-col gap-0.5", heading && "mt-2.5")}>
        {links.map((link) => {
          const active = link.href !== STUDIO_URL && pathname === link.href;
          const Icon = link.icon;
          const external = link.href === STUDIO_URL;
          return (
            <Link
              key={link.label}
              href={link.href}
              onClick={onNavigate}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer" : undefined}
              className={cn(
                "flex items-center justify-between gap-2 px-3 py-2 text-sm transition-colors duration-200",
                active ? "bg-ivory/10 text-ivory" : "text-ivory/65 hover:bg-ivory/5 hover:text-ivory",
              )}
            >
              <span className="flex items-center gap-2.5">
                <Icon className="size-4 shrink-0" aria-hidden />
                {link.label}
              </span>
              {external && <ArrowUpRight className="size-3.5 shrink-0 text-ivory/30" aria-hidden />}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export function AdminSidebar({ mobileOpen, onClose }: { mobileOpen: boolean; onClose: () => void }) {
  const pathname = usePathname();

  return (
    <>
      {mobileOpen && (
        <div
          aria-hidden
          onClick={onClose}
          className="fixed inset-0 z-40 bg-ink/40 lg:hidden"
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col gap-8 overflow-y-auto bg-graphite px-4 py-6 transition-transform duration-300 ease-[var(--ease-editorial)] lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="px-3">
          <p className="text-xs font-medium tracking-[0.25em] text-ivory/50 uppercase">Cays Turismo</p>
          <p className="mt-1 font-serif text-lg text-ivory">Painel</p>
        </div>

        <div className="flex flex-1 flex-col gap-7">
          <NavGroup links={mainLinks} pathname={pathname} onNavigate={onClose} />
          <NavGroup heading="Conteúdo" links={contentLinks} pathname={pathname} onNavigate={onClose} />
          <NavGroup heading="Gestão" links={managementLinks} pathname={pathname} onNavigate={onClose} />
        </div>

        <Link
          href="/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2.5 border-t border-ivory/10 px-3 pt-5 text-sm text-ivory/65 transition-colors duration-200 hover:text-ivory"
        >
          <ArrowUpRight className="size-4" aria-hidden />
          Ver site
        </Link>
      </aside>
    </>
  );
}
