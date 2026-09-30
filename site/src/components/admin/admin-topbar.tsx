"use client";

import { Menu, LogOut, ExternalLink } from "lucide-react";
import Link from "next/link";
import { signOutAction } from "@/app/admin/(shell)/actions";

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

      <div className="flex items-center gap-4">
        <Link
          href="/"
          target="_blank"
          rel="noreferrer"
          className="hidden items-center gap-1.5 text-xs font-medium tracking-wide text-stone uppercase transition-colors duration-200 hover:text-ink md:inline-flex"
        >
          Ver site
          <ExternalLink className="size-3.5" aria-hidden />
        </Link>

        {userEmail && <span className="hidden text-xs text-stone md:inline">{userEmail}</span>}

        <form action={signOutAction}>
          <button
            type="submit"
            className="flex items-center gap-1.5 text-xs font-medium tracking-wide text-stone uppercase transition-colors duration-200 hover:text-ink"
          >
            <LogOut className="size-3.5" aria-hidden />
            Sair
          </button>
        </form>
      </div>
    </header>
  );
}
