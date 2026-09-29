"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { X, AtSign } from "lucide-react";
import { siteConfig, whatsappHref } from "@/lib/site-config";

interface NavLink {
  label: string;
  href: string;
  submenu?: readonly { label: string; href: string }[];
}

interface MobileNavigationProps {
  open: boolean;
  onClose: () => void;
  links: readonly NavLink[];
}

export function MobileNavigation({ open, onClose, links }: MobileNavigationProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
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
          className="fixed inset-0 z-50 flex flex-col bg-graphite text-ivory outline-none lg:hidden"
        >
          <div className="flex h-20 items-center justify-between px-6">
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
              onClick={onClose}
              className="flex size-10 items-center justify-center"
            >
              <X className="size-5" />
            </button>
          </div>

          <nav
            aria-label="Navegação mobile"
            className="flex flex-1 flex-col justify-center gap-1 px-6"
          >
            {links.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="block py-3 font-serif text-4xl tracking-tight"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="flex items-center justify-between border-t border-ivory/15 px-6 py-6 text-sm">
            <div className="flex items-center gap-5">
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-ivory/80 hover:text-ivory"
              >
                <AtSign className="size-4" /> Instagram
              </a>
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
            <Link href="/contato" onClick={onClose} className="text-ivory/80 hover:text-ivory">
              Contato
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
