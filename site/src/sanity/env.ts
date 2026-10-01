/**
 * `NEXT_PUBLIC_*` porque o projectId/dataset não são segredo — são os
 * mesmos valores que o Studio embutido em `/studio` usa no client. O token
 * de leitura (quando existir) fica em `SANITY_API_READ_TOKEN`, sem prefixo
 * `NEXT_PUBLIC_`, e só é lido em `src/sanity/client.ts` (server-side).
 */
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-01-01";

/** Só true quando o projeto Sanity está de fato configurado — controla o fallback pra mock em `lib/content/*`. */
export const sanityEnabled = Boolean(projectId);

const isProduction = process.env.NODE_ENV === "production";

/**
 * Quando cair pro mock é aceitável:
 * - CMS não configurado (`sanityEnabled` false) — dev local sem projeto
 *   Sanity ainda, comportamento padrão de sempre.
 * - FORA de produção (dev/preview), com essa flag de homologação ligada
 *   explicitamente — útil pra testar uma página nova localmente sem
 *   popular tudo no Studio primeiro.
 *
 * Em produção, com o CMS configurado, isso é sempre `false` — mesmo que a
 * flag esteja ligada por engano em alguma env var esquecida. Produção com
 * conteúdo já migrado não deve ter como "esconder" um documento ausente
 * atrás de mock; uma entidade que não existe no Sanity é um 404 de verdade
 * (`notFound()`), nunca um fallback silencioso.
 */
export const allowMockFallback =
  !sanityEnabled || (!isProduction && process.env.NEXT_PUBLIC_CMS_MOCK_FALLBACK === "true");
