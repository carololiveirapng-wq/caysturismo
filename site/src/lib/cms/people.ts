import { fetchFromSanity } from "./sanity-fetch";
import { PEOPLE_QUERY } from "@/sanity/queries/person";
import type { Person } from "@/types";

/**
 * Sem fallback pra mock de propósito — não existe (e não deve existir)
 * nenhuma pessoa fictícia em `@/data`. Enquanto ninguém for cadastrado no
 * Studio, isto devolve `[]` e a seção de equipe mostra o estado vazio já
 * existente em vez de inventar nomes/fotos.
 */
export async function getPeople(): Promise<Person[]> {
  const fromSanity = await fetchFromSanity<Person[]>(PEOPLE_QUERY);
  return fromSanity ?? [];
}
