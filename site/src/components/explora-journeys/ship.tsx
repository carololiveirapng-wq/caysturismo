import { Bed, Waves, UtensilsCrossed, Wine, Users } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { WhatsAppCta } from "./whatsapp-cta";
import { displayFont } from "./tokens";

const STATS = [
  { icon: Bed, value: "456", label: "Suítes de frente para o mar" },
  { icon: Waves, value: "5", label: "Piscinas aquecidas" },
  { icon: UtensilsCrossed, value: "6", label: "Restaurantes" },
  { icon: Wine, value: "12", label: "Bares e lounges" },
  { icon: Users, value: "1,25:1", label: "Hóspedes por anfitrião" },
];

export function ExploraShip() {
  return (
    <section id="o-navio" className="scroll-mt-20 bg-[#1f3851] py-16 sm:py-24">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <Reveal className="relative aspect-[4/5] overflow-hidden rounded-md lg:aspect-[3/4]">
          <video
            className="size-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster="/explora-journeys/pool-deck.png"
          >
            <source src="/explora-journeys/ship-mobile.mp4" media="(max-width: 767px)" />
            <source src="/explora-journeys/ship-desktop.mp4" />
          </video>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-xs font-semibold tracking-[0.2em] text-[#d7b375] uppercase">O navio</p>
          <h2 style={displayFont} className="mt-4 text-[2.25rem] leading-tight font-normal text-[#fcfaf8] sm:text-[3rem]">
            EXPLORA I
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-[#fcfaf8]/85">
            Vistas panorâmicas do oceano em todas as 456 suítes, entre as mais espaçosas de sua categoria.
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-[#fcfaf8]/85">
            Suítes com janelas do chão ao teto e terraços privativos à beira-mar.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-x-6 gap-y-7">
            {STATS.map((s) => (
              <div key={s.label}>
                <s.icon className="size-5 text-[#d7b375]" strokeWidth={1.5} aria-hidden />
                <p style={displayFont} className="mt-2 text-2xl font-normal text-[#fcfaf8]">
                  {s.value}
                </p>
                <p className="mt-1 text-[11px] tracking-wide text-[#fcfaf8]/70 uppercase">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-9">
            <WhatsAppCta message="Olá! Quero consultar disponibilidade e categorias de suíte no Explora I." variant="light" className="w-full justify-center sm:w-auto">
              Consultar disponibilidade e categorias
            </WhatsAppCta>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
