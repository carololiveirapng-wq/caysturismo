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

/** O que a action recebe pra montar um Lead — sem `id`/`createdAt`/`updatedAt`/`status`/`internalNotes`, que o repository/admin decidem. */
export type NewLead = Omit<Lead, "id" | "createdAt" | "updatedAt" | "status" | "internalNotes">;
