"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { requireAdminUser } from "@/lib/admin/auth";
import { updateLeadStatus } from "@/lib/admin/leads-queries";
import { LEAD_STATUSES } from "@/lib/leads/types";

const schema = z.object({
  id: z.uuid(),
  status: z.enum(LEAD_STATUSES),
  internalNotes: z.string().max(4000).optional(),
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

  const rawNotes = formData.get("internalNotes");
  const parsed = schema.safeParse({
    id: formData.get("id"),
    status: formData.get("status"),
    internalNotes: typeof rawNotes === "string" && rawNotes.trim() !== "" ? rawNotes : undefined,
  });

  if (!parsed.success) {
    return { error: "Não foi possível salvar — confira os dados e tente de novo." };
  }

  try {
    const updated = await updateLeadStatus(parsed.data.id, parsed.data.status, parsed.data.internalNotes);
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
