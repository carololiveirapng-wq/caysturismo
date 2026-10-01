import { sanityClient, sanityEnabled } from "@/sanity/client";
import { allowMockFallback } from "@/sanity/env";

/**
 * Busca no Sanity, devolvendo `null` quando não há resultado (CMS não
 * configurado, documento não existe, ou erro na query/rede). Loga o erro
 * sempre; em produção isso deveria também disparar um alerta de verdade
 * (Sentry etc.), não só o console.
 */
export async function fetchFromSanity<T>(query: string, params: Record<string, unknown> = {}): Promise<T | null> {
  if (!sanityEnabled || !sanityClient) return null;

  try {
    return await sanityClient.fetch<T>(query, params);
  } catch (error) {
    console.error(`[content] Erro ao consultar o Sanity:\n${query}`, error);
    return null;
  }
}

/**
 * Busca uma entidade única com fallback condicional pro mock — ver
 * `allowMockFallback` em `@/sanity/env` pra quando isso é permitido. Fora
 * dessa condição, `undefined` propaga pro `notFound()` da página, em vez de
 * mascarar uma entidade ausente no Sanity com conteúdo mock desatualizado.
 */
export async function fetchEntityWithFallback<T>(
  query: string,
  params: Record<string, unknown>,
  mockFn: () => T | undefined,
): Promise<T | undefined> {
  const fromSanity = await fetchFromSanity<T | null>(query, params);
  if (fromSanity) return fromSanity;
  return allowMockFallback ? mockFn() : undefined;
}

/**
 * Busca uma lista com fallback condicional pro mock. Uma lista vazia vinda
 * do Sanity (CMS configurado, zero itens publicados ainda) é um resultado
 * válido fora do modo de homologação — não deve virar a lista mock inteira.
 */
export async function fetchListWithFallback<T>(query: string, mockFn: () => T[]): Promise<T[]> {
  const fromSanity = await fetchFromSanity<T[]>(query);
  if (fromSanity && fromSanity.length > 0) return fromSanity;
  return allowMockFallback ? mockFn() : (fromSanity ?? []);
}
