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

  status: "new";
  createdAt: string;
  updatedAt: string;
}

/** O que a action recebe pra montar um Lead — sem `id`/`createdAt`/`updatedAt`/`status`, que o repository decide. */
export type NewLead = Omit<Lead, "id" | "createdAt" | "updatedAt" | "status">;
