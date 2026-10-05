"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { requireAdminUser } from "@/lib/admin/auth";
import { updateLead } from "@/lib/admin/leads-queries";
import { LEAD_STATUSES } from "@/lib/leads/types";

const schema = z.object({
  id: z.uuid(),
  status: z.enum(LEAD_STATUSES),
  internalNotes: z.string().max(4000),
  nextAction: z.string().max(200),
  priority: z.boolean(),
  followUpDate: z.string().optional(),
  followUpTime: z.string().optional(),
});

export interface UpdateLeadStatusState {
  success?: boolean;
  error?: string;
}

export async function updateLeadStatusAction(
  _prevState: UpdateLeadStatusState | undefined,
  formData: FormData,
): Promise<UpdateLeadStatusState> {
  await requireAdminUser();

  const rawFollowUpDate = formData.get("followUpDate");
  const parsed = schema.safeParse({
    id: formData.get("id"),
    status: formData.get("status"),
    internalNotes: formData.get("internalNotes") ?? "",
    nextAction: formData.get("nextAction") ?? "",
    priority: formData.get("priority") === "on",
    followUpDate: typeof rawFollowUpDate === "string" ? rawFollowUpDate : undefined,
    followUpTime: formData.get("followUpTime") || undefined,
  });

  if (!parsed.success) {
    return { error: "Não foi possível salvar — confira os dados e tente de novo." };
  }

  // Data vazia = remover o retorno (null). Data preenchida sem hora cai pra
  // 09h — "opcionalmente horário" no pedido, nunca obrigatório.
  let followUpAt: Date | null | undefined;
  if (!parsed.data.followUpDate) {
    followUpAt = null;
  } else {
    const time = parsed.data.followUpTime || "09:00";
    const candidate = new Date(`${parsed.data.followUpDate}T${time}:00-03:00`);
    followUpAt = Number.isNaN(candidate.getTime()) ? undefined : candidate;
  }

  try {
    const updated = await updateLead(parsed.data.id, {
      status: parsed.data.status,
      internalNotes: parsed.data.internalNotes,
      nextAction: parsed.data.nextAction,
      priority: parsed.data.priority,
      followUpAt,
    });
    if (!updated) {
      return { error: "Lead não encontrado." };
    }
  } catch {
    return { error: "Erro ao salvar no banco — tente novamente." };
  }

  revalidatePath(`/admin/leads/${parsed.data.id}`);
  revalidatePath("/admin/leads");
  revalidatePath("/admin");
  return { success: true };
}
