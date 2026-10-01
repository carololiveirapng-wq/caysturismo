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

/**
 * Quando cair pro mock é aceitável:
 * - CMS não configurado (`sanityEnabled` false) — dev local sem projeto
 *   Sanity ainda, comportamento padrão de sempre.
 * - CMS configurado, mas com essa flag de homologação ligada explicitamente
 *   — útil pra testar uma página nova localmente sem popular tudo no
 *   Studio primeiro.
 *
 * Em produção com o CMS configurado e sem essa flag, uma entidade que não
 * existe no Sanity é um 404 de verdade (`notFound()`), não um fallback
 * silencioso que esconderia um erro editorial real atrás de conteúdo mock.
 */
export const allowMockFallback = !sanityEnabled || process.env.NEXT_PUBLIC_CMS_MOCK_FALLBACK === "true";
