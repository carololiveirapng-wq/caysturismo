"use client";

import { OptionButton } from "./option-button";
import { NumberStepper } from "./number-stepper";
import { FormField, textInputClassName } from "./form-field";
import { azDestinations } from "@/data/destinations-hub";
import { discoveryYears } from "@/data/travel-discovery";
import { experienceTypeOptions, durationOptions, budgetOptions, type TripStepValues } from "@/lib/contact-schema";
import { cn } from "@/lib/utils";

const MONTHS = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

interface StepTripProps {
  values: TripStepValues;
  onChange: (values: TripStepValues) => void;
  errors: Partial<Record<keyof TripStepValues, string>>;
}

export function StepTrip({ values, onChange, errors }: StepTripProps) {
  const set = <K extends keyof TripStepValues>(key: K, value: TripStepValues[K]) =>
    onChange({ ...values, [key]: value });

  const toggleDestino = (slug: string) => {
    if (slug === "nao-sei") {
      set("destinos", values.destinos.includes("nao-sei") ? [] : ["nao-sei"]);
      return;
    }
    const withoutNaoSei = values.destinos.filter((d) => d !== "nao-sei");
    set(
      "destinos",
      withoutNaoSei.includes(slug) ? withoutNaoSei.filter((d) => d !== slug) : [...withoutNaoSei, slug],
    );
  };

  return (
    <div className="space-y-9">
      <FormField label="Destino" error={errors.destinos}>
        <div className="flex flex-wrap gap-2.5">
          <OptionButton
            label="Ainda não sei"
            selected={values.destinos.includes("nao-sei")}
            onClick={() => toggleDestino("nao-sei")}
          />
          {azDestinations.map((d) => (
            <OptionButton
              key={d.slug}
              label={d.name}
              selected={values.destinos.includes(d.slug)}
              onClick={() => toggleDestino(d.slug)}
            />
          ))}
        </div>
      </FormField>

      <FormField label="Tipo de experiência" error={errors.tipoExperiencia}>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {experienceTypeOptions.map((option) => (
            <OptionButton
              key={option.value}
              label={option.label}
              selected={values.tipoExperiencia === option.value}
              onClick={() => set("tipoExperiencia", option.value)}
            />
          ))}
        </div>
      </FormField>

      <div>
        <p className="text-xs font-medium tracking-[0.1em] text-stone uppercase">Quando pretende viajar?</p>
        <div className="mt-2.5 grid grid-cols-2 gap-4 sm:grid-cols-3">
          <select
            aria-label="Mês"
            value={values.mes}
            onChange={(e) => set("mes", e.target.value)}
            className={cn(textInputClassName, "cursor-pointer")}
          >
            <option value="">Mês</option>
            {MONTHS.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <select
            aria-label="Ano"
            value={values.ano}
            onChange={(e) => set("ano", e.target.value)}
            className={cn(textInputClassName, "cursor-pointer")}
          >
            <option value="">Ano</option>
            {discoveryYears.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Datas aproximadas (opcional)"
            value={values.datasAproximadas}
            onChange={(e) => set("datasAproximadas", e.target.value)}
            className={cn(textInputClassName, "col-span-2 sm:col-span-1")}
          />
        </div>
      </div>

      <FormField label="Duração estimada" error={errors.duracao}>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {durationOptions.map((option) => (
            <OptionButton
              key={option.value}
              label={option.label}
              selected={values.duracao === option.value}
              onClick={() => set("duracao", option.value)}
            />
          ))}
        </div>
      </FormField>

      <div>
        <p className="text-xs font-medium tracking-[0.1em] text-stone uppercase">Quem vai viajar?</p>
        <div className="mt-2.5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <NumberStepper label="Adultos" value={values.adultos} onChange={(v) => set("adultos", v)} min={1} />
          <NumberStepper label="Crianças" value={values.criancas} onChange={(v) => set("criancas", v)} min={0} />
        </div>
        {values.criancas > 0 && (
          <input
            type="text"
            placeholder="Idades das crianças (opcional)"
            value={values.idadesCriancas}
            onChange={(e) => set("idadesCriancas", e.target.value)}
            className={cn(textInputClassName, "mt-3")}
          />
        )}
      </div>

      <FormField label="Faixa de investimento por pessoa" error={errors.faixaInvestimento}>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {budgetOptions.map((option) => (
            <OptionButton
              key={option.value}
              label={option.label}
              selected={values.faixaInvestimento === option.value}
              onClick={() => set("faixaInvestimento", option.value)}
            />
          ))}
        </div>
      </FormField>

      <FormField label="Observações" optional>
        <textarea
          rows={3}
          value={values.observacoes}
          onChange={(e) => set("observacoes", e.target.value)}
          placeholder="Algo mais que a gente deveria saber?"
          className="w-full resize-none border border-ink/20 bg-transparent px-3.5 py-3 text-base text-ink outline-none transition-colors duration-300 placeholder:text-stone/50 focus:border-ink"
        />
      </FormField>
    </div>
  );
}
