import { defineField, defineType } from "sanity";

export const hotel = defineType({
  name: "hotel",
  title: "Hotel",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Nome", type: "string", validation: (r) => r.required() }),
    defineField({ name: "location", title: "Localização", type: "string" }),
    defineField({ name: "image", title: "Imagem", type: "imageWithAlt" }),
    defineField({
      name: "tier",
      title: "Categoria",
      type: "string",
      options: { list: ["Boutique", "Luxo", "Ultra luxo", "Resort", "Ryokan"] },
    }),
    defineField({ name: "shortDescription", title: "Descrição curta", type: "text", rows: 2 }),
    defineField({ name: "destination", title: "Destino", type: "reference", to: [{ type: "destination" }] }),
    defineField({ name: "active", title: "Ativo", type: "boolean", initialValue: true }),
    defineField({ name: "order", title: "Ordem", type: "number" }),
  ],
  preview: { select: { title: "name", subtitle: "location", media: "image" } },
});
