import { defineField, defineType } from "sanity";

/**
 * Objetos reutilizados por vários schemas — espelham os tipos TS que já
 * existem em `src/types` (DemoImage, BaseContent-like flags, SEO), pra
 * manter o formato que sai do Sanity compatível com o que as páginas já
 * esperam.
 */

/** Equivalente ao `DemoImage` local ({src, alt}) — usar em vez do `image` nativo sempre que o texto alternativo importar (praticamente sempre neste site). */
export const imageWithAlt = defineType({
  name: "imageWithAlt",
  title: "Imagem",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Texto alternativo (obrigatório)",
      type: "string",
      validation: (r) => r.required(),
    }),
  ],
});

export const seoObject = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Título (meta)", type: "string" }),
    defineField({ name: "description", title: "Descrição (meta)", type: "text", rows: 3 }),
  ],
});

export const breadcrumbItem = defineType({
  name: "breadcrumbItem",
  title: "Item de breadcrumb",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Rótulo", type: "string", validation: (r) => r.required() }),
    defineField({ name: "href", title: "Link (opcional — vazio = item atual)", type: "string" }),
  ],
});

export const faqItem = defineType({
  name: "faqItem",
  title: "Pergunta frequente",
  type: "object",
  fields: [
    defineField({ name: "question", title: "Pergunta", type: "string", validation: (r) => r.required() }),
    defineField({ name: "answer", title: "Resposta", type: "text", rows: 3, validation: (r) => r.required() }),
  ],
});
