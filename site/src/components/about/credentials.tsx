import { Container } from "@/components/ui/container";
import { EditorialHeading } from "@/components/ui/editorial-heading";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/lib/site-config";

/** Só renderiza se houver dado real em siteConfig — nunca inventa CNPJ, Cadastur ou parceiros. */
export function Credentials() {
  const items: { label: string; value: string }[] = [];
  if (siteConfig.cnpj) items.push({ label: "CNPJ", value: siteConfig.cnpj });
  if (siteConfig.cadastur) items.push({ label: "Cadastur", value: siteConfig.cadastur });

  if (items.length === 0) return null;

  return (
    <section className="bg-ivory py-14 md:py-20">
      <Container narrow>
        <Reveal>
          <EditorialHeading as="h2" size="md">
            Credenciais
          </EditorialHeading>
        </Reveal>
        <div className="mt-7 flex flex-wrap gap-x-10 gap-y-3 border-t border-ink/10 pt-6 text-sm">
          {items.map((item) => (
            <div key={item.label}>
              <span className="text-stone">{item.label}: </span>
              <span className="text-ink">{item.value}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
