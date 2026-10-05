import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * História de viajante — documento editorial, separado do `travelerStories`
 * da Home (que é um array embutido, sem slug nem página).
 *
 * Regra de publicação: `active` só pode ser `true` com autorização confirmada
 * (status "autorizada" + data). Sem isso, o documento não passa na validação
 * do Studio e não deve ser consumido pelo site público.
 */
export const travelerStory = defineType({
  name: "travelerStory",
  title: "História de viajante",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Título", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "summary",
      title: "Resumo curto",
      type: "text",
      rows: 2,
      description: "Uma ou duas frases para cards e prévias.",
      validation: (r) => r.max(240),
    }),
    defineField({
      name: "body",
      title: "Texto editorial",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Título", value: "h2" },
            { title: "Subtítulo", value: "h3" },
          ],
          marks: { decorators: [{ title: "Negrito", value: "strong" }, { title: "Itálico", value: "em" }] },
        }),
      ],
    }),
    defineField({
      name: "destination",
      title: "Destino relacionado",
      type: "reference",
      to: [{ type: "destination" }],
    }),
    defineField({
      name: "experience",
      title: "Experiência relacionada",
      type: "reference",
      to: [{ type: "experience" }],
    }),
    defineField({
      name: "travelYear",
      title: "Ano da viagem",
      type: "number",
      validation: (r) => r.integer().min(1997).max(new Date().getFullYear() + 1),
    }),
    defineField({
      name: "displayName",
      title: "Nome exibido",
      type: "string",
      description: "Como o nome aparece no site (ex.: primeiro nome ou iniciais). Só preencher conforme a autorização.",
    }),
    defineField({
      name: "mainImage",
      title: "Imagem principal",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Texto alternativo", type: "string", validation: (r) => r.required() })],
    }),
    defineField({
      name: "gallery",
      title: "Galeria (opcional)",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", title: "Texto alternativo", type: "string", validation: (r) => r.required() })],
        },
      ],
      validation: (r) => r.max(8),
    }),
    defineField({
      name: "highlightQuote",
      title: "Frase destacada",
      type: "text",
      rows: 2,
      description: "Só usar frase que o cliente tenha autorizado publicar.",
    }),
    defineField({
      name: "authorization",
      title: "Autorização de publicação",
      type: "object",
      group: "legal",
      fields: [
        defineField({
          name: "status",
          title: "Status",
          type: "string",
          initialValue: "pendente",
          options: {
            list: [
              { title: "Pendente", value: "pendente" },
              { title: "Autorizada", value: "autorizada" },
              { title: "Negada", value: "negada" },
            ],
            layout: "radio",
          },
          validation: (r) => r.required(),
        }),
        defineField({ name: "authorizedAt", title: "Data da autorização", type: "date" }),
        defineField({
          name: "scope",
          title: "Escopo autorizado",
          type: "text",
          rows: 3,
          description: "O que foi autorizado: nomes, fotos, depoimento, galeria.",
        }),
      ],
    }),
    defineField({
      name: "internalNote",
      title: "Observação interna (nunca exibida no site)",
      type: "text",
      rows: 3,
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
    defineField({
      name: "order",
      title: "Ordem",
      type: "number",
    }),
    defineField({
      name: "active",
      title: "Ativa no site",
      type: "boolean",
      initialValue: false,
    }),
  ],
  groups: [{ name: "legal", title: "Autorização" }],
  validation: (Rule) =>
    Rule.custom((doc) => {
      const story = doc as
        | { active?: boolean; displayName?: string; authorization?: { status?: string; authorizedAt?: string } }
        | undefined;
      if (!story?.active) return true;
      if (story.authorization?.status !== "autorizada") {
        return "Não é possível ativar sem autorização confirmada (status \"Autorizada\").";
      }
      if (!story.authorization.authorizedAt) {
        return "Informe a data da autorização antes de ativar.";
      }
      if (!story.displayName) {
        return "Informe o nome exibido antes de ativar.";
      }
      return true;
    }),
  preview: {
    select: { title: "title", status: "authorization.status", active: "active" },
    prepare({ title, status, active }) {
      const label = status === "autorizada" ? "autorizada" : status ?? "pendente";
      return { title, subtitle: `${label}${active ? " · ativa" : " · inativa"}` };
    },
  },
});
