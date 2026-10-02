import { defineField, defineType } from "sanity";

/**
 * Documento único (singleton, ver `structure.ts`) — conteúdo institucional
 * de /sobre. Slogan e "desde {ano}" seguem só em `settings` (reaproveitados
 * aqui), não duplicados. "Processo" não tem campo aqui de propósito — a
 * página reaproveita os mesmos passos de `home.process`, sem duplicar.
 */
export const aboutPage = defineType({
  name: "aboutPage",
  title: "Página Sobre",
  type: "document",
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow (opcional)", type: "string" }),
        defineField({ name: "title", title: "Título", type: "string", validation: (r) => r.required() }),
        defineField({ name: "text", title: "Texto de apoio", type: "text", rows: 2 }),
        defineField({ name: "image", title: "Imagem (opcional)", type: "imageWithAlt" }),
      ],
    }),

    defineField({
      name: "history",
      title: "História",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Título", type: "string" }),
        defineField({ name: "text", title: "Texto", type: "text", rows: 4 }),
        defineField({
          name: "timeline",
          title: "Linha do tempo",
          type: "array",
          description: "Só marcos reais — nunca inventar um ano intermediário que a Cays não confirmou. \"Ano\" fica vazio quando o marco não tem data definida.",
          of: [{
            type: "object",
            fields: [
              defineField({ name: "year", title: "Ano (opcional, só se for real)", type: "number" }),
              defineField({ name: "label", title: "Rótulo curto", type: "string" }),
              defineField({ name: "title", title: "Título do marco", type: "string", validation: (r) => r.required() }),
              defineField({ name: "text", title: "Texto", type: "string" }),
            ],
            preview: { select: { title: "title", subtitle: "year" } },
          }],
        }),
      ],
    }),

    defineField({
      name: "positioning",
      title: "Posicionamento",
      type: "object",
      description: "Parágrafo curto explicando o slogan — o slogan em si e \"desde {ano}\" vêm de Configurações Globais.",
      fields: [
        defineField({ name: "title", title: "Título", type: "string" }),
        defineField({ name: "text", title: "Texto", type: "text", rows: 3 }),
      ],
    }),

    defineField({
      name: "philosophy",
      title: "Filosofia",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Título", type: "string" }),
        defineField({ name: "text", title: "Texto (opcional)", type: "text", rows: 2 }),
      ],
    }),

    defineField({
      name: "pillars",
      title: "Pilares",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "title", title: "Título", type: "string", validation: (r) => r.required() }),
          defineField({ name: "description", title: "Descrição", type: "text", rows: 2 }),
          defineField({ name: "order", title: "Ordem", type: "number" }),
        ],
        preview: { select: { title: "title", subtitle: "description" } },
      }],
    }),

    defineField({
      name: "finalCta",
      title: "CTA final",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Título", type: "string" }),
        defineField({ name: "text", title: "Texto de apoio", type: "text", rows: 2 }),
        defineField({ name: "ctaLabel", title: "Texto do botão", type: "string" }),
      ],
    }),

    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Página Sobre" }) },
});
