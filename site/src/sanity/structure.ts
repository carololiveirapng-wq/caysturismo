import type { StructureResolver } from "sanity/structure";

/** "Configurações Globais" é singleton — some da lista comum e ganha item fixo próprio. */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Conteúdo")
    .items([
      S.listItem()
        .title("Configurações Globais")
        .child(S.document().schemaType("settings").documentId("settings")),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => item.getId() !== "settings"),
    ]);
