"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function SimpleImageCarousel({ images }: { images: { src: string; alt: string }[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  if (images.length === 0) return null;

  return (
    <div className="relative">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="-ml-4 flex">
          {images.map((img) => (
            <div key={img.src} className="min-w-0 shrink-0 grow-0 basis-[85%] pl-4 sm:basis-[55%] lg:basis-[38%]">
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 38vw, 80vw" className="object-cover" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        type="button"
        aria-label="Imagem anterior"
        onClick={() => emblaApi?.scrollPrev()}
        className="absolute top-1/2 left-2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-ivory text-ink shadow-md transition-colors hover:bg-sand"
      >
        <ChevronLeft className="size-5" aria-hidden />
      </button>
      <button
        type="button"
        aria-label="Próxima imagem"
        onClick={() => emblaApi?.scrollNext()}
        className="absolute top-1/2 right-2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-ivory text-ink shadow-md transition-colors hover:bg-sand"
      >
        <ChevronRight className="size-5" aria-hidden />
      </button>
    </div>
  );
}
