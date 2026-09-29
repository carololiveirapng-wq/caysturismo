import { Container } from "@/components/ui/container";
import { EditorialHeading } from "@/components/ui/editorial-heading";
import { Reveal } from "@/components/ui/reveal";
import type { DestinationKeyInfo } from "@/types";

const FIELD_LABELS: { key: keyof DestinationKeyInfo; label: string }[] = [
  { key: "bestTime", label: "Melhor época" },
  { key: "suggestedDuration", label: "Duração sugerida" },
  { key: "timeZone", label: "Fuso horário" },
  { key: "currency", label: "Moeda" },
  { key: "language", label: "Idioma" },
  { key: "visa", label: "Visto" },
  { key: "vaccines", label: "Vacinas" },
  { key: "electricity", label: "Energia" },
  { key: "flightFromBrazil", label: "Voo a partir do Brasil" },
];

export function KeyInfo({ id, keyInfo }: { id: string; keyInfo: DestinationKeyInfo }) {
  const fields = FIELD_LABELS.filter(({ key }) => keyInfo[key]);
  if (fields.length === 0) return null;

  return (
    <section id={id} className="scroll-mt-28 bg-sand py-14 md:scroll-mt-32 md:py-16">
      <Container>
        <Reveal>
          <EditorialHeading as="h2" size="md">
            Antes de embarcar
          </EditorialHeading>
        </Reveal>

        <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-3 md:mt-10 md:grid-cols-5">
          {fields.map(({ key, label }) => (
            <div key={key} className="border-t border-ink/10 pt-5">
              <p className="text-[0.65rem] font-medium tracking-[0.15em] text-stone uppercase">{label}</p>
              <p className="mt-2 text-sm leading-snug text-ink">{keyInfo[key]}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
