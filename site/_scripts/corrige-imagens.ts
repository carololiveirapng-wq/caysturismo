// Corrige itens de array com _type "image" (o schema só aceita "imageWithAlt") e sem _key.
// Faz BACKUP completo dos documentos antes. Uso: npx sanity exec _scripts/corrige-imagens.ts --with-user-token [-- --aplicar]
import { getCliClient } from "sanity/cli";
import fs from "node:fs";
import crypto from "node:crypto";
const aplicar = process.argv.includes("--aplicar");
const c = getCliClient({ apiVersion: "2026-01-01", useCdn: false });
const docs: any[] = await c.fetch(`*[!(_type match "system.*")]`, {}, { perspective: "raw" } as any);
const nova = () => crypto.randomBytes(6).toString("hex");
let trocas = 0, chaves = 0;
function conserta(v: any): any {
  if (Array.isArray(v)) return v.map((it) => {
    if (it && typeof it === "object") {
      const o: any = conserta(it);
      if (o._type === "image") { o._type = "imageWithAlt"; trocas++; }
      if (!o._key && o._type !== "block") { o._key = nova(); chaves++; }
      return o;
    }
    return it;
  });
  if (v && typeof v === "object") { const o: any = {}; for (const k of Object.keys(v)) o[k] = conserta(v[k]); return o; }
  return v;
}
const alvos: { doc: any; mudou: Record<string, any> }[] = [];
for (const d of docs) {
  const mudou: Record<string, any> = {};
  for (const k of Object.keys(d)) {
    if (k.startsWith("_")) continue;
    const antes = JSON.stringify(d[k]); const t0 = trocas, k0 = chaves;
    const dep = conserta(d[k]);
    if (trocas !== t0 || chaves !== k0) mudou[k] = dep;
  }
  if (Object.keys(mudou).length) alvos.push({ doc: d, mudou });
}
console.log(`documentos a corrigir: ${alvos.length} | _type image -> imageWithAlt: ${trocas} | _key criadas: ${chaves}`);
alvos.forEach((a) => console.log(" -", a.doc._id, "campos:", Object.keys(a.mudou).join(", ")));
if (!aplicar) { console.log("\n(simulação: nada foi gravado. Rode com --aplicar para gravar)"); process.exit(0); }
const arq = `_scripts/backup-imagens-${new Date().toISOString().slice(0, 10)}.json`;
fs.writeFileSync(arq, JSON.stringify(alvos.map((a) => a.doc), null, 1));
console.log("backup salvo em", arq);
for (const a of alvos) { await c.patch(a.doc._id).set(a.mudou).commit(); console.log("corrigido", a.doc._id); }
