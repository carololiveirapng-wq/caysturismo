import { getTravelProductBySlug, getExperienceBySlug, getDestinationBySlug } from "@/lib/cms";
import type { Lead } from "@/lib/leads/types";

/**
 * Interesse principal do lead: produto de viagem > experiência > destino —
 * nessa ordem de especificidade. "nao-sei" é um valor válido do formulário
 * (campo "tipo de viagem"/"destino" com a opção "Ainda não sei"), não uma
 * experiência ou destino real — tratado como ausente aqui, não exibido cru.
 * Async porque passa pelo CMS (Sanity primeiro, mock como fallback) em vez
 * de ler o mock direto — um lead antigo referenciando um slug que só
 * existe no mock continua resolvendo normalmente.
 */
export async function getLeadInterest(lead: Pick<Lead, "travelProduct" | "experience" | "destinations">): Promise<string> {
  if (lead.travelProduct) {
    return (await getTravelProductBySlug(lead.travelProduct))?.title ?? lead.travelProduct;
  }
  if (lead.experience && lead.experience !== "nao-sei") {
    return (await getExperienceBySlug(lead.experience))?.name ?? lead.experience;
  }
  const destination = lead.destinations.find((slug) => slug !== "nao-sei");
  if (destination) {
    return (await getDestinationBySlug(destination))?.name ?? destination;
  }
  return "Ainda não definido";
}

/**
 * Rótulo amigável de origem — deriva de utm_source/acquisition_source pra
 * exibição, mas nunca sobrescreve o dado bruto salvo no banco.
 */
const ORIGIN_LABELS: [needle: string, label: string][] = [
  ["meta", "Meta Ads"],
  ["facebook", "Meta Ads"],
  ["fb", "Meta Ads"],
  ["instagram", "Instagram"],
  ["ig", "Instagram"],
  ["google", "Google Ads"],
  ["referral", "Referência"],
];

export function getLeadOrigin(lead: Pick<Lead, "utmSource" | "acquisitionSource">): string {
  const source = lead.utmSource?.toLowerCase().trim();
  if (source) {
    const match = ORIGIN_LABELS.find(([needle]) => source.includes(needle));
    return match ? match[1] : lead.utmSource!;
  }
  if (lead.acquisitionSource) return lead.acquisitionSource;
  return "Direto";
}

/** Link "wa.me" com número higienizado (só dígitos) e mensagem inicial pré-preenchida — nunca envia nada sozinho, só abre o WhatsApp com o texto pronto. */
export function buildWhatsAppLink(whatsapp: string, name: string): string {
  const digits = whatsapp.replace(/\D/g, "");
  const firstName = name.trim().split(/\s+/)[0] ?? name;
  const message = `Olá, ${firstName}! Aqui é da Cays Turismo, vi seu pedido de planejamento de viagem.`;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
