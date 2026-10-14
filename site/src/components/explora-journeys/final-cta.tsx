import { Reveal } from "@/components/ui/reveal";
import { WhatsAppCta } from "./whatsapp-cta";
import { displayFont } from "./tokens";

export function ExploraFinalCta() {
  return (
    <section className="bg-[#1f3851] py-20 sm:py-28">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.2em] text-[#d7b375] uppercase">2 a 7 de junho de 2027</p>
          <h2 style={displayFont} className="mt-5 text-[1.9rem] leading-tight font-normal text-[#fcfaf8] sm:text-[2.5rem]">
            O Grande Prêmio de Mônaco a bordo do EXPLORA I
          </h2>
          <p className="mt-6 text-[15px] leading-relaxed text-[#fcfaf8]/80">
            Fale com nossa equipe sobre as três formas de viver o fim de semana, as suítes disponíveis e a abertura
            das reservas.
          </p>

          <div className="mt-9 flex justify-center">
            <WhatsAppCta message="Olá! Quero falar sobre o Explora I em Mônaco." variant="light">
              Falar sobre o Explora I em Mônaco
            </WhatsAppCta>
          </div>

          <p className="mt-8 text-xs tracking-wide text-[#fcfaf8]/60 uppercase">EXPLORA I · Porto Hercule, Mônaco</p>
        </Reveal>
      </div>
    </section>
  );
}
