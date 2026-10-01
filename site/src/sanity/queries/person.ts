import { imageFragment } from "./fragments";

const personProjection = `{
  "id": _id,
  name,
  role,
  bio,
  "photo": photo${imageFragment},
  specialties,
  active,
  order
}`;

export const PEOPLE_QUERY = `*[_type == "person" && active == true] | order(order asc)${personProjection}`;
