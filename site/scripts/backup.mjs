// Backup técnico manual: exporta o conteúdo do Sanity (com imagens) e as tabelas do banco (leads etc.) para JSON.
//   npm run backup                 -> Sanity + banco
//   node scripts/backup.mjs --sanity   (só Sanity)   |   node scripts/backup.mjs --banco   (só banco)
// Saída em ../_backups/AAAA-MM-DD/ (fora do git). Só LÊ dos dois serviços; não altera nada.
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const aqui = path.dirname(fileURLToPath(import.meta.url));
const site = path.resolve(aqui, "..");
const hoje = new Date().toISOString().slice(0, 10);
const destino = path.resolve(site, "..", "_backups", hoje);
fs.mkdirSync(destino, { recursive: true });

const args = new Set(process.argv.slice(2));
const fazSanity = args.has("--sanity") || !args.has("--banco");
const fazBanco = args.has("--banco") || !args.has("--sanity");

// carrega .env.local sem imprimir nada
const envFile = path.join(site, ".env.local");
if (fs.existsSync(envFile)) {
  for (const linha of fs.readFileSync(envFile, "utf8").split(/\r?\n/)) {
    const m = linha.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^"|"$/g, "");
  }
}

let falhou = false;

if (fazSanity) {
  const arquivo = path.join(destino, `sanity-${process.env.NEXT_PUBLIC_SANITY_DATASET || "production"}.tar.gz`);
  console.log("Sanity: exportando conteúdo + imagens (pode levar alguns minutos)...");
  const r = spawnSync("npx", ["sanity", "dataset", "export", process.env.NEXT_PUBLIC_SANITY_DATASET || "production", arquivo, "--overwrite"], { cwd: site, stdio: "inherit", shell: true });
  if (r.status === 0 && fs.existsSync(arquivo)) console.log(`Sanity ok: ${arquivo} (${(fs.statSync(arquivo).size / 1048576).toFixed(1)} MB)`);
  else { console.error("Sanity: o export falhou (precisa estar logado: npx sanity login)."); falhou = true; }
}

if (fazBanco) {
  if (!process.env.DATABASE_URL) { console.error("Banco: DATABASE_URL não está configurada."); falhou = true; }
  else {
    const { default: postgres } = await import("postgres");
    const sql = postgres(process.env.DATABASE_URL, { max: 1, ssl: "require" });
    try {
      const pasta = path.join(destino, "banco");
      fs.mkdirSync(pasta, { recursive: true });
      const tabelas = await sql`select table_name from information_schema.tables where table_schema = 'public' and table_type = 'BASE TABLE' order by 1`;
      for (const { table_name } of tabelas) {
        const linhas = await sql.unsafe(`select * from public."${table_name}"`);
        fs.writeFileSync(path.join(pasta, `${table_name}.json`), JSON.stringify(linhas, null, 1));
        console.log(`Banco: ${table_name} -> ${linhas.length} linhas`);
      }
    } catch (e) { console.error("Banco: falhou:", e.message); falhou = true; }
    finally { await sql.end({ timeout: 5 }); }
  }
}

console.log(falhou ? "\nTerminou COM FALHAS (veja acima)." : `\nBackup completo em ${destino}`);
process.exit(falhou ? 1 : 0);
