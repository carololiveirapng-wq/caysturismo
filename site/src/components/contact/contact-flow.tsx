"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { OptionButton } from "./option-button";
import { NumberStepper } from "./number-stepper";
import { FormField, textInputClassName } from "./form-field";
import { DestinationMultiSelect } from "./destination-multiselect";
import { ContactSidebar } from "./sidebar";
import { submitLead } from "@/app/(site)/contato/actions";
import { trackLeadGenerated } from "@/lib/analytics";
import { discoveryYears } from "@/data/travel-discovery";
import {
  contactFormSchema,
  experienceTypeOptions,
  durationOptions,
  budgetChoiceOptions,
  contactPreferenceOptions,
  referralOptions,
  defaultTripValues,
  defaultAboutYouValues,
  type TripStepValues,
  type AboutYouFormState,
  type ContactFormValues,
} from "@/lib/contact-schema";
import { cn } from "@/lib/utils";
import type { SiteSettings } from "@/lib/cms";
import type { GoogleReview } from "@/types";

const MONTHS = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

interface ContactFlowProps {
  planningLabel?: string;
  /** Confirmação discreta de qual card de estilo o visitante clicou antes de chegar aqui (?estilo=). */
  styleLabel?: string;
  initialTripValues?: Partial<TripStepValues>;
  travelProduct?: string;
  sourcePath?: string;
  settings: SiteSettings;
  destinations: { slug: string; name: string }[];
  reviews: GoogleReview[];
}

export function ContactFlow({ planningLabel, styleLabel, initialTripValues, travelProduct, sourcePath, settings, destinations, reviews }: ContactFlowProps) {
  const router = useRouter();
  const [trip, setTrip] = useState<TripStepValues>({ ...defaultTripValues, ...initialTripValues });
  const [about, setAbout] = useState<AboutYouFormState>(defaultAboutYouValues);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormValues, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");

  const setTrip1 = <K extends keyof TripStepValues>(key: K, value: TripStepValues[K]) =>
    setTrip((prev) => ({ ...prev, [key]: value }));
  const setAbout1 = <K extends keyof AboutYouFormState>(key: K, value: AboutYouFormState[K]) =>
    setAbout((prev) => ({ ...prev, [key]: value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const combined = { ...trip, ...about };
    const result = contactFormSchema.safeParse(combined);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormValues, string>> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof ContactFormValues;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      const firstErrorEl = document.querySelector("[data-field-error]");
      firstErrorEl?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setErrors({});
    setSubmitError(null);
    setSubmitting(true);

    try {
      const response = await submitLead({
        ...trip,
        ...about,
        travelProduct,
        sourcePath,
        website: honeypot,
      });

      if (!response.success) {
        setSubmitError(response.error);
        setSubmitting(false);
        return;
      }

      trackLeadGenerated({
        destination: trip.destinos[0],
        experience: trip.tipoExperiencia,
        travelProduct,
        sourcePath,
      });

      router.push("/contato/obrigado");
    } catch {
      setSubmitError("Não conseguimos enviar agora. Verifique sua conexão e tente novamente.");
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-[1240px]">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="font-serif text-3xl leading-tight text-ink md:text-4xl">
          Vamos começar a desenhar sua próxima viagem?
        </h1>
        <p className="mt-3 text-base text-stone">Conte o essencial. A partir daqui, a Cays cuida dos detalhes.</p>

        {(planningLabel || styleLabel) && (
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            {planningLabel && (
              <p className="inline-block border border-ink/10 bg-sand px-4 py-2 text-xs font-medium tracking-wide text-ink uppercase">
                {planningLabel}
              </p>
            )}
            {styleLabel && (
              <p className="inline-block border border-magenta/25 bg-magenta/5 px-4 py-2 text-xs font-medium tracking-wide text-ink uppercase">
                {styleLabel}
              </p>
            )}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="flex flex-col gap-8 lg:col-span-8">
          {/* SUA VIAGEM */}
          <section className="border border-ink/10 bg-sand/50 p-6 md:p-9">
            <h2 className="font-serif text-xl text-ink md:text-2xl">Sua viagem</h2>

            <div className="mt-7 space-y-8">
              <FormField label="Para onde você gostaria de ir?" error={errors.destinos}>
                <DestinationMultiSelect value={trip.destinos} onChange={(v) => setTrip1("destinos", v)} destinations={destinations} />
              </FormField>

              <div>
                <p className="text-xs font-medium tracking-[0.1em] text-stone uppercase">Quando gostaria de viajar?</p>
                <div className="mt-2.5 grid grid-cols-2 gap-4 sm:grid-cols-3">
                  <select
                    aria-label="Mês"
                    value={trip.mes}
                    onChange={(e) => setTrip1("mes", e.target.value)}
                    className={cn(textInputClassName, "cursor-pointer")}
                  >
                    <option value="">Mês</option>
                    {MONTHS.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                  <select
                    aria-label="Ano"
                    value={trip.ano}
                    onChange={(e) => setTrip1("ano", e.target.value)}
                    className={cn(textInputClassName, "cursor-pointer")}
                  >
                    <option value="">Ano</option>
                    {discoveryYears.map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Já tem datas? (opcional)"
                    value={trip.datasAproximadas}
                    onChange={(e) => setTrip1("datasAproximadas", e.target.value)}
                    className={cn(textInputClassName, "col-span-2 sm:col-span-1")}
                  />
                </div>
              </div>

              <FormField label="Por quanto tempo?" htmlFor="duracao" error={errors.duracao}>
                <select
                  id="duracao"
                  value={trip.duracao}
                  onChange={(e) => setTrip1("duracao", e.target.value as TripStepValues["duracao"])}
                  aria-invalid={Boolean(errors.duracao)}
                  aria-describedby={errors.duracao ? "duracao-error" : undefined}
                  className={cn(textInputClassName, "cursor-pointer")}
                >
                  {durationOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </FormField>

              <div>
                <p className="text-xs font-medium tracking-[0.1em] text-stone uppercase">Quem vai viajar?</p>
                <div className="mt-2.5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <NumberStepper label="Adultos" value={trip.adultos} onChange={(v) => setTrip1("adultos", v)} min={1} />
                  <NumberStepper label="Crianças" value={trip.criancas} onChange={(v) => setTrip1("criancas", v)} min={0} />
                </div>
                {trip.criancas > 0 && (
                  <input
                    type="text"
                    placeholder="Idades das crianças (opcional)"
                    value={trip.idadesCriancas}
                    onChange={(e) => setTrip1("idadesCriancas", e.target.value)}
                    className={cn(textInputClassName, "mt-3")}
                  />
                )}
              </div>

              <FormField label="Que tipo de viagem você imagina?" htmlFor="tipoExperiencia" error={errors.tipoExperiencia}>
                <select
                  id="tipoExperiencia"
                  value={trip.tipoExperiencia}
                  onChange={(e) => setTrip1("tipoExperiencia", e.target.value as TripStepValues["tipoExperiencia"])}
                  aria-invalid={Boolean(errors.tipoExperiencia)}
                  aria-describedby={errors.tipoExperiencia ? "tipoExperiencia-error" : undefined}
                  className={cn(textInputClassName, "cursor-pointer")}
                >
                  {experienceTypeOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </FormField>

              <FormField label="Existe uma faixa de investimento que gostaria de considerar?" error={errors.faixaInvestimentoTipo}>
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {budgetChoiceOptions.map((option) => (
                    <OptionButton
                      key={option.value}
                      label={option.label}
                      selected={trip.faixaInvestimentoTipo === option.value}
                      onClick={() => setTrip1("faixaInvestimentoTipo", option.value)}
                    />
                  ))}
                </div>
                {trip.faixaInvestimentoTipo === "tenho-faixa" && (
                  <input
                    type="text"
                    placeholder="Ex.: entre R$ 15.000 e R$ 25.000 por pessoa"
                    value={trip.faixaInvestimentoDetalhe}
                    onChange={(e) => setTrip1("faixaInvestimentoDetalhe", e.target.value)}
                    className={cn(textInputClassName, "mt-3")}
                  />
                )}
              </FormField>

              <FormField label="Algo importante que gostaria que soubéssemos?" optional>
                <textarea
                  rows={3}
                  value={trip.observacoes}
                  onChange={(e) => setTrip1("observacoes", e.target.value)}
                  placeholder="Ocasião especial, preferências, algo que não pode faltar…"
                  className="w-full resize-none border border-ink/20 bg-transparent px-3.5 py-3 text-base text-ink outline-none transition-colors duration-300 placeholder:text-stone focus:border-ink"
                />
              </FormField>
            </div>
          </section>

          {/* SEUS DADOS */}
          <section className="border border-ink/10 bg-sand/50 p-6 md:p-9">
            <h2 className="font-serif text-xl text-ink md:text-2xl">Seus dados</h2>

            <div className="mt-7 space-y-8">
              <FormField label="Nome" htmlFor="nome" error={errors.nome}>
                <input
                  id="nome"
                  type="text"
                  autoComplete="name"
                  value={about.nome}
                  onChange={(e) => setAbout1("nome", e.target.value)}
                  aria-invalid={Boolean(errors.nome)}
                  aria-describedby={errors.nome ? "nome-error" : undefined}
                  className={textInputClassName}
                />
              </FormField>

              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <FormField label="WhatsApp" htmlFor="whatsapp" error={errors.whatsapp}>
                  <input
                    id="whatsapp"
                    type="tel"
                    autoComplete="tel"
                    placeholder="(61) 99999-9999"
                    value={about.whatsapp}
                    onChange={(e) => setAbout1("whatsapp", e.target.value)}
                    aria-invalid={Boolean(errors.whatsapp)}
                    aria-describedby={errors.whatsapp ? "whatsapp-error" : undefined}
                    className={textInputClassName}
                  />
                </FormField>
                <FormField label="E-mail" htmlFor="email" error={errors.email}>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={about.email}
                    onChange={(e) => setAbout1("email", e.target.value)}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={textInputClassName}
                  />
                </FormField>
              </div>

              <FormField label="Cidade" htmlFor="cidade" optional>
                <input
                  id="cidade"
                  type="text"
                  value={about.cidade}
                  onChange={(e) => setAbout1("cidade", e.target.value)}
                  className={textInputClassName}
                />
              </FormField>

              <FormField label="Preferência de contato" error={errors.preferenciaContato}>
                <div className="grid grid-cols-2 gap-2.5 sm:w-2/3">
                  {contactPreferenceOptions.map((option) => (
                    <OptionButton
                      key={option.value}
                      label={option.label}
                      selected={about.preferenciaContato === option.value}
                      onClick={() => setAbout1("preferenciaContato", option.value)}
                    />
                  ))}
                </div>
              </FormField>

              <FormField label="Como conheceu a Cays?" htmlFor="comoConheceu" optional className="sm:w-2/3">
                <select
                  id="comoConheceu"
                  value={about.comoConheceu}
                  onChange={(e) => setAbout1("comoConheceu", e.target.value)}
                  className={cn(textInputClassName, "cursor-pointer")}
                >
                  <option value="">Prefiro não dizer</option>
                  {referralOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </FormField>

              <div>
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={about.consentimento}
                    onChange={(e) => setAbout1("consentimento", e.target.checked)}
                    className={cn("mt-0.5 size-4 shrink-0 accent-ink", errors.consentimento && "outline outline-magenta")}
                  />
                  <span className="text-sm text-stone">
                    Li a{" "}
                    <Link href="/privacidade" className="text-ink underline underline-offset-2">
                      Política de Privacidade
                    </Link>{" "}
                    e concordo com o uso dos meus dados para responder este pedido.
                  </span>
                </label>
                {errors.consentimento && <p className="mt-1.5 ml-7 text-xs text-magenta-dark">{errors.consentimento}</p>}
              </div>
            </div>
          </section>

          {/* Honeypot — invisível e fora da ordem de tabulação; só um bot preenche isto. */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label htmlFor="website">Deixe este campo em branco</label>
            <input
              id="website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>

          {submitError && (
            <p role="alert" className="border border-magenta/30 bg-magenta/5 px-4 py-3 text-sm text-magenta">{submitError}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="bg-ink px-8 py-4 text-sm font-medium tracking-wide text-ivory uppercase transition-colors duration-300 hover:bg-magenta-dark disabled:opacity-60 sm:self-start"
          >
            {submitting ? "Enviando…" : "Enviar pedido de planejamento"}
          </button>
        </div>

        <div className="lg:col-span-4">
          <ContactSidebar settings={settings} reviews={reviews} />
        </div>
      </form>
    </div>
  );
}
