import type { StructureResolver } from "sanity/structure";

/**
 * Menu do Studio agrupado por área (Páginas / Conteúdo / Pessoas / Prova
 * social / Configurações) em vez da lista plana padrão do Sanity — mais
 * fácil de navegar pra quem não conhece o schema de cor. Toda entrada em
 * "Páginas" é singleton (documentId fixo), por isso aponta direto pro único
 * documento daquele tipo, sem sublista de criação — a prevenção de
 * duplicata em si está em `sanity.config.ts` (`newDocumentOptions`).
 */
const singletonPage = (S: Parameters<StructureResolver>[0], id: string, title: string, schemaType: string) =>
  S.listItem()
    .id(id)
    .title(title)
    .child(S.document().schemaType(schemaType).documentId(id));

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Conteúdo")
    .items([
      S.listItem()
        .id("paginas")
        .title("Páginas")
        .child(
          S.list()
            .title("Páginas")
            .items([
              singletonPage(S, "home", "Home", "home"),
              singletonPage(S, "aboutPage", "Sobre", "aboutPage"),
              singletonPage(S, "destinationHub", "Destinos", "destinationHub"),
              singletonPage(S, "experienceHub", "Experiências", "experienceHub"),
              singletonPage(S, "travelHub", "Viagens", "travelHub"),
              singletonPage(S, "curadoriaHub", "Curadoria", "curadoriaHub"),
            ]),
        ),
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
      singletonPage(S, "settings", "Configurações do site", "settings"),
    ]);
