"use client";

import { useActionState } from "react";
import { moveLeadStatusAction, type MoveLeadStatusState } from "@/app/(site)/admin/(shell)/pipeline/actions";
import { LEAD_STATUSES, LEAD_STATUS_LABELS, type LeadStatus } from "@/lib/leads/types";

export function LeadMoveStatusForm({ leadId, currentStatus }: { leadId: string; currentStatus: LeadStatus }) {
  const [state, formAction, pending] = useActionState<MoveLeadStatusState | undefined, FormData>(
    moveLeadStatusAction,
    undefined,
  );

  return (
    <form action={formAction} className="mt-3 flex flex-col gap-2 border-t border-ink/10 pt-3">
      <input type="hidden" name="id" value={leadId} />
      <label htmlFor={`move-${leadId}`} className="text-[0.65rem] font-medium tracking-wide text-stone uppercase">
        Mover para
      </label>
      <div className="flex gap-2">
        <select
          id={`move-${leadId}`}
          name="status"
          defaultValue={currentStatus}
          disabled={pending}
          className="min-w-0 flex-1 border border-ink/15 bg-ivory px-2 py-1.5 text-xs text-ink outline-none focus:border-magenta"
        >
          {LEAD_STATUSES.map((s) => (
            <option key={s} value={s}>
              {LEAD_STATUS_LABELS[s]}
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={pending}
          className="bg-ink px-3 py-1.5 text-[0.65rem] font-medium tracking-wide text-ivory uppercase transition-colors duration-200 hover:bg-magenta-dark disabled:opacity-60"
        >
          {pending ? "Salvando…" : "Mover"}
        </button>
      </div>
      {state?.error && (
        <p role="alert" className="text-xs text-magenta-dark">
          {state.error}
        </p>
      )}
      {state?.success && (
        <p role="status" className="text-xs text-stone">
          Status atualizado.
        </p>
      )}
    </form>
  );
}
