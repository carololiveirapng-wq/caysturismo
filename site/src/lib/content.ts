interface Orderable {
  active: boolean;
  order: number;
  featured?: boolean;
}

/** Itens ativos, em ordem — não muta o array original. */
export function getActiveOrderedItems<T extends Orderable>(items: T[]): T[] {
  return [...items].filter((item) => item.active).sort((a, b) => a.order - b.order);
}

/** Itens ativos E em destaque, em ordem — não muta o array original. */
export function getFeaturedItems<T extends Orderable>(items: T[]): T[] {
  return getActiveOrderedItems(items).filter((item) => item.featured);
}
