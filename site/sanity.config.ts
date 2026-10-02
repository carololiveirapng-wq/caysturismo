import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { ptBRLocale } from "@sanity/locale-pt-br";
import { schemaTypes } from "./src/sanity/schema-types";
import { structure } from "./src/sanity/structure";
import { projectId, dataset, apiVersion } from "./src/sanity/env";
import { StudioLogo } from "./src/sanity/components/logo";

/** Tipos singleton — documentId fixo, sem segunda instância permitida (ver `structure.ts`). */
const SINGLETON_TYPES = new Set(["home", "aboutPage", "destinationHub", "experienceHub", "travelHub", "curadoriaHub", "settings"]);

export default defineConfig({
  name: "cays-turismo",
  title: "Cays Turismo — Conteúdo",
  icon: () => "C",

  projectId: projectId || "",
  dataset,
  apiVersion,

  basePath: "/studio",

  // ptBRLocale() deixa Português (Brasil) disponível no menu de idioma do
  // Studio (ícone da conta → idioma) — a interface nativa do Sanity não
  // tem como forçar um idioma padrão sem passar pela escolha do usuário.
  plugins: [structureTool({ structure }), visionTool(), ptBRLocale()],

  schema: {
    types: schemaTypes,
  },

  // Tira os tipos singleton do botão genérico "+ Criar novo" — o único
  // jeito de chegar neles continua sendo o item fixo em "Páginas"/
  // "Configurações" na `structure.ts`, nunca uma segunda instância nova.
  document: {
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === "global") {
        return prev.filter((template) => !SINGLETON_TYPES.has(template.templateId));
      }
      return prev;
    },
  },

  studio: {
    components: {
      logo: StudioLogo,
    },
  },
});
