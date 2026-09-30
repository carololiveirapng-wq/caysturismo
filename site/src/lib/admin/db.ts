import postgres, { type Sql } from "postgres";

/**
 * Conexão Postgres do admin — uma por chamada, não um singleton de módulo
 * (diferente de src/lib/leads/repository.postgres.ts, que mantém um
 * singleton porque o formulário público é chamado com muito mais
 * frequência). Custa uma latência extra de handshake por request, mas o
 * admin é baixo tráfego e isso elimina qualquer chance de estado
 * compartilhado entre requisições — preferível aqui à otimização.
 */
export async function withAdminDb<T>(fn: (sql: Sql) => Promise<T>): Promise<T> {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL não configurada — o painel admin precisa de um Postgres real para funcionar.",
    );
  }

  const sql = postgres(connectionString, {
    max: 1,
    prepare: false,
    connect_timeout: 10,
    ssl: process.env.NODE_ENV === "production" ? "require" : "prefer",
  });

  try {
    return await fn(sql);
  } finally {
    await sql.end({ timeout: 1 });
  }
}
