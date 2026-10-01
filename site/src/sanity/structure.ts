import type { StructureResolver } from "sanity/structure";

/**
 * Menu do Studio agrupado por área (Conteúdo / Pessoas / Prova social /
 * Configurações) em vez da lista plana padrão do Sanity — mais fácil de
 * navegar pra quem não conhece o schema de cor. "Configurações Globais" é
 * singleton (documentId fixo), por isso fica como item direto, sem
 * precisar abrir uma sublista pra chegar no único documento que existe.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Conteúdo")
    .items([
      S.listItem()
        .id("conteudo")
        .title("Conteúdo")
        .child(
          S.list()
            .title("Conteúdo")
            .items([
              S.documentTypeListItem("destination").title("Destinos"),
              S.documentTypeListItem("experience").title("Experiências"),
              S.documentTypeListItem("travelProduct").title("Viagens"),
              S.documentTypeListItem("curadoriaArticle").title("Curadoria"),
              S.documentTypeListItem("hotel").title("Hotéis"),
            ]),
        ),
      S.listItem()
        .id("pessoas")
        .title("Pessoas")
        .child(
          S.list()
            .title("Pessoas")
            .items([S.documentTypeListItem("person").title("Equipe")]),
        ),
      S.listItem()
        .id("prova-social")
        .title("Prova social")
        .child(
          S.list()
            .title("Prova social")
            .items([S.documentTypeListItem("testimonial").title("Depoimentos")]),
        ),
      S.divider(),
      S.listItem()
        .id("settings")
        .title("Configurações do site")
        .child(S.document().schemaType("settings").documentId("settings")),
    ]);
