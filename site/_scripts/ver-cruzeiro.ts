import { getCliClient } from "sanity/cli";
const c = getCliClient({ apiVersion: "2026-01-01", useCdn: false });
const r = await c.fetch(`*[_id match "*cruzeiro-mediterraneo"]{_id,_updatedAt,active,status,type,"nGaleria":count(gallery),"tipos":gallery[]._type}`, {}, { perspective: "raw" } as any);
console.log(JSON.stringify(r));
