import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { PublicChrome } from "@/components/layout/public-chrome";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { siteConfig } from "@/lib/site-config";
import { getSettings, getHome, getNavData } from "@/lib/cms";
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

// Padrão do site (a Home usa o SEO do Studio quando preenchido — ver `page.tsx`). Brasília entra no título e na descrição
// para o Google e quem busca entenderem logo: agência de viagens de Brasília, com curadoria premium.
const title = `Agência de Viagens em Brasília | ${siteConfig.name}`;
const description =
  "Agência de viagens em Brasília desde 1997, especializada em lua de mel, destination wedding, viagens em família e roteiros sob medida.";

// Vercel marca deploys de Preview com VERCEL_ENV=preview — sem isto, o
// Google indexaria cada URL de preview junto com o site de produção.
const isVercelPreview = process.env.VERCEL_ENV === "preview";

export async function generateMetadata(): Promise<Metadata> {
  // Imagem padrão de Open Graph pro site inteiro — qualquer página que não
  // defina a própria (como a Home) herda esta. Reaproveita o hero real da
  // Home em vez de uma imagem OG dedicada que ainda não existe.
  const home = await getHome();
  // hero.image só existe no modo "Imagem única" — nos modos slide/vídeo,
  // cai pra primeira imagem do slide ou pra capa do vídeo.
  const ogImage = home?.hero.image?.src ?? home?.hero.images?.[0]?.src ?? home?.hero.videoPoster?.src;

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

// O menu depende das ofertas abertas: reconstrói a cada 15 min para uma oferta vencida sair sozinha.
export const revalidate = 900;

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const [settings, nav] = await Promise.all([getSettings(), getNavData()]);
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
          header={<Header settings={settings} nav={nav} />}
          footer={<Footer settings={settings} />}
          whatsappButton={<WhatsAppButton whatsappHref={settings.whatsappHref} />}
        >
          {children}
        </PublicChrome>
      </body>
    </html>
  );
}
