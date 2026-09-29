/**
 * Log de erro do servidor com um limite claro: em desenvolvimento, o erro
 * completo ajuda a depurar. Em produção, alguns erros (o do driver do
 * Postgres, por exemplo) podem embutir a query com os valores dos
 * parâmetros na mensagem — e esses valores podem ser dado pessoal do lead
 * (nome, e-mail, WhatsApp, observações). Por isso, em produção só vai pro
 * log a mensagem/código do erro, nunca o objeto inteiro.
 *
 * Limite conhecido: a mensagem de alguns erros do Postgres (ex.: violação
 * de constraint UNIQUE) pode incluir o valor do campo. O schema atual de
 * leads não tem nenhuma constraint UNIQUE, então isso não acontece hoje —
 * mas vale lembrar se uma for adicionada depois.
 */
export function logServerError(context: string, error: unknown) {
  if (process.env.NODE_ENV !== "production") {
    console.error(context, error);
    return;
  }

  const message = error instanceof Error ? error.message : "erro desconhecido";
  const code = (error as { code?: string })?.code;
  console.error(context, { message, code });
}
