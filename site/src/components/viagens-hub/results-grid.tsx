import Link from "next/link";
import { ImageReveal } from "@/components/ui/image-reveal";
import { LinkArrow } from "@/components/ui/link-arrow";
import { StatusBadge } from "@/components/travel-product/status-badge";
import { TYPE_LABEL } from "@/lib/travel-product-status";
import { getDestinationBySlug } from "@/lib/cms";
import type { TravelProduct } from "@/types";

async function ResultCard({ product }: { product: TravelProduct }) {
  const destinationName = product.destinations[0]
    ? ((await getDestinationBySlug(product.destinations[0]))?.name ?? product.destinations[0])
    : undefined;
  const period = product.type === "fixed-date" ? product.departures?.[0]?.label : product.bestMonths;

  return (
    <Link href={`/viagens/${product.slug}`} className="group/card block">
      <ImageReveal
        src={product.gallery[0]?.src}
        alt={product.gallery[0]?.alt ?? product.title}
        width={640}
        height={480}
        sizes="(min-width: 1024px) 30vw, 90vw"
        containerClassName="aspect-[4/3]"
      />
      <div className="mt-4 border-t border-ink/10 pt-4 transition-colors duration-300 group-hover/card:border-magenta/40">
        <div className="flex items-start justify-between gap-3">
          <p className="text-xs tracking-wide text-stone uppercase">
            {TYPE_LABEL[product.type]}
            {destinationName && <span> · {destinationName}</span>}
          </p>
          <StatusBadge status={product.status} />
        </div>
        <h3 className="mt-2 font-serif text-xl text-ink">{product.title}</h3>

        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-stone">
          {product.duration && <span>{product.duration}</span>}
          {period && <span>{period}</span>}
          {(product.ship ?? product.supplier) && <span>{product.ship ?? product.supplier}</span>}
        </div>

        <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium tracking-wide text-ink transition-colors duration-300 group-hover/card:text-magenta">
          Ver viagem
        </span>
      </div>
    </Link>
  );
}

export function ResultsGrid({ products }: { products: TravelProduct[] }) {
  if (products.length === 0) {
    return (
      <div className="border border-ink/10 bg-sand px-6 py-12 text-center">
        <p className="font-serif text-xl text-ink">Não encontrou exatamente o que imaginou?</p>
        <p className="mt-2 text-sm text-stone">Podemos desenhar uma viagem sob medida para você.</p>
        <LinkArrow href="/contato" className="mx-auto mt-5 w-fit">
          Planejar uma viagem sob medida
        </LinkArrow>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ResultCard key={product.slug} product={product} />
      ))}
    </div>
  );
}
