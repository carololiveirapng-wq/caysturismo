import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { WhatsAppCta } from "./whatsapp-cta";
import { displayFont } from "./tokens";

const CARDS = [
  {
    image: "/explora-journeys/suite-only.jpg",
    title: "Apenas suíte",
    text: "Suíte com vista para o mar ou para Mônaco, corrida transmitida ao vivo no Conservatory Pool, gastronomia e programação de experiências a bordo durante todo o fim de semana.",
    fine: "Não inclui ingressos para as corridas de Fórmula 1, Fórmula 2 ou Fórmula 3.\nReservas a partir de 21 de setembro.",
  },
  {
    image: "/explora-journeys/grandstand.jpg",
    title: "Suíte com Arquibancada por 3 dias",
    text: "Acesso a um camarote Premium no Porto de Mônaco, entre a chicane da Piscina e a curva Rascasse, com vista das curvas mais técnicas e do pit lane, e telão para acompanhar cada momento.",
    fine: "Acesso apenas às sessões de Fórmula 1.\nReservas a partir de 21 de setembro.",
  },
  {
    image: "/explora-journeys/paddock.jpg",
    title: "Suíte com F1 Paddock Club por 3 dias",
    text: "Hospitalidade VIP no lounge acima da curva Rascasse, desfile nos boxes da Aramco Formula 1, encontros com pilotos e embaixadores da Fórmula 1, tour pelo paddock em grupo de no máximo 10 pessoas, gastronomia e entretenimento ao vivo.",
    fine: "Acesso apenas às sessões de Fórmula 1.\nReservas em breve.",
  },
];

export function ExploraThreeWays() {
  return (
    <section id="formas" className="scroll-mt-20 bg-[#fcfaf8] py-16 sm:py-24">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-[#d7b375] uppercase">Três formas</p>
          <h2 style={displayFont} className="mt-4 text-[1.9rem] leading-tight font-normal text-[#1b2232] sm:text-[2.5rem]">
            Três formas de viver o fim de semana
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-[#626d84]">
            Durante o FORMULA 1 LOUIS VUITTON GRAND PRIX DE MONACO 2027, o EXPLORA I é o único navio da sua categoria
            atracado em Mônaco por todo o fim de semana da corrida.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6">
          {CARDS.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.08} className="flex flex-col">
              <div className="relative aspect-[4/5] overflow-hidden rounded-md">
                <Image src={card.image} alt={card.title} fill sizes="(min-width: 640px) 32vw, 90vw" className="object-cover" />
              </div>
              <h3 style={displayFont} className="mt-5 text-lg font-normal text-[#1b2232]">
                {card.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[#626d84]">{card.text}</p>
              <p className="mt-auto pt-5 text-[11px] leading-snug whitespace-pre-line text-[#626d84]/70">{card.fine}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center sm:mt-16">
          <WhatsAppCta message="Olá! Quero conhecer as três formas de viver o fim de semana em detalhe.">
            Quero conhecer as três formas em detalhe
          </WhatsAppCta>
        </Reveal>
      </div>
    </section>
  );
}
