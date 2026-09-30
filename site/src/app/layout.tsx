import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { PublicChrome } from "@/components/layout/public-chrome";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const title = `${siteConfig.name} | Curadoria de Viagens Personalizadas`;
const description =
  "Viagens desenhadas em torno de você. Lua de mel, viagens em família, cruzeiros, experiências e roteiros personalizados pela Cays Turismo.";

// Vercel marca deploys de Preview com VERCEL_ENV=preview — sem isto, o
// Google indexaria cada URL de preview junto com o site de produção.
const isVercelPreview = process.env.VERCEL_ENV === "preview";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: title,
    template: `%s | ${siteConfig.name}`,
  },
  description,
  alternates: {
    canonical: "/",
  },
  ...(isVercelPreview && { robots: { index: false, follow: false } }),
  openGraph: {
    title,
    description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: siteConfig.name,
    url: siteConfig.url,
    sameAs: [siteConfig.instagram].filter(Boolean),
  };

  return (
    <html
      lang="pt-BR"
      className={`${manrope.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body
        className="flex min-h-full flex-col bg-ivory text-ink"
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <PublicChrome>{children}</PublicChrome>
      </body>
    </html>
  );
}
