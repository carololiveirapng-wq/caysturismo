import { imageFragment } from "./fragments";

const personProjection = `{
  "id": _id,
  name,
  role,
  bio,
  "photo": photo${imageFragment},
  "specialties": coalesce(specialties, []),
  "destinations": coalesce(destinations[]->{ "slug": slug.current, name }, []),
  "experiences": coalesce(experiences[]->{ "slug": slug.current, name }, []),
  whatsapp,
  active,
  order
}`;

export const PEOPLE_QUERY = `*[_type == "person" && active == true] | order(order asc)${personProjection}`;
