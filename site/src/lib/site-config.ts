/**
 * Dados reais da empresa. Campos vazios não devem ser renderizados —
 * cada consumidor deste objeto é responsável por checar antes de exibir.
 */
export const siteConfig = {
  name: "Cays Turismo",
  legalName: "CAYS VIAGENS E TURISMO LTDA",
  shortName: "Cays",
  tagline: "Curadoria de viagens personalizadas",
  // NEXT_PUBLIC_SITE_URL define o domínio real (ex.: *.vercel.app antes do
  // domínio próprio, depois o domínio oficial). Sem ela, cai num fallback
  // só de desenvolvimento — nunca um domínio inventado.
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  whatsapp: "", // TODO: número no formato 55DDDDDDDDDDD
  phone: "", // TODO: telefone de contato, se houver um distinto do WhatsApp
  hours: "", // TODO: horário de atendimento (ex.: "Seg a sex, 9h às 18h")
  email: "",
  address: "",
  cnpj: "",
  cadastur: "",
  instagram: "https://www.instagram.com/caysturismo/",
} as const;
