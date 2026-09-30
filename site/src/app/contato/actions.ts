"use server";

import { headers, cookies } from "next/headers";
import { logServerError } from "@/lib/log";
import { leadSubmissionSchema } from "@/lib/leads/schema";
import { getLeadRepository } from "@/lib/leads/repository";
import { getEmailNotifier } from "@/lib/leads/notify";
import { isRateLimited } from "@/lib/leads/rate-limit";
import { ATTRIBUTION_COOKIE, type AttributionData } from "@/lib/leads/attribution";
import type { NewLead } from "@/lib/leads/types";

export interface SubmitLeadInput {
  destinos: string[];
  tipoExperiencia: string;
  mes?: string;
  ano?: string;
  datasAproximadas?: string;
  duracao: string;
  adultos: number;
  criancas: number;
  idadesCriancas?: string;
  faixaInvestimentoTipo: string;
  faixaInvestimentoDetalhe?: string;
  observacoes?: string;
  nome: string;
  whatsapp: string;
  email: string;
  cidade?: string;
  preferenciaContato: string;
  comoConheceu?: string;
  consentimento: boolean;
  travelProduct?: string;
  sourcePath?: string;
  /** Honeypot — campo que só um bot preenche. Fora do schema Zod de propósito. */
  website?: string;
}

export type SubmitLeadResult = { success: true } | { success: false; error: string };

async function readAttribution(): Promise<AttributionData> {
  try {
    const raw = (await cookies()).get(ATTRIBUTION_COOKIE)?.value;
    if (!raw) return {};
    return JSON.parse(raw) as AttributionData;
  } catch {
    return {};
  }
}

export async function submitLead(input: SubmitLeadInput): Promise<SubmitLeadResult> {
  // Honeypot: bots preenchem qualquer campo extra que encontram. Sucesso
  // silencioso — não entrega ao spammer que ele foi identificado.
  if (input.website) {
    return { success: true };
  }

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(`lead:${ip}`)) {
    return { success: false, error: "Muitas tentativas em pouco tempo. Aguarde um momento e tente de novo." };
  }

  const parsed = leadSubmissionSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: "Alguns dados não passaram na validação. Revise o formulário e tente novamente." };
  }

  const attribution = await readAttribution();
  const data = parsed.data;

  // Sem coluna nova no banco pra isso — a escolha (tem faixa / quer
  // entender) e o texto livre da faixa (quando houver) viram um único
  // valor legível em `budgetTier`, o mesmo campo que já existia.
  const budgetTier =
    data.faixaInvestimentoTipo === "tenho-faixa"
      ? (data.faixaInvestimentoDetalhe?.trim() || "Tenho uma faixa definida")
      : "Quero entender as possibilidades";

  const newLead: NewLead = {
    name: data.nome,
    email: data.email,
    whatsapp: data.whatsapp,
    city: data.cidade || undefined,
    destinations: data.destinos,
    experience: data.tipoExperiencia,
    travelProduct: data.travelProduct,
    month: data.mes || undefined,
    year: data.ano || undefined,
    approximateDates: data.datasAproximadas || undefined,
    duration: data.duracao,
    adults: data.adultos,
    children: data.criancas,
    childrenAges: data.idadesCriancas || undefined,
    budgetTier,
    notes: data.observacoes || undefined,
    contactPreference: data.preferenciaContato,
    acquisitionSource: data.comoConheceu || undefined,
    utmSource: attribution.utmSource,
    utmMedium: attribution.utmMedium,
    utmCampaign: attribution.utmCampaign,
    utmContent: attribution.utmContent,
    utmTerm: attribution.utmTerm,
    sourcePath: data.sourcePath ?? attribution.landingPath,
  };

  let savedLead;
  try {
    const repository = await getLeadRepository();
    savedLead = await repository.save(newLead);
  } catch (error) {
    logServerError("[leads] falha ao salvar lead:", error);
    return {
      success: false,
      error: "Não conseguimos registrar seu pedido agora. Tente novamente em instantes, ou fale com a gente pelo WhatsApp.",
    };
  }

  // Notificação por e-mail é best-effort — o lead já está salvo, uma falha
  // aqui não pode derrubar a experiência de quem preencheu o formulário.
  try {
    await getEmailNotifier().notifyNewLead(savedLead);
  } catch (error) {
    logServerError("[leads] lead salvo, mas notificação por e-mail falhou:", error);
  }

  return { success: true };
}
