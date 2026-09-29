import { cn } from "@/lib/utils";

/**
 * Paginação simulada — sem lógica de busca real. Só aparece quando fizer
 * sentido (mais conteúdo do que uma página), então com poucos itens (como
 * agora) ela não renderiza nada.
 */
export function Pagination({ currentPage, totalPages }: { currentPage: number; totalPages: number }) {
  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Paginação" className="mt-12 flex items-center justify-center gap-2">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <span
          key={page}
          aria-current={page === currentPage ? "page" : undefined}
          className={cn(
            "flex size-9 items-center justify-center border text-sm transition-colors duration-300",
            page === currentPage ? "border-ink bg-ink text-ivory" : "border-ink/15 text-stone",
          )}
        >
          {page}
        </span>
      ))}
    </nav>
  );
}
