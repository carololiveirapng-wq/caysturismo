import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schema-types";
import { structure } from "./src/sanity/structure";
import { projectId, dataset, apiVersion } from "./src/sanity/env";

// TODO: preencher NEXT_PUBLIC_SANITY_PROJECT_ID e NEXT_PUBLIC_SANITY_DATASET
// (ver .env.example) — sem isso, o Studio abre mas não conecta a um projeto.
export default defineConfig({
  name: "cays-turismo",
  title: "Cays Turismo — Conteúdo",

  projectId: projectId || "",
  dataset,
  apiVersion,

  basePath: "/studio",

  plugins: [structureTool({ structure }), visionTool()],

  schema: {
    types: schemaTypes,
  },
});
