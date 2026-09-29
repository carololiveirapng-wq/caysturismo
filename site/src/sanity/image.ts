import createImageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";
import { projectId, dataset } from "./env";

const builder = projectId ? createImageUrlBuilder({ projectId, dataset }) : null;

/** `null` quando o Sanity não está configurado — chamador já sabe cair pro mock nesse caso. */
export function urlForImage(source: Image) {
  if (!builder) return null;
  return builder.image(source);
}
