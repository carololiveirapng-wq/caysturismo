import { defineField, defineType } from "sanity";

/**
 * Documento único (singleton, ver `structure.ts`) — a Home inteira num só
 * lugar, agrupada por seção, pra ficar fácil de editar sem significar
 * "cada frase um documento separado". Slogan e data de fundação ficam em
 * `settings` (reaproveitados aqui e em /sobre), não duplicados.
 */
export const home = defineType({
  name: "home",
  title: "Página Inicial",
  type: "document",
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        defineField({
          name: "mediaType",
          title: "Tipo de fundo",
          type: "string",
          options: {
            list: [
              { title: "Imagem única", value: "image" },
              { title: "Slide de imagens (2 ou 3)", value: "images" },
              { title: "Vídeo", value: "video" },
            ],
            layout: "radio",
          },
          initialValue: "image",
          validation: (r) => r.required(),
        }),
        defineField({
          name: "image",
          title: "Imagem",
          type: "imageWithAlt",
          hidden: ({ parent }) => parent?.mediaType !== "image",
          validation: (r) =>
            r.custom((value, ctx) => {
              const parent = ctx.parent as { mediaType?: string } | undefined;
              if (parent?.mediaType === "image" && !value) return "Obrigatório quando o tipo de fundo é Imagem única";
              return true;
            }),
        }),
        defineField({
          name: "images",
          title: "Imagens do slide",
          description: "2 ou 3 imagens — alternam em fade automático no fundo do hero.",
          type: "array",
          of: [{ type: "imageWithAlt" }],
          hidden: ({ parent }) => parent?.mediaType !== "images",
          validation: (r) =>
            r.custom((value, ctx) => {
              const parent = ctx.parent as { mediaType?: string } | undefined;
              if (parent?.mediaType !== "images") return true;
              const count = value?.length ?? 0;
              if (count < 2 || count > 3) return "Use 2 ou 3 imagens pro slide";
              return true;
            }),
        }),
        defineField({
          name: "video",
          title: "Vídeo de fundo",
          description: "MP4/WebM, de preferência curto (até ~15s, em loop) e já comprimido — o arquivo carrega direto no navegador, sem transcodificação.",
          type: "file",
          options: { accept: "video/mp4,video/webm" },
          hidden: ({ parent }) => parent?.mediaType !== "video",
          validation: (r) =>
            r.custom((value, ctx) => {
              const parent = ctx.parent as { mediaType?: string } | undefined;
              if (parent?.mediaType === "video" && !value) return "Obrigatório quando o tipo de fundo é Vídeo";
              return true;
            }),
        }),
        defineField({
          name: "videoPoster",
          title: "Imagem de capa do vídeo",
          description: "Mostrada no celular (o vídeo não toca no mobile, pra economizar dados) e como fallback antes do vídeo carregar.",
          type: "imageWithAlt",
          hidden: ({ parent }) => parent?.mediaType !== "video",
          validation: (r) =>
            r.custom((value, ctx) => {
              const parent = ctx.parent as { mediaType?: string } | undefined;
              if (parent?.mediaType === "video" && !value) return "Obrigatório quando o tipo de fundo é Vídeo";
              return true;
            }),
        }),
        defineField({ name: "title", title: "Título", type: "string", validation: (r) => r.required() }),
        defineField({ name: "text", title: "Texto de apoio", type: "text", rows: 2 }),
        defineField({ name: "ctaLabel", title: "Texto do botão", type: "string" }),
        defineField({ name: "ctaHref", title: "Link do botão", type: "string" }),
      ],
    }),

    defineField({
      name: "travelDiscovery",
      title: "Descubra sua viagem (bloco interativo)",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Título", type: "string" }),
        defineField({ name: "text", title: "Texto curto", type: "text", rows: 2 }),
      ],
    }),

    defineField({
      name: "manifesto",
      title: "Manifesto",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({ name: "heading", title: "Título", type: "string" }),
        defineField({ name: "text", title: "Texto", type: "text", rows: 4, validation: (r) => r.required() }),
      ],
    }),

    defineField({
      name: "positioning",
      title: "Posicionamento (\"Do Altar para a vida toda\")",
      type: "object",
      description: "Parágrafo curto explicando o slogan — o slogan em si e \"desde {ano}\" vêm de Configurações Globais.",
      fields: [
        defineField({ name: "heading", title: "Título", type: "string" }),
        defineField({ name: "text", title: "Texto", type: "text", rows: 3 }),
      ],
    }),

    defineField({
      name: "process",
      title: "Como funciona (processo)",
      type: "object",
      fields: [
        defineField({ name: "heading", title: "Título", type: "string" }),
        defineField({ name: "intro", title: "Introdução", type: "text", rows: 2 }),
        defineField({
          name: "steps",
          title: "Passos",
          type: "array",
          of: [{
            type: "object",
            fields: [
              defineField({ name: "number", title: "Número (ex.: 01)", type: "string" }),
              defineField({ name: "title", title: "Título", type: "string" }),
              defineField({ name: "text", title: "Texto", type: "string" }),
            ],
          }],
        }),
      ],
    }),

    defineField({
      name: "featuredDestinations",
      title: "Destinos em destaque",
      type: "array",
      of: [{ type: "reference", to: [{ type: "destination" }] }],
      description: "Seleção específica da Home — não precisa coincidir com o \"Destaque\" de cada destino individual. Usada quando não há coleções abaixo.",
    }),
    defineField({
      name: "destinationCollections",
      title: "Coleções de destinos (opcional)",
      type: "array",
      description: "Agrupa os destinos em destaque por tema (ex.: \"Clássicos\", \"Praia\") e mostra abas na Home. Deixe vazio pra manter a lista única atual — só crie uma coleção quando o tema for uma decisão real da Cays, nunca um rótulo inventado.",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "title", title: "Título da coleção", type: "string", validation: (r) => r.required() }),
          defineField({ name: "destinations", title: "Destinos", type: "array", of: [{ type: "reference", to: [{ type: "destination" }] }], validation: (r) => r.min(1) }),
        ],
        preview: { select: { title: "title", items: "destinations" }, prepare: ({ title, items }) => ({ title, subtitle: `${items?.length ?? 0} destino(s)` }) },
      }],
    }),
    defineField({
      name: "featuredExperiences",
      title: "Experiências em destaque",
      type: "array",
      of: [{ type: "reference", to: [{ type: "experience" }] }],
    }),
    defineField({
      name: "featuredTravelProducts",
      title: "Viagens em destaque",
      type: "array",
      of: [{ type: "reference", to: [{ type: "travelProduct" }] }],
    }),
    defineField({
      name: "featuredArticles",
      title: "Artigos em destaque",
      type: "array",
      of: [{ type: "reference", to: [{ type: "curadoriaArticle" }] }],
    }),

    defineField({
      name: "travelerStories",
      title: "Histórias de viajantes",
      type: "array",
      description: "Fotos reais de clientes — nunca stock ou geradas por IA. Deixe vazio até haver conteúdo real.",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "image", title: "Foto (real, do cliente)", type: "imageWithAlt", validation: (r) => r.required() }),
          defineField({ name: "caption", title: "Legenda", type: "string", validation: (r) => r.required() }),
          defineField({ name: "clientName", title: "Nome do cliente (opcional)", type: "string" }),
          defineField({ name: "destination", title: "Destino (opcional)", type: "reference", to: [{ type: "destination" }] }),
          defineField({ name: "active", title: "Ativo", type: "boolean", initialValue: true }),
          defineField({ name: "order", title: "Ordem", type: "number" }),
        ],
        preview: { select: { title: "caption", media: "image" } },
      }],
    }),

    defineField({
      name: "beyondItinerary",
      title: "Além do roteiro (serviços)",
      type: "object",
      description: "Faixa curta de serviços complementares confirmados (vistos, seguro, cruzeiros, grupos) — não listar nada que a Cays não ofereça de fato.",
      fields: [
        defineField({ name: "heading", title: "Título", type: "string" }),
        defineField({ name: "text", title: "Texto curto", type: "text", rows: 2 }),
        defineField({ name: "items", title: "Serviços", type: "array", of: [{ type: "string" }] }),
      ],
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
  preview: { prepare: () => ({ title: "Página Inicial" }) },
});
