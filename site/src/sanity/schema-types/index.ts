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
import { aboutPage } from "./about-page";
import { destinationHub, experienceHub, travelHub, curadoriaHub } from "./hub-pages";
import { travelerStory } from "./traveler-story";

export const schemaTypes: SchemaTypeDefinition[] = [
  // documentos
  home,
  aboutPage,
  destinationHub,
  experienceHub,
  travelHub,
  curadoriaHub,
  destination,
  experience,
  travelProduct,
  curadoriaArticle,
  person,
  testimonial,
  hotel,
  settings,
  travelerStory,
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
