/** Registro completo de um lead, persistido pelo repository. */
export interface Lead {
  id: string;

  name: string;
  email: string;
  whatsapp: string;
  city?: string;

  destinations: string[];
  experience?: string;
  travelProduct?: string;

  month?: string;
  year?: string;
  approximateDates?: string;
  duration: string;

  adults: number;
  children: number;
  childrenAges?: string;

  budgetTier: string;
  notes?: string;

  contactPreference: string;
  acquisitionSource?: string;

  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;

  sourcePath?: string;

  status: LeadStatus;
  /** Nota interna da equipe — nunca vem do formulário público, só editada pelo admin. Distinta de `notes` (o que o cliente escreveu). */
  internalNotes?: string;
  /** Quando retomar o contato — data (e opcionalmente hora), definida pela equipe. ISO. */
  followUpAt?: string;
  /** Próximo passo em texto livre e curto, ex.: "Enviar proposta". Nunca um sistema de tarefas. */
  nextAction?: string;
  /** Marcação simples pra destacar na lista — nunca um score calculado. */
  priority: boolean;
  createdAt: string;
  updatedAt: string;
}

export const LEAD_STATUSES = ["new", "contacted", "qualified", "proposal", "closed", "lost"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  new: "Novo",
  contacted: "Em contato",
  qualified: "Qualificado",
  proposal: "Proposta",
  closed: "Fechado",
  lost: "Perdido",
};

/** O que a action recebe pra montar um Lead — sem os campos que o repository/admin decidem ou que só existem pra uso interno da equipe. */
export type NewLead = Omit<
  Lead,
  "id" | "createdAt" | "updatedAt" | "status" | "internalNotes" | "followUpAt" | "nextAction" | "priority"
>;

/** Linha da timeline de um lead — registro mínimo de "o que mudou e quando", não um audit log completo. */
export const LEAD_EVENT_TYPES = [
  "created",
  "status_changed",
  "follow_up_changed",
  "next_action_changed",
  "priority_changed",
  "note_updated",
] as const;
export type LeadEventType = (typeof LEAD_EVENT_TYPES)[number];

export const LEAD_EVENT_LABELS: Record<LeadEventType, string> = {
  created: "Lead criado",
  status_changed: "Status alterado",
  follow_up_changed: "Retorno alterado",
  next_action_changed: "Próxima ação alterada",
  priority_changed: "Prioridade alterada",
  note_updated: "Observação interna atualizada",
};

export interface LeadEvent {
  id: string;
  leadId: string;
  type: LeadEventType;
  /** Descrição curta e opcional do que mudou, ex.: "Novo → Em contato". Nunca o conteúdo completo de uma observação. */
  detail?: string;
  createdAt: string;
}
