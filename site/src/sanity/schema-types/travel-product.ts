import { defineField, defineType } from "sanity";

export const travelProduct = defineType({
  name: "travelProduct",
  title: "Viagem",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Título", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug (link da página)",
      type: "slug",
      options: { source: "title" },
      description: "Gera a URL da viagem, ex.: /viagens/japao-em-flor. Evite mudar depois de publicado — quebra o link.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "active",
      title: "Ativo",
      type: "boolean",
      initialValue: true,
      description: "Desmarque pra esconder esta viagem do site sem apagar os dados.",
    }),
    defineField({
      name: "featured",
      title: "Destacar na página inicial",
      type: "boolean",
      description: "Só tem efeito se esta viagem também for selecionada manualmente nos blocos de destaque da Home ou dos hubs.",
    }),
    defineField({
      name: "order",
      title: "Ordem de exibição",
      type: "number",
      description: "Entre as viagens — menor número aparece primeiro.",
      validation: (r) => r.required(),
    }),

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
      title: "Disponibilidade",
      type: "string",
      description: "Vagas/disponibilidade da viagem — diferente de \"Ativo\" acima, que é só se a página existe ou não.",
      options: { list: [
        { title: "Disponível", value: "active" },
        { title: "Últimas vagas", value: "few-spots" },
        { title: "Esgotado", value: "sold-out" },
        { title: "Encerrado", value: "expired" },
      ] },
      initialValue: "active",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "eyebrow",
      title: "Texto pequeno acima do título (eyebrow)",
      type: "string",
      description: "Ex.: \"Lua de Mel\" ou \"Sob medida\" — aparece pequeno, acima do título principal.",
    }),

    defineField({ name: "destinations", title: "Destinos", type: "array", of: [{ type: "reference", to: [{ type: "destination" }] }] }),
    defineField({ name: "experiences", title: "Experiências", type: "array", of: [{ type: "reference", to: [{ type: "experience" }] }] }),

    defineField({
      name: "breadcrumb",
      title: "Trilha de navegação (breadcrumb)",
      type: "array",
      of: [{ type: "breadcrumbItem" }],
      description: "Os links no topo da página (Home › Viagens › ...). Normalmente não precisa editar.",
    }),
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
            title: "Disponibilidade desta data",
            type: "string",
            description: "Vagas desta saída específica — pode ser diferente da disponibilidade geral da viagem.",
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
    defineField({
      name: "priceFrom",
      title: "\"A partir de\"",
      type: "string",
      description: "Texto livre (ex.: \"A partir de R$ 8.900\") — nunca um valor final inventado.",
    }),
    defineField({ name: "supplier", title: "Fornecedor", type: "string" }),
    defineField({ name: "ship", title: "Navio (cruzeiro)", type: "string" }),
    defineField({ name: "embarkation", title: "Porto de embarque (cruzeiro)", type: "string" }),
    defineField({ name: "disembarkation", title: "Porto de desembarque (cruzeiro)", type: "string" }),

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
