declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

interface LeadConversionEvent {
  destination?: string;
  experience?: string;
  travelProduct?: string;
  sourcePath?: string;
}

/**
 * Empurra pro dataLayer (padrão GTM) se ele existir — não injeta o GTM em
 * si, que é uma decisão de outra camada (tag manager configurado no
 * `<head>` quando isso for definido). Nunca inclui dado pessoal (nome,
 * e-mail, telefone): só o contexto comercial da conversão.
 */
export function trackLeadGenerated(event: LeadConversionEvent) {
  if (typeof window === "undefined" || !window.dataLayer) return;
  window.dataLayer.push({ event: "generate_lead", ...event });
}

/** Evento genérico pro dataLayer — mesmo mecanismo de `trackLeadGenerated`, sem payload fixo. */
export function trackEvent(event: string) {
  if (typeof window === "undefined" || !window.dataLayer) return;
  window.dataLayer.push({ event });
}
