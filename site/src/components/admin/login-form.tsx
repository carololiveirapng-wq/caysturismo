"use client";

import { useActionState } from "react";
import { signInAction, type SignInState } from "@/app/admin/login/actions";

const initialState: SignInState = {};

export function LoginForm({ next }: { next: string }) {
  const [state, formAction, pending] = useActionState(signInAction, initialState);

  return (
    <form action={formAction} className="mt-8 flex flex-col gap-4">
      <input type="hidden" name="next" value={next} />

      <div>
        <label htmlFor="email" className="block text-xs font-medium tracking-wide text-ivory/70 uppercase">
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="username"
          className="mt-1.5 w-full border border-ivory/20 bg-transparent px-3.5 py-2.5 text-sm text-ivory outline-none transition-colors duration-300 focus:border-magenta"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-xs font-medium tracking-wide text-ivory/70 uppercase">
          Senha
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="mt-1.5 w-full border border-ivory/20 bg-transparent px-3.5 py-2.5 text-sm text-ivory outline-none transition-colors duration-300 focus:border-magenta"
        />
      </div>

      {state?.error && <p className="text-sm text-rose-400">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="mt-2 bg-ivory px-5 py-3 text-sm font-medium tracking-wide text-ink uppercase transition-colors duration-300 hover:bg-magenta hover:text-ivory disabled:opacity-60"
      >
        {pending ? "Entrando…" : "Entrar"}
      </button>
    </form>
  );
}
