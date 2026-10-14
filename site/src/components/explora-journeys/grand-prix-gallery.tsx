"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Users, Tv, Footprints, Martini, UtensilsCrossed, Music } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { WhatsAppCta } from "./whatsapp-cta";
import { displayFont } from "./tokens";

const GALLERY = Array.from({ length: 18 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return { src: `/explora-journeys/gallery/gallery-${n}.webp`, alt: "Grand Prix de Mônaco a bordo do Explora I" };
});
GALLERY[6].alt = "Carros no circuito com as faixas da Explora Journeys";

const MOMENTS = [
  { icon: Users, title: "Encontros", text: "Pilotos e lendas do automobilismo a bordo" },
  { icon: Tv, title: "Corrida no Conservatory Pool", text: "Cada sessão transmitida à beira da piscina" },
  { icon: Footprints, title: "Run com Explora Journeys", text: "Corrida matinal pelo circuito antes das competições" },
  { icon: Martini, title: "Coquetéis ao pôr do sol", text: "O fim de tarde no Principado, visto do navio" },
  { icon: UtensilsCrossed, title: "Degustações", text: "Encontros de sabores ao longo do fim de semana" },
  { icon: Music, title: "Música ao vivo e festas", text: "As noites seguem a bordo" },
];

export function ExploraGrandPrixGallery() {
  const [mainRef, mainApi] = useEmblaCarousel({ loop: true });
  const [thumbRef, thumbApi] = useEmblaCarousel({ dragFree: true, containScroll: "keepSnaps" });
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (!mainApi) return;
    setSelected(mainApi.selectedScrollSnap());
    thumbApi?.scrollTo(mainApi.selectedScrollSnap());
  }, [mainApi, thumbApi]);

  useEffect(() => {
    if (!mainApi) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync of Embla's initial state on mount, not a derived-state loop
    onSelect();
    mainApi.on("select", onSelect);
    return () => {
      mainApi.off("select", onSelect);
    };
  }, [mainApi, onSelect]);

  return (
    <section id="a-bordo-gp" className="scroll-mt-20 bg-[#f9f8f5] py-16 sm:py-24">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.2em] text-[#d7b375] uppercase">A bordo</p>
          <h2 style={displayFont} className="mt-4 text-[1.9rem] leading-tight font-normal text-[#1b2232] sm:text-[2.5rem]">
            A bordo durante o Grand Prix
          </h2>
        </Reveal>

        <Reveal className="relative mt-10 overflow-hidden rounded-md">
          <div ref={mainRef} className="overflow-hidden">
            <div className="flex">
              {GALLERY.map((img) => (
                <div key={img.src} className="relative aspect-[16/9] min-w-0 shrink-0 grow-0 basis-full">
                  <Image src={img.src} alt={img.alt} fill sizes="100vw" className="object-cover" />
                </div>
              ))}
            </div>
          </div>
          <button
            type="button"
            aria-label="Imagem anterior"
            onClick={() => mainApi?.scrollPrev()}
            className="absolute top-1/2 left-4 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#1b2232] shadow-md"
          >
            <ChevronLeft className="size-5" aria-hidden />
          </button>
          <button
            type="button"
            aria-label="Próxima imagem"
            onClick={() => mainApi?.scrollNext()}
            className="absolute top-1/2 right-4 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#1b2232] shadow-md"
          >
            <ChevronRight className="size-5" aria-hidden />
          </button>
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
            {GALLERY.map((img, i) => (
              <button
                key={img.src}
                type="button"
                aria-label={`Ir para imagem ${i + 1}`}
                onClick={() => mainApi?.scrollTo(i)}
                className={`size-1.5 rounded-full transition-colors ${i === selected ? "bg-[#d7b375]" : "bg-white/60"}`}
              />
            ))}
          </div>
        </Reveal>

        <div ref={thumbRef} className="mt-4 overflow-hidden">
          <div className="flex gap-2">
            {GALLERY.map((img, i) => (
              <button
                key={img.src}
                type="button"
                aria-label={`Selecionar imagem ${i + 1}`}
                onClick={() => mainApi?.scrollTo(i)}
                className={`relative aspect-[4/3] w-24 shrink-0 overflow-hidden rounded-sm ${i === selected ? "ring-2 ring-[#d7b375]" : "opacity-70"}`}
              >
                <Image src={img.src} alt="" fill sizes="96px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-3">
          {MOMENTS.map((m, i) => (
            <Reveal key={m.title} delay={i * 0.05} className="flex items-start gap-3.5">
              <m.icon className="mt-0.5 size-5 shrink-0 text-[#d7b375]" strokeWidth={1.5} aria-hidden />
              <div>
                <h3 className="text-sm font-medium text-[#1b2232]">{m.title}</h3>
                <p className="mt-1 text-sm text-[#626d84]">{m.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center sm:mt-14">
          <WhatsAppCta message="Olá! Quero saber como é o fim de semana a bordo do Explora I.">
            Quero saber como é o fim de semana a bordo
          </WhatsAppCta>
        </Reveal>
      </div>
    </section>
  );
}
