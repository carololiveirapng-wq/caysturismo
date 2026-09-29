/** Nome do cookie compartilhado entre `middleware.ts` (grava) e `app/contato/actions.ts` (lê). */
export const ATTRIBUTION_COOKIE = "cays_attribution";

export interface AttributionData {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  landingPath?: string;
}
