import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Webhook do Sanity → revalidation do Next.js. Configurar em
 * sanity.io/manage/project/<id>/api/webhooks:
 *
 *   URL: https://<domínio>/api/revalidate?secret=<SANITY_REVALIDATE_SECRET>
 *   Dataset: production
 *   Trigger on: Create, Update, Delete
 *   Filter: _type in ["destination", "experience", "travelProduct", "curadoriaArticle", "settings"]
 *   Projection: { "type": _type, "slug": slug.current }
 *
 * O secret vai na query string (não só num header) porque o painel de
 * webhooks do Sanity deixa configurar a URL completa de forma simples sem
 * precisar de headers customizados — ainda assim nunca aceita o request
 * sem ele, então o endpoint não fica aberto.
 */

const TYPE_TO_LIST_PATH: Record<string, string> = {
  destination: "/destinos",
  experience: "/experiencias",
  travelProduct: "/viagens",
  curadoriaArticle: "/curadoria",
};

const TYPE_TO_DETAIL_PREFIX: Record<string, string> = {
  destination: "/destinos",
  experience: "/experiencias",
  travelProduct: "/viagens",
  curadoriaArticle: "/curadoria",
};

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const expectedSecret = process.env.SANITY_REVALIDATE_SECRET;

  if (!expectedSecret) {
    return NextResponse.json({ error: "SANITY_REVALIDATE_SECRET não configurado no servidor" }, { status: 500 });
  }
  if (secret !== expectedSecret) {
    return NextResponse.json({ error: "Secret inválido" }, { status: 401 });
  }

  let body: { type?: string; slug?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Corpo da requisição inválido (esperado JSON)" }, { status: 400 });
  }

  const { type, slug } = body;
  if (!type) {
    return NextResponse.json({ error: "Campo 'type' ausente no payload" }, { status: 400 });
  }

  const revalidated: string[] = [];

  if (type === "settings") {
    // Settings alimenta o Header/Footer/WhatsApp em TODA página pública,
    // via o layout raiz — revalidar o layout propaga pra árvore inteira.
    revalidatePath("/", "layout");
    revalidated.push("/ (layout)");
  } else {
    const listPath = TYPE_TO_LIST_PATH[type];
    const detailPrefix = TYPE_TO_DETAIL_PREFIX[type];

    if (!listPath || !detailPrefix) {
      return NextResponse.json({ error: `Tipo desconhecido: ${type}` }, { status: 400 });
    }

    revalidatePath(listPath);
    revalidated.push(listPath);

    if (slug) {
      const detailPath = `${detailPrefix}/${slug}`;
      revalidatePath(detailPath);
      revalidated.push(detailPath);
    }

    // Home referencia destinos/experiências/viagens/curadoria em destaque.
    revalidatePath("/");
    revalidated.push("/");
  }

  return NextResponse.json({ revalidated, type, slug: slug ?? null });
}
