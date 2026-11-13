// TESTE de publicação da imagem da Home em PRODUÇÃO: troca a imagem do documento PUBLICADO por outra já existente,
// mede em quanto tempo o site passa a mostrar a nova e RESTAURA a original em seguida. Não toca no rascunho da cliente.
// Uso (só depois do deploy): npx sanity exec _scripts/teste-publicacao-imagem.ts --with-user-token -- --aplicar
import { getCliClient } from "sanity/cli";
const aplicar = process.argv.includes("--aplicar");
const c = getCliClient({ apiVersion: "2026-01-01", useCdn: false, perspective: "raw" });
const SITE = "https://www.caysturismo.com.br/";
// Imagem usada só no teste (visível por segundos); o ID precisa ser único na página para a detecção valer.
const TEMP_ASSET = "image-509ed7072d1d5080f66adfb24f93265b48bf9030-5641x3761-jpg"; // Maldivas (já enviada ao Sanity; NÃO aparece hoje na Home publicada)

const pub: any = await c.getDocument("home");
const original = pub.hero.image;
console.log("original:", original.asset._ref, "| alt:", original.alt);
if (!aplicar) { console.log("(simulação) trocaria por", TEMP_ASSET); process.exit(0); }

const idOf = (ref: string) => ref.split("-")[1];
async function htmlTem(id: string) { try { const t = await (await fetch(SITE + "?t=" + Date.now(), { headers: { "user-agent": "Mozilla/5.0 teste-publicacao" } })).text(); return t.includes(id); } catch { return false; } }
async function espera(id: string, presente: boolean, limiteMs: number) { const t0 = Date.now(); while (Date.now() - t0 < limiteMs) { if ((await htmlTem(id)) === presente) return Date.now() - t0; await new Promise((r) => setTimeout(r, 1000)); } return null; }

if (await htmlTem(idOf(TEMP_ASSET))) throw new Error("a imagem de teste já aparece na Home — escolha outra");
const t0 = new Date();
await c.patch("home").set({ "hero.image.asset._ref": TEMP_ASSET }).commit();
console.log("PUBLICADO (troca) às", t0.toISOString());
const tNova = await espera(idOf(TEMP_ASSET), true, 120000);
console.log("produção mostrou a imagem de teste após", tNova === null ? "NÃO APARECEU em 120 s" : `${(tNova / 1000).toFixed(1)} s`);

const t1 = new Date();
await c.patch("home").set({ "hero.image.asset._ref": original.asset._ref }).commit();
console.log("RESTAURADO às", t1.toISOString());
const tVolta = await espera(idOf(TEMP_ASSET), false, 120000);
console.log("produção voltou à imagem original após", tVolta === null ? "NÃO VOLTOU em 120 s" : `${(tVolta / 1000).toFixed(1)} s`);
const depois: any = await c.getDocument("home");
console.log("conferência do publicado:", depois.hero.image.asset._ref === original.asset._ref ? "igual ao original" : "DIFERENTE — restaurar manualmente");
