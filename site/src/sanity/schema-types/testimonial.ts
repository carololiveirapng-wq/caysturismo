import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Depoimento (Google Reviews)",
  type: "document",
  fields: [
    defineField({ name: "clientName", title: "Nome do cliente", type: "string", validation: (r) => r.required() }),
    defineField({ name: "text", title: "Texto", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({ name: "rating", title: "Nota (1–5, real — nunca assumir 5)", type: "number", validation: (r) => r.min(1).max(5).required() }),
    defineField({ name: "source", title: "Fonte", type: "string", initialValue: "Google", options: { list: ["Google"] } }),
    defineField({ name: "date", title: "Data / tempo relativo", type: "string" }),
    defineField({ name: "reviewUrl", title: "Link \"ver no Google\" (só se existir de verdade)", type: "url" }),
    defineField({ name: "destination", title: "Destino relacionado", type: "reference", to: [{ type: "destination" }] }),
    defineField({ name: "experience", title: "Experiência relacionada", type: "reference", to: [{ type: "experience" }] }),
    defineField({ name: "travelProduct", title: "Viagem relacionada", type: "reference", to: [{ type: "travelProduct" }] }),
    defineField({ name: "active", title: "Ativo", type: "boolean", initialValue: true }),
    defineField({ name: "featured", title: "Destaque", type: "boolean" }),
    defineField({ name: "order", title: "Ordem", type: "number" }),
  ],
  preview: { select: { title: "clientName", subtitle: "text" } },
});
