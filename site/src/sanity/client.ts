import { createClient, type SanityClient } from "next-sanity";
import { projectId, dataset, apiVersion, sanityEnabled } from "./env";

export { sanityEnabled };

/**
 * `null` quando o Sanity não está configurado neste ambiente — todo código
 * que consome isto (`lib/content/*`) já espera esse caso e cai pro mock.
 */
export const sanityClient: SanityClient | null = sanityEnabled
  ? createClient({
      projectId: projectId!,
      dataset,
      apiVersion,
      useCdn: process.env.NODE_ENV === "production",
      token: process.env.SANITY_API_READ_TOKEN,
      perspective: "published",
    })
  : null;

// Roda uma vez por cold start (código de módulo) — avisa claramente quando
// uma implantação de produção está servindo os mocks locais em vez de
// conteúdo do CMS. Não impede o deploy (o site funciona normalmente), mas
// não deve passar despercebido depois que o time começar a depender do
// Sanity como fonte real de conteúdo.
if (!sanityEnabled && process.env.NODE_ENV === "production") {
  console.warn(
    "[sanity] NEXT_PUBLIC_SANITY_PROJECT_ID não configurado — esta implantação de produção está servindo os dados mockados em src/data/, não conteúdo do Sanity.",
  );
}
