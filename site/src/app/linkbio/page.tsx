import type { Metadata } from "next";
import Image from "next/image";
import { MessageCircle, AtSign, ArrowRight, ArrowUpRight } from "lucide-react";
import { TrackedLink, TrackedAnchor } from "@/components/linkbio/tracked-link";
import { getSettings, getHome } from "@/lib/cms";
import { getDestinationWeddingStories } from "@/lib/cms/traveler-stories";
import { siteConfig } from "@/lib/site-config";

const title = "Cays Turismo | Links oficiais";
const description = "Destinos, experiências, viagens e atendimento da Cays Turismo.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/linkbio" },
  openGraph: { title, description, url: `${siteConfig.url}/linkbio` },
  robots: { index: true, follow: true },
};

const QUICK_LINKS = [
  { label: "Destinos", href: "/destinos", event: "linkbio_destinations" },
  { label: "Experiências", href: "/experiencias", event: "linkbio_experiences" },
  { label: "Curadoria", href: "/curadoria", event: "linkbio_curadoria" },
] as const;

/** Igual à mensagem do botão flutuante global, mas menciona a origem (Instagram) — contexto real do clique aqui. */
const WHATSAPP_MESSAGE = "Olá! Vim pelo Instagram da Cays e gostaria de começar a planejar uma viagem.";

export default async function LinkbioPage() {
  const [settings, home, stories] = await Promise.all([
    getSettings(),
    getHome(),
    getDestinationWeddingStories(),
  ]);

  const foundedYear = settings.foundedDate ? new Date(settings.foundedDate).getFullYear() : undefined;
  const domainLabel = siteConfig.url.replace(/^https?:\/\/(www\.)?/, "");
  const topMeta = [foundedYear && `Desde ${foundedYear}`, settings.slogan].filter(Boolean).join(" — ");
  const instagramHandle = settings.instagram.match(/instagram\.com\/([^/?]+)/)?.[1];
  const footerMeta = [settings.city, foundedYear && `Desde ${foundedYear}`].filter(Boolean).join(" · ");

  // Prioriza fotos reais de viajantes autorizados; sem isso, usa os destinos/experiências
  // já curados pela Home — nunca imagem inventada. Precisa de pelo menos 3 pra render
  // o carrossel valer a pena visualmente.
  const carouselItems =
    stories && stories.length >= 3
      ? stories.map((s) => ({ src: s.image.src, alt: s.image.alt, label: s.destinationName ?? s.title }))
      : (home?.featuredDestinations.length ?? 0) >= 3
        ? home!.featuredDestinations.map((d) => ({ src: d.image.src, alt: d.image.alt, label: d.name }))
        : (home?.featuredExperiences ?? []).map((e) => ({ src: e.image.src, alt: e.image.alt, label: e.name }));

  return (
    <div className="flex min-h-dvh items-center justify-center bg-mauve p-3 sm:p-6 md:p-10">
      <div className="w-full max-w-[460px] overflow-hidden rounded-[28px] bg-ivory shadow-[0_40px_90px_-45px_rgba(47,47,47,0.35)]">
        <div className="relative bg-gradient-to-br from-magenta to-magenta-dark pt-10 pb-14">
          <div className="absolute inset-x-0 bottom-0 z-10 flex translate-y-1/2 justify-center">
            <div className="relative size-20 overflow-hidden rounded-full ring-4 ring-ivory md:size-24">
              <Image src="/icon.png" alt="Cays Turismo" fill sizes="96px" priority className="object-cover" />
            </div>
          </div>
        </div>

        <div className="px-6 pt-14 pb-7 md:px-8 md:pt-16">
          <header className="text-center">
            <h1 className="font-serif text-[1.65rem] text-ink md:text-3xl">Cays Turismo</h1>
            <p className="mt-2 text-sm leading-relaxed text-ink/70">{siteConfig.tagline}</p>
            {topMeta && (
              <p className="mt-1.5 text-[0.7rem] font-medium tracking-[0.12em] text-ink/70 uppercase">{topMeta}</p>
            )}
          </header>

          <div className="mt-7 flex flex-col gap-2.5">
            <TrackedLink
              href="/contato"
              event="linkbio_plan_trip"
              className="flex items-center justify-between gap-3 rounded-full bg-magenta-dark px-6 py-4 text-sm font-semibold tracking-wide text-ivory uppercase transition-colors duration-300 hover:bg-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta-dark"
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
                className="flex items-center justify-between gap-3 rounded-full bg-ink px-6 py-4 text-sm font-semibold tracking-wide text-ivory uppercase transition-colors duration-300 hover:bg-magenta-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta-dark"
              >
                <span className="flex items-center gap-2">
                  <MessageCircle className="size-4 shrink-0" aria-hidden />
                  Falar no WhatsApp
                </span>
                <ArrowUpRight className="size-4 shrink-0" aria-hidden />
              </TrackedAnchor>
            )}

            <TrackedLink
              href="/"
              event="linkbio_site"
              className="flex items-center justify-between gap-3 rounded-full bg-sand px-6 py-4 text-sm font-semibold tracking-wide text-ink uppercase transition-colors duration-300 hover:bg-magenta/10 hover:text-magenta-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta-dark"
            >
              Acessar site completo
              <ArrowRight className="size-4 shrink-0" aria-hidden />
            </TrackedLink>
          </div>

          <nav aria-label="Links rápidos" className="mt-5 flex flex-wrap items-center justify-center gap-2">
            {QUICK_LINKS.map((link) => (
              <TrackedLink
                key={link.href}
                href={link.href}
                event={link.event}
                className="rounded-full px-4 py-3 text-xs font-medium tracking-wide text-ink/70 uppercase transition-colors duration-300 hover:bg-magenta/10 hover:text-magenta-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta-dark"
              >
                {link.label}
              </TrackedLink>
            ))}
          </nav>

          {carouselItems.length >= 3 && (
            <div className="mt-7">
              <p className="text-center text-[0.7rem] font-medium tracking-[0.2em] text-ink/70 uppercase">Inspire-se</p>
              <div className="relative mt-3 overflow-hidden">
                <div className="flex w-max gap-3 [animation:linkbioMarquee_42s_linear_infinite] hover:[animation-play-state:paused]">
                  {[...carouselItems, ...carouselItems].map((item, i) => (
                    <div
                      key={`${item.src}-${i}`}
                      className="relative h-40 w-32 shrink-0 overflow-hidden rounded-xl bg-stone"
                    >
                      <Image src={item.src} alt={item.alt} fill sizes="128px" className="object-cover" />
                      <div
                        aria-hidden
                        className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent pt-8 pb-2.5"
                      />
                      <p className="absolute inset-x-2 bottom-2 truncate text-[0.7rem] font-medium text-ivory">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {settings.instagram && (
            <TrackedAnchor
              href={settings.instagram}
              target="_blank"
              rel="noreferrer"
              event="linkbio_social"
              aria-label="Instagram da Cays Turismo"
              className="group mt-7 flex items-center justify-center gap-2 py-3 text-sm font-medium tracking-wide text-ink/70 transition-colors duration-300 hover:text-magenta-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta-dark"
            >
              <AtSign className="size-4 shrink-0" aria-hidden />
              Instagram
              {instagramHandle && <span className="text-ink/70 group-hover:text-magenta-dark">@{instagramHandle}</span>}
              <ArrowUpRight className="size-3.5 shrink-0 text-ink/40 group-hover:text-magenta-dark" aria-hidden />
            </TrackedAnchor>
          )}

          <footer className="mt-4 text-center text-[0.7rem] text-ink/70">
            <p className="font-medium">Cays Turismo</p>
            {footerMeta && <p className="mt-0.5">{footerMeta}</p>}
            <p className="mt-0.5">{domainLabel}</p>
          </footer>
        </div>
      </div>
    </div>
  );
}
