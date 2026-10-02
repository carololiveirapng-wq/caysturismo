"use client";

import { useActionState } from "react";
import { updateLeadStatusAction, type UpdateLeadStatusState } from "@/app/admin/(shell)/leads/actions";
import { LEAD_STATUSES, LEAD_STATUS_LABELS, type LeadStatus } from "@/lib/leads/types";

const initialState: UpdateLeadStatusState = {};

export function LeadStatusForm({
  leadId,
  currentStatus,
  currentInternalNotes,
}: {
  leadId: string;
  currentStatus: LeadStatus;
  currentInternalNotes?: string;
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
