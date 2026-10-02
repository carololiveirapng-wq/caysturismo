import { defineField, defineType } from "sanity";

/** Documento único (singleton) — o Studio expõe isto sem lista, ver `deskStructure.ts`. */
export const settings = defineType({
  name: "settings",
  title: "Configurações Globais",
  type: "document",
  fields: [
    defineField({ name: "whatsapp", title: "WhatsApp (só número, formato 55DDDDDDDDDDD)", type: "string" }),
    defineField({ name: "phone", title: "Telefone", type: "string" }),
    defineField({ name: "email", title: "E-mail", type: "string" }),
    defineField({ name: "hours", title: "Horário de atendimento", type: "string" }),
    defineField({ name: "address", title: "Endereço", type: "string" }),
    defineField({ name: "city", title: "Cidade", type: "string" }),
    defineField({ name: "state", title: "UF", type: "string", description: "Sigla do estado, ex.: SP." }),
    defineField({ name: "instagram", title: "Instagram (link completo)", type: "url" }),
    defineField({ name: "cnpj", title: "CNPJ", type: "string" }),
    defineField({ name: "cadastur", title: "Cadastur", type: "string", description: "Número de registro no Cadastur, se houver." }),
    defineField({
      name: "slogan",
      title: "Slogan oficial",
      type: "string",
      description: "Ex.: \"Do Altar para a vida toda\" — usado na Home e em /sobre, uma única fonte pros dois lugares.",
    }),
    defineField({
      name: "foundedDate",
      title: "Data de fundação",
      type: "date",
      description: "Data real de fundação da Cays — nunca aproximar ou inventar. \"Desde {ano}\" é derivado disto, não digitado solto em outro lugar.",
    }),
    defineField({
      name: "socialLinks",
      title: "Outras redes sociais",
      description: "Instagram já tem campo próprio acima — use isto só para Facebook, LinkedIn, TikTok etc.",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "label", title: "Rede", type: "string" }),
          defineField({ name: "url", title: "URL", type: "url" }),
        ],
      }],
    }),
    defineField({
      name: "defaultCTA",
      title: "CTA padrão",
      type: "object",
      fields: [
        defineField({ name: "label", title: "Texto", type: "string" }),
        defineField({ name: "href", title: "Link", type: "string" }),
      ],
    }),
    defineField({ name: "seoDefaults", title: "SEO padrão do site", type: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Configurações Globais" }) },
});
