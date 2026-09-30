"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";

/**
 * Decide se o Header/Footer/WhatsApp do site público entram no DOM — em
 * /admin não devem (o painel tem sidebar/topbar próprios). Feito com
 * usePathname() (resolvido no client, a partir do router) em vez de
 * headers()/cookies() no layout raiz de propósito: essas APIs de servidor
 * tirariam TODAS as páginas do modo estático (inclusive as 40+ páginas de
 * destino/experiência que hoje são pré-renderizadas), já que o Next marca a
 * árvore inteira como dinâmica quando o layout raiz as usa.
 */
export function PublicChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
