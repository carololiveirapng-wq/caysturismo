/**
 * Limitador em memória — best-effort, não uma solução robusta. Na Vercel
 * (serverless), cada instância/lambda tem sua própria memória: isto NÃO
 * coordena limite entre instâncias, então um atacante distribuído entre
 * várias invocações não é de fato barrado por isto. Suficiente só pra
 * abuso grosseiro/de uma sessão só, agora. Se o tráfego ou spam
 * justificarem uma solução de verdade, trocar por um contador
 * compartilhado — Upstash Redis (integra direto com Vercel) é o caminho
 * mais simples; não integrado nesta rodada de propósito.
 */
const WINDOW_MS = 60_000;
const MAX_ATTEMPTS = 5;

const attempts = new Map<string, number[]>();

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (attempts.get(key) ?? []).filter((ts) => now - ts < WINDOW_MS);
  recent.push(now);
  attempts.set(key, recent);
  return recent.length > MAX_ATTEMPTS;
}
