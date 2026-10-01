import { defineField, defineType } from "sanity";

export const experience = defineType({
  name: "experience",
  title: "Experiência",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Nome", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" }, validation: (r) => r.required() }),
    defineField({ name: "active", title: "Ativo", type: "boolean", initialValue: true }),
    defineField({ name: "featured", title: "Destaque", type: "boolean" }),
    defineField({ name: "order", title: "Ordem", type: "number", validation: (r) => r.required() }),

    defineField({
      name: "axis",
      title: "Eixo",
      type: "string",
      options: { list: [{ title: "Ocasião", value: "occasion" }, { title: "Estilo", value: "style" }] },
      validation: (r) => r.required(),
    }),
    defineField({ name: "parent", title: "Experiência pai (opcional)", type: "reference", to: [{ type: "experience" }] }),
    defineField({ name: "breadcrumb", title: "Breadcrumb", type: "array", of: [{ type: "breadcrumbItem" }] }),

    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        defineField({ name: "image", title: "Imagem", type: "imageWithAlt", validation: (r) => r.required() }),
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({ name: "title", title: "Título (H1)", type: "string", validation: (r) => r.required() }),
        defineField({ name: "subtitle", title: "Subtítulo", type: "text", rows: 2 }),
      ],
      validation: (r) => r.required(),
    }),

    defineField({ name: "manifesto", title: "Manifesto curto", type: "text", rows: 3 }),

    defineField({
      name: "steps",
      title: "Como funciona",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "title", title: "Título", type: "string" }),
          defineField({ name: "text", title: "Texto", type: "string" }),
        ],
      }],
    }),

    defineField({
      name: "subtypes",
      title: "Subtipos",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "name", title: "Nome", type: "string" }),
          defineField({ name: "text", title: "Texto", type: "string" }),
          defineField({ name: "image", title: "Imagem", type: "imageWithAlt" }),
        ],
      }],
    }),

    defineField({
      name: "destinations",
      title: "Destinos em destaque",
      type: "array",
      of: [{ type: "reference", to: [{ type: "destination" }] }],
    }),

    defineField({
      name: "monthlyPicks",
      title: "Onde ir por mês",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "month", title: "Mês (1-12)", type: "number", validation: (r) => r.min(1).max(12) }),
          defineField({ name: "destination", title: "Destino", type: "reference", to: [{ type: "destination" }] }),
          defineField({ name: "note", title: "Nota", type: "string" }),
        ],
      }],
    }),

    defineField({
      name: "partnerTypes",
      title: "Tipos de companhia parceira",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "name", title: "Nome", type: "string" }),
          defineField({ name: "text", title: "Texto", type: "string" }),
        ],
      }],
    }),

    defineField({
      name: "journeys",
      title: "Viagens relacionadas",
      type: "array",
      of: [{ type: "reference", to: [{ type: "travelProduct" }] }],
    }),

    defineField({
      name: "articles",
      title: "Artigos relacionados",
      type: "array",
      of: [{ type: "reference", to: [{ type: "curadoriaArticle" }] }],
    }),

    defineField({ name: "faq", title: "FAQ", type: "array", of: [{ type: "faqItem" }] }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: {
    select: { title: "name", axis: "axis", active: "active", featured: "featured", media: "hero.image" },
    prepare: ({ title, axis, active, featured, media }) => {
      const axisLabels: Record<string, string> = { occasion: "Ocasião", style: "Estilo" };
      const parts = [axisLabels[axis as string] ?? axis, active ? "Ativo" : "Inativo", featured ? "Destaque" : null].filter(
        Boolean,
      );
      return { title, subtitle: parts.join(" · "), media };
    },
  },
});
