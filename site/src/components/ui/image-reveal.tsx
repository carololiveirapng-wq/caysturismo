"use client";

import Image, { type ImageProps } from "next/image";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface ImageRevealProps extends Omit<ImageProps, "className"> {
  /** Wrapper class — sizing (aspect ratio, height) belongs here. */
  containerClassName?: string;
  imageClassName?: string;
  /** Subtle zoom on hover, for cards and editorial photography. Default on. */
  hoverZoom?: boolean;
}

/**
 * A photograph that reveals itself with a slow clip/scale as it enters view,
 * and optionally zooms ~3% on hover — the two motion patterns used across
 * nearly every image in the Cays home.
 */
export function ImageReveal({
  containerClassName,
  imageClassName,
  hoverZoom = true,
  alt,
  ...imageProps
}: ImageRevealProps) {
  return (
    <motion.div
      initial={{ clipPath: "inset(6% 6% 6% 6%)", opacity: 0 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      className={cn("group/image relative overflow-hidden", containerClassName)}
    >
      <Image
        alt={alt}
        className={cn(
          "size-full object-cover transition-transform duration-700 ease-[var(--ease-editorial)]",
          hoverZoom && "group-hover/image:scale-[1.035]",
          imageClassName,
        )}
        {...imageProps}
      />
    </motion.div>
  );
}
