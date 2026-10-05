import { siteConfig } from "@/lib/site-config";
import type { SiteSettings } from "@/lib/cms/settings";

/**
 * Dados estruturados (schema.org) gerados só a partir de conteúdo real do
 * Sanity ou dos dados confirmados da empresa. Nenhum campo é inventado: se o
 * valor não existe, ele simplesmente não entra no JSON-LD.
 */

export interface BreadcrumbItem {
  name: string;
  href?: string;
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      ...items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: item.name,
        ...(item.href && { item: `${siteConfig.url}${item.href}` }),
      })),
    ],
  };
}

/** Só usar com FAQ realmente visível na página. */
export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/** Telefone em formato internacional, só dígitos (ex.: +556130336121). */
function toE164(raw: string | undefined) {
  const digits = raw?.replace(/\D/g, "");
  if (!digits) return undefined;
  return digits.startsWith("55") ? `+${digits}` : `+55${digits}`;
}

export function organizationJsonLd(settings: SiteSettings) {
  const telephone = toE164(settings.phone) ?? toE164(settings.whatsapp);
  const sameAs = [settings.instagram].filter((url): url is string => Boolean(url));
  const address = settings.address
    ? {
        "@type": "PostalAddress",
        streetAddress: settings.address,
        addressLocality: settings.city || undefined,
        addressRegion: settings.state || undefined,
        addressCountry: "BR",
      }
    : undefined;

  return {
    "@context": "https://schema.org",
    "@type": ["TravelAgency", "LocalBusiness"],
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/icon.png`,
    ...(telephone && { telephone }),
    ...(address && { address }),
    ...(settings.cnpj && { taxID: settings.cnpj }),
    ...(settings.foundedDate && { foundingDate: settings.foundedDate }),
    ...(sameAs.length > 0 && { sameAs }),
  };
}
