"use client";

import { useState } from "react";
import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { WhatsAppCta } from "./whatsapp-cta";
import { displayFont } from "./tokens";

const TABS = ["Owner's Residences", "Ocean Residences", "Ocean Penthouses", "Ocean Suites"] as const;

/**
 * Só a aba "Owner's Residences" tem foto/metragem reais capturadas do
 * site original (o mirror estático só registrou a aba ativa por padrão).
 * As demais abas não recebem imagem/medida inventada — mostram uma
 * chamada honesta pra falar com a equipe em vez disso.
 */
const REAL_SUITE = { name: "Owner's Residence", size: "280 m²", image: "/explora-journeys/owner-residence.webp" };

export function ExploraSuites() {
  const [tab, setTab] = useState<(typeof TABS)[number]>(TABS[0]);

  return (
    <section id="suites" className="scroll-mt-20 bg-[#f4f1eb] py-16 sm:py-24">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col items-start gap-6 rounded-md border border-[#d7b375]/30 bg-[#fcfaf8] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-[#d7b375] uppercase">Suíte all inclusive</p>
            <h3 style={displayFont} className="mt-2 text-xl font-normal text-[#1b2232] sm:text-2xl">
              Valores informados na abertura das reservas
            </h3>
          </div>
          <WhatsAppCta message="Olá! Quero falar com um especialista sobre as suítes do Explora I." className="w-full justify-center sm:w-auto">
            Falar com um especialista
          </WhatsAppCta>
        </Reveal>

        <Reveal delay={0.05} className="mt-14">
          <p className="text-xs font-semibold tracking-[0.2em] text-[#d7b375] uppercase">Acomodações</p>
          <h2 style={displayFont} className="mt-4 text-[1.9rem] leading-tight font-normal text-[#1b2232] sm:text-[2.5rem]">
            Suítes
          </h2>

          <div className="mt-8 flex gap-7 overflow-x-auto border-b border-[#1b2232]/10">
            {TABS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`shrink-0 pb-3 text-sm whitespace-nowrap transition-colors ${
                  tab === t ? "border-b-2 border-[#d7b375] text-[#1b2232]" : "text-[#626d84] hover:text-[#1b2232]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="mt-8">
            {tab === "Owner's Residences" ? (
              <div className="max-w-xs">
                <div className="relative aspect-[4/3] overflow-hidden rounded-md">
                  <Image src={REAL_SUITE.image} alt={REAL_SUITE.name} fill sizes="320px" className="object-cover" />
                </div>
                <h3 style={displayFont} className="mt-4 text-lg font-normal text-[#1b2232]">
                  {REAL_SUITE.name}
                </h3>
                <p className="mt-1 text-sm text-[#626d84]">{REAL_SUITE.size}</p>
              </div>
            ) : (
              <p className="max-w-md text-sm leading-relaxed text-[#626d84]">
                Fale com a nossa equipe para conhecer as fotos, metragens e detalhes de {tab}.
              </p>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 text-center sm:mt-14">
          <WhatsAppCta message="Olá! Quero saber qual suíte do Explora I combina comigo.">
            Quero saber qual suíte combina comigo
          </WhatsAppCta>
        </Reveal>
      </div>
    </section>
  );
}
