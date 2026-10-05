import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/legal-document";
import { termsSections } from "@/lib/legal/content";
import { siteConfig } from "@/lib/site-config";

const title = "Termos de Uso | Cays Turismo";
const description = "Condições de uso do site da Cays Turismo.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/termos" },
  openGraph: { title, description, url: `${siteConfig.url}/termos` },
  robots: { index: true, follow: true },
};

export default function TermosPage() {
  return <LegalDocument title="Termos de Uso" sections={termsSections} />;
}
