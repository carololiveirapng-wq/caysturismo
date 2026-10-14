import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { PublicChrome } from "@/components/layout/public-chrome";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { siteConfig } from "@/lib/site-config";
import { getSettings, getHome } from "@/lib/cms";
import "../globals.css";
import { jsonLdString } from "@/lib/json-ld";
import { organizationJsonLd } from "@/lib/seo/structured-data";

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

export async function generateMetadata(): Promise<Metadata> {
  // Imagem padrão de Open Graph pro site inteiro — qualquer página que não
  // defina a própria (como a Home) herda esta. Reaproveita o hero real da
  // Home em vez de uma imagem OG dedicada que ainda não existe.
  const home = await getHome();
  const ogImage = home?.hero.image.src;

  return {
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
      ...(ogImage && { images: [{ url: ogImage }] }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImage && { images: [ogImage] }),
    },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const settings = await getSettings();


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
          dangerouslySetInnerHTML={{ __html: jsonLdString(organizationJsonLd(settings)) }}
        />
        <PublicChrome
          header={<Header settings={settings} />}
          footer={<Footer settings={settings} />}
          whatsappButton={<WhatsAppButton whatsappHref={settings.whatsappHref} />}
        >
          {children}
        </PublicChrome>
      </body>
    </html>
  );
}
