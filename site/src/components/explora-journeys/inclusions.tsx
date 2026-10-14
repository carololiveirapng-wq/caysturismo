import { UtensilsCrossed, Wine, GlassWater, Gift, Sparkles, HeartPulse, Wifi, Users, Star } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { displayFont } from "./tokens";

const ITEMS = [
  { icon: UtensilsCrossed, text: "Nove experiências culinárias distintas, incluindo refeições na suíte" },
  { icon: Wine, text: "Bebidas ilimitadas, incluindo vinhos finos, champagne e destilados premium" },
  { icon: GlassWater, text: "Garrafa de champagne de boas-vindas na suíte" },
  { icon: Gift, text: "Uma garrafa de vinho e uma de destilado de sua preferência na suíte" },
  { icon: Sparkles, text: "Acesso à área termal do Ocean Wellness" },
  { icon: HeartPulse, text: "Atividades de bem-estar, fitness e mindfulness em grupo" },
  { icon: Wifi, text: "Wi-Fi de alta velocidade em todo o navio" },
  { icon: Users, text: "Gorjetas a bordo" },
  { icon: Star, text: "Serviço autêntico e intuitivo" },
];

export function ExploraInclusions() {
  return (
    <section className="bg-[#fcfaf8] py-16 sm:py-24">
      <div className="mx-auto max-w-[1400px] px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.2em] text-[#d7b375] uppercase">Tudo incluído</p>
          <h2 style={displayFont} className="mt-4 text-[1.9rem] leading-tight font-normal text-[#1b2232] sm:text-[2.5rem]">
            Cada viagem inclui
          </h2>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3">
          {ITEMS.map((item, i) => (
            <Reveal key={item.text} delay={(i % 3) * 0.05} className="flex flex-col items-center gap-3">
              <span className="flex size-14 items-center justify-center rounded-full bg-[#d7b375]/10">
                <item.icon className="size-6 text-[#d7b375]" strokeWidth={1.5} aria-hidden />
              </span>
              <p className="max-w-[12rem] text-sm leading-relaxed text-[#1b2232]">{item.text}</p>
            </Reveal>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-md text-sm text-[#626d84] italic">
          Benefícios adicionais para hóspedes das Ocean Penthouses e Ocean Residences.
        </p>
      </div>
    </section>
  );
}
