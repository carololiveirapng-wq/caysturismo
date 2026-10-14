"use client";

import Link from "next/link";
import { useActionState, useRef } from "react";
import { createLeadAction, type CreateLeadState } from "@/app/admin/(shell)/leads/actions";
import { MANUAL_LEAD_ORIGINS } from "@/lib/leads/types";

const initialState: CreateLeadState = {};

const fieldClass = "mt-1.5 w-full border border-ink/15 bg-ivory px-3.5 py-2.5 text-sm text-ink outline-none focus:border-magenta";
const labelClass = "block text-xs font-medium tracking-wide text-stone uppercase";

export function NewLeadForm({ destinations }: { destinations: { slug: string; name: string }[] }) {
  const [state, formAction, pending] = useActionState(createLeadAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const v = state?.values;

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-5">
      {state?.duplicate && (
        <div role="alert" className="border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
          <p>
            Já existe um lead com esse WhatsApp ou e-mail: <strong>{state.duplicate.name}</strong> ({state.duplicate.statusLabel}).
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            <Link
              href={`/admin/leads/${state.duplicate.id}`}
              className="border border-amber-400 bg-ivory px-4 py-2 text-xs font-medium tracking-wide text-amber-900 uppercase hover:border-amber-500"
            >
              Abrir lead existente
            </Link>
            <button
              type="button"
              disabled={pending}
              onClick={() => {
                // Dispara a Server Action direto com um FormData montado na
                // hora (em vez de reenviar o form nativo), setando
                // `confirmDuplicate` explicitamente antes de chamar.
                if (!formRef.current) return;
                const data = new FormData(formRef.current);
                data.set("confirmDuplicate", "1");
                formAction(data);
              }}
              className="border border-amber-400 bg-amber-100 px-4 py-2 text-xs font-medium tracking-wide text-amber-900 uppercase hover:bg-amber-200 disabled:opacity-60"
            >
              Criar mesmo assim
            </button>
          </div>
        </div>
      )}

      {state?.error && (
        <p role="alert" className="text-sm text-rose-600">
          {state.error}
        </p>
      )}

      {/*
        `key` força remontagem desse bloco sempre que a action resolve.
        Necessário porque o React reseta os campos não controlados do form
        depois que uma action roda sem redirecionar (mesmo comportamento de
        um <form> nativo pós-POST) — sem isso, o aviso de duplicata ou um
        erro de validação aparecia com o formulário em branco, obrigando a
        digitar tudo de novo pra decidir "criar mesmo assim".
      */}
      <div key={JSON.stringify(state ?? {})} className="contents">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className={labelClass}>
              Nome
            </label>
            <input id="name" name="name" type="text" required maxLength={120} defaultValue={v?.name ?? ""} className={fieldClass} />
          </div>
          <div>
            <label htmlFor="whatsapp" className={labelClass}>
              WhatsApp / telefone
            </label>
            <input
              id="whatsapp"
              name="whatsapp"
              type="text"
              required
              maxLength={30}
              placeholder="(61) 99999-9999"
              defaultValue={v?.whatsapp ?? ""}
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="email" className={labelClass}>
              E-mail (opcional)
            </label>
            <input id="email" name="email" type="email" maxLength={160} defaultValue={v?.email ?? ""} className={fieldClass} />
          </div>
          <div>
            <label htmlFor="city" className={labelClass}>
              Cidade (opcional)
            </label>
            <input id="city" name="city" type="text" maxLength={120} defaultValue={v?.city ?? ""} className={fieldClass} />
          </div>
          <div>
            <label htmlFor="destination" className={labelClass}>
              Destino / interesse (opcional)
            </label>
            <select id="destination" name="destination" defaultValue={v?.destination ?? ""} className={fieldClass}>
              <option value="">Não informado</option>
              {destinations.map((d) => (
                <option key={d.slug} value={d.slug}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="acquisitionSource" className={labelClass}>
              Origem
            </label>
            <select id="acquisitionSource" name="acquisitionSource" required defaultValue={v?.acquisitionSource ?? ""} className={fieldClass}>
              <option value="" disabled>
                Selecione
              </option>
              {MANUAL_LEAD_ORIGINS.map((origin) => (
                <option key={origin} value={origin}>
                  {origin}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="nextAction" className={labelClass}>
              Próxima ação (opcional)
            </label>
            <input
              id="nextAction"
              name="nextAction"
              type="text"
              maxLength={200}
              placeholder="Ex.: Ligar amanhã de manhã"
              defaultValue={v?.nextAction ?? ""}
              className={fieldClass}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="followUpDate" className={labelClass}>
                Retornar em (opcional)
              </label>
              <input id="followUpDate" name="followUpDate" type="date" defaultValue={v?.followUpDate ?? ""} className={fieldClass} />
            </div>
            <div>
              <label htmlFor="followUpTime" className={labelClass}>
                Hora (opcional)
              </label>
              <input id="followUpTime" name="followUpTime" type="time" defaultValue={v?.followUpTime ?? ""} className={fieldClass} />
            </div>
          </div>
        </div>

        <div className="mt-5">
          <label htmlFor="internalNotes" className={labelClass}>
            Observação interna (opcional)
          </label>
          <textarea
            id="internalNotes"
            name="internalNotes"
            rows={3}
            maxLength={4000}
            placeholder="Como o lead chegou, contexto da conversa..."
            defaultValue={v?.internalNotes ?? ""}
            className={`${fieldClass} resize-y`}
          />
        </div>

        <label className="mt-5 flex items-center gap-2.5 text-sm text-ink">
          <input type="checkbox" name="priority" defaultChecked={v?.priority ?? false} className="size-4 border border-ink/30 accent-magenta-dark" />
          Marcar como prioritário
        </label>
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-ink/10 pt-5 sm:flex-row sm:justify-end">
        <Link
          href="/admin/leads"
          className="border border-ink/15 bg-ivory px-5 py-2.5 text-center text-xs font-medium tracking-wide text-ink uppercase transition-colors duration-200 hover:border-ink/30"
        >
          Cancelar
        </Link>
        <button
          type="submit"
          disabled={pending}
          className="bg-ink px-5 py-2.5 text-xs font-medium tracking-wide text-ivory uppercase transition-colors duration-200 hover:bg-magenta-dark disabled:opacity-60"
        >
          {pending ? "Criando…" : "Criar lead"}
        </button>
      </div>
    </form>
  );
}
