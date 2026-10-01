import type { SchemaTypeDefinition } from "sanity";

import { imageWithAlt, seoObject, breadcrumbItem, faqItem } from "./objects/shared";
import {
  richTextBlock,
  imageFullBlock,
  imageTextBlock,
  galleryBlock,
  quoteBlock,
  expertNoteBlock,
  ctaBlock,
  travelCardBlock,
  destinationCardBlock,
  articleSection,
} from "./objects/article-blocks";
import { destination } from "./destination";
import { experience } from "./experience";
import { travelProduct } from "./travel-product";
import { curadoriaArticle } from "./curadoria-article";
import { person } from "./person";
import { testimonial } from "./testimonial";
import { hotel } from "./hotel";
import { settings } from "./settings";
import { home } from "./home";

export const schemaTypes: SchemaTypeDefinition[] = [
  // documentos
  home,
  destination,
  experience,
  travelProduct,
  curadoriaArticle,
  person,
  testimonial,
  hotel,
  settings,
  // objects compartilhados
  imageWithAlt,
  seoObject,
  breadcrumbItem,
  faqItem,
  // blocos do artigo
  richTextBlock,
  imageFullBlock,
  imageTextBlock,
  galleryBlock,
  quoteBlock,
  expertNoteBlock,
  ctaBlock,
  travelCardBlock,
  destinationCardBlock,
  articleSection,
];
