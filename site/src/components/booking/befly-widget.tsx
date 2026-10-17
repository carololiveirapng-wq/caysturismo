"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import styles from "./befly-widget.module.css";

/**
 * Motor de busca oficial Oner Travel / BeFly — custom element registrado
 * pelo script deles (`customElements.define("befly-widget", ...)`), uma
 * aplicação Angular empacotada (~452KB de JS, ~12KB de CSS, + 2 chamadas de
 * API deles pra config/seguro). Usado em /reservar-online e na Home; tanto o
 * script quanto o CSS ficam fora de qualquer outra rota.
 *
 * Carregamento sob demanda: só injeta o <link>/<Script> deles quando a
 * seção realmente começa a entrar no viewport (IntersectionObserver,
 * rootMargin 0), em vez de carregar no afterInteractive de toda página.
 * Medido em produção: o bundle
 * deles consome ~700-1850ms de main thread e derrubava o Performance score
 * da Home de 79 pra 36 (LCP 4.6s -> 10.2s) quando carregava incondicional —
 * a maior parte desse custo nunca precisa competir com a hidratação da
 * página pra quem nem rola até a seção.
 *
 * O wrapper reserva a altura real do widget desde o primeiro paint, pra não
 * causar layout shift nem antes nem depois do carregamento. As faixas não
 * seguem os breakpoints padrão do Tailwind (sm/lg) de propósito — o layout
 * interno deles tem os PRÓPRIOS pontos de quebra (medidos em produção
 * variando a largura real: ~514px até 849px, ~390px de 850 a 1219px,
 * ~260px de 1220px pra cima, já com margem de segurança sobre o valor
 * medido). Também tem uma transição suave no min-height como rede de
 * segurança — se a Oner mudar esses breakpoints num update futuro do
 * widget deles, o reajuste fica suave em vez de um salto brusco.
 *
 * `strategy="afterInteractive"` (agora dentro do gate de interseção) roda o
 * script depois da hidratação — o custom element nasce vazio no HTML (igual
 * no server e no client) e só é "upgradado" pelo script depois, então não
 * há mismatch de hidratação pra evitar.
 *
 * `styles.theme` sobrescreve as CSS custom properties que o stylesheet
 * oficial usa pra cor de destaque (ver befly-widget.module.css) — não altera
 * nenhuma classe deles, só redefine variáveis dentro desta subárvore.
 */
export function BeflyWidget() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative min-h-[540px] min-[850px]:min-h-[390px] min-[1220px]:min-h-[260px] transition-[min-height] duration-300 ${styles.theme}`}
    >
      {!ready && (
        <div
          aria-hidden
          className="absolute inset-0 flex items-center justify-center bg-sand/60"
        >
          <span className="text-sm text-stone">Carregando busca...</span>
        </div>
      )}

      {shouldLoad && (
        <>
          {/* React 19 hospeda isso no <head> e deduplica por href — então
              mesmo as duas páginas que renderizam <BeflyWidget>
              (/reservar-online e a Home) só baixam o CSS deles uma vez, e
              nenhuma outra rota recebe. */}
          <link
            rel="stylesheet"
            href="https://static.onertravel.com/widget/search/production/styles.css"
            precedence="default"
          />

          <div id="wrapper" className={ready ? "" : "invisible"}>
            <befly-widget language="pt-br" new-tab="true" />
          </div>

          <Script
            id="befly-widget-script"
            src="https://static.onertravel.com/widget/search/production/widget-befly.js"
            strategy="afterInteractive"
            onReady={() => setReady(true)}
          />
        </>
      )}
    </div>
  );
}
