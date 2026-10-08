"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminUser } from "@/lib/admin/auth";
import { deleteLead, findDuplicateLead, createLeadManual } from "@/lib/admin/leads-queries";
import { getDestinationSlugs } from "@/lib/cms";
import { MANUAL_LEAD_ORIGINS, LEAD_STATUS_LABELS } from "@/lib/leads/types";

/**
 * A edição comercial do lead (status, retorno, próxima ação, prioridade,
 * observação interna) é um Route Handler comum em `leads/[id]/update/
 * route.ts`, não uma Server Action — mesmo padrão já usado em
 * `leads/export/route.ts`. Delete e a criação manual (abaixo) continuam
 * Server Action normalmente.
 */

const deleteSchema = z.object({ id: z.uuid() });

export interface DeleteLeadState {
  error?: string;
}

/**
 * Soft delete — nunca físico. Dupla confirmação já acontece na UI (botão na
 * zona de perigo do detalhe + modal de confirmação); aqui só valida e
 * redireciona pra lista ao concluir, já que a página do lead deixa de
 * existir (toda leitura filtra `deleted_at IS NULL`).
 */
export async function deleteLeadAction(_prevState: DeleteLeadState | undefined, formData: FormData): Promise<DeleteLeadState> {
  await requireAdminUser();

  const parsed = deleteSchema.safeParse({ id: formData.get("id") });
  if (!parsed.success) {
    return { error: "Lead inválido." };
  }

  let ok: boolean;
  try {
    ok = await deleteLead(parsed.data.id);
  } catch {
    return { error: "Erro ao excluir — tente novamente." };
  }

  if (!ok) {
    return { error: "Lead não encontrado ou já excluído." };
  }

  revalidatePath("/admin/leads");
  revalidatePath("/admin");
  revalidatePath("/admin/pipeline");
  revalidatePath("/admin/retornos");
  redirect("/admin/leads");
}

const createSchema = z.object({
  name: z.string().trim().min(2, "Informe o nome."),
  whatsapp: z.string().trim().min(8, "Digite um WhatsApp válido, com DDD."),
  email: z.union([z.literal(""), z.email("E-mail inválido.")]).optional(),
  city: z.string().trim().optional(),
  destination: z.string().trim().optional(),
  acquisitionSource: z.enum(MANUAL_LEAD_ORIGINS, { error: "Selecione a origem." }),
  internalNotes: z.string().max(4000).optional(),
  nextAction: z.string().max(200).optional(),
  followUpDate: z.string().optional(),
  followUpTime: z.string().optional(),
  priority: z.boolean(),
  confirmDuplicate: z.boolean(),
});

export interface CreateLeadFormValues {
  name: string;
  whatsapp: string;
  email: string;
  city: string;
  destination: string;
  acquisitionSource: string;
  internalNotes: string;
  nextAction: string;
  followUpDate: string;
  followUpTime: string;
  priority: boolean;
}

export interface CreateLeadState {
  error?: string;
  duplicate?: { id: string; name: string; statusLabel: string };
  /**
   * Eco dos valores enviados — necessário porque o React reseta os campos
   * não controlados do form depois que a action resolve sem redirecionar
   * (mesmo comportamento de um `<form>` nativo após o POST). Sem isso, o
   * aviso de duplicata ou um erro de validação aparecia com o formulário
   * em branco, obrigando a digitar tudo de novo.
   */
  values?: CreateLeadFormValues;
}

function readFormValues(formData: FormData): CreateLeadFormValues {
  return {
    name: String(formData.get("name") ?? ""),
    whatsapp: String(formData.get("whatsapp") ?? ""),
    email: String(formData.get("email") ?? ""),
    city: String(formData.get("city") ?? ""),
    destination: String(formData.get("destination") ?? ""),
    acquisitionSource: String(formData.get("acquisitionSource") ?? ""),
    internalNotes: String(formData.get("internalNotes") ?? ""),
    nextAction: String(formData.get("nextAction") ?? ""),
    followUpDate: String(formData.get("followUpDate") ?? ""),
    followUpTime: String(formData.get("followUpTime") ?? ""),
    priority: formData.get("priority") === "on",
  };
}

/**
 * Cria lead manualmente (WhatsApp, Instagram, indicação, ligação,
 * presencial...), pro caso que não passa pelo formulário público. Mesmo
 * modelo de dado, status inicial "new", evento "created" na timeline —
 * nada de integração externa ou lógica de crédito, só o registro.
 *
 * Checa duplicata (mesmo WhatsApp ou e-mail) antes de criar: se achar e o
 * admin não confirmou "criar mesmo assim", devolve o achado sem criar nada
 * — o form permanece preenchido (ver `values` acima), nenhuma navegação
 * acontece nesse caso.
 */
export async function createLeadAction(_prevState: CreateLeadState | undefined, formData: FormData): Promise<CreateLeadState> {
  await requireAdminUser();

  const values = readFormValues(formData);

  const parsed = createSchema.safeParse({
    name: formData.get("name"),
    whatsapp: formData.get("whatsapp"),
    email: formData.get("email") ?? "",
    city: formData.get("city") ?? "",
    destination: formData.get("destination") ?? "",
    acquisitionSource: formData.get("acquisitionSource"),
    internalNotes: formData.get("internalNotes") ?? "",
    nextAction: formData.get("nextAction") ?? "",
    followUpDate: formData.get("followUpDate") || undefined,
    followUpTime: formData.get("followUpTime") || undefined,
    priority: formData.get("priority") === "on",
    confirmDuplicate: formData.get("confirmDuplicate") === "1",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Não foi possível criar — confira os dados e tente de novo.", values };
  }

  const data = parsed.data;

  if (data.destination) {
    const validSlugs = await getDestinationSlugs();
    if (!validSlugs.includes(data.destination)) data.destination = undefined;
  }

  if (!data.confirmDuplicate) {
    const duplicate = await findDuplicateLead({ whatsapp: data.whatsapp, email: data.email || undefined });
    if (duplicate) {
      return { duplicate: { id: duplicate.id, name: duplicate.name, statusLabel: LEAD_STATUS_LABELS[duplicate.status] }, values };
    }
  }

  let followUpAt: Date | null | undefined;
  if (!data.followUpDate) {
    followUpAt = null;
  } else {
    const time = data.followUpTime || "09:00";
    const candidate = new Date(`${data.followUpDate}T${time}:00-03:00`);
    followUpAt = Number.isNaN(candidate.getTime()) ? undefined : candidate;
  }

  let lead;
  try {
    lead = await createLeadManual({
      name: data.name,
      whatsapp: data.whatsapp,
      email: data.email || undefined,
      city: data.city || undefined,
      destination: data.destination || undefined,
      acquisitionSource: data.acquisitionSource,
      internalNotes: data.internalNotes || undefined,
      nextAction: data.nextAction || undefined,
      priority: data.priority,
      followUpAt,
    });
  } catch {
    return { error: "Erro ao criar o lead — tente novamente.", values };
  }

  revalidatePath("/admin/leads");
  revalidatePath("/admin");
  revalidatePath("/admin/pipeline");
  revalidatePath("/admin/retornos");
  redirect(`/admin/leads/${lead.id}?created=1`);
}
