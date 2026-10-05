"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { requireAdminUser } from "@/lib/admin/auth";
import { updateLead } from "@/lib/admin/leads-queries";
import { LEAD_STATUSES } from "@/lib/leads/types";

const schema = z.object({
  id: z.uuid(),
  status: z.enum(LEAD_STATUSES),
});

export interface MoveLeadStatusState {
  success?: boolean;
  error?: string;
}

export async function moveLeadStatusAction(_prevState: MoveLeadStatusState | undefined, formData: FormData): Promise<MoveLeadStatusState> {
  await requireAdminUser();

  const parsed = schema.safeParse({ id: formData.get("id"), status: formData.get("status") });
  if (!parsed.success) return { error: "Não foi possível mover o lead — tente de novo." };

  try {
    const updated = await updateLead(parsed.data.id, { status: parsed.data.status });
    if (!updated) return { error: "Lead não encontrado." };
  } catch {
    return { error: "Erro ao salvar no banco — tente novamente." };
  }

  revalidatePath("/admin/pipeline");
  revalidatePath("/admin/leads");
  revalidatePath("/admin");
  revalidatePath(`/admin/leads/${parsed.data.id}`);
  return { success: true };
}
