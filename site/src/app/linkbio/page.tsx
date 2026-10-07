import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, AtSign, ArrowRight, ArrowUpRight } from "lucide-react";
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

const ACTION_CLASS =
  "flex items-center justify-between gap-3 rounded-xl px-5 py-4 text-sm font-medium tracking-wide transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta-dark";

/** Igual à mensagem do botão flutuante global, mas menciona a origem (Instagram) — contexto real do clique aqui. */
const WHATSAPP_MESSAGE = "Olá! Vim pelo Instagram da Cays e gostaria de começar a planejar uma viagem.";

export default async function LinkbioPage() {
  const [settings, home] = await Promise.all([getSettings(), getHome()]);

  const foundedYear = settings.foundedDate ? new Date(settings.foundedDate).getFullYear() : undefined;
  const featured = home?.featuredTravelProducts?.[0];
  const domainLabel = siteConfig.url.replace(/^https?:\/\/(www\.)?/, "");
  const topMeta = [foundedYear && `Desde ${foundedYear}`, settings.slogan].filter(Boolean).join(" — ");
  const instagramHandle = settings.instagram.match(/instagram\.com\/([^/?]+)/)?.[1];
  const footerMeta = [settings.city, foundedYear && `Desde ${foundedYear}`].filter(Boolean).join(" · ");

  return (
    <div className="flex min-h-dvh items-center justify-center bg-mauve p-3 sm:p-6 md:p-10">
      <div className="w-full max-w-[460px] overflow-hidden rounded-[28px] border border-ink/10 bg-ivory shadow-[0_40px_90px_-45px_rgba(47,47,47,0.35)]">
        <div className="relative bg-ink pt-8 pb-12">
          <div className="absolute inset-x-0 bottom-0 z-10 flex translate-y-1/2 justify-center">
            <div className="relative size-20 overflow-hidden rounded-full ring-4 ring-ivory md:size-24">
              <Image src="/icon.png" alt="Cays Turismo" fill sizes="96px" priority className="object-cover" />
            </div>
          </div>
        </div>

        <div className="px-6 pt-14 pb-7 md:px-8 md:pt-16">
          <header className="text-center">
            <h1 className="font-serif text-2xl text-ink md:text-[1.75rem]">Cays Turismo</h1>
            <p className="mt-2 text-sm leading-relaxed text-ink/70">{siteConfig.tagline}</p>
            {topMeta && (
              <p className="mt-1.5 text-[0.7rem] font-medium tracking-[0.12em] text-ink/70 uppercase">{topMeta}</p>
            )}
          </header>

          <div className="mt-7 flex flex-col gap-2.5">
            <TrackedLink
              href="/contato"
              event="linkbio_plan_trip"
              className={`${ACTION_CLASS} bg-ink text-ivory uppercase hover:bg-magenta-dark`}
            >
              Planejar minha viagem
              <ArrowRight className="size-4 shrink-0" aria-hidden />
            </TrackedLink>

            {settings.whatsappHref && (
              <TrackedAnchor
                href={`${settings.whatsappHref}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
                target="_blank"
                rel="noreferrer"
                event="linkbio_whatsapp"
                className={`${ACTION_CLASS} border-2 border-ink/15 text-ink uppercase hover:border-magenta-dark hover:text-magenta-dark`}
              >
                <span className="flex items-center gap-2">
                  <MessageCircle className="size-4 shrink-0" aria-hidden />
                  Falar no WhatsApp
                </span>
                <ArrowUpRight className="size-4 shrink-0" aria-hidden />
              </TrackedAnchor>
            )}
          </div>

          <nav aria-label="Links principais" className="mt-2.5 flex flex-col gap-2.5">
            {NAV_LINKS.map((link) => (
              <TrackedLink
                key={link.href}
                href={link.href}
                event={link.event}
                className={`${ACTION_CLASS} group border border-ink/10 bg-white/60 text-ink hover:border-magenta/40 hover:bg-magenta/5 hover:text-magenta-dark`}
              >
                {link.label}
                <ArrowRight
                  className="size-4 shrink-0 text-ink/35 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-magenta-dark"
                  aria-hidden
                />
              </TrackedLink>
            ))}
          </nav>

          {featured && (
            <Link
              href={travelProductHref(featured.slug)}
              className="group mt-5 block overflow-hidden rounded-xl border border-ink/10 transition-colors duration-300 hover:border-magenta/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta-dark"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-stone">
                <Image
                  src={featured.image.src}
                  alt={featured.image.alt}
                  fill
                  sizes="420px"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="bg-ivory px-5 py-4">
                {featured.eyebrow && (
                  <p className="text-[0.65rem] font-medium tracking-[0.2em] text-ink/70 uppercase">{featured.eyebrow}</p>
                )}
                <p className="mt-0.5 font-serif text-lg text-ink">{featured.title}</p>
                <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-magenta-dark">
                  Conhecer
                  <ArrowRight className="size-3 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
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
              className={`${ACTION_CLASS} group mt-2.5 border border-ink/10 bg-white/60 text-ink hover:border-magenta/40 hover:text-magenta-dark`}
            >
              <span className="flex items-center gap-2">
                <AtSign className="size-4 shrink-0" aria-hidden />
                Instagram
                {instagramHandle && <span className="font-normal normal-case text-ink/70">@{instagramHandle}</span>}
              </span>
              <ArrowUpRight
                className="size-4 shrink-0 text-ink/35 transition-colors duration-300 group-hover:text-magenta-dark"
                aria-hidden
              />
            </TrackedAnchor>
          )}

          <footer className="mt-7 text-center text-[0.7rem] text-ink/70">
            <p className="font-medium">Cays Turismo</p>
            {footerMeta && <p className="mt-0.5">{footerMeta}</p>}
            <p className="mt-0.5">{domainLabel}</p>
          </footer>
        </div>
      </div>
    </div>
  );
}
