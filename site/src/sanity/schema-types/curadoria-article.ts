import { defineField, defineType } from "sanity";

export const curadoriaArticle = defineType({
  name: "curadoriaArticle",
  title: "Artigo da Curadoria",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Título", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "active", title: "Ativo", type: "boolean", initialValue: true }),
    defineField({ name: "featured", title: "Destaque", type: "boolean" }),
    defineField({ name: "order", title: "Ordem", type: "number", validation: (r) => r.required() }),

    defineField({
      name: "category",
      title: "Categoria",
      type: "string",
      options: { list: ["Guias", "Melhor época", "Histórias", "Novidades"] },
      validation: (r) => r.required(),
    }),
    defineField({ name: "destinations", title: "Destinos", type: "array", of: [{ type: "reference", to: [{ type: "destination" }] }] }),
    defineField({ name: "experiences", title: "Experiências", type: "array", of: [{ type: "reference", to: [{ type: "experience" }] }] }),

    defineField({
      name: "author",
      title: "Autor (voz institucional — ex. \"Curadoria Cays\", nunca uma pessoa inventada)",
      type: "string",
    }),
    defineField({ name: "publishedAt", title: "Publicado em", type: "date" }),
    defineField({ name: "updatedAt", title: "Atualizado em", type: "date" }),
    defineField({ name: "readingTime", title: "Tempo de leitura (min)", type: "number" }),

    defineField({ name: "heroImage", title: "Imagem de capa", type: "imageWithAlt", validation: (r) => r.required() }),
    defineField({ name: "excerpt", title: "Resumo", type: "text", rows: 2, validation: (r) => r.required() }),
    defineField({ name: "breadcrumb", title: "Breadcrumb", type: "array", of: [{ type: "breadcrumbItem" }] }),

    defineField({
      name: "sections",
      title: "Corpo do artigo (seções em blocos)",
      type: "array",
      of: [{ type: "articleSection" }],
      validation: (r) => r.min(1),
    }),

    defineField({ name: "faq", title: "FAQ", type: "array", of: [{ type: "faqItem" }] }),
    defineField({ name: "relatedTravelProducts", title: "Viagens relacionadas", type: "array", of: [{ type: "reference", to: [{ type: "travelProduct" }] }] }),
    defineField({ name: "relatedDestination", title: "Destino relacionado", type: "reference", to: [{ type: "destination" }] }),
    defineField({ name: "relatedArticles", title: "Artigos relacionados", type: "array", of: [{ type: "reference", to: [{ type: "curadoriaArticle" }] }] }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: {
    select: { title: "title", category: "category", active: "active", featured: "featured", media: "heroImage" },
    prepare: ({ title, category, active, featured, media }) => {
      const parts = [category, active ? "Ativo" : "Inativo", featured ? "Destaque" : null].filter(Boolean);
      return { title, subtitle: parts.join(" · "), media };
    },
  },
});
