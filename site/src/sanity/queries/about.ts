import { imageFragment } from "./fragments";

export const ABOUT_PAGE_QUERY = `*[_type == "aboutPage"][0]{
  hero{
    eyebrow,
    title,
    text,
    "image": image${imageFragment}
  },
  history{
    title,
    text,
    "timeline": coalesce(timeline, [])
  },
  positioning{ title, text },
  philosophy{ title, text },
  "pillars": coalesce(pillars, []),
  finalCta{ title, text, ctaLabel },
  seo
}`;
