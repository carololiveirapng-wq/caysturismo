"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Columns3,
  CalendarClock,
  BarChart3,
  Download,
  PenLine,
  Settings,
  ArrowUpRight,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { signOutAction } from "@/app/(site)/admin/(shell)/actions";

const STUDIO_URL = "/studio";

export interface SidebarCounts {
  newLeads: number;
  returnsAttention: number;
}

type NavItem = {
  label: string;
  href: string;
  icon: typeof LayoutDashboard;
  badge?: keyof SidebarCounts;
};

const NAV_GROUPS: { heading: string; items: NavItem[] }[] = [
  {
    heading: "Operação",
    items: [
      { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
      { label: "Leads", href: "/admin/leads", icon: Users, badge: "newLeads" },
      { label: "Pipeline", href: "/admin/pipeline", icon: Columns3 },
      { label: "Retornos", href: "/admin/retornos", icon: CalendarClock, badge: "returnsAttention" },
    ],
  },
  {
    heading: "Gestão",
    items: [
      { label: "Relatórios", href: "/admin/relatorios", icon: BarChart3 },
      { label: "Exportações", href: "/admin/exportacoes", icon: Download },
    ],
  },
  {
    heading: "Conteúdo",
    items: [{ label: "Editor do site", href: STUDIO_URL, icon: PenLine }],
  },
  {
    heading: "Sistema",
    items: [{ label: "Configurações", href: "/admin/configuracoes", icon: Settings }],
  },
];

function NavGroup({
  heading,
  items,
  pathname,
  counts,
  onNavigate,
}: {
  heading: string;
  items: NavItem[];
  pathname: string;
  counts: SidebarCounts | null;
  onNavigate: () => void;
}) {
  return (
    <div>
      <p className="px-3 text-[0.65rem] font-medium tracking-[0.15em] text-ivory/40 uppercase">{heading}</p>
      <nav aria-label={heading} className="mt-2.5 flex flex-col gap-0.5">
        {items.map((item) => {
          const external = item.href.startsWith(STUDIO_URL);
          const active = !external && (item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href));
          const Icon = item.icon;
          const badgeValue = item.badge && counts ? counts[item.badge] : 0;
          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={onNavigate}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer" : undefined}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center justify-between gap-2 px-3 py-2 text-sm transition-colors duration-200",
                active ? "bg-ivory/10 text-ivory" : "text-ivory/65 hover:bg-ivory/5 hover:text-ivory",
              )}
            >
              <span className="flex items-center gap-2.5">
                <Icon className="size-4 shrink-0" aria-hidden />
                {item.label}
              </span>
              {external && <ArrowUpRight className="size-3.5 shrink-0 text-ivory/30" aria-hidden />}
              {badgeValue > 0 && (
                <span
                  aria-label={`${badgeValue} pendentes`}
                  className="min-w-5 bg-magenta px-1.5 text-center text-[0.65rem] leading-5 font-medium text-ivory"
                >
                  {badgeValue}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export function AdminSidebar({
  mobileOpen,
  onClose,
  counts,
}: {
  mobileOpen: boolean;
  onClose: () => void;
  counts: SidebarCounts | null;
}) {
  const pathname = usePathname();

  return (
    <>
      {mobileOpen && <div aria-hidden onClick={onClose} className="fixed inset-0 z-40 bg-ink/40 lg:hidden" />}

      <aside
        aria-label="Navegação do painel"
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
          {NAV_GROUPS.map((group) => (
            <NavGroup
              key={group.heading}
              heading={group.heading}
              items={group.items}
              pathname={pathname}
              counts={counts}
              onNavigate={onClose}
            />
          ))}
        </div>

        <div className="flex flex-col gap-0.5 border-t border-ivory/10 px-3 pt-5">
          <Link
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2.5 py-1.5 text-sm text-ivory/65 transition-colors duration-200 hover:text-ivory"
          >
            <ArrowUpRight className="size-4" aria-hidden />
            Ver site
          </Link>
          <Link
            href={STUDIO_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2.5 py-1.5 text-sm text-ivory/65 transition-colors duration-200 hover:text-ivory"
          >
            <ArrowUpRight className="size-4" aria-hidden />
            Abrir Studio
          </Link>
          <form action={signOutAction}>
            <button
              type="submit"
              className="flex w-full items-center gap-2.5 py-1.5 text-left text-sm text-ivory/65 transition-colors duration-200 hover:text-ivory"
            >
              <LogOut className="size-4" aria-hidden />
              Sair
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
