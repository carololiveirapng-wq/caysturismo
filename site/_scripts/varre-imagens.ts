// Só LEITURA: acha itens de array com _type "image" (o schema aceita "imageWithAlt") ou sem _key, inclusive em rascunhos.
import { getCliClient } from "sanity/cli";
const c = getCliClient({ apiVersion: "2026-01-01", useCdn: false });
const docs: any[] = await c.fetch(`*[!(_type match "system.*")]`, {}, { perspective: "raw" } as any);
const achados: string[] = [];
function anda(v: any, caminho: string, doc: string) {
  if (Array.isArray(v)) {
    v.forEach((it, i) => {
      if (it && typeof it === "object") {
        if (it._type === "image") achados.push(`${doc} ${caminho}[${i}] _type=image alt=${JSON.stringify(it.alt || "").slice(0, 40)} key=${it._key ?? "SEM KEY"}`);
        else if (!it._key && it._type !== "block") achados.push(`${doc} ${caminho}[${i}] SEM _key (_type=${it._type})`);
      }
      anda(it, `${caminho}[${i}]`, doc);
    });
  } else if (v && typeof v === "object") for (const k of Object.keys(v)) anda(v[k], caminho ? `${caminho}.${k}` : k, doc);
}
for (const d of docs) anda(d, "", `${d._id} (${d._type})`);
console.log("documentos:", docs.length);
console.log(achados.length ? achados.join("\n") : "nenhum item problemático");
