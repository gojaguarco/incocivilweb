import type { StructureResolver } from "sanity/structure";
import { pagesType } from "./schemaTypes/pagesType";
import { DocumentTextIcon, ImagesIcon, ProjectsIcon, ThLargeIcon, TiersIcon, UlistIcon, WrenchIcon } from "@sanity/icons";
import { configType } from "./schemaTypes/configType";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Contenido")
    .items([
      S.listItem()
        .title(pagesType.title || "")
        .icon(pagesType.icon)
        .child(
          S.editor()
            .id(pagesType.name)
            .schemaType(pagesType.name)
            .documentId(pagesType.name)
            .title(pagesType.title || "")
        ),
      S.listItem()
        .title('Superficies')
        .icon(ImagesIcon)
        .child(
          S.list()
            .title('Superficies')
            .items([
              S.documentTypeListItem('surfaceTypes').title('Tipos de Superficie').icon(ThLargeIcon),
              S.documentTypeListItem('surface').title('Superficies').icon(TiersIcon)
            ])
        ),
      S.documentTypeListItem('project')
        .title('Proyectos')
        .icon(ProjectsIcon),
      S.documentTypeListItem('service')
        .title('Servicios')
        .icon(WrenchIcon),
      S.listItem()
        .title("Blogs")
        .icon(DocumentTextIcon)
        .child(
          S.list()
            .title("Blogs")
            .items([
              S.documentTypeListItem("post").title("Publicaciones"),
              S.documentTypeListItem("category").title("Categorías"),
            ])
        ),
      S.listItem()
      .title(configType.title || "")
      .icon(configType.icon)
      .child(
        S.editor()
          .id(configType.name)
          .schemaType(configType.name)
          .documentId(configType.name)
          .title(configType.title || "")
      ),
    ]);
