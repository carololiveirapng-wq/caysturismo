import Link from "next/link";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  /** Itens após "Home", que é sempre adicionado automaticamente. */
  items: BreadcrumbItem[];
  /** "light" para uso sobre fotografia (Hero); "dark" sobre fundo claro. */
  tone?: "light" | "dark";
  className?: string;
}

export function Breadcrumb({ items, tone = "dark", className }: BreadcrumbProps) {
  const trail: BreadcrumbItem[] = [{ label: "Home", href: "/" }, ...items];

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol
        className={cn(
          "flex flex-wrap items-center gap-x-1.5 text-xs tracking-wide",
          tone === "light" ? "text-ivory/65" : "text-stone",
        )}
      >
        {trail.map((item, i) => {
          const isLast = i === trail.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className={cn(
                    "transition-colors duration-300",
                    tone === "light" ? "hover:text-ivory" : "hover:text-ink",
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isLast ? "page" : undefined} className={isLast ? (tone === "light" ? "text-ivory/85" : "text-ink") : undefined}>
                  {item.label}
                </span>
              )}
              {!isLast && (
                <span aria-hidden className="opacity-60">
                  ›
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
