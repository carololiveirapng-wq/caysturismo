import Image from "next/image";
import { UtensilsCrossed, Waves, Sparkles, Sun, Music2, Compass } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { WhatsAppCta } from "./whatsapp-cta";
import { displayFont } from "./tokens";

const FEATURES = [
  { icon: UtensilsCrossed, title: "Gastronomia", text: "Nove experiências culinárias distintas, incluindo refeições na suíte" },
  { icon: Waves, title: "Piscinas aquecidas", text: "Cinco piscinas aquecidas a bordo" },
  { icon: Sparkles, title: "Bem-estar", text: "Espaços dedicados ao bem-estar físico e mental" },
  { icon: Sun, title: "Espaços externos", text: "Áreas ideais para contemplar o oceano e as paisagens costeiras" },
  { icon: Music2, title: "Programação cultural", text: "Performances e experiências de aprendizado" },
  { icon: Compass, title: "Bares e lounges", text: "Atmosferas distintas ao longo do dia e da noite" },
];

export function ExploraOnboardExperience() {
  return (
    <section id="a-bordo" className="scroll-mt-20 bg-[#fcfaf8] py-16 sm:py-24">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.2em] text-[#d7b375] uppercase">Experiência a bordo</p>
          <h2 style={displayFont} className="mt-4 text-[1.9rem] leading-tight font-normal text-[#1b2232] sm:text-[2.5rem]">
            O tempo a bordo como parte da experiência
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-[#626d84]">
            Durante o fim de semana em Mônaco, o tempo a bordo se transforma em parte essencial da experiência. Os
            espaços amplos e iluminados do navio foram pensados para promover relaxamento, conexão e liberdade,
            permitindo que cada hóspede escolha seu próprio ritmo.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <div key={f.title} className="flex items-start gap-3">
                <f.icon className="mt-0.5 size-5 shrink-0 text-[#d7b375]" strokeWidth={1.5} aria-hidden />
                <div>
                  <h3 className="text-sm font-medium text-[#1b2232]">{f.title}</h3>
                  <p className="mt-1 text-sm text-[#626d84]">{f.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-9">
            <WhatsAppCta message="Olá! Quero entender como é viajar a bordo do Explora I.">
              Quero entender como é viajar a bordo
            </WhatsAppCta>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="relative aspect-[4/5] overflow-hidden rounded-md lg:aspect-[3/4]">
          <Image
            src="/explora-journeys/pool-deck.png"
            alt="Área de piscina e deck do Explora"
            fill
            sizes="(min-width: 1024px) 45vw, 90vw"
            className="object-cover"
          />
        </Reveal>
      </div>
    </section>
  );
}
