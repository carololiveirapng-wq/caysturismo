import { defineField, defineType } from "sanity";

export const person = defineType({
  name: "person",
  title: "Pessoa / Especialista",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Nome", type: "string", validation: (r) => r.required() }),
    defineField({ name: "photo", title: "Foto (só publicar com foto real — sem placeholder passando por pessoa real)", type: "imageWithAlt" }),
    defineField({ name: "role", title: "Cargo", type: "string" }),
    defineField({ name: "bio", title: "Bio curta", type: "text", rows: 3 }),
    defineField({ name: "specialties", title: "Especialidades", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "destinations", title: "Destinos", type: "array", of: [{ type: "reference", to: [{ type: "destination" }] }] }),
    defineField({ name: "experiences", title: "Experiências", type: "array", of: [{ type: "reference", to: [{ type: "experience" }] }] }),
    defineField({ name: "whatsapp", title: "WhatsApp", type: "string" }),
    defineField({ name: "active", title: "Ativo", type: "boolean", initialValue: true }),
    defineField({ name: "order", title: "Ordem", type: "number" }),
  ],
  preview: { select: { title: "name", subtitle: "role", media: "photo" } },
});
