// SÓ LEITURA: revisão completa do rascunho da Home (campos, referências, tamanhos de SEO, imagens, o que falta).
import { getCliClient } from "sanity/cli";
const c = getCliClient({ apiVersion: "2026-01-01", useCdn: false, perspective: "raw" });
const d: any = await c.getDocument("drafts.home");
const p: any = await c.getDocument("home");
console.log("CAMPOS DO RASCUNHO:", Object.keys(d).filter((k) => !k.startsWith("_")).join(", "));
console.log("CAMPOS SÓ NO PUBLICADO (faltam no rascunho):", Object.keys(p).filter((k) => !k.startsWith("_") && !(k in d)).join(", ") || "nenhum");
const show = (k: string) => console.log(`\n== ${k} ==\n` + JSON.stringify(d[k], null, 1).slice(0, 1800));
for (const k of ["hero", "seo", "manifesto", "finalCta", "positioning", "travelDiscovery", "process"]) if (d[k] !== undefined) show(k);
// referências
const refs: string[] = [];
(function walk(o: any) { if (Array.isArray(o)) o.forEach(walk); else if (o && typeof o === "object") { if (o._type === "reference" && o._ref) refs.push(o._ref); for (const v of Object.values(o)) walk(v); } })(d);
const uniq = [...new Set(refs)];
const docs: any[] = await c.fetch(`*[_id in $ids]{_id,_type,active,"title":coalesce(title,name),"slug":slug.current}`, { ids: uniq });
console.log("\n== REFERÊNCIAS (" + uniq.length + ") ==");
for (const id of uniq) { const x = docs.find((y) => y._id === id); console.log(" -", id, "->", x ? `${x._type} | ativo=${x.active} | ${x.title}` : "NÃO EXISTE PUBLICADO"); }
const idsPub: string[] = (p.featuredArticles ?? []).map((a: any) => a._ref);
console.log("\nfeaturedArticles publicado:", idsPub.join(", "));
console.log("featuredArticles rascunho :", (d.featuredArticles ?? []).map((a: any) => a._ref).join(", "));
for (const k of ["featuredDestinations", "featuredExperiences", "featuredTravelProducts", "destinationCollections", "travelerStories", "beyondItinerary"]) console.log(k, "| publicado:", JSON.stringify(p[k])?.length ?? 0, "bytes | rascunho:", JSON.stringify(d[k])?.length ?? 0, "bytes", JSON.stringify(p[k]) === JSON.stringify(d[k]) ? "(igual)" : "(DIFERENTE)");
