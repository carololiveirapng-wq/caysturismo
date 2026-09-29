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
