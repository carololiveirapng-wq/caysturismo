import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { EditorialHeading } from "@/components/ui/editorial-heading";
import { BeflyWidget } from "@/components/booking/befly-widget";

/**
 * Substitui a antiga seção "Por onde começamos?" (seletor de destino/período/
 * experiência mockado) pelo motor de busca real da Oner/BeFly — mesmo
 * componente usado em /reservar-online, sem duplicar a integração.
 */
export function OnlineBooking() {
  return (
    <section className="border-b border-line bg-ivory py-14 md:py-20">
      <Container>
        <div className="max-w-xl">
          <SectionLabel>Reserva direta</SectionLabel>
          <EditorialHeading as="h2" size="md" className="mt-4">
            Pesquise e reserve online
          </EditorialHeading>
          <p className="mt-3 text-sm leading-relaxed text-stone">
            Consulte voos, hotéis e pacotes disponíveis agora pela nossa plataforma parceira.
          </p>
        </div>

        <div className="mt-8 md:mt-10">
          <BeflyWidget />
        </div>
      </Container>
    </section>
  );
}
