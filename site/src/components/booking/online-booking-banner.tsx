"use client";

import Link from "next/link";
import { Container } from "@/components/ui/container";
import { trackEvent } from "@/lib/analytics";

/** Faixa discreta pra /viagens — não substitui o catálogo, só aponta pra quem prefere pesquisar sozinho. */
export function OnlineBookingBanner() {
  return (
    <section className="border-y border-line bg-ivory">
      <Container className="flex flex-col items-start gap-3 py-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium text-ink">Prefere reservar online?</p>
          <p className="text-sm text-stone">Pesquise opções disponíveis diretamente.</p>
        </div>
        <Link
          href="/reservar-online"
          onClick={() => trackEvent("online_booking_clicked_viagens")}
          className="group/cta inline-flex items-center gap-2 text-sm font-medium tracking-wide text-ink transition-colors hover:text-magenta-dark"
        >
          Reservar online
          <span aria-hidden className="transition-transform duration-300 group-hover/cta:translate-x-1">
            →
          </span>
        </Link>
      </Container>
    </section>
  );
}
