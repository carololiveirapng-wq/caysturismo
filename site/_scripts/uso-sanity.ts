import { getCliClient } from "sanity/cli";
const c = getCliClient({ apiVersion: "2026-01-01", useCdn: false });
const token = c.config().token as string; const H = { Authorization: `Bearer ${token}` };
for (const u of ["https://api.sanity.io/v2021-06-07/projects/egzcpq85", "https://api.sanity.io/v2021-06-07/projects/egzcpq85/usage", "https://api.sanity.io/v2021-06-07/projects/egzcpq85/features", "https://api.sanity.io/v2021-06-07/projects/egzcpq85/plan"]) {
  const r = await fetch(u, { headers: H }); const t = await r.text(); console.log(r.status, u.split("/projects/")[1], t.slice(0, 600));
}
