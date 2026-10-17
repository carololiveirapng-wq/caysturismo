import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { BeflyWidget } from "@/components/booking/befly-widget";
import { siteConfig } from "@/lib/site-config";

const title = "Reservar online | Cays Turismo";
const description = "Pesquise e reserve viagens disponíveis diretamente pela nossa plataforma parceira.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/reservar-online" },
  openGraph: { title, description, url: `${siteConfig.url}/reservar-online` },
};

export default function ReservarOnlinePage() {
  return (
    <section className="bg-ivory pt-28 pb-16 md:pt-32 md:pb-24">
      <Container>
        <div className="max-w-xl">
          <h1 className="font-serif text-[clamp(2rem,4.2vw,3rem)] leading-[1.1] text-ink">
            Reserve online
          </h1>
          <p className="mt-4 text-base leading-relaxed text-stone">
            Prefere pesquisar opções e reservar diretamente? Use a busca abaixo para consultar
            viagens disponíveis pela nossa plataforma parceira.
          </p>
        </div>

        <div className="mt-10">
          <BeflyWidget />
        </div>
      </Container>
    </section>
  );
}
