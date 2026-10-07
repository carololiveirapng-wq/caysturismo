import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, AtSign, ArrowUpRight } from "lucide-react";
import { TrackedLink, TrackedAnchor } from "@/components/linkbio/tracked-link";
import { getSettings, getHome } from "@/lib/cms";
import { siteConfig } from "@/lib/site-config";
import { travelProductHref } from "@/lib/links";

const title = "Cays Turismo | Links oficiais";
const description = "Destinos, experiências, viagens e atendimento da Cays Turismo.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/linkbio" },
  openGraph: { title, description, url: `${siteConfig.url}/linkbio` },
  robots: { index: true, follow: true },
};

const NAV_LINKS = [
  { label: "Explorar destinos", href: "/destinos", event: "linkbio_destinations" },
  { label: "Experiências", href: "/experiencias", event: "linkbio_experiences" },
  { label: "Viagens", href: "/viagens", event: "linkbio_trips" },
  { label: "Curadoria", href: "/curadoria", event: "linkbio_curadoria" },
  { label: "Conheça a Cays", href: "/sobre", event: "linkbio_about" },
] as const;

/** Igual à mensagem do botão flutuante global, mas menciona a origem (Instagram) — contexto real do clique aqui. */
const WHATSAPP_MESSAGE = "Olá! Vim pelo Instagram da Cays e gostaria de começar a planejar uma viagem.";

export default async function LinkbioPage() {
  const [settings, home] = await Promise.all([getSettings(), getHome()]);

  const foundedYear = settings.foundedDate ? new Date(settings.foundedDate).getFullYear() : undefined;
  const featured = home?.featuredTravelProducts?.[0];
  const domainLabel = siteConfig.url.replace(/^https?:\/\/(www\.)?/, "");
  const topMeta = [foundedYear && `Desde ${foundedYear}`, settings.slogan].filter(Boolean).join(" — ");

  return (
    <div className="min-h-dvh bg-ivory">
      <div className="mx-auto flex min-h-dvh w-full max-w-[560px] flex-col px-6 py-14 md:py-20">
        <header className="flex flex-col items-center text-center">
          <Image
            src="/cays-turismo-logo-header-menu.png"
            alt="Cays Turismo"
            width={140}
            height={50}
            priority
            className="h-9 w-auto invert"
          />
          <h1 className="mt-6 font-serif text-2xl text-ink">Cays Turismo</h1>
          <p className="mt-3 max-w-[320px] text-sm leading-relaxed text-ink/70">{siteConfig.tagline}</p>
          {topMeta && <p className="mt-2 text-xs tracking-wide text-ink/70 uppercase">{topMeta}</p>}
        </header>

        <TrackedLink
          href="/contato"
          event="linkbio_plan_trip"
          className="mt-10 flex items-center justify-center bg-ink px-6 py-4 text-sm font-medium tracking-wide text-ivory uppercase transition-colors duration-300 hover:bg-magenta-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta-dark"
        >
          Planejar minha viagem
        </TrackedLink>

        {settings.whatsappHref && (
          <TrackedAnchor
            href={`${settings.whatsappHref}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
            target="_blank"
            rel="noreferrer"
            event="linkbio_whatsapp"
            className="mt-3 flex items-center justify-center gap-2 border border-ink/15 px-6 py-4 text-sm font-medium tracking-wide text-ink uppercase transition-colors duration-300 hover:border-ink hover:text-magenta-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta-dark"
          >
            <MessageCircle className="size-4 shrink-0" aria-hidden />
            Falar no WhatsApp
          </TrackedAnchor>
        )}

        <nav aria-label="Links principais" className="mt-10 flex flex-col divide-y divide-line border-y border-line">
          {NAV_LINKS.map((link) => (
            <TrackedLink
              key={link.href}
              href={link.href}
              event={link.event}
              className="group flex items-center justify-between py-4 text-sm font-medium tracking-wide text-ink transition-colors duration-300 hover:text-magenta-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta-dark"
            >
              {link.label}
              <ArrowUpRight
                className="size-4 shrink-0 text-ink/70 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-magenta-dark"
                aria-hidden
              />
            </TrackedLink>
          ))}
        </nav>

        {featured && (
          <Link
            href={travelProductHref(featured.slug)}
            className="group mt-10 flex items-center gap-4 border border-line bg-sand/40 p-3 transition-colors duration-300 hover:border-ink/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta-dark"
          >
            <div className="relative size-16 shrink-0 overflow-hidden bg-stone">
              <Image src={featured.image.src} alt={featured.image.alt} fill sizes="64px" className="object-cover" />
            </div>
            <div className="min-w-0">
              {featured.eyebrow && (
                <p className="text-[0.65rem] font-medium tracking-[0.2em] text-ink/70 uppercase">{featured.eyebrow}</p>
              )}
              <p className="mt-0.5 truncate text-sm font-medium text-ink">{featured.title}</p>
              <span className="mt-0.5 inline-flex items-center gap-1 text-xs text-magenta-dark">
                Conhecer
                <ArrowUpRight className="size-3 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
              </span>
            </div>
          </Link>
        )}

        {settings.instagram && (
          <TrackedAnchor
            href={settings.instagram}
            target="_blank"
            rel="noreferrer"
            event="linkbio_social"
            aria-label="Instagram da Cays Turismo"
            className="mt-10 flex items-center justify-center gap-2 py-3 text-sm font-medium tracking-wide text-ink/70 transition-colors duration-300 hover:text-magenta-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta-dark"
          >
            <AtSign className="size-4" aria-hidden />
            Instagram
          </TrackedAnchor>
        )}

        <footer className="mt-auto pt-14 text-center text-xs text-ink/70">
          <p>Cays Turismo</p>
          {settings.city && settings.state && (
            <p className="mt-1">
              {settings.city} — {settings.state}
            </p>
          )}
          {foundedYear && <p className="mt-1">Desde {foundedYear}</p>}
          <p className="mt-1">{domainLabel}</p>
        </footer>
      </div>
    </div>
  );
}
