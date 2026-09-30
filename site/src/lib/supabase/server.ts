import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

/**
 * Cliente Supabase para Server Components/Actions — só usado pra sessão de
 * autenticação do /admin (login/logout/checar usuário). Nunca usado pra
 * dados de leads: isso continua indo direto no Postgres via `postgres`
 * (ver src/lib/admin/leads-queries.ts), sem depender do client do Supabase.
 */
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Chamado de dentro de um Server Component (sem permissão de
            // escrever cookie) — inofensivo aqui porque o middleware
            // (src/proxy.ts) já cuida de renovar a sessão a cada request.
          }
        },
      },
    },
  );
}
