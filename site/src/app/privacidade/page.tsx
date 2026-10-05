import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/legal-document";
import { LEGAL_DRAFT, privacySections } from "@/lib/legal/content";
import { siteConfig } from "@/lib/site-config";

const title = "Política de Privacidade | Cays Turismo";
const description = "Como a Cays Turismo coleta, usa e protege seus dados pessoais.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/privacidade" },
  openGraph: { title, description, url: `${siteConfig.url}/privacidade` },
  robots: LEGAL_DRAFT ? { index: false, follow: false } : { index: true, follow: true },
};

export default function PrivacidadePage() {
  return (
    <LegalDocument
      title="Política de Privacidade"
      intro="Esta página explica quais dados pessoais coletamos quando você pede um planejamento de viagem, por que os usamos e quais são os seus direitos."
      sections={privacySections}
    />
  );
}
