// Envia a versão leve da foto das Maldivas ao Sanity e troca SÓ o arquivo da imagem do hero no RASCUNHO da Home (nada é publicado).
// Mantém o texto alternativo e o resto do rascunho. Backup do documento antes. Uso: npx sanity exec _scripts/trocar-imagem-hero-rascunho.ts --with-user-token -- --aplicar
import { getCliClient } from "sanity/cli";
import fs from "node:fs";
const aplicar = process.argv.includes("--aplicar");
const ARQ = "C:/Users/Matheus/AppData/Local/Temp/claude/bf19008d104339b1/475b8d83-2237-4e42-8690-972b162d0a12/scratchpad/hero/maldivas-hero-3200.jpg";
const c = getCliClient({ apiVersion: "2026-01-01", useCdn: false, perspective: "raw" });
const d: any = await c.getDocument("drafts.home");
console.log("asset atual no rascunho:", d.hero.image.asset._ref, "| alt:", d.hero.image.alt);
if (!aplicar) { console.log("(simulação)", (fs.statSync(ARQ).size / 1048576).toFixed(2), "MB prontos para enviar"); process.exit(0); }
fs.writeFileSync("_scripts/backup-home-rascunho-antes-imagem.json", JSON.stringify(d, null, 1));
const novo = await c.assets.upload("image", fs.createReadStream(ARQ), { filename: "maldivas-casal-deck-hero-3200.jpg", contentType: "image/jpeg" });
console.log("enviado:", novo._id, "| tamanho:", novo.size, "| dimensões:", novo.metadata?.dimensions?.width + "x" + novo.metadata?.dimensions?.height);
await c.patch("drafts.home").set({ "hero.image.asset": { _type: "reference", _ref: novo._id } }).commit();
const depois: any = await c.getDocument("drafts.home");
console.log("rascunho agora:", depois.hero.image.asset._ref, "| alt mantido:", depois.hero.image.alt, "| _type:", depois.hero.image._type);
const pub: any = await c.getDocument("home");
console.log("publicado intacto:", pub.hero.image.asset._ref);
