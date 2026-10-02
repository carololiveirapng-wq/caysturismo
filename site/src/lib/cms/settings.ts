import { fetchFromSanity } from "./sanity-fetch";
import { SETTINGS_QUERY } from "@/sanity/queries/settings";
import { siteConfig } from "@/lib/site-config";

interface SanitySettings {
  whatsapp?: string;
  phone?: string;
  email?: string;
  hours?: string;
  address?: string;
  city?: string;
  state?: string;
  instagram?: string;
  cnpj?: string;
  cadastur?: string;
  slogan?: string;
  foundedDate?: string;
  socialLinks?: { label?: string; url?: string }[];
  defaultCTA?: { label?: string; href?: string };
  seoDefaults?: { title?: string; description?: string };
}

export interface SiteSettings {
  whatsapp: string;
  whatsappHref?: string;
  phone: string;
  hours: string;
  email: string;
  address: string;
  city: string;
  state: string;
  instagram: string;
  /** Vazio se não cadastrado — `Credentials` só renderiza quando real. */
  cnpj: string;
  cadastur: string;
  /** Ex.: "Do Altar para a vida toda" — vazio se ainda não cadastrado, nunca um texto inventado. */
  slogan: string;
  /** ISO (YYYY-MM-DD) da fundação real — "Desde 1997" é derivado disto no front-end, nunca escrito solto. */
  foundedDate?: string;
  defaultCTA?: { label: string; href: string };
}

/**
 * `settings` é um singleton opcional — ausência não é um erro (sem
 * `notFound()` aqui, ao contrário de `fetchEntityWithFallback`), só
 * significa "usa os defaults estáticos de `site-config.ts`". Cada campo
 * cai pro default individualmente: um Settings parcialmente preenchido no
 * Studio já sobrescreve só o que tiver, sem exigir tudo de uma vez. "Se
 * vazio, frontend não mostra" continua valendo — os defaults hoje são
 * strings vazias, exatamente como antes do CMS existir.
 */
export async function getSettings(): Promise<SiteSettings> {
  const fromSanity = await fetchFromSanity<SanitySettings | null>(SETTINGS_QUERY);

  const whatsapp = fromSanity?.whatsapp || siteConfig.whatsapp;
  // Campo dedicado é a fonte preferida; `socialLinks` com um rótulo
  // "Instagram" continua funcionando pra quem já tinha cadastrado assim.
  const instagram =
    fromSanity?.instagram ||
    fromSanity?.socialLinks?.find((link) => link.label?.toLowerCase().includes("instagram"))?.url;

  return {
    whatsapp,
    whatsappHref: whatsapp ? `https://wa.me/${whatsapp}` : undefined,
    phone: fromSanity?.phone || siteConfig.phone,
    hours: fromSanity?.hours || siteConfig.hours,
    email: fromSanity?.email || siteConfig.email,
    address: fromSanity?.address || siteConfig.address,
    city: fromSanity?.city || "",
    state: fromSanity?.state || "",
    instagram: instagram || siteConfig.instagram,
    cnpj: fromSanity?.cnpj || siteConfig.cnpj,
    cadastur: fromSanity?.cadastur || siteConfig.cadastur,
    slogan: fromSanity?.slogan || "",
    foundedDate: fromSanity?.foundedDate,
    defaultCTA:
      fromSanity?.defaultCTA?.label && fromSanity?.defaultCTA?.href
        ? { label: fromSanity.defaultCTA.label, href: fromSanity.defaultCTA.href }
        : undefined,
  };
}
