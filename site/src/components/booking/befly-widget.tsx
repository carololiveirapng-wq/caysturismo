"use client";

import { useState } from "react";
import Script from "next/script";

/**
 * Motor de busca oficial Oner Travel / BeFly — custom element registrado
 * pelo script deles (`customElements.define("befly-widget", ...)`), uma
 * aplicação Angular empacotada. Carregado só nesta página: tanto o script
 * (~1.8MB) quanto o CSS (ver <link> em page.tsx) ficam fora de qualquer
 * rota que não seja /reservar-online.
 *
 * `strategy="afterInteractive"` roda o script depois da hidratação do
 * React — o custom element nasce vazio no HTML (igual no server e no
 * client) e só é "upgradado" pelo script depois, então não há mismatch de
 * hidratação pra evitar.
 */
export function BeflyWidget() {
  const [ready, setReady] = useState(false);

  return (
    <div className="relative">
      {!ready && (
        <div
          aria-hidden
          className="absolute inset-0 flex min-h-32 animate-pulse items-center justify-center bg-sand/60"
        >
          <span className="text-sm text-stone">Carregando busca...</span>
        </div>
      )}

      <div id="wrapper" className={ready ? "" : "invisible"}>
        <befly-widget language="pt-br" new-tab="true" />
      </div>

      <Script
        id="befly-widget-script"
        src="https://static.onertravel.com/widget/search/production/widget-befly.js"
        strategy="afterInteractive"
        onReady={() => setReady(true)}
      />
    </div>
  );
}
