import { NextResponse, type NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAdminUser } from "@/lib/admin/auth";
import { updateLead } from "@/lib/admin/leads-queries";
import { LEAD_STATUSES, LEAD_LOST_REASONS } from "@/lib/leads/types";

/**
 * Route Handler comum (não Server Action), mesmo padrão de
 * `leads/export/route.ts` — formulário de verdade, sem estado de pending
 * do React, redireciona com `?saved=`/`?error=` pra UI ler via searchParams.
 */

const schema = z.object({
  status: z.enum(LEAD_STATUSES),
  internalNotes: z.string().max(4000),
  nextAction: z.string().max(200),
  priority: z.boolean(),
  followUpDate: z.string().optional(),
  followUpTime: z.string().optional(),
  lostReason: z.enum(LEAD_LOST_REASONS).optional(),
});

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await requireAdminUser();
  const { id } = await params;

  const formData = await request.formData();
  const rawFollowUpDate = formData.get("followUpDate");
  const rawLostReason = formData.get("lostReason");
  const parsed = schema.safeParse({
    status: formData.get("status"),
    internalNotes: formData.get("internalNotes") ?? "",
    nextAction: formData.get("nextAction") ?? "",
    priority: formData.get("priority") === "on",
    followUpDate: typeof rawFollowUpDate === "string" ? rawFollowUpDate : undefined,
    followUpTime: formData.get("followUpTime") || undefined,
    lostReason: rawLostReason ? rawLostReason : undefined,
  });

  const leadUrl = new URL(`/admin/leads/${id}`, request.url);
  if (!parsed.success) {
    leadUrl.searchParams.set("error", "Não foi possível salvar — confira os dados e tente de novo.");
    return NextResponse.redirect(leadUrl, { status: 303 });
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
    const updated = await updateLead(id, {
      status: parsed.data.status,
      internalNotes: parsed.data.internalNotes,
      nextAction: parsed.data.nextAction,
      priority: parsed.data.priority,
      // Só grava motivo quando o status final é "lost" — mudar pra qualquer
      // outro status limpa um motivo que não faz mais sentido ali.
      lostReason: parsed.data.status === "lost" ? (parsed.data.lostReason ?? "") : "",
      followUpAt,
    });
    if (!updated) {
      leadUrl.searchParams.set("error", "Lead não encontrado.");
      return NextResponse.redirect(leadUrl, { status: 303 });
    }
  } catch {
    leadUrl.searchParams.set("error", "Erro ao salvar no banco — tente novamente.");
    return NextResponse.redirect(leadUrl, { status: 303 });
  }

  revalidatePath("/admin/leads");
  revalidatePath("/admin");
  revalidatePath("/admin/pipeline");

  leadUrl.searchParams.set("saved", id);
  return NextResponse.redirect(leadUrl, { status: 303 });
}
