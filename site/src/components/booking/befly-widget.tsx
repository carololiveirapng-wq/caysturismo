"use client";

import { useState } from "react";
import Script from "next/script";
import styles from "./befly-widget.module.css";

/**
 * Motor de busca oficial Oner Travel / BeFly — custom element registrado
 * pelo script deles (`customElements.define("befly-widget", ...)`), uma
 * aplicação Angular empacotada. Usado em /reservar-online e na Home; tanto o
 * script (~1.8MB) quanto o CSS (ver <link> nas páginas que renderizam este
 * componente) ficam fora de qualquer outra rota.
 *
 * `strategy="afterInteractive"` roda o script depois da hidratação do
 * React — o custom element nasce vazio no HTML (igual no server e no
 * client) e só é "upgradado" pelo script depois, então não há mismatch de
 * hidratação pra evitar.
 *
 * `styles.theme` sobrescreve as CSS custom properties que o stylesheet
 * oficial usa pra cor de destaque (ver befly-widget.module.css) — não altera
 * nenhuma classe deles, só redefine variáveis dentro desta subárvore.
 */
export function BeflyWidget() {
  const [ready, setReady] = useState(false);

  return (
    <div className={`relative ${styles.theme}`}>
      {/* React 19 hospeda isso no <head> e deduplica por href — então mesmo
          as duas páginas que renderizam <BeflyWidget> (/reservar-online e a
          Home) só baixam o CSS deles uma vez, e nenhuma outra rota recebe. */}
      <link
        rel="stylesheet"
        href="https://static.onertravel.com/widget/search/production/styles.css"
        precedence="default"
      />

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
