/** Serializa dados estruturados pra `<script type="application/ld+json">` sem deixar um valor vindo do CMS fechar a tag com `</script>`. */
export function jsonLdString(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\u003c");
}
