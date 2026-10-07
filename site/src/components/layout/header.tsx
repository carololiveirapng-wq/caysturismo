"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Container } from "@/components/ui/container";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { experienceHref, travelProductHref } from "@/lib/links";
import { cn } from "@/lib/utils";
import type { SiteSettings } from "@/lib/cms";

const navLinks = [
  { label: "Destinos", href: "/destinos" },
  {
    label: "Experiências",
    href: "/experiencias",
    submenu: [
      { label: "Lua de Mel", href: experienceHref("lua-de-mel") },
      { label: "Destination Wedding", href: experienceHref("destination-wedding") },
      { label: "Viagens em Família", href: experienceHref("familia") },
      { label: "Cruzeiros & Expedições", href: experienceHref("cruzeiros") },
      { label: "Grandes Eventos", href: experienceHref("grandes-eventos") },
      { label: "Viagens Privativas", href: experienceHref("privativas") },
    ],
  },
  {
    label: "Viagens",
    href: "/viagens",
    submenu: [
      { label: "Japão em Flor", href: travelProductHref("japao-em-flor") },
      { label: "Cruzeiro pelo Mediterrâneo", href: travelProductHref("cruzeiro-mediterraneo") },
    ],
  },
  { label: "Curadoria", href: "/curadoria" },
  { label: "A Cays", href: "/sobre" },
];

// Rotas com hero de foto full-bleed e fundo escuro no topo — só nelas o
// cabeçalho pode nascer transparente (texto ivory sobre bg-transparent).
// Qualquer rota fora desta lista nasce com o fundo sólido, legível desde o
// primeiro frame. É uma lista positiva de propósito: a versão anterior era
// negativa (rotas SEM hero) e quebrava silenciosamente a cada página nova
// que não se encaixava no padrão assumido — foi assim que Curadoria,
// Privacidade, Termos e as viagens (/viagens/[slug], hero claro) ficaram
// com o cabeçalho ilegível no topo até serem encontradas uma por vez.
// Adicionar uma rota aqui exige confirmar que ela realmente tem hero de
// foto com fundo escuro (`bg-ink` + imagem) — não assumir.
const DARK_HERO_PATHS = ["/", "/sobre", "/destinos", "/experiencias", "/viagens", "/curadoria"];
const DARK_HERO_PREFIXES = ["/destinos/", "/experiencias/"];

export function Header({ settings }: { settings: SiteSettings }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const pathname = usePathname() ?? "";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 64);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const hasDarkHero =
    DARK_HERO_PATHS.includes(pathname) || DARK_HERO_PREFIXES.some((prefix) => pathname.startsWith(prefix));
  const solid = scrolled || menuOpen || !hasDarkHero;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,height] duration-500 ease-[var(--ease-editorial)]",
          solid
            ? "h-16 border-b border-line bg-ivory/95 backdrop-blur-sm md:h-20"
            : "h-20 border-b border-transparent bg-transparent md:h-24",
        )}
      >
        <Container className="flex h-full items-center justify-between">
          <Link href="/" aria-label="Cays Turismo — início" className="shrink-0">
            <Image
              src="/cays-turismo-logo-header-menu.png"
              alt="Cays Turismo"
              width={140}
              height={50}
              priority
              className={cn(
                "h-8 w-auto transition-[filter] duration-500 md:h-9",
                solid && "invert",
              )}
            />
          </Link>

          <nav
            aria-label="Navegação principal"
            className="hidden items-center gap-10 lg:flex"
          >
            {navLinks.map((link) => (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => "submenu" in link && setOpenSubmenu(link.href)}
                onMouseLeave={() => setOpenSubmenu(null)}
                onFocus={() => "submenu" in link && setOpenSubmenu(link.href)}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpenSubmenu(null);
                }}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "text-sm font-medium tracking-wide transition-colors duration-500",
                    solid ? "text-ink/90 hover:text-ink" : "text-ivory/90 hover:text-ivory",
                  )}
                  aria-expanded={"submenu" in link ? openSubmenu === link.href : undefined}
                >
                  {link.label}
                </Link>

                {"submenu" in link && openSubmenu === link.href && (
                  // Wrapper sem margem, só padding-top: mantém o espaçamento visual
                  // do card mas garante que a área "hoverável" seja contínua do
                  // link até o menu — com margin-top no lugar de padding, o cursor
                  // atravessava uma faixa morta e o onMouseLeave do pai disparava
                  // antes de alcançar o submenu.
                  <div className="absolute top-full left-1/2 w-64 -translate-x-1/2 pt-4">
                    <div
                      role="menu"
                      className="border border-line bg-ivory py-3 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.25)]"
                    >
                      {link.submenu?.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          role="menuitem"
                          className="block px-5 py-2 text-sm text-ink/80 transition-colors hover:bg-sand hover:text-ink"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            <Link
              href="/contato"
              className={cn(
                "group/cta hidden items-center gap-2 text-sm font-medium tracking-wide transition-colors duration-500 md:inline-flex",
                solid ? "text-ink" : "text-ivory",
              )}
            >
              Planeje sua viagem
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover/cta:translate-x-1"
              >
                →
              </span>
            </Link>

            <button
              type="button"
              aria-label="Abrir menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              className={cn(
                "flex size-10 items-center justify-center transition-colors duration-500 lg:hidden",
                solid ? "text-ink" : "text-ivory",
              )}
            >
              <Menu className="size-5" />
            </button>
          </div>
        </Container>
      </header>

      <MobileNavigation
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={navLinks}
        instagram={settings.instagram}
        whatsappHref={settings.whatsappHref}
      />
    </>
  );
}
