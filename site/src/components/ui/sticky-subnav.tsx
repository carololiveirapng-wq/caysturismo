"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface StickySubnavItem {
  id: string;
  label: string;
}

interface StickySubnavProps {
  items: StickySubnavItem[];
  ctaLabel?: string;
  ctaHref?: string;
}

/**
 * Nav interna sticky logo abaixo do Header fixo — usa IntersectionObserver
 * só para destacar a seção ativa; a navegação em si é âncora nativa (`#id`),
 * então funciona mesmo sem JS.
 */
export function StickySubnav({ items, ctaLabel, ctaHref }: StickySubnavProps) {
  const [activeId, setActiveId] = useState(items[0]?.id);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `items` é estático na página que usa este componente.
  }, []);

  useEffect(() => {
    const el = trackRef.current?.querySelector<HTMLElement>(`[data-id="${activeId}"]`);
    el?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [activeId]);

  if (items.length === 0) return null;

  return (
    <div className="sticky top-16 z-40 border-b border-line bg-ivory/95 backdrop-blur-sm md:top-20">
      <div className="mx-auto flex max-w-(--container-content) items-center justify-between px-6 md:px-10 lg:px-16">
        <div ref={trackRef} className="no-scrollbar flex gap-7 overflow-x-auto py-3">
          {items.map((item) => (
            <a
              key={item.id}
              data-id={item.id}
              href={`#${item.id}`}
              className={cn(
                "shrink-0 text-xs font-medium tracking-[0.12em] whitespace-nowrap uppercase transition-colors duration-300",
                activeId === item.id ? "text-ink" : "text-stone hover:text-ink",
              )}
            >
              {item.label}
            </a>
          ))}
        </div>
        {ctaHref && ctaLabel && (
          <Link
            href={ctaHref}
            className="hidden shrink-0 py-3 pl-6 text-xs font-medium tracking-[0.12em] text-magenta-dark uppercase transition-colors duration-300 hover:text-magenta-dark md:inline-block"
          >
            {ctaLabel}
          </Link>
        )}
      </div>
    </div>
  );
}
