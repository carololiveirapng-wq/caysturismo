import Image from "next/image";
import Link from "next/link";
import { ImageReveal } from "@/components/ui/image-reveal";
import { LinkArrow } from "@/components/ui/link-arrow";
import { destinationHref, travelProductHref } from "@/lib/links";
import { cn } from "@/lib/utils";
import type { ArticleBlock } from "@/types";

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "richText":
      return <p className="text-base leading-relaxed text-stone">{block.text}</p>;

    case "imageFull":
      return (
        <figure>
          <ImageReveal
            src={block.image.src}
            alt={block.image.alt}
            width={1200}
            height={800}
            sizes="(min-width: 1024px) 700px, 90vw"
            containerClassName="aspect-[16/10]"
          />
          {block.caption && <figcaption className="mt-2.5 text-xs text-stone/70">{block.caption}</figcaption>}
        </figure>
      );

    case "imageText":
      return (
        <div
          className={cn(
            "grid grid-cols-1 items-center gap-6 sm:grid-cols-2",
            block.imagePosition === "right" && "sm:[&>:first-child]:order-2",
          )}
        >
          <ImageReveal
            src={block.image.src}
            alt={block.image.alt}
            width={700}
            height={560}
            sizes="(min-width: 1024px) 350px, 90vw"
            containerClassName="aspect-[4/3]"
          />
          <div>
            {block.heading && <h4 className="font-serif text-lg text-ink">{block.heading}</h4>}
            <p className={cn("text-sm leading-relaxed text-stone", block.heading && "mt-2")}>{block.text}</p>
          </div>
        </div>
      );

    case "gallery":
      return (
        <div className="grid grid-cols-3 gap-3">
          {block.images.map((img, i) => (
            <div key={i} className="relative aspect-[3/4] overflow-hidden">
              <Image src={img.src} alt={img.alt} fill sizes="(min-width: 768px) 220px, 30vw" className="object-cover" />
            </div>
          ))}
        </div>
      );

    case "quote":
      return (
        <blockquote className="border-l-2 border-magenta py-1 pl-6">
          <p className="font-serif text-2xl leading-snug text-ink italic">&ldquo;{block.text}&rdquo;</p>
          {block.author && <cite className="mt-3 block text-xs text-stone not-italic">{block.author}</cite>}
        </blockquote>
      );

    case "expertNote":
      return (
        <div className="border border-ink/10 bg-sand p-5">
          <p className="text-xs font-medium tracking-[0.15em] text-stone uppercase">Nota da curadoria</p>
          <p className="mt-2.5 text-sm leading-relaxed text-ink">{block.text}</p>
          {block.author && <p className="mt-3 text-xs text-stone">{block.author}</p>}
        </div>
      );

    case "cta":
      return (
        <div className="border border-ink/10 bg-ivory p-6">
          <p className="font-serif text-lg text-ink">{block.title}</p>
          {block.supporting && <p className="mt-1.5 text-sm text-stone">{block.supporting}</p>}
          <LinkArrow href={block.ctaHref} className="mt-4">
            {block.ctaLabel}
          </LinkArrow>
        </div>
      );

    case "travelCard":
      return (
        <Link href={travelProductHref(block.slug)} className="group/card flex items-center gap-4 border border-ink/10 p-4 transition-colors duration-300 hover:border-magenta/40">
          <div className="relative size-20 shrink-0 overflow-hidden">
            <Image src={block.image.src} alt={block.image.alt} fill sizes="80px" className="object-cover" />
          </div>
          <div>
            <p className="text-xs tracking-wide text-stone uppercase">Viagem</p>
            <h4 className="font-serif text-lg text-ink">{block.title}</h4>
            {block.subtitle && <p className="text-sm text-stone">{block.subtitle}</p>}
          </div>
        </Link>
      );

    case "destinationCard":
      return (
        <Link href={destinationHref(block.slug)} className="group/card flex items-center gap-4 border border-ink/10 p-4 transition-colors duration-300 hover:border-magenta/40">
          <div className="relative size-20 shrink-0 overflow-hidden">
            <Image src={block.image.src} alt={block.image.alt} fill sizes="80px" className="object-cover" />
          </div>
          <div>
            <p className="text-xs tracking-wide text-stone uppercase">Destino</p>
            <h4 className="font-serif text-lg text-ink">{block.name}</h4>
            {block.region && <p className="text-sm text-stone">{block.region}</p>}
          </div>
        </Link>
      );

    default:
      return null;
  }
}

export function ArticleBlocks({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="space-y-7">
      {blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </div>
  );
}
