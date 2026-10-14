import Image from "next/image";
import { Phone, Mail } from "lucide-react";

export function ExploraFooter() {
  return (
    <footer className="bg-[#16293b] py-10 sm:py-12">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-6">
          <Image
            src="/explora-journeys/cays-partner-logo.png"
            alt="Logo Cays Turismo - Gerlane Linhares"
            width={120}
            height={48}
            className="h-10 w-auto rounded-sm"
          />
          <div className="flex flex-col gap-2 text-sm text-[#fcfaf8]/85 sm:flex-row sm:items-center sm:gap-6">
            <a href="tel:+5561981998280" className="inline-flex items-center gap-2 hover:text-[#fcfaf8]">
              <Phone className="size-4" strokeWidth={1.5} aria-hidden />
              +55 (61) 98199-8280
            </a>
            <a href="mailto:gerlane@caysturismo.com.br" className="inline-flex items-center gap-2 hover:text-[#fcfaf8]">
              <Mail className="size-4" strokeWidth={1.5} aria-hidden />
              gerlane@caysturismo.com.br
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-[#fcfaf8]/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs text-[#fcfaf8]/60">
            <p className="font-medium text-[#fcfaf8]/80">Explora Journeys · EXPLORA I</p>
            <p className="mt-1">Porto Hercule, Mônaco · 2 a 7 de junho de 2027</p>
          </div>
          <p className="text-xs text-[#fcfaf8]/50">© 2026 · Todos os direitos reservados</p>
        </div>

        <p className="mt-6 text-center text-[11px] leading-relaxed text-[#fcfaf8]/35">
          O logotipo F1 FORMULA 1, o logotipo F1, F1, FORMULA 1, FIA FORMULA ONE WORLD CHAMPIONSHIP, GRAND PRIX e
          marcas relacionadas são marcas registradas da Formula One Licensing BV, uma empresa da Formula 1. Imagens
          FORMULA 1 © Formula One World Championship Limited.
        </p>
      </div>
    </footer>
  );
}
