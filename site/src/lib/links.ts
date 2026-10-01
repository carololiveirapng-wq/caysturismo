/**
 * Constrói a URL de uma entidade editorial a partir do slug — determinístico,
 * sem checar mock nem CMS. Todo chamador já tem o slug de uma entidade
 * confirmada: ou veio de uma query GROQ (que só dereferencia documentos
 * publicados e ativos — `active == true` nas queries de `@/sanity/queries`),
 * ou é um slug fixo conhecido na navegação estática (Header/Footer). Nos
 * dois casos a página de destino sempre existe, então não há nada pra
 * "perguntar" — um destino/experiência/viagem/artigo novo criado só no
 * Studio já funciona aqui sem precisar tocar neste arquivo.
 *
 * Isso NÃO é o lugar pra uma opção conceitual sem página própria (ex.: uma
 * pergunta do formulário de contato sem destino real associado) — esse
 * caso monta a URL `/contato?x=slug` diretamente no chamador, não aqui.
 */

export function destinationHref(slug: string): string {
  return `/destinos/${slug}`;
}

export function experienceHref(slug: string): string {
  return `/experiencias/${slug}`;
}

export function travelProductHref(slug: string): string {
  return `/viagens/${slug}`;
}

export function curadoriaArticleHref(slug: string): string {
  return `/curadoria/${slug}`;
}
