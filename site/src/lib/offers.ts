import type { TravelProduct } from "@/types";

/** Uma oferta está aberta se estiver ativa, for do tipo "Oferta" e ainda não tiver passado da data de validade. */
export function isOfferOpen(product: TravelProduct, now: Date = new Date()): boolean {
  if (!product.active || product.type !== "offer") return false;
  if (!product.offerEndsAt) return true;
  const fim = new Date(product.offerEndsAt);
  return Number.isNaN(fim.getTime()) || fim.getTime() > now.getTime();
}

/** Só as ofertas abertas, as que vencem primeiro vêm antes (as sem data de fim ficam por último, pela ordem do editor). */
export function getOpenOffers(products: TravelProduct[], now: Date = new Date()): TravelProduct[] {
  return products
    .filter((p) => isOfferOpen(p, now))
    .sort((a, b) => {
      const fa = a.offerEndsAt ? new Date(a.offerEndsAt).getTime() : Number.POSITIVE_INFINITY;
      const fb = b.offerEndsAt ? new Date(b.offerEndsAt).getTime() : Number.POSITIVE_INFINITY;
      return fa === fb ? a.order - b.order : fa - fb;
    });
}

const FUSO = "America/Sao_Paulo";

/** "30 de novembro" (fuso de Brasília). */
export function formatOfferEnd(iso: string): string {
  return new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "long", timeZone: FUSO }).format(new Date(iso));
}

/** Quantos dias faltam (arredondado para cima), no fuso de Brasília; null se não houver data. */
export function daysLeft(iso: string | undefined, now: Date = new Date()): number | null {
  if (!iso) return null;
  const fim = new Date(iso).getTime();
  if (Number.isNaN(fim)) return null;
  return Math.max(0, Math.ceil((fim - now.getTime()) / 86400000));
}
