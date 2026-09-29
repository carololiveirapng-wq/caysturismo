import type { Lead } from "./types";

export interface EmailNotifier {
  notifyNewLead(lead: Lead): Promise<void>;
}

function buildSubject(lead: Lead): string {
  const context = lead.travelProduct ?? lead.experience ?? lead.destinations[0] ?? "sem contexto definido";
  return `Novo lead Cays — ${lead.name} — ${context}`;
}

function buildBody(lead: Lead): string {
  const lines = [
    `Nome: ${lead.name}`,
    `E-mail: ${lead.email}`,
    `WhatsApp: ${lead.whatsapp}`,
    lead.city && `Cidade: ${lead.city}`,
    `Preferência de contato: ${lead.contactPreference}`,
    "",
    `Destino(s): ${lead.destinations.join(", ") || "não informado"}`,
    lead.experience && `Experiência: ${lead.experience}`,
    lead.travelProduct && `Viagem de origem: ${lead.travelProduct}`,
    `Duração: ${lead.duration}`,
    (lead.month || lead.year) && `Período: ${[lead.month, lead.year].filter(Boolean).join("/")}`,
    lead.approximateDates && `Datas aproximadas: ${lead.approximateDates}`,
    `Adultos: ${lead.adults} · Crianças: ${lead.children}${lead.childrenAges ? ` (${lead.childrenAges})` : ""}`,
    `Faixa de investimento: ${lead.budgetTier}`,
    lead.notes && `Observações: ${lead.notes}`,
    "",
    lead.acquisitionSource && `Como conheceu a Cays: ${lead.acquisitionSource}`,
    lead.sourcePath && `Página de origem: ${lead.sourcePath}`,
    (lead.utmSource || lead.utmMedium || lead.utmCampaign) &&
      `UTM: source=${lead.utmSource ?? "-"} medium=${lead.utmMedium ?? "-"} campaign=${lead.utmCampaign ?? "-"} content=${lead.utmContent ?? "-"} term=${lead.utmTerm ?? "-"}`,
    "",
    `ID: ${lead.id}`,
    `Recebido em: ${lead.createdAt}`,
  ].filter((line): line is string => Boolean(line));

  return lines.join("\n");
}

/**
 * Envio real — precisa das três env vars (ver `.env.example`). O domínio
 * usado em `from` precisa estar verificado no Resend (resend.com/domains)
 * antes do primeiro envio, senão a API recusa. Formato esperado:
 * `Cays Turismo <leads@SEU-DOMINIO-VERIFICADO.com.br>` — sem domínio
 * verificado, o Resend rejeita silenciosamente ou marca como spam.
 */
class ResendEmailNotifier implements EmailNotifier {
  constructor(
    private apiKey: string,
    private to: string,
    private from: string,
  ) {}

  async notifyNewLead(lead: Lead): Promise<void> {
    const { Resend } = await import("resend");
    const resend = new Resend(this.apiKey);
    const { error } = await resend.emails.send({
      from: this.from,
      to: this.to,
      subject: buildSubject(lead),
      text: buildBody(lead),
    });
    if (error) throw new Error(`Resend recusou o envio: ${error.message}`);
  }
}

/** Fallback SÓ de desenvolvimento — nunca envia e-mail de verdade; loga o conteúdo completo pra facilitar depurar localmente. */
class DevConsoleEmailNotifier implements EmailNotifier {
  async notifyNewLead(lead: Lead): Promise<void> {
    console.warn(
      `[leads:email:dev] RESEND_API_KEY não configurado — e-mail não enviado. Conteúdo que seria enviado:\n` +
        `Assunto: ${buildSubject(lead)}\n${buildBody(lead)}`,
    );
  }
}

/**
 * Fallback de PRODUÇÃO sem Resend configurado — o lead já foi salvo no
 * banco (isso é o que importa), mas a notificação por e-mail não está
 * disponível. Log só um aviso genérico: nome, e-mail, WhatsApp e
 * observações NUNCA vão para o log em produção, mesmo aqui.
 */
class ProductionWarnEmailNotifier implements EmailNotifier {
  async notifyNewLead(lead: Lead): Promise<void> {
    console.warn(`[leads:email] Lead ${lead.id} salvo, mas notificação por e-mail não configurada (RESEND_API_KEY ausente).`);
  }
}

export function getEmailNotifier(): EmailNotifier {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFICATION_EMAIL;
  const from = process.env.LEAD_NOTIFICATION_FROM;

  if (apiKey && to && from) {
    return new ResendEmailNotifier(apiKey, to, from);
  }
  return process.env.NODE_ENV === "production" ? new ProductionWarnEmailNotifier() : new DevConsoleEmailNotifier();
}
