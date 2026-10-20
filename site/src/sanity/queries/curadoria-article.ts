import { imageFragment } from "./fragments";

/**
 * Cada tipo de bloco (ver `schema-types/objects/article-blocks.ts`) vira o
 * discriminador `type` do `ArticleBlock` local via projeção condicional —
 * é o jeito idiomático do GROQ de reformatar um array "polimórfico". Não
 * testado contra dataset real — ver nota em `destination.ts`.
 */
const bodyProjection = `{
  _type == "richTextBlock" => { "type": "richText", content },
  _type == "imageFullBlock" => { "type": "imageFull", "image": image${imageFragment}, caption },
  _type == "imageTextBlock" => { "type": "imageText", "image": image${imageFragment}, heading, text, imagePosition },
  _type == "galleryBlock" => { "type": "gallery", "images": coalesce(images[]${imageFragment}, []) },
  _type == "quoteBlock" => { "type": "quote", text, author },
  _type == "expertNoteBlock" => { "type": "expertNote", text, author },
  _type == "ctaBlock" => { "type": "cta", title, supporting, ctaLabel, ctaHref },
  _type == "travelCardBlock" => {
    "type": "travelCard",
    "slug": product->slug.current,
    "title": product->title,
    "subtitle": product->subtitle,
    "image": product->gallery[0]${imageFragment}
  },
  _type == "destinationCardBlock" => {
    "type": "destinationCard",
    "slug": destination->slug.current,
    "name": destination->name,
    "region": destination->type,
    "image": destination->hero.image${imageFragment}
  }
}`;

const articleProjection = `{
  "id": _id,
  "slug": slug.current,
  active,
  featured,
  order,
  title,
  category,
  "destinationIds": coalesce(destinations[]->slug.current, []),
  "experienceIds": coalesce(experiences[]->slug.current, []),
  author,
  publishedAt,
  updatedAt,
  readingTime,
  "heroImage": heroImage${imageFragment},
  excerpt,
  breadcrumb,
  "sections": coalesce(sections[]{
    "id": _key,
    heading,
    "blocks": coalesce(body[]${bodyProjection}, [])
  }, []),
  "faq": coalesce(faq, []),
  "relatedTravelProducts": coalesce(relatedTravelProducts[]->slug.current, []),
  "relatedDestination": relatedDestination->slug.current,
  "relatedArticles": coalesce(relatedArticles[]->slug.current, []),
  seo
}`;

export const CURADORIA_ARTICLE_BY_SLUG_QUERY = `*[_type == "curadoriaArticle" && slug.current == $slug && active == true][0]${articleProjection}`;

export const CURADORIA_ARTICLES_QUERY = `*[_type == "curadoriaArticle" && active == true] | order(order asc)${articleProjection}`;

export const CURADORIA_ARTICLE_SLUGS_QUERY = `*[_type == "curadoriaArticle" && active == true].slug.current`;
