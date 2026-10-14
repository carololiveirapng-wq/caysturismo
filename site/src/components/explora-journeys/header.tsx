"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { WhatsAppCta, ChatBubbleIcon } from "./whatsapp-cta";
import { displayFont } from "./tokens";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Três Formas", href: "#formas" },
  { label: "Grand Prix", href: "#a-bordo-gp" },
  { label: "A Bordo", href: "#a-bordo" },
  { label: "O Navio", href: "#o-navio" },
  { label: "Suítes", href: "#suites" },
  { label: "Traslados", href: "#traslados" },
];

export function ExploraHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 64);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        solid ? "bg-[#fcfaf8]/95 backdrop-blur-sm" : "bg-transparent",
      )}
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 items-center gap-4 px-4 py-4 sm:px-6 lg:grid-cols-[1fr_auto_1fr] lg:px-8">
        <a href="#" className="shrink-0 justify-self-start">
          <Image src="/explora-journeys/explora-logo.png" alt="Explora Journeys" width={160} height={56} className="h-10 w-auto sm:h-12" priority />
        </a>

        <nav className="hidden items-center gap-7 justify-self-center lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              style={displayFont}
              className={cn(
                "text-xs font-normal tracking-wide uppercase transition-colors hover:text-[#d7b375]",
                solid ? "text-[#1b2232]" : "text-[#fcfaf8]",
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden justify-self-end lg:block">
          <WhatsAppCta
            message="Olá! Tenho interesse no Explora I no Grande Prêmio de Mônaco 2027."
            variant="light"
            className="!rounded-md !px-5 !py-2.5 !text-xs !uppercase !tracking-wide"
          >
            <ChatBubbleIcon className="size-3.5" />
            Fale conosco
          </WhatsAppCta>
        </div>

        <button
          type="button"
          aria-label="Abrir menu"
          onClick={() => setOpen(true)}
          className={cn("flex size-10 items-center justify-center justify-self-end lg:hidden", solid ? "text-[#1b2232]" : "text-[#fcfaf8]")}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-6" aria-hidden>
            <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#fcfaf8] lg:hidden">
          <div className="flex items-center justify-between px-4 py-4">
            <Image src="/explora-journeys/explora-logo.png" alt="Explora Journeys" width={140} height={48} className="h-9 w-auto" />
            <button type="button" aria-label="Fechar menu" onClick={() => setOpen(false)} className="flex size-10 items-center justify-center text-[#1b2232]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-6" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-1 flex-col items-center justify-center gap-7">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                style={displayFont}
                className="text-lg font-normal tracking-wide text-[#1b2232] uppercase"
              >
                {item.label}
              </a>
            ))}
            <WhatsAppCta
              message="Olá! Tenho interesse no Explora I no Grande Prêmio de Mônaco 2027."
              variant="outline"
              className="mt-4"
            >
              <ChatBubbleIcon className="size-3.5" />
              Fale conosco
            </WhatsAppCta>
          </nav>
        </div>
      )}
    </header>
  );
}
