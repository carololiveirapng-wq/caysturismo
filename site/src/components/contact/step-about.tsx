"use client";

import Link from "next/link";
import { OptionButton } from "./option-button";
import { FormField, textInputClassName } from "./form-field";
import { contactPreferenceOptions, referralOptions, type AboutYouFormState } from "@/lib/contact-schema";
import { cn } from "@/lib/utils";

interface StepAboutProps {
  values: AboutYouFormState;
  onChange: (values: AboutYouFormState) => void;
  errors: Partial<Record<keyof AboutYouFormState, string>>;
}

export function StepAbout({ values, onChange, errors }: StepAboutProps) {
  const set = <K extends keyof AboutYouFormState>(key: K, value: AboutYouFormState[K]) =>
    onChange({ ...values, [key]: value });

  return (
    <div className="space-y-9">
      <FormField label="Nome" htmlFor="nome" error={errors.nome}>
        <input
          id="nome"
          type="text"
          value={values.nome}
          onChange={(e) => set("nome", e.target.value)}
          className={textInputClassName}
        />
      </FormField>

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <FormField label="WhatsApp" htmlFor="whatsapp" error={errors.whatsapp}>
          <input
            id="whatsapp"
            type="tel"
            placeholder="(11) 99999-9999"
            value={values.whatsapp}
            onChange={(e) => set("whatsapp", e.target.value)}
            className={textInputClassName}
          />
        </FormField>
        <FormField label="E-mail" htmlFor="email" error={errors.email}>
          <input
            id="email"
            type="email"
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            className={textInputClassName}
          />
        </FormField>
      </div>

      <FormField label="Cidade" htmlFor="cidade" optional>
        <input
          id="cidade"
          type="text"
          value={values.cidade}
          onChange={(e) => set("cidade", e.target.value)}
          className={textInputClassName}
        />
      </FormField>

      <FormField label="Preferência de contato" error={errors.preferenciaContato}>
        <div className="grid grid-cols-3 gap-2.5">
          {contactPreferenceOptions.map((option) => (
            <OptionButton
              key={option.value}
              label={option.label}
              selected={values.preferenciaContato === option.value}
              onClick={() => set("preferenciaContato", option.value)}
            />
          ))}
        </div>
      </FormField>

      <FormField label="Como conheceu a Cays?" optional>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {referralOptions.map((option) => (
            <OptionButton
              key={option.value}
              label={option.label}
              selected={values.comoConheceu === option.value}
              onClick={() => set("comoConheceu", option.value)}
            />
          ))}
        </div>
      </FormField>

      <div>
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={values.consentimento}
            onChange={(e) => set("consentimento", e.target.checked)}
            className={cn("mt-0.5 size-4 shrink-0 accent-ink", errors.consentimento && "outline outline-magenta")}
          />
          <span className="text-sm text-stone">
            Autorizo a Cays Turismo a entrar em contato comigo sobre esta solicitação, conforme a{" "}
            <Link href="/privacidade" className="text-ink underline underline-offset-2">
              Política de Privacidade
            </Link>
            .
          </span>
        </label>
        {errors.consentimento && <p className="mt-1.5 ml-7 text-xs text-magenta">{errors.consentimento}</p>}
      </div>
    </div>
  );
}
