// Só LEITURA: o que está incompleto no conteúdo publicado do Sanity.
import { getCliClient } from "sanity/cli";
const c = getCliClient({ apiVersion: "2026-01-01", useCdn: false });
const q = async (t: string, g: string) => { const r: any[] = await c.fetch(g); console.log(`\n## ${t}: ${r.length}`); r.forEach((x) => console.log(" -", typeof x === "string" ? x : JSON.stringify(x))); };
await q("Viagens ativas SEM foto na galeria (a página fica sem imagem)", `*[_type=="travelProduct" && active==true && count(gallery)==0]{title,"slug":slug.current,type}`);
await q("Viagens ativas sem destino ligado", `*[_type=="travelProduct" && active==true && count(destinations)==0].title`);
await q("Rascunhos pendentes (alterações não publicadas)", `*[_id in path("drafts.**")]{_id,_type,"t":coalesce(title,name)}`);
await q("Imagens sem texto alternativo (alt)", `*[_type in ["travelProduct","destination","experience","curadoriaArticle"] && active==true]{ "doc": coalesce(title,name), "n": count(gallery[!defined(alt) || alt==""]) }[n>0]`);
await q("Artigos ativos sem imagem de capa", `*[_type=="curadoriaArticle" && active==true && !defined(heroImage.asset)].title`);
await q("Depoimentos ativos", `*[_type=="testimonial" && active==true]{ "autor": coalesce(author,name) }`);
const st: any = await c.fetch(`*[_type=="settings"][0]`);
console.log("## Configurações sem preencher:",["whatsapp","phone","email","address","instagram","cnpj","cadastur"].filter((k) => !st?.[k]).join(", ") || "nenhuma");
console.log("campos existentes:", Object.keys(st || {}).filter((k) => !k.startsWith("_")).join(", "));
