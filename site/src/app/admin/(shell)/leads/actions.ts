"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminUser } from "@/lib/admin/auth";
import { deleteLead } from "@/lib/admin/leads-queries";

/**
 * A edição comercial do lead (status, retorno, próxima ação, prioridade,
 * observação interna) é um Route Handler comum em `leads/[id]/update/
 * route.ts`, não uma Server Action — mesmo padrão já usado em
 * `leads/export/route.ts`. Só o delete (abaixo) continua Server Action.
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
