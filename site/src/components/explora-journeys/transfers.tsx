import { Plane, Bus } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { WhatsAppCta } from "./whatsapp-cta";
import { displayFont } from "./tokens";

const OPTIONS = [
  {
    icon: Plane,
    title: "Helicóptero privativo",
    text: "Traslado entre Nice e Mônaco, com veículo entre o Heliporto e o Porto de Monte Carlo.",
  },
  {
    icon: Bus,
    title: "Shuttle compartilhado gratuito",
    text: "Entre o Porto de Monte Carlo e o Aeroporto Internacional de Nice, a Estação de Trem de Monte Carlo e o Centro de Monte Carlo.",
  },
];

export function ExploraTransfers() {
  return (
    <section id="traslados" className="scroll-mt-20 bg-[#f9f8f5] py-16 sm:py-24">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-[#d7b375] uppercase">Traslados</p>
          <h2 style={displayFont} className="mt-4 text-[1.9rem] leading-tight font-normal text-[#1b2232] sm:text-[2.5rem]">
            Como chegar ao navio
          </h2>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
          {OPTIONS.map((o, i) => (
            <Reveal key={o.title} delay={i * 0.08} className="rounded-md border border-[#1b2232]/10 bg-[#fcfaf8] p-7 text-center">
              <o.icon className="mx-auto size-7 text-[#1f3851]" strokeWidth={1.5} aria-hidden />
              <h3 style={displayFont} className="mt-4 text-lg font-normal text-[#1b2232]">
                {o.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[#626d84]">{o.text}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15} className="mt-10 text-center">
          <WhatsAppCta message="Olá! Quero organizar meus traslados para o Explora I em Mônaco.">
            Organizar meus traslados
          </WhatsAppCta>
        </Reveal>

        <Reveal delay={0.2} className="mx-auto mt-20 max-w-2xl text-center">
          <div className="mx-auto h-px w-16 bg-[#d7b375]/40" />
          <p style={displayFont} className="mt-8 text-2xl leading-snug font-normal text-[#1b2232] italic sm:text-3xl">
            &ldquo;O fim de semana de corrida começa e termina a bordo.&rdquo;
          </p>
          <div className="mx-auto mt-8 h-px w-16 bg-[#d7b375]/40" />
          <p className="mt-8 text-[15px] text-[#626d84]">
            Do Porto Hercule ao F1 Paddock Club, o Grande Prêmio acontece a poucos passos da sua suíte.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
