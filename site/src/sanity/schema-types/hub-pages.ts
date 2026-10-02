import { defineField, defineType, type SchemaTypeDefinition } from "sanity";

/**
 * As 4 páginas-hub (Destinos/Experiências/Viagens/Curadoria) têm a mesma
 * estrutura mínima — hero + SEO — então compartilham este factory em vez de
 * repetir o schema 4 vezes. As listas de conteúdo de cada hub continuam
 * vindo das próprias coleções (destination/experience/travelProduct/
 * curadoriaArticle), nunca duplicadas aqui.
 */
function hubPageType(name: string, title: string): SchemaTypeDefinition {
  return defineType({
    name,
    title,
    type: "document",
    fields: [
      defineField({
        name: "hero",
        title: "Hero",
        type: "object",
        fields: [
          defineField({ name: "eyebrow", title: "Eyebrow (opcional)", type: "string" }),
          defineField({ name: "title", title: "Título", type: "string", validation: (r) => r.required() }),
          defineField({ name: "text", title: "Texto de apoio (opcional)", type: "text", rows: 2 }),
          defineField({ name: "image", title: "Imagem", type: "imageWithAlt", validation: (r) => r.required() }),
        ],
      }),
      defineField({ name: "seo", title: "SEO", type: "seo" }),
    ],
    preview: { prepare: () => ({ title }) },
  });
}

export const destinationHub = hubPageType("destinationHub", "Página Destinos");
export const experienceHub = hubPageType("experienceHub", "Página Experiências");
export const travelHub = hubPageType("travelHub", "Página Viagens");
export const curadoriaHub = hubPageType("curadoriaHub", "Página Curadoria");
