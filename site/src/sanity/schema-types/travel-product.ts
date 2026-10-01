import { defineField, defineType } from "sanity";

export const travelProduct = defineType({
  name: "travelProduct",
  title: "Viagem",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Título", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "active", title: "Ativo", type: "boolean", initialValue: true }),
    defineField({ name: "featured", title: "Destaque", type: "boolean" }),
    defineField({ name: "order", title: "Ordem", type: "number", validation: (r) => r.required() }),

    defineField({
      name: "type",
      title: "Tipo",
      type: "string",
      options: { list: [
        { title: "Sob medida", value: "custom" },
        { title: "Data fixa", value: "fixed-date" },
        { title: "Oferta", value: "offer" },
      ] },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: { list: [
        { title: "Disponível", value: "active" },
        { title: "Últimas vagas", value: "few-spots" },
        { title: "Esgotado", value: "sold-out" },
        { title: "Encerrado", value: "expired" },
      ] },
      initialValue: "active",
      validation: (r) => r.required(),
    }),
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),

    defineField({ name: "destinations", title: "Destinos", type: "array", of: [{ type: "reference", to: [{ type: "destination" }] }] }),
    defineField({ name: "experiences", title: "Experiências", type: "array", of: [{ type: "reference", to: [{ type: "experience" }] }] }),

    defineField({ name: "breadcrumb", title: "Breadcrumb", type: "array", of: [{ type: "breadcrumbItem" }] }),
    defineField({ name: "gallery", title: "Galeria", type: "array", of: [{ type: "imageWithAlt" }], validation: (r) => r.min(1) }),
    defineField({ name: "subtitle", title: "Subtítulo", type: "text", rows: 2 }),

    defineField({ name: "duration", title: "Duração", type: "string" }),
    defineField({ name: "bestMonths", title: "Melhores meses (sob medida)", type: "string" }),
    defineField({
      name: "departures",
      title: "Datas de saída (data fixa)",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "label", title: "Rótulo", type: "string" }),
          defineField({
            name: "status",
            title: "Status",
            type: "string",
            options: {
              list: [
                { title: "Disponível", value: "active" },
                { title: "Últimas vagas", value: "few-spots" },
                { title: "Esgotado", value: "sold-out" },
                { title: "Encerrado", value: "expired" },
              ],
            },
          }),
        ],
      }],
    }),
    defineField({ name: "priceFrom", title: "\"A partir de\" (texto — nunca valor final inventado)", type: "string" }),
    defineField({ name: "supplier", title: "Fornecedor", type: "string" }),
    defineField({ name: "ship", title: "Navio", type: "string" }),
    defineField({ name: "embarkation", title: "Embarque", type: "string" }),
    defineField({ name: "disembarkation", title: "Desembarque", type: "string" }),

    defineField({ name: "overview", title: "Visão geral", type: "text", rows: 4 }),
    defineField({
      name: "highlights",
      title: "Destaques",
      type: "array",
      of: [{ type: "object", fields: [
        defineField({ name: "title", title: "Título", type: "string" }),
        defineField({ name: "text", title: "Texto", type: "string" }),
      ] }],
    }),
    defineField({
      name: "itinerary",
      title: "Roteiro",
      type: "array",
      of: [{ type: "object", fields: [
        defineField({ name: "label", title: "Rótulo (ex.: \"Dias 1–3\" ou \"Dia 1\")", type: "string" }),
        defineField({ name: "place", title: "Lugar", type: "string" }),
        defineField({ name: "text", title: "Texto", type: "string" }),
        defineField({ name: "tag", title: "Tag (ex.: Embarque/Desembarque)", type: "string" }),
      ] }],
    }),
    defineField({
      name: "stays",
      title: "Hospedagem (sob medida)",
      type: "array",
      of: [{ type: "reference", to: [{ type: "hotel" }] }],
      description: "Referencia hotéis cadastrados em Hotéis — evita repetir nome/imagem/descrição do mesmo hotel em vários destinos/viagens.",
    }),
    defineField({
      name: "cabinCategories",
      title: "Categorias de cabine (cruzeiro)",
      type: "array",
      of: [{ type: "object", fields: [
        defineField({ name: "name", title: "Nome", type: "string" }),
        defineField({ name: "text", title: "Texto", type: "string" }),
      ] }],
    }),
    defineField({ name: "inclusions", title: "Inclui", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "exclusions", title: "Não inclui", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "related", title: "Viagens relacionadas", type: "array", of: [{ type: "reference", to: [{ type: "travelProduct" }] }] }),
    defineField({ name: "articles", title: "Curadoria relacionada", type: "array", of: [{ type: "reference", to: [{ type: "curadoriaArticle" }] }] }),
    defineField({ name: "faq", title: "FAQ", type: "array", of: [{ type: "faqItem" }] }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: {
    select: { title: "title", type: "type", status: "status", active: "active", media: "gallery.0" },
    prepare: ({ title, type, status, active, media }) => {
      const typeLabels: Record<string, string> = { custom: "Sob medida", "fixed-date": "Data fixa", offer: "Oferta" };
      const statusLabels: Record<string, string> = {
        active: "Disponível",
        "few-spots": "Últimas vagas",
        "sold-out": "Esgotado",
        expired: "Encerrado",
      };
      const parts = [
        typeLabels[type as string] ?? type,
        statusLabels[status as string] ?? status,
        active ? "Ativa" : "Inativa",
      ].filter(Boolean);
      return { title, subtitle: parts.join(" · "), media };
    },
  },
});
