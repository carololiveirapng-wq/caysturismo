import { siteConfig } from "@/lib/site-config";
import type { SiteSettings } from "@/lib/cms/settings";

/**
 * Nome, endereço e telefone (NAP) numa única fonte: Rodapé, Contato, Sobre e
 * dados estruturados leem daqui, então nunca divergem entre si. Tudo vem do
 * Studio (Configurações Globais); campo vazio simplesmente não aparece.
 */
export interface Nap {
  legalName: string;
  tradeName: string;
  cnpj?: string;
  /** Rua/quadra, complemento e bairro. */
  street?: string;
  /** "Brasília-DF · CEP 70.670-433" */
  cityLine?: string;
  phone?: string;
  phoneHref?: string;
  whatsapp?: string;
  whatsappHref?: string;
  email?: string;
}

function digits(value: string | undefined) {
  return value?.replace(/\D/g, "") ?? "";
}

/** (61) 98199-8280 a partir de 5561981998280 (ou de um número já formatado). */
export function formatBrPhone(raw: string | undefined): string | undefined {
  let d = digits(raw);
  if (!d) return undefined;
  if (d.startsWith("55") && d.length > 11) d = d.slice(2);
  if (d.length === 11) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  if (d.length === 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return raw;
}

export function telHref(raw: string | undefined): string | undefined {
  const d = digits(raw);
  if (!d) return undefined;
  return `tel:+${d.startsWith("55") ? d : `55${d}`}`;
}

export function getNap(settings: SiteSettings): Nap {
  const place = [settings.city, settings.state].filter(Boolean).join("-");
  const cityLine = [place, settings.postalCode && `CEP ${settings.postalCode}`].filter(Boolean).join(" · ");
  return {
    legalName: siteConfig.legalName,
    tradeName: siteConfig.name,
    cnpj: settings.cnpj || undefined,
    street: settings.address || undefined,
    cityLine: cityLine || undefined,
    phone: formatBrPhone(settings.phone),
    phoneHref: telHref(settings.phone),
    whatsapp: formatBrPhone(settings.whatsapp),
    whatsappHref: settings.whatsappHref,
    email: settings.email || undefined,
  };
}
