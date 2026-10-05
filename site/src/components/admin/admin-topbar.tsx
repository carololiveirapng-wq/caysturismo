"use client";

import { Menu } from "lucide-react";

export function AdminTopbar({
  pageTitle,
  userEmail,
  onOpenMenu,
}: {
  pageTitle: string;
  userEmail?: string;
  onOpenMenu: () => void;
}) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-ink/10 bg-ivory/95 px-5 backdrop-blur-sm md:px-8">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMenu}
          aria-label="Abrir menu"
          className="flex size-9 items-center justify-center text-ink lg:hidden"
        >
          <Menu className="size-5" />
        </button>
        <p className="text-sm font-medium text-ink">{pageTitle}</p>
      </div>

      {userEmail && <span className="hidden text-xs text-stone md:inline">{userEmail}</span>}
    </header>
  );
}
