import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ATTRIBUTION_COOKIE } from "@/lib/leads/attribution";
import { updateSupabaseSession } from "@/lib/supabase/middleware";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 dias

/**
 * Captura UTMs na primeira página com esses parâmetros e guarda num cookie
 * first-party (httpOnly — só o server action de /contato precisa ler).
 * Modelo "first touch": se o cookie já existir, não sobrescreve — assim uma
 * navegação interna sem UTM não apaga a origem original da sessão.
 *
 * Também protege /admin: sem sessão Supabase válida, redireciona pro login
 * antes de qualquer página do painel renderizar — a própria página nunca
 * chega a rodar sem usuário autenticado, então não tem risco de um
 * Server Component "esquecer" de checar.
 */
export async function proxy(request: NextRequest) {
  const { searchParams, pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const { response, user } = await updateSupabaseSession(request);
    if (!user) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return response;
  }

  const hasUtm = UTM_KEYS.some((key) => searchParams.has(key));
  const response = NextResponse.next();

  if (hasUtm && !request.cookies.has(ATTRIBUTION_COOKIE)) {
    const attribution = {
      utmSource: searchParams.get("utm_source") ?? undefined,
      utmMedium: searchParams.get("utm_medium") ?? undefined,
      utmCampaign: searchParams.get("utm_campaign") ?? undefined,
      utmContent: searchParams.get("utm_content") ?? undefined,
      utmTerm: searchParams.get("utm_term") ?? undefined,
      landingPath: pathname,
    };
    response.cookies.set(ATTRIBUTION_COOKIE, JSON.stringify(attribution), {
      maxAge: COOKIE_MAX_AGE,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
  }

  return response;
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico|studio).*)",
};
