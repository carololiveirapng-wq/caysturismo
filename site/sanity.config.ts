import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { ptBRLocale } from "@sanity/locale-pt-br";
import { schemaTypes } from "./src/sanity/schema-types";
import { structure } from "./src/sanity/structure";
import { projectId, dataset, apiVersion } from "./src/sanity/env";
import { StudioLogo } from "./src/sanity/components/logo";

/** Tipos singleton — documentId fixo, sem segunda instância permitida (ver `structure.ts`). */
const SINGLETON_TYPES = new Set(["home", "aboutPage", "destinationHub", "experienceHub", "travelHub", "curadoriaHub", "groupHub", "inspirationHub", "menuExtras", "settings"]);

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
  //
  // Sem visionTool() de propósito: é um console de GROQ (consulta técnica
  // direto no banco), não serve pro cliente editar nada e só confundia a
  // barra de ferramentas do Studio. Pra debug de query, usar o Vision do
  // sanity.io/manage ou rodar a query localmente.
  plugins: [structureTool({ structure }), ptBRLocale()],

  schema: {
    types: schemaTypes,
    // Modelo "Nova oportunidade": já cria a viagem como tipo Oferta (usado na aba "Oportunidades exclusivas").
    templates: (prev) => [
      ...prev,
      {
        id: "oportunidade",
        title: "Nova oportunidade exclusiva",
        schemaType: "travelProduct",
        value: { type: "offer", status: "active", active: true, order: 100 },
      },
      // Modelo "Novo grupo": já cria a viagem como tipo Grupo (aba "Grupos").
      {
        id: "grupo",
        title: "Novo grupo (saída em grupo)",
        schemaType: "travelProduct",
        value: { type: "group", status: "active", active: true, order: 100 },
      },
    ],
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
