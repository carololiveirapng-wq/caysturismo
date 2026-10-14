"use client";

import { useActionState, useEffect, useState } from "react";
import { deleteLeadAction, type DeleteLeadState } from "@/app/(site)/admin/(shell)/leads/actions";

const initialState: DeleteLeadState = {};

/**
 * Zona de perigo do detalhe do lead — nunca na listagem, de propósito (a
 * instrução explícita era "não colocar lixeira chamativa na listagem
 * principal"). Dois cliques no mínimo pra excluir: abrir o modal, depois
 * confirmar dentro dele — evita exclusão acidental com 1 clique.
 */
export function DeleteLeadDialog({ leadId, leadName }: { leadId: string; leadName: string }) {
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState(deleteLeadAction, initialState);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="border border-rose-300 bg-rose-50 px-4 py-2.5 text-xs font-medium tracking-wide text-rose-700 uppercase transition-colors duration-200 hover:border-rose-400 hover:bg-rose-100"
      >
        Excluir lead
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Fechar"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-ink/40"
          />
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-lead-title"
            aria-describedby="delete-lead-desc"
            className="relative w-full max-w-sm border border-ink/10 bg-ivory p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.4)]"
          >
            <h2 id="delete-lead-title" className="font-serif text-lg text-ink">
              Excluir {leadName}?
            </h2>
            <p id="delete-lead-desc" className="mt-2 text-sm text-stone">
              Esta ação não pode ser desfeita pela interface. O lead deixa de aparecer em qualquer lugar do
              painel — dashboard, pipeline, retornos, relatórios e exportações.
            </p>

            {state?.error && (
              <p role="alert" className="mt-3 text-sm text-rose-700">
                {state.error}
              </p>
            )}

            <form action={formAction} className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <input type="hidden" name="id" value={leadId} />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="border border-ink/15 bg-ivory px-4 py-2.5 text-xs font-medium tracking-wide text-ink uppercase transition-colors duration-200 hover:border-ink/30"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={pending}
                className="bg-rose-700 px-4 py-2.5 text-xs font-medium tracking-wide text-ivory uppercase transition-colors duration-200 hover:bg-rose-800 disabled:opacity-60"
              >
                {pending ? "Excluindo…" : "Sim, excluir lead"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
