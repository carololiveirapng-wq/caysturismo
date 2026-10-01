import { defineField, defineType } from "sanity";

export const destination = defineType({
  name: "destination",
  title: "Destino",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Nome", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" }, validation: (r) => r.required() }),
    defineField({ name: "active", title: "Ativo", type: "boolean", initialValue: true }),
    defineField({ name: "featured", title: "Destaque", type: "boolean" }),
    defineField({ name: "order", title: "Ordem", type: "number", validation: (r) => r.required() }),

    defineField({
      name: "type",
      title: "Nível geográfico",
      type: "string",
      options: {
        list: [
          { title: "Continente", value: "continent" },
          { title: "Região", value: "region" },
          { title: "País", value: "country" },
          { title: "Cidade", value: "city" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "parent", title: "Destino pai", type: "reference", to: [{ type: "destination" }] }),
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
        defineField({ name: "seasonLabel", title: "Selo de temporada", type: "string" }),
      ],
      validation: (r) => r.required(),
    }),

    defineField({
      name: "introduction",
      title: "Introdução editorial",
      type: "object",
      fields: [
        defineField({ name: "heading", title: "Título", type: "string" }),
        defineField({ name: "text", title: "Texto", type: "text", rows: 4 }),
      ],
    }),

    defineField({
      name: "keyInfo",
      title: "Informações-chave",
      type: "object",
      fields: [
        { name: "bestTime", title: "Melhor época" },
        { name: "suggestedDuration", title: "Duração sugerida" },
        { name: "timeZone", title: "Fuso horário" },
        { name: "currency", title: "Moeda" },
        { name: "language", title: "Idioma" },
        { name: "visa", title: "Visto" },
        { name: "vaccines", title: "Vacinas" },
        { name: "electricity", title: "Eletricidade" },
        { name: "flightFromBrazil", title: "Voo a partir do Brasil" },
      ].map(({ name, title }) => defineField({ name, title, type: "string" })),
    }),

    defineField({
      name: "whyCays",
      title: "Por que a Cays",
      type: "object",
      fields: [
        defineField({ name: "heading", title: "Título", type: "string" }),
        defineField({ name: "image", title: "Imagem", type: "imageWithAlt" }),
        defineField({
          name: "items",
          title: "Argumentos",
          type: "array",
          of: [{
            type: "object",
            fields: [
              defineField({ name: "title", title: "Título", type: "string" }),
              defineField({ name: "text", title: "Texto", type: "text", rows: 2 }),
            ],
          }],
        }),
      ],
    }),

    defineField({
      name: "journeys",
      title: "Jornadas sugeridas",
      type: "array",
      of: [{ type: "reference", to: [{ type: "travelProduct" }] }],
    }),

    defineField({
      name: "experiences",
      title: "O que viver",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "title", title: "Título", type: "string" }),
          defineField({ name: "text", title: "Texto", type: "string" }),
          defineField({ name: "image", title: "Imagem", type: "imageWithAlt" }),
        ],
      }],
    }),

    defineField({
      name: "stays",
      title: "Onde ficar",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "name", title: "Nome", type: "string" }),
          defineField({ name: "region", title: "Região", type: "string" }),
          defineField({ name: "text", title: "Texto", type: "string" }),
          defineField({ name: "image", title: "Imagem", type: "imageWithAlt" }),
        ],
      }],
    }),

    defineField({
      name: "months",
      title: "Quando ir",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "month", title: "Mês (1-12)", type: "number", validation: (r) => r.min(1).max(12) }),
          defineField({
            name: "status",
            title: "Status",
            type: "string",
            options: {
              list: [
                { title: "Ideal", value: "ideal" },
                { title: "Bom", value: "good" },
                { title: "Evitar", value: "avoid" },
              ],
            },
          }),
          defineField({ name: "note", title: "Nota", type: "string" }),
        ],
      }],
    }),

    defineField({
      name: "articles",
      title: "Artigos relacionados",
      type: "array",
      of: [{ type: "reference", to: [{ type: "curadoriaArticle" }] }],
    }),

    defineField({ name: "faq", title: "FAQ", type: "array", of: [{ type: "faqItem" }] }),

    defineField({
      name: "relatedDestinations",
      title: "Destinos relacionados",
      type: "array",
      of: [{ type: "reference", to: [{ type: "destination" }] }],
    }),

    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: {
    select: { title: "name", type: "type", active: "active", featured: "featured", media: "hero.image" },
    prepare: ({ title, type, active, featured, media }) => {
      const typeLabels: Record<string, string> = {
        continent: "Continente",
        region: "Região",
        country: "País",
        city: "Cidade",
      };
      const parts = [typeLabels[type as string] ?? type, active ? "Ativo" : "Inativo", featured ? "Destaque" : null].filter(
        Boolean,
      );
      return { title, subtitle: parts.join(" · "), media };
    },
  },
});
