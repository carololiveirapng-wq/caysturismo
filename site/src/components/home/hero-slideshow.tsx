"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { DemoImage } from "@/types";

const INTERVAL_MS = 6000;

/** Fundo do hero em modo "slide" (2-3 imagens) — fade automático, sem controles manuais. */
export function HeroSlideshow({ images }: { images: DemoImage[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % images.length), INTERVAL_MS);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <>
      {images.map((image, i) => (
        <Image
          key={image.src}
          src={image.src}
          alt={image.alt}
          fill
          priority={i === 0}
          sizes="100vw"
          className={`object-cover transition-opacity duration-1000 ease-[var(--ease-editorial)] ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </>
  );
}
