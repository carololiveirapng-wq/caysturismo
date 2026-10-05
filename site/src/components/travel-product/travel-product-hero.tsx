"use client";

import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Reveal } from "@/components/ui/reveal";
import { ImageReveal } from "@/components/ui/image-reveal";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { CarouselCircleNav } from "@/components/ui/carousel-circle-nav";
import { StatusBadge } from "@/components/travel-product/status-badge";
import { TYPE_LABEL } from "@/lib/travel-product-status";
import type { TravelProduct } from "@/types";

export function TravelProductHero({
  product,
  contactHref,
  relatedExperiences = [],
  whatsappHref,
}: {
  product: TravelProduct;
  contactHref: string;
  /** Experiências relacionadas já resolvidas (nome + slug) — fecha o laço Viagem → Experiência. */
  relatedExperiences?: { slug: string; name: string }[];
  whatsappHref?: string;
}) {
  const nextDeparture = product.departures?.find((d) => d.status !== "sold-out") ?? product.departures?.[0];

  return (
    <section className="bg-ivory pt-28 pb-14 md:pt-32 md:pb-20">
      <Container>
        {product.breadcrumb && <Breadcrumb items={product.breadcrumb} className="mb-6" />}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-7">
            <Carousel aria-label="Galeria da viagem" opts={{ align: "start", loop: product.gallery.length > 1 }}>
              <div className="relative">
                <CarouselContent className="-ml-0">
                  {product.gallery.map((image, i) => (
                    <CarouselItem key={i} className="pl-0">
                      <ImageReveal
                        src={image.src}
                        alt={image.alt}
                        width={1200}
                        height={900}
                        sizes="(min-width: 1024px) 55vw, 100vw"
                        containerClassName="aspect-[4/3]"
                        hoverZoom={false}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {product.gallery.length > 1 && <CarouselCircleNav tone="dark" />}
              </div>
            </Carousel>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-5">
            <div className="border border-ink/10 bg-ivory p-7 md:p-8 lg:sticky lg:top-28">
              <div className="flex items-start justify-between gap-3">
                {product.eyebrow && (
                  <p className="text-xs font-medium tracking-[0.2em] text-stone uppercase">{product.eyebrow}</p>
                )}
                <StatusBadge status={product.status} />
              </div>

              <h1 className="mt-2 font-serif text-3xl leading-tight text-ink md:text-4xl">{product.title}</h1>
              {product.subtitle && <p className="mt-3 text-sm leading-relaxed text-stone">{product.subtitle}</p>}

              {relatedExperiences.length > 0 && (
                <p className="mt-3 text-xs tracking-wide text-stone uppercase">
                  Experiência:{" "}
                  {relatedExperiences.map((exp, i) => (
                    <span key={exp.slug}>
                      {i > 0 && ", "}
                      <Link href={`/experiencias/${exp.slug}`} className="text-ink underline-offset-2 hover:underline">
                        {exp.name}
                      </Link>
                    </span>
                  ))}
                </p>
              )}

              <dl className="mt-6 divide-y divide-ink/10 border-t border-ink/10 text-sm">
                <div className="flex items-center justify-between py-3">
                  <dt className="text-stone">Tipo</dt>
                  <dd className="text-ink">{TYPE_LABEL[product.type]}</dd>
                </div>
                {product.duration && (
                  <div className="flex items-center justify-between py-3">
                    <dt className="text-stone">Duração</dt>
                    <dd className="text-ink">{product.duration}</dd>
                  </div>
                )}
                {product.bestMonths && (
                  <div className="flex items-center justify-between py-3">
                    <dt className="text-stone">Melhor época</dt>
                    <dd className="text-ink">{product.bestMonths}</dd>
                  </div>
                )}
                {nextDeparture && (
                  <div className="flex items-center justify-between gap-4 py-3">
                    <dt className="shrink-0 text-stone">Próxima saída</dt>
                    <dd className="text-right text-ink">
                      {nextDeparture.label}
                      {nextDeparture.status !== "active" && (
                        <span className="mt-1 flex justify-end">
                          <StatusBadge status={nextDeparture.status} />
                        </span>
                      )}
                    </dd>
                  </div>
                )}
                {product.ship && (
                  <div className="flex items-center justify-between py-3">
                    <dt className="text-stone">Navio</dt>
                    <dd className="text-ink">{product.ship}</dd>
                  </div>
                )}
                {product.embarkation && (
                  <div className="flex items-center justify-between py-3">
                    <dt className="text-stone">Embarque</dt>
                    <dd className="text-ink">{product.embarkation}</dd>
                  </div>
                )}
                {product.disembarkation && (
                  <div className="flex items-center justify-between py-3">
                    <dt className="text-stone">Desembarque</dt>
                    <dd className="text-ink">{product.disembarkation}</dd>
                  </div>
                )}
              </dl>

              <div className="mt-6 flex items-baseline justify-between border-t border-ink/10 pt-5">
                <span className="text-xs tracking-wide text-stone uppercase">A partir de</span>
                <span className="font-serif text-lg text-ink">{product.priceFrom ?? "Sob consulta"}</span>
              </div>

              {product.status === "expired" ? (
                <p className="mt-6 border border-ink/10 bg-sand p-4 text-sm leading-relaxed text-stone">
                  Esta viagem não está mais disponível. Veja opções parecidas mais abaixo, ou fale com a gente.
                </p>
              ) : (
                <Link
                  href={contactHref}
                  className="mt-6 flex items-center justify-center bg-ink px-6 py-3.5 text-sm font-medium tracking-wide text-ivory uppercase transition-colors duration-300 hover:bg-magenta-dark"
                >
                  Planejar esta viagem
                </Link>
              )}

              {whatsappHref && product.status !== "expired" && (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 flex items-center justify-center border border-ink/15 px-6 py-3 text-sm font-medium tracking-wide text-ink transition-colors duration-300 hover:border-ink/30"
                >
                  Falar no WhatsApp
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
