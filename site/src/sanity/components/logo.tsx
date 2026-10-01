/** Wordmark simples no lugar do logo padrão do Sanity — leve, sem exigir asset extra. */
export function StudioLogo() {
  return (
    <span
      style={{
        fontFamily: "Georgia, 'Times New Roman', serif",
        fontSize: "0.95rem",
        letterSpacing: "0.12em",
        fontWeight: 500,
        color: "#2f2f2f",
        textTransform: "uppercase",
      }}
    >
      Cays <span style={{ color: "#e7247a" }}>·</span> Conteúdo
    </span>
  );
}
