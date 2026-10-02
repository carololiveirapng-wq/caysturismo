import type { Lead } from "./types";
import { siteConfig } from "@/lib/site-config";

export interface EmailNotifier {
  notifyNewLead(lead: Lead): Promise<void>;
}

function buildSubject(lead: Lead): string {
  return `Novo pedido de planejamento — ${lead.name}`;
}

/** Linhas visíveis no e-mail — só o que a equipe precisa pra decidir se abre o painel, nada a mais (o detalhe completo já está lá). */
function buildFields(lead: Lead): { label: string; value: string }[] {
  const fields: { label: string; value: string }[] = [
    { label: "Nome", value: lead.name },
    { label: "WhatsApp", value: lead.whatsapp },
    { label: "E-mail", value: lead.email },
    { label: "Destino(s)", value: lead.destinations.join(", ") || "não informado" },
  ];
  if (lead.experience) fields.push({ label: "Experiência", value: lead.experience });
  if (lead.travelProduct) fields.push({ label: "Viagem relacionada", value: lead.travelProduct });
  const period = [lead.month, lead.year].filter(Boolean).join("/") || lead.approximateDates;
  if (period) fields.push({ label: "Data/período", value: period });
  fields.push({ label: "Duração", value: lead.duration });
  fields.push({ label: "Adultos", value: String(lead.adults) });
  fields.push({
    label: "Crianças",
    value: lead.children > 0 ? `${lead.children}${lead.childrenAges ? ` (${lead.childrenAges})` : ""}` : "0",
  });
  fields.push({ label: "Investimento", value: lead.budgetTier });
  if (lead.notes) fields.push({ label: "Observações", value: lead.notes });
  if (lead.acquisitionSource) fields.push({ label: "Origem", value: lead.acquisitionSource });
  const utm = [lead.utmSource && `source=${lead.utmSource}`, lead.utmCampaign && `campaign=${lead.utmCampaign}`]
    .filter(Boolean)
    .join(" · ");
  if (utm) fields.push({ label: "UTM", value: utm });
  return fields;
}

function buildText(lead: Lead, panelUrl: string): string {
  const lines = buildFields(lead).map((f) => `${f.label}: ${f.value}`);
  lines.push("", `Ver lead no painel: ${panelUrl}`);
  return lines.join("\n");
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

/** Tabela com estilo inline — compatibilidade ampla entre clientes de e-mail, sem depender de CSS externo. */
function buildHtml(lead: Lead, panelUrl: string): string {
  const rows = buildFields(lead)
    .map(
      (f) => `
      <tr>
        <td style="padding:8px 0;color:#8a8077;font-size:13px;vertical-align:top;width:140px;">${escapeHtml(f.label)}</td>
        <td style="padding:8px 0;color:#1a1714;font-size:14px;line-height:1.5;">${escapeHtml(f.value)}</td>
      </tr>`,
    )
    .join("");

  return `<!doctype html>
<html lang="pt-BR">
  <body style="margin:0;padding:0;background-color:#f5f1ea;font-family:Georgia,'Times New Roman',serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f1ea;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" style="max-width:560px;background-color:#ffffff;border:1px solid #e8e2d8;">
            <tr>
              <td style="padding:28px 32px 20px;border-bottom:1px solid #e8e2d8;">
                <p style="margin:0;font-size:12px;letter-spacing:0.1em;text-transform:uppercase;color:#a6184f;">Cays Turismo</p>
                <h1 style="margin:8px 0 0;font-size:20px;color:#1a1714;">Novo pedido de planejamento</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${rows}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px 32px;">
                <a href="${panelUrl}" style="display:inline-block;padding:12px 24px;background-color:#1a1714;color:#f5f1ea;font-size:13px;letter-spacing:0.05em;text-decoration:none;">Ver lead no painel</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
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
    const panelUrl = `${siteConfig.url}/admin/leads/${lead.id}`;
    const { Resend } = await import("resend");
    const resend = new Resend(this.apiKey);
    const { error } = await resend.emails.send({
      from: this.from,
      to: this.to,
      subject: buildSubject(lead),
      html: buildHtml(lead, panelUrl),
      text: buildText(lead, panelUrl),
    });
    if (error) throw new Error(`Resend recusou o envio: ${error.message}`);
  }
}

/** Fallback SÓ de desenvolvimento — nunca envia e-mail de verdade; loga o conteúdo completo pra facilitar depurar localmente. */
class DevConsoleEmailNotifier implements EmailNotifier {
  async notifyNewLead(lead: Lead): Promise<void> {
    const panelUrl = `${siteConfig.url}/admin/leads/${lead.id}`;
    console.warn(
      `[leads:email:dev] RESEND_API_KEY não configurado — e-mail não enviado. Conteúdo que seria enviado:\n` +
        `Assunto: ${buildSubject(lead)}\n${buildText(lead, panelUrl)}`,
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
