// Rodada de ajustes técnicos + SEO on-page (nov/2026): grava só dados CONFIRMADOS pelo cliente.
//  1) Configurações Globais: endereço completo, CEP e remove o "Cadastur" (estava com o CNPJ colado por engano)
//  2) Lua de Mel: SEO, contexto local (Brasília/DF), "como funciona" e FAQ
//  3) Rascunho da Home: SEO com Brasília (o cliente publica quando quiser; não publico por ele)
// Faz backup dos 3 documentos antes. Uso: npx sanity exec _scripts/seo-rodada-nov26.ts --with-user-token [-- --aplicar]
import { getCliClient } from "sanity/cli";
import fs from "node:fs";
import crypto from "node:crypto";
const aplicar = process.argv.includes("--aplicar");
const c = getCliClient({ apiVersion: "2026-01-01", useCdn: false, perspective: "raw" });
const key = () => crypto.randomBytes(6).toString("hex");

const HOME_SEO = {
  _type: "seo",
  title: "Agência de Viagens em Brasília | Cays Turismo",
  description: "Agência de viagens em Brasília desde 1997, especializada em lua de mel, destination wedding, viagens em família e roteiros sob medida.",
};

const LUA_SEO = {
  _type: "seo",
  title: "Agência de Lua de Mel em Brasília | Cays Turismo",
  description: "Lua de mel sob medida para casais de Brasília e do DF: praia, neve, cidade ou aventura. Planejamento personalizado da Cays Turismo, desde 1997.",
};

const LUA_MANIFESTO =
  "Toda lua de mel carrega uma expectativa diferente — reencontro, descanso, aventura ou uma pausa do mundo. Desenhamos cada roteiro a partir disso, não de um pacote pronto. A Cays Turismo, de Brasília desde 1997, atende casais de Brasília e do Distrito Federal com planejamento personalizado de ponta a ponta.";

const LUA_STEPS = [
  { _key: key(), _type: "object", title: "Conversa inicial", text: "Vocês contam como imaginam a viagem: destino, período e o ritmo que combina com o casal." },
  { _key: key(), _type: "object", title: "Roteiro desenhado", text: "A Cays desenha as possibilidades, com hospedagens e experiências escolhidas para o perfil de vocês." },
  { _key: key(), _type: "object", title: "Reservas e acompanhamento", text: "Cuidamos das reservas, como passagens aéreas e hospedagens, e acompanhamos o casal de perto antes e durante a viagem." },
];

const LUA_FAQ_EXTRA = [
  {
    _key: key(),
    _type: "faqItem",
    question: "A Cays atende casais de Brasília e do DF?",
    answer: "Sim. A Cays Turismo atende casais de Brasília e do Distrito Federal, com planejamento personalizado da lua de mel. Vocês podem começar pelo formulário de contato ou pelo WhatsApp.",
  },
  {
    _key: key(),
    _type: "faqItem",
    question: "O que a Cays define junto com o casal?",
    answer: "Destino, período e hospedagem são decididos em conjunto, de acordo com o que vocês imaginam. A partir daí, a Cays cuida das reservas e dos detalhes do roteiro.",
  },
];

const settings: any = await c.getDocument("settings");
const lua: any = await c.getDocument("experience-lua-de-mel");
const home: any = await c.getDocument("drafts.home");
if (!settings || !lua || !home) throw new Error("documento não encontrado");

const jaTemFaq = new Set((lua.faq ?? []).map((f: any) => f.question));
const faqNovo = [...(lua.faq ?? []), ...LUA_FAQ_EXTRA.filter((f) => !jaTemFaq.has(f.question))];

const plano = [
  { id: "settings", set: { address: "QS CLSW 105, Bloco C, EN 18/44, Sala 150 Kit Studio, Setor Sudoeste", postalCode: "70.670-433", city: "Brasília", state: "DF" }, unset: ["cadastur"] },
  { id: "experience-lua-de-mel", set: { seo: LUA_SEO, manifesto: LUA_MANIFESTO, steps: LUA_STEPS, faq: faqNovo }, unset: [] as string[] },
  { id: "drafts.home", set: { seo: HOME_SEO }, unset: [] as string[] },
];
console.log("antes -> settings.address:", JSON.stringify(settings.address), "| cadastur:", settings.cadastur, "| cnpj:", settings.cnpj);
for (const p of plano) console.log("vai gravar em", p.id, "->", Object.keys(p.set).join(", "), p.unset.length ? `| remove: ${p.unset.join(", ")}` : "");
if (!aplicar) { console.log("\n(simulação: nada foi gravado)"); process.exit(0); }

const arq = `_scripts/backup-seo-${new Date().toISOString().slice(0, 10)}.json`;
fs.writeFileSync(arq, JSON.stringify({ settings, lua, home }, null, 1));
console.log("backup em", arq);
for (const p of plano) {
  let t = c.patch(p.id).set(p.set);
  if (p.unset.length) t = t.unset(p.unset);
  await t.commit();
  console.log("gravado:", p.id);
}
