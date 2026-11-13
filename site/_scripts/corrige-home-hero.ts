// Corrige o RASCUNHO da Home (drafts.home) para a foto do hero poder ser publicada:
//  - hero.image estava com _type "image" (o schema exige "imageWithAlt")
//  - hero.images tinha um item vazio (sem imagem), que também bloqueia a publicação
// Só mexe no rascunho (não publica nada). Faz backup antes. Uso: npx sanity exec _scripts/corrige-home-hero.ts --with-user-token [-- --aplicar]
import { getCliClient } from "sanity/cli";
import fs from "node:fs";
const aplicar = process.argv.includes("--aplicar");
const c = getCliClient({ apiVersion: "2026-01-01", useCdn: false, perspective: "raw" });
const d: any = await c.getDocument("drafts.home");
if (!d) throw new Error("não há rascunho da home");
console.log("mediaType:", d.hero?.mediaType, "| image._type:", d.hero?.image?._type, "| images:", d.hero?.images?.length ?? 0);
if (d.hero?.mediaType !== "image") throw new Error("o tipo de fundo não é 'Imagem única': não vou mexer");
if (!d.hero?.image?.asset) throw new Error("hero.image sem arquivo: não vou mexer");
const sets: Record<string, any> = {};
if (d.hero.image._type !== "imageWithAlt") sets["hero.image._type"] = "imageWithAlt";
const unsets: string[] = [];
if (Array.isArray(d.hero.images)) unsets.push("hero.images");
console.log("vai fazer:", JSON.stringify({ sets, unsets }));
if (!aplicar) { console.log("(simulação: nada foi gravado)"); process.exit(0); }
const arq = `_scripts/backup-home-hero-${new Date().toISOString().slice(0, 10)}.json`;
fs.writeFileSync(arq, JSON.stringify(d, null, 1));
console.log("backup em", arq);
let p = c.patch("drafts.home");
if (Object.keys(sets).length) p = p.set(sets);
if (unsets.length) p = p.unset(unsets);
await p.commit();
const depois: any = await c.getDocument("drafts.home");
console.log("depois -> image._type:", depois.hero.image._type, "| images:", depois.hero.images);
