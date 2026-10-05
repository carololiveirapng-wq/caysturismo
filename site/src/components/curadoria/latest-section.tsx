"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { EditorialHeading } from "@/components/ui/editorial-heading";
import { ImageReveal } from "@/components/ui/image-reveal";
import { Pagination } from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import type { CuradoriaArticle } from "@/types";

function LatestGrid({ articles }: { articles: CuradoriaArticle[] }) {
  if (articles.length === 0) {
    return <p className="text-sm text-stone">Nenhum artigo nessa categoria ainda.</p>;
  }

  const [medium, ...rest] = articles;

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
      <Link href={`/curadoria/${medium.slug}`} className="group/card block md:col-span-7">
        <ImageReveal
          src={medium.heroImage.src}
          alt={medium.heroImage.alt}
          width={900}
          height={620}
          sizes="(min-width: 768px) 55vw, 90vw"
          containerClassName="aspect-[16/11]"
        />
        <div className="mt-4 border-t border-ink/10 pt-4">
          <p className="text-xs font-medium tracking-[0.15em] text-magenta-dark uppercase">{medium.category}</p>
          <h3 className="mt-2 font-serif text-2xl leading-snug text-ink">{medium.title}</h3>
          {medium.readingTime && <p className="mt-2 text-xs text-stone">{medium.readingTime} min de leitura</p>}
        </div>
      </Link>

      {rest.length > 0 && (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:col-span-5 md:grid-cols-1">
          {rest.map((article) => (
            <Link key={article.slug} href={`/curadoria/${article.slug}`} className="group/card block">
              <ImageReveal
                src={article.heroImage.src}
                alt={article.heroImage.alt}
                width={640}
                height={420}
                sizes="(min-width: 768px) 22vw, 90vw"
                containerClassName="aspect-[16/10]"
              />
              <div className="mt-3 border-t border-ink/10 pt-3">
                <p className="text-xs font-medium tracking-[0.15em] text-magenta-dark uppercase">{article.category}</p>
                <h3 className="mt-1.5 font-serif text-lg leading-snug text-ink">{article.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function LatestSection({
  articles,
  categories,
}: {
  articles: CuradoriaArticle[];
  categories: readonly string[];
}) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const items = ["Todos", ...categories];

  const filtered = useMemo(
    () => (activeCategory ? articles.filter((a) => a.category === activeCategory) : articles),
    [articles, activeCategory],
  );

  return (
    <section className="bg-ivory py-14 md:py-20">
      <Container>
        <EditorialHeading as="h2" size="md">
          Mais recentes
        </EditorialHeading>

        <div
          role="tablist"
          aria-label="Categorias"
          className="no-scrollbar mt-7 flex gap-7 overflow-x-auto border-b border-line"
        >
          {items.map((item) => {
            const value = item === "Todos" ? null : item;
            const selected = activeCategory === value;
            return (
              <button
                key={item}
                role="tab"
                aria-selected={selected}
                onClick={() => setActiveCategory(value)}
                className={cn(
                  "relative shrink-0 pb-4 text-sm font-medium tracking-wide whitespace-nowrap transition-colors duration-300",
                  selected ? "text-ink" : "text-stone hover:text-ink",
                )}
              >
                {item}
                {selected && (
                  <motion.span
                    layoutId="curadoria-category-underline"
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-x-0 -bottom-px h-px bg-magenta"
                  />
                )}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory ?? "todos"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 md:mt-10"
          >
            <LatestGrid articles={filtered} />
          </motion.div>
        </AnimatePresence>

        <Pagination currentPage={1} totalPages={Math.ceil(filtered.length / 6)} />
      </Container>
    </section>
  );
}
