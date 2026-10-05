"use client";

import { useActionState } from "react";
import { updateLeadStatusAction, type UpdateLeadStatusState } from "@/app/admin/(shell)/leads/actions";
import { LEAD_STATUSES, LEAD_STATUS_LABELS, type LeadStatus } from "@/lib/leads/types";

const initialState: UpdateLeadStatusState = {};

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

export function LeadStatusForm({
  leadId,
  currentStatus,
  currentInternalNotes,
  currentFollowUpAt,
  currentNextAction,
  currentPriority,
}: {
  leadId: string;
  currentStatus: LeadStatus;
  currentInternalNotes?: string;
  currentFollowUpAt?: string;
  currentNextAction?: string;
  currentPriority: boolean;
}) {
  const [state, formAction, pending] = useActionState(updateLeadStatusAction, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="id" value={leadId} />

      <div>
        <label htmlFor="status" className="block text-xs font-medium tracking-wide text-stone uppercase">
          Status
        </label>
        <select
          id="status"
          name="status"
          defaultValue={currentStatus}
          className="mt-1.5 w-full border border-ink/15 bg-ivory px-3.5 py-2.5 text-sm text-ink outline-none focus:border-magenta"
        >
          {LEAD_STATUSES.map((s) => (
            <option key={s} value={s}>
              {LEAD_STATUS_LABELS[s]}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="followUpDate" className="block text-xs font-medium tracking-wide text-stone uppercase">
            Retornar em
          </label>
          <input
            id="followUpDate"
            name="followUpDate"
            type="date"
            defaultValue={toDateInputValue(currentFollowUpAt)}
            className="mt-1.5 w-full border border-ink/15 bg-ivory px-3.5 py-2.5 text-sm text-ink outline-none focus:border-magenta"
          />
        </div>
        <div>
          <label htmlFor="followUpTime" className="block text-xs font-medium tracking-wide text-stone uppercase">
            Hora (opcional)
          </label>
          <input
            id="followUpTime"
            name="followUpTime"
            type="time"
            defaultValue={toTimeInputValue(currentFollowUpAt)}
            className="mt-1.5 w-full border border-ink/15 bg-ivory px-3.5 py-2.5 text-sm text-ink outline-none focus:border-magenta"
          />
        </div>
      </div>
      <p className="-mt-2 text-xs text-stone/85">Deixe a data vazia para remover o retorno marcado.</p>

      <div>
        <label htmlFor="nextAction" className="block text-xs font-medium tracking-wide text-stone uppercase">
          Próxima ação
        </label>
        <input
          id="nextAction"
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
        <label htmlFor="internalNotes" className="block text-xs font-medium tracking-wide text-stone uppercase">
          Observação interna
        </label>
        <textarea
          id="internalNotes"
          name="internalNotes"
          rows={4}
          defaultValue={currentInternalNotes ?? ""}
          placeholder="Só a equipe Cays vê isso — não é o que o cliente escreveu."
          className="mt-1.5 w-full resize-y border border-ink/15 bg-ivory px-3.5 py-2.5 text-sm text-ink outline-none focus:border-magenta"
        />
      </div>

      {state?.error && <p className="text-sm text-rose-600">{state.error}</p>}
      {state?.success && <p className="text-sm text-emerald-700">Salvo.</p>}

      <button
        type="submit"
        disabled={pending}
        className="self-start bg-ink px-5 py-2.5 text-xs font-medium tracking-wide text-ivory uppercase transition-colors duration-200 hover:bg-magenta-dark disabled:opacity-60"
      >
        {pending ? "Salvando…" : "Salvar alterações"}
      </button>
    </form>
  );
}
