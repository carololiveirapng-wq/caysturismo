"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Decide se o Header/Footer/WhatsApp do site público entram no DOM — em
 * /admin não devem (o painel tem sidebar/topbar próprios), em /linkbio
 * também não (página autocontida pensada pra abrir rápido a partir do
 * Instagram, com seu próprio CTA de WhatsApp — duplicar o botão flutuante
 * ali só adicionaria peso e um segundo WhatsApp na tela), e em /studio
 * muito menos — o Sanity Studio é uma aplicação React própria ocupando a
 * tela inteira; o botão de WhatsApp flutuante global aparecia por cima
 * dele porque essa exclusão não cobria a rota ainda. Feito com
 * usePathname() (resolvido no client, a partir do router) em vez de
 * headers()/cookies() no layout raiz de propósito: essas APIs de servidor
 * tirariam TODAS as páginas do modo estático (inclusive as 40+ páginas de
 * destino/experiência que hoje são pré-renderizadas), já que o Next marca a
 * árvore inteira como dinâmica quando o layout raiz as usa.
 *
 * Header/Footer/WhatsAppButton chegam como ReactNode já renderizados pelo
 * layout raiz (Server Component), não são importados/instanciados aqui —
 * assim eles podem buscar `getSettings()` no Sanity normalmente. Um client
 * component que importasse e renderizasse um Server Component async
 * diretamente quebraria o build ("async/await não é suportado em client
 * components"); recebê-los prontos como slot evita isso.
 */
export function PublicChrome({
  header,
  footer,
  whatsappButton,
  children,
}: {
  header: ReactNode;
  footer: ReactNode;
  whatsappButton: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const hasOwnChrome =
    pathname.startsWith("/admin") || pathname.startsWith("/linkbio") || pathname.startsWith("/studio");

  if (hasOwnChrome) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <>
      {header}
      <main className="flex-1">{children}</main>
      {footer}
      {whatsappButton}
    </>
  );
}
