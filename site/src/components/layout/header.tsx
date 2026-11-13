"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search } from "lucide-react";
import { Container } from "@/components/ui/container";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import type { SiteSettings } from "@/lib/cms";
import type { NavData, NavNode } from "@/types";

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
const DARK_HERO_PATHS = ["/", "/sobre", "/destinos", "/experiencias", "/viagens", "/oportunidades", "/curadoria", "/grupos", "/inspiracoes"];
const DARK_HERO_PREFIXES = ["/destinos/", "/experiencias/", "/inspiracoes/"];

export function Header({ settings, nav }: { settings: SiteSettings; nav: NavData }) {
  // O menu se monta sozinho a partir do conteúdo do Studio (destinos por continente, experiências, viagens, grupos) + os links extras que a equipe cadastrar.
  const navLinks: NavNode[] = [{ label: "Destinos", href: "/destinos" }, ...nav.items];
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname() ?? "";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 64);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const hasDarkHero =
    DARK_HERO_PATHS.includes(pathname) || DARK_HERO_PREFIXES.some((prefix) => pathname.startsWith(prefix));
  const solid = scrolled || menuOpen || !hasDarkHero || openSubmenu !== null;

  // Fecha com um pequeno atraso: o mouse atravessa o espaço entre o link e o painel sem fechar o menu.
  const openMenu = (key: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenSubmenu(key);
  };
  const closeMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenSubmenu(null), 140);
  };

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
            {navLinks.map((link) => {
              const hasMenu = Boolean(link.children?.length);
              return (
                <div
                  key={link.href + link.label}
                  className="relative"
                  onMouseEnter={() => hasMenu && openMenu(link.href)}
                  onMouseLeave={closeMenu}
                  onFocus={() => hasMenu && openMenu(link.href)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) closeMenu();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") setOpenSubmenu(null);
                  }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "text-sm font-medium tracking-wide transition-colors duration-500",
                      solid ? "text-ink/90 hover:text-ink" : "text-ivory/90 hover:text-ivory",
                    )}
                    aria-expanded={hasMenu ? openSubmenu === link.href : undefined}
                    aria-haspopup={hasMenu ? "menu" : undefined}
                  >
                    {link.label}
                  </Link>

                  {hasMenu && openSubmenu === link.href && (
                    // Wrapper sem margem, só padding-top: a área "hoverável" é contínua do link até o menu.
                    <div className="absolute top-full left-1/2 w-72 -translate-x-1/2 pt-4">
                      <div
                        role="menu"
                        className="max-h-[70vh] overflow-y-auto border border-line bg-ivory py-3 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.25)]"
                      >
                        {link.children?.map((item) => (
                          <div key={item.href + item.label}>
                            {item.divider && <div className="my-2 border-t border-line" aria-hidden />}
                            <Link
                              href={item.href}
                              role="menuitem"
                              onClick={() => setOpenSubmenu(null)}
                              className="flex items-center justify-between gap-3 px-5 py-2 text-sm text-ink/80 transition-colors hover:bg-sand hover:text-ink"
                            >
                              <span>{item.label}</span>
                              {item.badge && <span aria-label="com ofertas abertas" className="size-1.5 rounded-full bg-magenta" />}
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-5">
            <Link
              href="/busca"
              aria-label="Buscar no site"
              title="Buscar destinos, experiências e viagens"
              className={cn("hidden size-9 items-center justify-center transition-colors duration-500 md:flex", solid ? "text-ink/70 hover:text-ink" : "text-ivory/80 hover:text-ivory")}
            >
              <Search className="size-[18px]" />
            </Link>

            <Link
              href="/reservar-online"
              title="Pesquise e reserve direto, na plataforma parceira"
              onClick={() => trackEvent("online_booking_clicked_header")}
              className={cn(
                "hidden text-sm font-medium tracking-wide underline-offset-4 transition-colors duration-500 hover:underline md:inline-flex",
                solid ? "text-ink/70 hover:text-ink" : "text-ivory/80 hover:text-ivory",
              )}
            >
              Reservar online
            </Link>

            {/* Botão principal: falar com a Cays (o caminho mais curto para quem quer ajuda). */}
            <Link
              href="/contato"
              className={cn(
                "group/cta hidden items-center gap-2 px-5 py-2.5 text-sm font-medium tracking-wide transition-colors duration-500 md:inline-flex",
                solid ? "bg-ink text-ivory hover:bg-magenta" : "bg-ivory text-ink hover:bg-ivory/85",
              )}
            >
              Planeje sua viagem
              <span aria-hidden className="transition-transform duration-300 group-hover/cta:translate-x-1">
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
        nav={nav}
        instagram={settings.instagram}
        whatsappHref={settings.whatsappHref}
      />
    </>
  );
}
