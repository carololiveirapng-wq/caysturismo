import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Mapeamento 1:1 do block system local (`src/types/curadoria-article.ts`)
 * pra objects do Sanity — juntos formam o array `body` de cada seção do
 * artigo (ver `curadoria-article.ts`).
 *
 * `richTextBlock` usa Portable Text nativo (campo `content`, array de
 * `block`) — parágrafo, H2/H3, negrito, itálico, link e listas. O conjunto
 * é deliberadamente restrito (sem cores, tabelas, etc.) pra manter o editor
 * simples e o visual do artigo consistente; ver `ArticleBlocks` no frontend
 * pros componentes que estilizam cada marca/estilo.
 */

export const richTextBlock = defineType({
  name: "richTextBlock",
  title: "Texto",
  type: "object",
  fields: [
    defineField({
      name: "content",
      title: "Conteúdo",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Título 2", value: "h2" },
            { title: "Título 3", value: "h3" },
          ],
          lists: [
            { title: "Lista", value: "bullet" },
            { title: "Lista numerada", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Negrito", value: "strong" },
              { title: "Itálico", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  defineField({
                    name: "href",
                    title: "URL (ex.: /contato?destino=japao ou https://...)",
                    type: "string",
                    validation: (r) => r.required(),
                  }),
                ],
              },
            ],
          },
        }),
      ],
      validation: (r) => r.required().min(1),
    }),
  ],
  preview: { select: { title: "content.0.children.0.text" }, prepare: ({ title }) => ({ title: title || "Texto" }) },
});

export const imageFullBlock = defineType({
  name: "imageFullBlock",
  title: "Imagem cheia",
  type: "object",
  fields: [
    defineField({ name: "image", title: "Imagem", type: "imageWithAlt", validation: (r) => r.required() }),
    defineField({ name: "caption", title: "Legenda", type: "string" }),
  ],
  preview: { select: { media: "image", title: "caption" }, prepare: ({ media, title }) => ({ title: title || "Imagem cheia", media }) },
});

export const imageTextBlock = defineType({
  name: "imageTextBlock",
  title: "Imagem + texto",
  type: "object",
  fields: [
    defineField({ name: "image", title: "Imagem", type: "imageWithAlt", validation: (r) => r.required() }),
    defineField({ name: "heading", title: "Título curto", type: "string" }),
    defineField({ name: "text", title: "Texto", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({
      name: "imagePosition",
      title: "Posição da imagem",
      type: "string",
      options: { list: [{ title: "Esquerda", value: "left" }, { title: "Direita", value: "right" }] },
      initialValue: "left",
    }),
  ],
  preview: { select: { media: "image", title: "heading", subtitle: "text" } },
});

export const galleryBlock = defineType({
  name: "galleryBlock",
  title: "Galeria",
  type: "object",
  fields: [
    defineField({
      name: "images",
      title: "Imagens",
      type: "array",
      of: [{ type: "imageWithAlt" }],
      validation: (r) => r.min(2),
    }),
  ],
  preview: { select: { media: "images.0" }, prepare: ({ media }) => ({ title: "Galeria", media }) },
});

export const quoteBlock = defineType({
  name: "quoteBlock",
  title: "Citação",
  type: "object",
  fields: [
    defineField({ name: "text", title: "Texto", type: "text", rows: 2, validation: (r) => r.required() }),
    defineField({ name: "author", title: "Autor (opcional)", type: "string" }),
  ],
  preview: { select: { title: "text" } },
});

export const expertNoteBlock = defineType({
  name: "expertNoteBlock",
  title: "Nota da curadoria",
  type: "object",
  fields: [
    defineField({ name: "text", title: "Texto", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({ name: "author", title: "Assinatura (ex.: \"Curadoria Cays\")", type: "string" }),
  ],
  preview: { select: { title: "text" }, prepare: ({ title }) => ({ title: `Nota: ${title}` }) },
});

export const ctaBlock = defineType({
  name: "ctaBlock",
  title: "CTA contextual",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Título", type: "string", validation: (r) => r.required() }),
    defineField({ name: "supporting", title: "Texto de apoio", type: "string" }),
    defineField({ name: "ctaLabel", title: "Texto do botão", type: "string", validation: (r) => r.required() }),
    defineField({ name: "ctaHref", title: "Link (ex.: /contato?destino=japao)", type: "string", validation: (r) => r.required() }),
  ],
  preview: { select: { title: "title" }, prepare: ({ title }) => ({ title: `CTA: ${title}` }) },
});

export const travelCardBlock = defineType({
  name: "travelCardBlock",
  title: "Card de viagem",
  type: "object",
  fields: [
    defineField({ name: "product", title: "Viagem", type: "reference", to: [{ type: "travelProduct" }], validation: (r) => r.required() }),
  ],
  preview: {
    select: { title: "product.title", media: "product.gallery.0" },
    prepare: ({ title, media }) => ({ title: `Viagem: ${title ?? "—"}`, media }),
  },
});

export const destinationCardBlock = defineType({
  name: "destinationCardBlock",
  title: "Card de destino",
  type: "object",
  fields: [
    defineField({ name: "destination", title: "Destino", type: "reference", to: [{ type: "destination" }], validation: (r) => r.required() }),
  ],
  preview: {
    select: { title: "destination.name", media: "destination.hero.image" },
    prepare: ({ title, media }) => ({ title: `Destino: ${title ?? "—"}`, media }),
  },
});

/** Union usado no campo `body` de cada seção do artigo — a lista completa de blocos suportados. */
export const articleBodyTypes = [
  { type: "richTextBlock" },
  { type: "imageFullBlock" },
  { type: "imageTextBlock" },
  { type: "galleryBlock" },
  { type: "quoteBlock" },
  { type: "expertNoteBlock" },
  { type: "ctaBlock" },
  { type: "travelCardBlock" },
  { type: "destinationCardBlock" },
] as const;

export const articleSection = defineType({
  name: "articleSection",
  title: "Seção",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Título da seção (aparece também no índice)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "body", title: "Conteúdo", type: "array", of: [...articleBodyTypes] }),
  ],
  preview: { select: { title: "heading" } },
});
