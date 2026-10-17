"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { X, AtSign, ChevronDown } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface NavLink {
  label: string;
  href: string;
  submenu?: readonly { label: string; href: string }[];
}

interface MobileNavigationProps {
  open: boolean;
  onClose: () => void;
  links: readonly NavLink[];
  instagram: string;
  whatsappHref?: string;
}

export function MobileNavigation({ open, onClose, links, instagram, whatsappHref }: MobileNavigationProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  function handleClose() {
    setOpenSubmenu(null);
    onClose();
  }

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- handleClose é estável o bastante aqui (só chama onClose + reset local); incluí-la recriaria o listener a cada render de forma desnecessária.
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-graphite text-ivory outline-none lg:hidden"
        >
          <div
            className="flex h-20 items-center justify-between px-6"
            style={{ paddingTop: "env(safe-area-inset-top)" }}
          >
            <Image
              src="/cays-turismo-logo-header-menu.png"
              alt="Cays Turismo"
              width={140}
              height={50}
              className="h-8 w-auto"
            />
            <button
              type="button"
              aria-label="Fechar menu"
              onClick={handleClose}
              className="flex size-10 items-center justify-center"
            >
              <X className="size-5" />
            </button>
          </div>

          <nav
            aria-label="Navegação mobile"
            className="flex flex-1 flex-col justify-center gap-1 px-6 py-6"
          >
            {links.map((link, i) => {
              const hasSubmenu = !!link.submenu?.length;
              const isSubmenuOpen = openSubmenu === link.href;

              return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="flex items-center justify-between">
                    <Link
                      href={link.href}
                      onClick={handleClose}
                      className="block py-3 font-serif text-4xl tracking-tight"
                    >
                      {link.label}
                    </Link>
                    {hasSubmenu && (
                      <button
                        type="button"
                        aria-label={`${isSubmenuOpen ? "Fechar" : "Abrir"} submenu de ${link.label}`}
                        aria-expanded={isSubmenuOpen}
                        onClick={() => setOpenSubmenu(isSubmenuOpen ? null : link.href)}
                        className="flex size-11 shrink-0 items-center justify-center text-ivory/70"
                      >
                        <ChevronDown
                          className={`size-5 transition-transform duration-300 ${isSubmenuOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                    )}
                  </div>

                  {hasSubmenu && isSubmenuOpen && (
                    <div className="mb-3 flex flex-col gap-1 border-l border-ivory/15 pl-4">
                      {link.submenu?.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={handleClose}
                          className="py-2 text-base text-ivory/75 hover:text-ivory"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </nav>

          <div
            className="flex flex-col gap-4 border-t border-ivory/15 px-6 py-6 text-sm sm:flex-row sm:items-center sm:justify-between"
            style={{ paddingBottom: "calc(1.5rem + env(safe-area-inset-bottom))" }}
          >
            <div className="flex items-center gap-5">
              {instagram && (
                <a
                  href={instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-ivory/80 hover:text-ivory"
                >
                  <AtSign className="size-4" /> Instagram
                </a>
              )}
              {whatsappHref && (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="text-ivory/80 hover:text-ivory"
                >
                  WhatsApp
                </a>
              )}
            </div>
            <div className="flex items-center gap-5">
              <Link
                href="/reservar-online"
                onClick={() => {
                  trackEvent("online_booking_clicked_header");
                  handleClose();
                }}
                className="text-ivory/80 hover:text-ivory"
              >
                Reservar online
              </Link>
              <Link href="/contato" onClick={handleClose} className="text-ivory/80 hover:text-ivory">
                Contato
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
