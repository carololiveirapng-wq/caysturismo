import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { ptBRLocale } from "@sanity/locale-pt-br";
import { schemaTypes } from "./src/sanity/schema-types";
import { structure } from "./src/sanity/structure";
import { projectId, dataset, apiVersion } from "./src/sanity/env";
import { StudioLogo } from "./src/sanity/components/logo";

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

  studio: {
    components: {
      logo: StudioLogo,
    },
  },
});
