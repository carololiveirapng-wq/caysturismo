// SÓ LEITURA: compara rascunho x publicado da Home e mostra o webhook de revalidação (filtro, projeção, últimas tentativas).
import { getCliClient } from "sanity/cli";
const c = getCliClient({ apiVersion: "2026-01-01", useCdn: false, perspective: "raw" });
const token = c.config().token as string;
const d: any = await c.getDocument("drafts.home");
const p: any = await c.getDocument("home");
function achata(o: any, pre = "", out: Record<string, any> = {}) {
  if (Array.isArray(o)) o.forEach((x, i) => achata(x, `${pre}[${i}]`, out));
  else if (o && typeof o === "object") for (const [k, v] of Object.entries(o)) { if (k === "_updatedAt" || k === "_rev" || k === "_createdAt") continue; achata(v, pre ? `${pre}.${k}` : k, out); }
  else out[pre] = o;
  return out;
}
const a = achata(d), b = achata(p);
const chaves = [...new Set([...Object.keys(a), ...Object.keys(b)])].sort();
console.log("Diferenças rascunho x publicado da Home:");
let n = 0;
for (const k of chaves) if (JSON.stringify(a[k]) !== JSON.stringify(b[k])) { n++; console.log(" -", k, "| rascunho:", JSON.stringify(a[k]), "| publicado:", JSON.stringify(b[k])); }
if (!n) console.log(" (nenhuma)");
console.log("_updatedAt rascunho:", d._updatedAt, "| publicado:", p._updatedAt);

try {
  const r = await fetch("https://api.sanity.io/v2021-06-07/hooks/projects/egzcpq85", { headers: { Authorization: `Bearer ${token}` } });
  console.log("hooks http", r.status);
  const hooks: any = await r.json(); console.log(JSON.stringify(hooks).replace(/secret=[a-z0-9]+/gi, "secret=***").slice(0, 1500));
  const arr = Array.isArray(hooks) ? hooks : hooks.hooks ?? [hooks];
  for (const h of arr) {
    console.log("WEBHOOK:", h.name, "| desativado:", h.isDisabled, "| dataset:", h.dataset, "| eventos:", JSON.stringify({ c: h.onCreate, u: h.onUpdate, d: h.onDelete }));
    console.log(" filtro:", h.rule?.filter ?? h.filter); console.log(" projeção:", h.rule?.projection ?? h.projection);
    const at = await fetch(`https://api.sanity.io/v2021-06-07/hooks/projects/egzcpq85/${h.id}/attempts`, { headers: { Authorization: `Bearer ${token}` } });
    const lista: any = await at.json();
    console.log(" tentativas http", at.status, Array.isArray(lista) ? lista.slice(0, 8).map((x: any) => `${x.createdAt} status=${x.resultCode} ${x.failureReason ?? ""}`) : JSON.stringify(lista).slice(0, 300));
  }
} catch (e: any) { console.log("erro nos hooks:", e?.message, "token?", Boolean(token)); }
