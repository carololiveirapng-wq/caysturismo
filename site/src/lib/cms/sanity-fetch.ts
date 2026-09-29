import { sanityClient, sanityEnabled } from "@/sanity/client";

/**
 * Busca no Sanity com fallback silencioso pra `null` — quem chama decide o
 * que fazer (cair pro mock). Loga o erro sempre; em produção isso deveria
 * também disparar um alerta de verdade (Sentry etc.), não só o console —
 * "não mascarar silenciosamente" não significa "não ter fallback", significa
 * "não esconder que o fallback foi usado".
 */
export async function fetchFromSanity<T>(query: string, params: Record<string, unknown> = {}): Promise<T | null> {
  if (!sanityEnabled || !sanityClient) return null;

  try {
    return await sanityClient.fetch<T>(query, params);
  } catch (error) {
    console.error(`[content] Sanity indisponível para a query, usando mock como fallback:\n${query}`, error);
    return null;
  }
}
