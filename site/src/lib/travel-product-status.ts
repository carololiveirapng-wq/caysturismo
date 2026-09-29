import type { TravelProduct, TravelProductStatus } from "@/types";

export const TYPE_LABEL: Record<TravelProduct["type"], string> = {
  custom: "Sob medida",
  "fixed-date": "Data fixa",
  offer: "Oferta",
};

export const STATUS_LABEL: Record<TravelProductStatus, string> = {
  active: "Disponível",
  "few-spots": "Últimas vagas",
  "sold-out": "Esgotado",
  expired: "Não está mais disponível",
};
