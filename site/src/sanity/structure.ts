import type { StructureResolver } from "sanity/structure";
import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { EarthGlobeIcon } from "@sanity/icons/EarthGlobe";
import { HeartIcon } from "@sanity/icons/Heart";
import { PackageIcon } from "@sanity/icons/Package";
import { UsersIcon } from "@sanity/icons/Users";
import { DoubleQuoteIcon } from "@sanity/icons/DoubleQuote";
import { CogIcon } from "@sanity/icons/Cog";
import { ThLargeIcon } from "@sanity/icons/ThLarge";
import { HomeIcon } from "@sanity/icons/Home";

/**
 * Menu do Studio pensado pra quem edita o site no dia a dia, não pra quem
 * conhece o schema de cor — atalhos diretos na primeira coluna pros 7 tipos
 * de conteúdo que o cliente mexe com frequência (Blog, Destinos,
 * Experiências, Viagens, Equipe, Depoimentos, Configurações), sem pasta
 * intermediária. O que sobra (as páginas-singleton de introdução de cada
 * hub e Hotéis, que só existem como referência dentro de destino/viagem)
 * fica num grupo "Páginas do site" mais discreto, depois de um divisor —
 * ainda acessível, só não brigando por atenção com o que é usado toda hora.
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
      S.documentTypeListItem("curadoriaArticle").title("Blog / Curadoria").icon(DocumentTextIcon),
      S.documentTypeListItem("destination").title("Destinos").icon(EarthGlobeIcon),
      S.documentTypeListItem("experience").title("Experiências").icon(HeartIcon),
      S.documentTypeListItem("travelProduct").title("Viagens").icon(PackageIcon),
      S.documentTypeListItem("person").title("Equipe").icon(UsersIcon),
      S.documentTypeListItem("testimonial").title("Depoimentos").icon(DoubleQuoteIcon),
      S.divider(),
      singletonPage(S, "settings", "Configurações do site", "settings").icon(CogIcon),
      S.divider(),
      S.listItem()
        .id("paginas-do-site")
        .title("Páginas do site")
        .icon(ThLargeIcon)
        .child(
          S.list()
            .title("Páginas do site")
            .items([
              singletonPage(S, "home", "Home", "home"),
              singletonPage(S, "aboutPage", "Sobre", "aboutPage"),
              singletonPage(S, "destinationHub", "Introdução — Destinos", "destinationHub"),
              singletonPage(S, "experienceHub", "Introdução — Experiências", "experienceHub"),
              singletonPage(S, "travelHub", "Introdução — Viagens", "travelHub"),
              singletonPage(S, "curadoriaHub", "Introdução — Blog / Curadoria", "curadoriaHub"),
              S.divider(),
              S.documentTypeListItem("hotel").title("Hotéis").icon(HomeIcon),
            ]),
        ),
    ]);
