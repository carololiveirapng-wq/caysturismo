import { defineField, defineType, type SchemaTypeDefinition } from "sanity";

/**
 * As 4 páginas-hub (Destinos/Experiências/Viagens/Curadoria) têm a mesma
 * estrutura mínima — hero + SEO — então compartilham este factory em vez de
 * repetir o schema 4 vezes. As listas de conteúdo de cada hub continuam
 * vindo das próprias coleções (destination/experience/travelProduct/
 * curadoriaArticle), nunca duplicadas aqui. `extraFields` adiciona campos
 * só pro hub que precisa (ex.: os blocos de destaque curados de /destinos
 * e /curadoria), sem forçar os outros 2 hubs a carregar algo que não usam.
 */
function hubPageType(name: string, title: string, extraFields: ReturnType<typeof defineField>[] = []): SchemaTypeDefinition {
  return defineType({
    name,
    title,
    type: "document",
    fields: [
      defineField({
        name: "hero",
        title: "Hero",
        type: "object",
        fields: [
          defineField({ name: "eyebrow", title: "Eyebrow (opcional)", type: "string" }),
          defineField({ name: "title", title: "Título", type: "string", validation: (r) => r.required() }),
          defineField({ name: "text", title: "Texto de apoio (opcional)", type: "text", rows: 2 }),
          defineField({ name: "image", title: "Imagem", type: "imageWithAlt", validation: (r) => r.required() }),
        ],
      }),
      ...extraFields,
      defineField({ name: "seo", title: "SEO", type: "seo" }),
    ],
    preview: { prepare: () => ({ title }) },
  });
}

const spotlightExperiences = defineField({
  name: "spotlightExperiences",
  title: "Experiências em destaque nesta página",
  type: "array",
  description: "Bloco \"Viajar por experiência\" — escolha reais, não precisa preencher todas. Vazio = bloco some da página.",
  of: [{ type: "reference", to: [{ type: "experience" }] }],
});

const spotlightDestinations = defineField({
  name: "spotlightDestinations",
  title: "Destinos em destaque nesta página",
  type: "array",
  description: "Bloco \"Por destino\" — escolha real da Cays, não precisa preencher. Vazio = bloco some da página.",
  of: [{ type: "reference", to: [{ type: "destination" }] }],
});

export const destinationHub = hubPageType("destinationHub", "Página Destinos", [spotlightExperiences]);
export const experienceHub = hubPageType("experienceHub", "Página Experiências");
export const travelHub = hubPageType("travelHub", "Página Viagens");
export const curadoriaHub = hubPageType("curadoriaHub", "Página Curadoria", [
  spotlightDestinations,
  defineField({ ...spotlightExperiences, title: "Experiências em destaque (\"Por experiência\")" }),
]);
