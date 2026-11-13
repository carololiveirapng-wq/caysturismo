// Publica SÓ a imagem do hero da Home (arquivo leve + texto alternativo + ponto de foco no casal), direto no documento publicado.
// O resto do rascunho da cliente NÃO é publicado. O mesmo ajuste é espelhado no rascunho, para a próxima publicação dela não desfazer.
// Uso: npx sanity exec _scripts/publicar-imagem-hero.ts --with-user-token -- --aplicar
import { getCliClient } from "sanity/cli";
import fs from "node:fs";
const aplicar = process.argv.includes("--aplicar");
const c = getCliClient({ apiVersion: "2026-01-01", useCdn: false, perspective: "raw" });
const ASSET = "image-43171f9310053443a1cf50dc9bbeef2d319a5e65-3200x2134-jpg";
const ALT = "Casal de noivos de mãos dadas em um deck sobre águas turquesa nas Maldivas";
const HOTSPOT = { _type: "sanity.imageHotspot", x: 0.74, y: 0.63, width: 0.22, height: 0.3 };
const image = { _type: "imageWithAlt", alt: ALT, asset: { _type: "reference", _ref: ASSET }, hotspot: HOTSPOT };
const pub: any = await c.getDocument("home");
const d: any = await c.getDocument("drafts.home");
console.log("publicado agora:", pub.hero.image.asset._ref, "|", pub.hero.image.alt);
console.log("rascunho  agora:", d.hero.image.asset._ref, "|", d.hero.image.alt);
if (!aplicar) { console.log("(simulação)"); process.exit(0); }
fs.writeFileSync("_scripts/backup-home-publicado-antes-imagem.json", JSON.stringify(pub, null, 1));
await c.patch("home").set({ "hero.image": image }).commit();
await c.patch("drafts.home").set({ "hero.image": image }).commit();
const p2: any = await c.getDocument("home");
console.log("PUBLICADO:", p2.hero.image.asset._ref, "|", p2.hero.image.alt, "| hotspot", JSON.stringify(p2.hero.image.hotspot), "| title mantido:", JSON.stringify(p2.hero.title), "| seo:", JSON.stringify(p2.seo ?? null));
