// SÓ LEITURA: histórico do rascunho da Home — quem alterou, quando e quais campos (compara revisão a revisão).
import { getCliClient } from "sanity/cli";
const c = getCliClient({ apiVersion: "2026-01-01", useCdn: false, perspective: "raw" });
const token = c.config().token as string;
const host = "https://egzcpq85.api.sanity.io/v2026-01-01";
const H = { Authorization: `Bearer ${token}` };
const r = await fetch(host + "/data/history/production/transactions/drafts.home?limit=500&excludeContent=true&reverse=false", { headers: H });
const txt = await r.text();
console.log("transações http", r.status);
const tx: any[] = txt.split("\n").filter(Boolean).map((l) => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean);
console.log("total", tx.length);
const nomes: Record<string, string> = {};
for (const u of new Set(tx.map((x) => x.author))) {
  try { const rr = await fetch(`https://api.sanity.io/v2021-06-07/projects/egzcpq85/users/${u}`, { headers: H }); const j: any = await rr.json(); nomes[u as string] = (j.displayName || j.email || String(u)) + ""; } catch { nomes[u as string] = String(u); }
}
function achata(o: any, pre = "", out: Record<string, any> = {}) {
  if (Array.isArray(o)) o.forEach((x, i) => achata(x, `${pre}[${i}]`, out));
  else if (o && typeof o === "object") { for (const [k, v] of Object.entries(o)) { if (["_updatedAt", "_rev", "_createdAt", "_system"].includes(k)) continue; achata(v, pre ? `${pre}.${k}` : k, out); } }
  else out[pre] = o;
  return out;
}
let prev: Record<string, any> = {};
for (const x of tx) {
  const rev = await fetch(`${host}/data/history/production/documents/drafts.home?time=${encodeURIComponent(x.timestamp)}`, { headers: H });
  let doc: any = null;
  try { const j: any = await rev.json(); doc = Array.isArray(j.documents) ? j.documents[0] : j; } catch {}
  const cur = doc ? achata(doc) : {};
  const mud: string[] = [];
  for (const k of new Set([...Object.keys(prev), ...Object.keys(cur)])) if (JSON.stringify(prev[k]) !== JSON.stringify(cur[k])) mud.push(k.replace(/\[\d+\]\._key|\._ref|\._type$/g, (m) => m));
  console.log(x.timestamp, "|", nomes[x.author], "|", mud.slice(0, 12).join(", ").slice(0, 300) || "(sem diferença detectada)");
  prev = cur;
}
