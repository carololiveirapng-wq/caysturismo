import { continents } from "@/data/destinations-hub";

/**
 * Rótulo PT-BR do continente de um destino, vindo da mesma taxonomia do hub
 * /destinos (não do enum `type`, que é o nível geográfico em inglês do
 * schema — "country", "region" — e nunca deve aparecer como label).
 * Sem continente cadastrado, `select` devolve null e o card simplesmente não
 * mostra label.
 */
export const CONTINENT_LABEL_GROQ = `select(${continents
  .map((c) => `continent == "${c.slug}" => "${c.name}"`)
  .join(", ")})`;
