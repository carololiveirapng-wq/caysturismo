"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { LEAD_STATUSES, LEAD_STATUS_LABELS, LEAD_LOST_REASONS, LEAD_LOST_REASON_LABELS, type LeadStatus, type LeadLostReason } from "@/lib/leads/types";

function toDateInputValue(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat("sv-SE", { timeZone: "America/Sao_Paulo" }).format(d);
}

function toTimeInputValue(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleTimeString("pt-BR", { timeZone: "America/Sao_Paulo", hour: "2-digit", minute: "2-digit", hour12: false });
}

/**
 * Painel de edição comercial do lead. Submete via `<form method="post">`
 * comum pro Route Handler `leads/[id]/update` — não uma Server Action.
 */
export function LeadUpdatePanel({
  leadId,
  currentStatus,
  currentInternalNotes,
  currentFollowUpAt,
  currentNextAction,
  currentPriority,
  currentLostReason,
}: {
  leadId: string;
  currentStatus: LeadStatus;
  currentInternalNotes?: string;
  currentFollowUpAt?: string;
  currentNextAction?: string;
  currentPriority: boolean;
  currentLostReason?: LeadLostReason;
}) {
  const [status, setStatus] = useState<LeadStatus>(currentStatus);
  const searchParams = useSearchParams();
  const justSaved = searchParams.get("saved") === leadId;
  const error = searchParams.get("error");

  return (
    <form method="post" action={`/admin/leads/${leadId}/update`} className="flex flex-col gap-4">
      <div>
        <label htmlFor="leadStatus" className="block text-xs font-medium tracking-wide text-stone uppercase">
          Status
        </label>
        <select
          id="leadStatus"
          name="status"
          defaultValue={currentStatus}
          onChange={(e) => setStatus(e.target.value as LeadStatus)}
          className="mt-1.5 w-full border border-ink/15 bg-ivory px-3.5 py-2.5 text-sm text-ink outline-none focus:border-magenta"
        >
          {LEAD_STATUSES.map((s) => (
            <option key={s} value={s}>
              {LEAD_STATUS_LABELS[s]}
            </option>
          ))}
        </select>
      </div>

      {status === "lost" && (
        <div>
          <label htmlFor="leadLostReason" className="block text-xs font-medium tracking-wide text-stone uppercase">
            Motivo da perda (opcional)
          </label>
          <select
            id="leadLostReason"
            name="lostReason"
            defaultValue={currentLostReason ?? ""}
            className="mt-1.5 w-full border border-ink/15 bg-ivory px-3.5 py-2.5 text-sm text-ink outline-none focus:border-magenta"
          >
            <option value="">Não informado</option>
            {LEAD_LOST_REASONS.map((r) => (
              <option key={r} value={r}>
                {LEAD_LOST_REASON_LABELS[r]}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="leadFollowUpDate" className="block text-xs font-medium tracking-wide text-stone uppercase">
            Retornar em
          </label>
          <input
            id="leadFollowUpDate"
            name="followUpDate"
            type="date"
            defaultValue={toDateInputValue(currentFollowUpAt)}
            className="mt-1.5 w-full border border-ink/15 bg-ivory px-3.5 py-2.5 text-sm text-ink outline-none focus:border-magenta"
          />
        </div>
        <div>
          <label htmlFor="leadFollowUpTime" className="block text-xs font-medium tracking-wide text-stone uppercase">
            Hora (opcional)
          </label>
          <input
            id="leadFollowUpTime"
            name="followUpTime"
            type="time"
            defaultValue={toTimeInputValue(currentFollowUpAt)}
            className="mt-1.5 w-full border border-ink/15 bg-ivory px-3.5 py-2.5 text-sm text-ink outline-none focus:border-magenta"
          />
        </div>
      </div>
      <p className="-mt-2 text-xs text-stone">Deixe a data vazia para remover o retorno marcado.</p>

      <div>
        <label htmlFor="leadNextAction" className="block text-xs font-medium tracking-wide text-stone uppercase">
          Próxima ação
        </label>
        <input
          id="leadNextAction"
          name="nextAction"
          type="text"
          maxLength={200}
          defaultValue={currentNextAction ?? ""}
          placeholder="Ex.: Enviar proposta"
          className="mt-1.5 w-full border border-ink/15 bg-ivory px-3.5 py-2.5 text-sm text-ink outline-none focus:border-magenta"
        />
      </div>

      <label className="flex items-center gap-2.5 text-sm text-ink">
        <input
          type="checkbox"
          name="priority"
          defaultChecked={currentPriority}
          className="size-4 border border-ink/30 accent-magenta-dark"
        />
        Marcar como prioritário
      </label>

      <div>
        <label htmlFor="leadInternalNotes" className="block text-xs font-medium tracking-wide text-stone uppercase">
          Observação interna
        </label>
        <textarea
          id="leadInternalNotes"
          name="internalNotes"
          rows={4}
          defaultValue={currentInternalNotes ?? ""}
          placeholder="Só a equipe Cays vê isso — não é o que o cliente escreveu."
          className="mt-1.5 w-full resize-y border border-ink/15 bg-ivory px-3.5 py-2.5 text-sm text-ink outline-none focus:border-magenta"
        />
      </div>

      {error && (
        <p role="alert" className="text-sm text-rose-600">
          {error}
        </p>
      )}
      {justSaved && !error && (
        <p role="status" className="text-sm text-emerald-700">
          Salvo.
        </p>
      )}

      <button
        type="submit"
        className="self-start bg-ink px-5 py-2.5 text-xs font-medium tracking-wide text-ivory uppercase transition-colors duration-200 hover:bg-magenta-dark"
      >
        Salvar alterações
      </button>
    </form>
  );
}
