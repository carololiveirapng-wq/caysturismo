"use client";

import { useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AdminSidebar, type SidebarCounts } from "@/components/admin/admin-sidebar";
import { AdminTopbar } from "@/components/admin/admin-topbar";

const PAGE_TITLES: { test: (path: string) => boolean; title: string }[] = [
  { test: (p) => p === "/admin", title: "Dashboard" },
  { test: (p) => p === "/admin/leads", title: "Leads" },
  { test: (p) => p.startsWith("/admin/leads/"), title: "Detalhe do lead" },
  { test: (p) => p.startsWith("/admin/pipeline"), title: "Pipeline" },
  { test: (p) => p.startsWith("/admin/retornos"), title: "Retornos" },
  { test: (p) => p.startsWith("/admin/relatorios"), title: "Relatórios" },
  { test: (p) => p.startsWith("/admin/exportacoes"), title: "Exportações" },
  { test: (p) => p.startsWith("/admin/configuracoes"), title: "Configurações do painel" },
];

function getPageTitle(pathname: string): string {
  return PAGE_TITLES.find((entry) => entry.test(pathname))?.title ?? "Painel";
}

export function AdminShell({
  children,
  userEmail,
  counts,
}: {
  children: ReactNode;
  userEmail?: string;
  counts: SidebarCounts | null;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-svh bg-sand">
      <AdminSidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} counts={counts} />

      <div className="flex min-h-svh flex-col lg:pl-64">
        <AdminTopbar
          pageTitle={getPageTitle(pathname)}
          userEmail={userEmail}
          onOpenMenu={() => setMobileOpen(true)}
        />
        <main className="flex-1 px-5 py-8 md:px-8 md:py-10">{children}</main>
      </div>
    </div>
  );
}
