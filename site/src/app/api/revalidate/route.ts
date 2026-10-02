import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { sanityClient } from "@/sanity/client";

/**
 * Webhook do Sanity → revalidation do Next.js. Configurar em
 * sanity.io/manage/project/<id>/api/webhooks:
 *
 *   URL: https://<domínio>/api/revalidate?secret=<SANITY_REVALIDATE_SECRET>
 *   Dataset: production
 *   Trigger on: Create, Update, Delete
 *   Filter: _type in ["destination", "experience", "travelProduct", "curadoriaArticle", "settings", "hotel", "home", "testimonial", "person", "aboutPage", "destinationHub", "experienceHub", "travelHub", "curadoriaHub"]
 *   Projection: { "type": _type, "id": _id, "slug": slug.current }
 *
 * O secret vai na query string (não só num header) porque o painel de
 * webhooks do Sanity deixa configurar a URL completa de forma simples sem
 * precisar de headers customizados — ainda assim nunca aceita o request
 * sem ele, então o endpoint não fica aberto.
 *
 * `hotel` não tem página própria — é referenciado de dentro de
 * destination/travelProduct (`stays[]`). Publicar um hotel busca quem o
 * referencia (`*[references($id)]`) e revalida essas páginas dependentes,
 * em vez de precisar listar manualmente onde cada hotel aparece.
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

/** Páginas singleton própria — editar só revalida a página delas, nada mais. */
const SINGLETON_TYPE_TO_PATH: Record<string, string> = {
  aboutPage: "/sobre",
  destinationHub: "/destinos",
  experienceHub: "/experiencias",
  travelHub: "/viagens",
  curadoriaHub: "/curadoria",
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

  let body: { type?: string; slug?: string; id?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Corpo da requisição inválido (esperado JSON)" }, { status: 400 });
  }

  const { type, slug, id } = body;
  if (!type) {
    return NextResponse.json({ error: "Campo 'type' ausente no payload" }, { status: 400 });
  }

  const revalidated: string[] = [];

  if (type === "settings") {
    // Settings alimenta o Header/Footer/WhatsApp em TODA página pública,
    // via o layout raiz — revalidar o layout propaga pra árvore inteira,
    // incluindo slogan/"Desde {ano}" usados na Home e em /sobre.
    revalidatePath("/", "layout");
    revalidated.push("/ (layout)");
  } else if (type === "home") {
    // Singleton — sem página de detalhe própria, só a Home em si.
    revalidatePath("/");
    revalidated.push("/");
  } else if (type === "testimonial") {
    // Depoimentos aparecem na Home, em /sobre e na lateral de /contato.
    revalidatePath("/");
    revalidatePath("/sobre");
    revalidatePath("/contato");
    revalidated.push("/", "/sobre", "/contato");
  } else if (type === "person") {
    // Equipe só aparece em /sobre.
    revalidatePath("/sobre");
    revalidated.push("/sobre");
  } else if (type in SINGLETON_TYPE_TO_PATH) {
    const path = SINGLETON_TYPE_TO_PATH[type];
    revalidatePath(path);
    revalidated.push(path);
  } else if (type === "hotel") {
    if (!id || !sanityClient) {
      return NextResponse.json({ error: "Campo 'id' ausente no payload (necessário pra resolver dependentes de hotel)" }, { status: 400 });
    }
    const dependents = await sanityClient.fetch<{ _type: string; slug: string | null }[]>(
      `*[references($id)]{ _type, "slug": slug.current }`,
      { id },
    );
    for (const dep of dependents) {
      const prefix = TYPE_TO_DETAIL_PREFIX[dep._type];
      if (prefix && dep.slug) {
        const path = `${prefix}/${dep.slug}`;
        revalidatePath(path);
        revalidated.push(path);
      }
    }
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
