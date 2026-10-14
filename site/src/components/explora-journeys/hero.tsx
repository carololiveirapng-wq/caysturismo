import Image from "next/image";
import { WhatsAppCta } from "./whatsapp-cta";
import { displayFont } from "./tokens";

const STATS = [
  { icon: "/explora-journeys/ship-icon.png", label: "EXPLORA I" },
  { icon: "/explora-journeys/ports-icon.png", label: "PORTO HERCULE" },
  { icon: "/explora-journeys/calendar-icon.png", label: "JUN 2027" },
  { icon: "/explora-journeys/flag-icon.svg", label: "FÓRMULA 1" },
];

export function ExploraHero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#1f3851] py-28">
      <video
        className="absolute inset-0 size-full object-cover"
        src="/explora-journeys/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(31,56,81,0.7) 0%, rgba(31,56,81,0.4) 50%, rgba(31,56,81,0.8) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col items-center px-4 text-center sm:px-6 lg:px-8">
        <p className="text-xs font-medium tracking-[0.25em] text-[#d7b375] uppercase sm:text-sm">
          Explora I · 2 a 7 de junho de 2027
        </p>
        <h1
          style={displayFont}
          className="mt-4 max-w-3xl text-[2.25rem] leading-[1.05] font-normal text-[#fcfaf8] sm:text-[3.25rem] lg:text-[3.75rem]"
        >
          O Grande Prêmio de Mônaco a bordo do EXPLORA I
        </h1>
        <p className="mt-4 max-w-md text-base font-medium text-[#fcfaf8]/90 sm:text-lg">A 150 metros do F1 Paddock Club.</p>

        <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-5 sm:gap-10">
          {STATS.map(({ icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-2 text-center">
              <Image src={icon} alt="" width={28} height={28} className="size-6" aria-hidden />
              <span className="text-xs font-semibold tracking-wide text-[#fcfaf8] uppercase">{label}</span>
            </div>
          ))}
        </div>

        <div className="mt-9">
          <WhatsAppCta message="Olá! Quero saber mais sobre a saída do Explora I em Mônaco." variant="light">
            Quero saber mais sobre essa saída
          </WhatsAppCta>
        </div>
      </div>
    </section>
  );
}
