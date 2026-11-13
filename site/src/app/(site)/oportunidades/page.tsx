import type { Metadata } from "next";
import Link from "next/link";
import { ShortHero } from "@/components/ui/short-hero";
import { ViagensTabs } from "@/components/viagens-hub/viagens-tabs";
import { Container } from "@/components/ui/container";
import { ImageReveal } from "@/components/ui/image-reveal";
import { LinkArrow } from "@/components/ui/link-arrow";
import { DestinationFinalCTA } from "@/components/destination/destination-final-cta";
import { getTravelProducts } from "@/lib/cms";
import { daysLeft, formatOfferEnd, getOpenOffers } from "@/lib/offers";
import { siteConfig } from "@/lib/site-config";
import type { TravelProduct } from "@/types";

// Reconstrói a cada 15 min: uma oferta que passou da validade sai sozinha da página (e o Studio ainda avisa na hora ao publicar).
export const revalidate = 900;

const title = "Oportunidades exclusivas | Cays Turismo";
const description =
  "Condições especiais, por tempo limitado, em hotéis, cruzeiros e roteiros selecionados pela Cays Turismo. Quando uma oferta termina, ela sai desta página.";

export async function generateMetadata(): Promise<Metadata> {
  const abertas = getOpenOffers(await getTravelProducts());
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: "/oportunidades" },
    openGraph: { title, description, url: `${siteConfig.url}/oportunidades` },
    // sem oferta aberta a página não tem o que mostrar: não vale indexar
    robots: abertas.length === 0 ? { index: false, follow: true } : undefined,
  };
}

function OfferCard({ product }: { product: TravelProduct }) {
  const restantes = daysLeft(product.offerEndsAt);
  const urgente = restantes !== null && restantes <= 3;
  return (
    <Link href={`/viagens/${product.slug}`} className="group/card block">
      <div className="relative">
        <ImageReveal
          src={product.gallery[0]?.src}
          alt={product.gallery[0]?.alt ?? product.title}
          width={640}
          height={480}
          sizes="(min-width: 1024px) 30vw, 90vw"
          containerClassName="aspect-[4/3]"
        />
        {product.offerLabel && (
          <span className="absolute top-3 left-3 bg-ink px-3 py-1.5 text-[0.7rem] font-medium tracking-[0.18em] text-ivory uppercase">
            {product.offerLabel}
          </span>
        )}
      </div>
      <div className="mt-4 border-t border-ink/10 pt-4 transition-colors duration-300 group-hover/card:border-magenta/40">
        {product.offerEndsAt && (
          <p className={`text-xs font-medium tracking-wide uppercase ${urgente ? "text-magenta" : "text-stone"}`}>
            {restantes === 0 ? "Termina hoje" : `Válida até ${formatOfferEnd(product.offerEndsAt)}`}
          </p>
        )}
        <h3 className="mt-2 font-serif text-xl text-ink">{product.title}</h3>
        {product.subtitle && <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-stone">{product.subtitle}</p>}
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-stone">
          {product.priceFrom && <span className="font-medium text-ink">{product.priceFrom}</span>}
          {product.duration && <span>{product.duration}</span>}
          {(product.ship ?? product.supplier) && <span>{product.ship ?? product.supplier}</span>}
        </div>
        <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium tracking-wide text-ink transition-colors duration-300 group-hover/card:text-magenta">
          Ver oportunidade
        </span>
      </div>
    </Link>
  );
}

export default async function OportunidadesPage() {
  const ofertas = getOpenOffers(await getTravelProducts());

  return (
    <>
      <ShortHero
        eyebrow="Oportunidades exclusivas"
        title="Ofertas selecionadas pela Cays"
        subtitle="Condições especiais por tempo limitado, em hotéis, cruzeiros e roteiros. Quando uma oferta termina, ela sai desta página."
        image={ofertas[0]?.gallery[0]}
      />
      <ViagensTabs active="oportunidades" hasOffers={ofertas.length > 0} />

      <section className="bg-ivory py-14 md:py-20">
        <Container>
          {ofertas.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {ofertas.map((o) => (
                <OfferCard key={o.id} product={o} />
              ))}
            </div>
          ) : (
            <div className="border border-ink/10 bg-sand px-6 py-14 text-center">
              <p className="font-serif text-xl text-ink">Nenhuma oportunidade aberta neste momento.</p>
              <p className="mx-auto mt-2 max-w-md text-sm text-stone">
                Novas condições aparecem aqui assim que são liberadas. Se quiser ser avisado, fale com a gente.
              </p>
              <LinkArrow href="/contato" className="mx-auto mt-5 w-fit">
                Quero saber das próximas
              </LinkArrow>
            </div>
          )}
        </Container>
      </section>

      <DestinationFinalCTA
        title="Viu algo que combina com você?"
        supporting="As condições dependem de disponibilidade e podem mudar. Fale com a Cays para garantir a sua."
        ctaLabel="Falar com a Cays"
        ctaHref="/contato"
      />
    </>
  );
}
