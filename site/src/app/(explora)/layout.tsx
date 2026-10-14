import type { ReactNode } from "react";
import { Playfair_Display, Inter } from "next/font/google";
import "../globals.css";

/**
 * Root layout isolado para a landing clonada da Explora Journeys
 * (parceria com a Cays para o Grande Prêmio de Mônaco 2027). De propósito
 * SEM Header/Footer/WhatsApp/fontes da Cays — é uma página de campanha
 * autocontida com o chrome do site original, só hospedada dentro do
 * domínio da Cays. `../globals.css` é importado só porque é a única
 * build do Tailwind neste projeto (gera as classes utilitárias usadas
 * aqui); nenhuma classe/token nomeado da Cays (bg-ivory, text-ink,
 * font-serif etc.) é usado nesta árvore, e nenhuma classe daqui é
 * usada fora dela — zero contaminação visual nos dois sentidos.
 *
 * A fonte de exibição original (WT Monarch Nova) é carregada via
 * @font-face simples servido de /public em vez de next/font/local — o
 * plugin do Turbopack não resolve o asset através do segmento de rota
 * entre parênteses "(explora)"; @font-face evita esse bug sem perder o
 * self-hosting (zero requisição a terceiros).
 */

const playfair = Playfair_Display({
  variable: "--ej-font-display-fallback",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--ej-font-sans",
  subsets: ["latin"],
  display: "swap",
});

export default function ExploraRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <style>{`
          @font-face {
            font-family: "WT Monarch Nova";
            src: url("/explora-journeys/fonts/WT_Monarch_Nova_Roman.ttf") format("truetype");
            font-weight: 400;
            font-style: normal;
            font-display: swap;
          }
          :root { --ej-font-display: "WT Monarch Nova"; }
        `}</style>
      </head>
      <body className="bg-[#fcfaf8] text-[#1b2232] antialiased" style={{ fontFamily: "var(--ej-font-sans)" }}>
        {children}
      </body>
    </html>
  );
}
