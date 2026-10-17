"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";
import { experienceHref } from "@/lib/links";
import { trackEvent } from "@/lib/analytics";
import type { SiteSettings } from "@/lib/cms";

const columns = [
  {
    heading: "Explorar",
    links: [
      { label: "Destinos", href: "/destinos" },
      { label: "Experiências", href: "/experiencias" },
      { label: "Viagens", href: "/viagens" },
      { label: "Reservar online", href: "/reservar-online" },
      { label: "Curadoria", href: "/curadoria" },
      { label: "A Cays", href: "/sobre" },
    ],
  },
  {
    heading: "Experiências",
    links: [
      { label: "Lua de Mel", href: experienceHref("lua-de-mel") },
      { label: "Viagens em Família", href: experienceHref("familia") },
      { label: "Destination Wedding", href: experienceHref("destination-wedding") },
      { label: "Cruzeiros", href: experienceHref("cruzeiros") },
      { label: "Grandes Eventos", href: experienceHref("grandes-eventos") },
    ],
  },
];

const legalLinks = [
  { label: "Política de Privacidade", href: "/privacidade" },
  { label: "Termos de Uso", href: "/termos" },
];

export function Footer({ settings }: { settings: SiteSettings }) {
  const legalMeta = [
    settings.cnpj && `CNPJ ${settings.cnpj}`,
    settings.cadastur && `Cadastur ${settings.cadastur}`,
  ].filter(Boolean);

  return (
    <footer className="bg-graphite text-ivory">
      <Container className="border-t border-ivory/10 py-16 md:py-20">
        <div className="grid grid-cols-2 gap-x-8 gap-y-14 md:grid-cols-12 md:gap-x-6">
          <div className="col-span-2 md:col-span-4">
            <Image
              src="/cays-turismo-logo-header-menu.png"
              alt="Cays Turismo"
              width={140}
              height={50}
              className="h-10 w-auto"
            />
            <p className="mt-6 max-w-[240px] text-sm leading-relaxed text-ivory/55">
              Curadoria de viagens personalizadas, para quem quer viver a jornada — não só reservá-la.
            </p>
          </div>

          <div className="hidden md:col-span-1 md:block">
            <span aria-hidden className="block h-full w-px bg-ivory/10" />
          </div>

          {columns.map((column) => (
            <div key={column.heading} className="md:col-span-2">
              <h3 className="text-xs font-medium tracking-[0.2em] text-ivory/70 uppercase">
                {column.heading}
              </h3>
              <ul className="mt-6 space-y-3.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={
                        link.href === "/reservar-online"
                          ? () => trackEvent("online_booking_clicked_footer")
                          : undefined
                      }
                      className="text-sm text-ivory/75 transition-colors hover:text-ivory"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-3">
            <h3 className="text-xs font-medium tracking-[0.2em] text-ivory/70 uppercase">
              Contato
            </h3>
            <ul className="mt-6 space-y-3.5 text-sm text-ivory/75">
              {settings.whatsappHref && (
                <li>
                  <a href={settings.whatsappHref} target="_blank" rel="noreferrer" className="hover:text-ivory">
                    WhatsApp
                  </a>
                </li>
              )}
              {settings.email && (
                <li>
                  <a href={`mailto:${settings.email}`} className="hover:text-ivory">
                    {settings.email}
                  </a>
                </li>
              )}
              {settings.address && <li className="text-ivory/55">{settings.address}</li>}
              {settings.instagram && (
                <li>
                  <a
                    href={settings.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-ivory"
                  >
                    Instagram
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-ivory/10 pt-8 text-xs text-ivory/70 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <span>© {new Date().getFullYear()} {siteConfig.name}.</span>
            {legalMeta.map((meta) => (
              <span key={meta}>{meta}</span>
            ))}
          </div>
          <div className="flex gap-4">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-ivory/70">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
