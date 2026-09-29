import type { Lead, NewLead } from "./types";

export interface LeadRepository {
  save(lead: NewLead): Promise<Lead>;
}

/**
 * Decide qual repository usar — nunca mascara a ausência de banco em
 * produção. Em desenvolvimento sem `DATABASE_URL`, grava em arquivo local
 * (claramente marcado, nunca confundido com persistência real). Em
 * produção sem `DATABASE_URL`, lança erro explícito em vez de fingir que
 * salvou — a action trata isso como falha e mostra erro para quem preencheu
 * o formulário, sem perder os dados digitados.
 */
export async function getLeadRepository(): Promise<LeadRepository> {
  if (process.env.DATABASE_URL) {
    const { PostgresLeadRepository } = await import("./repository.postgres");
    return new PostgresLeadRepository(process.env.DATABASE_URL);
  }

  if (process.env.NODE_ENV !== "production") {
    const { DevFileLeadRepository } = await import("./repository.dev-file");
    return new DevFileLeadRepository();
  }

  throw new Error(
    "DATABASE_URL não configurado — não é possível salvar leads em produção. Configure a variável de ambiente antes de publicar.",
  );
}
