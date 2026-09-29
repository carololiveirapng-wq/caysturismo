import type { GoogleReview } from "@/types";

/**
 * TEMP — DESENVOLVIMENTO. Nenhum destes 3 itens é uma avaliação real.
 *
 * Tentamos localizar o perfil do Google da Cays a partir do link
 * compartilhado, mas a página de avaliações do Google é renderizada via
 * JavaScript e não expõe o texto/nome/nota no HTML estático — não temos
 * como buscar isso sem a API do Places (fora de escopo nesta etapa) ou um
 * navegador de verdade. Em vez de inventar depoimentos convincentes, estes
 * 3 registros são propositalmente genéricos/identificáveis como mock, só
 * para validar o layout (estrelas variando, texto, nome, tempo relativo).
 *
 * // TODO GOOGLE: substituir os 3 itens abaixo pelas avaliações reais do
 * Google Business Profile da Cays assim que estiverem disponíveis — nota,
 * autor, texto e `reviewUrl` devem vir exatamente da fonte, sem edição.
 */
export const reviews: GoogleReview[] = [
  {
    id: "google-review-mock-1",
    active: true,
    order: 1,
    authorName: "Avaliação de exemplo — Cliente A",
    rating: 5,
    text: "[TEMP] Texto de exemplo no lugar da avaliação real do Google. Substituir por conteúdo real antes de publicar.",
    relativeTime: "período de exemplo",
  },
  {
    id: "google-review-mock-2",
    active: true,
    order: 2,
    authorName: "Avaliação de exemplo — Cliente B",
    rating: 4,
    text: "[TEMP] Segundo texto de exemplo, com nota diferente de propósito para validar que as estrelas variam de card para card.",
    relativeTime: "período de exemplo",
  },
  {
    id: "google-review-mock-3",
    active: true,
    order: 3,
    authorName: "Avaliação de exemplo — Cliente C",
    rating: 5,
    text: "[TEMP] Terceiro texto de exemplo, só para preencher o carrossel com um mínimo de 3 cards durante o desenvolvimento.",
    relativeTime: "período de exemplo",
  },
];
