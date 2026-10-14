/**
 * Tokens visuais da landing Explora Journeys × Cays (valores computados reais
 * extraídos do site original — ver DESIGN.md do mirror). Propositalmente
 * fora do tema do Tailwind/Cays: nenhuma classe nomeada (font-serif,
 * bg-ivory, text-ink...) é usada nesta pasta, só valores arbitrários/inline,
 * pra nunca herdar nem vazar estilo entre a landing e o resto do site.
 */
export const ej = {
  cream: "#fcfaf8",
  creamWarm: "#f4f1eb",
  creamWarm2: "#f9f8f5",
  ink: "#1b2232",
  navy: "#1f3851",
  navyMid: "#365f7d",
  gold: "#d7b375",
  muted: "#626d84",
  border: "#dcdfe5",
};

/** Fonte serifada de exibição (WT Monarch Nova, com fallback Playfair Display). */
export const displayFont: React.CSSProperties = {
  fontFamily: "var(--ej-font-display), var(--ej-font-display-fallback), Georgia, serif",
};
