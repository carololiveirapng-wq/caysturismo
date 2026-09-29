"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ContactProgress } from "./progress";
import { StepTrip } from "./step-trip";
import { StepAbout } from "./step-about";
import { ContactSidebar } from "./sidebar";
import { submitLead } from "@/app/contato/actions";
import { trackLeadGenerated } from "@/lib/analytics";
import {
  tripStepSchema,
  aboutYouStepSchema,
  defaultTripValues,
  defaultAboutYouValues,
  type TripStepValues,
  type AboutYouFormState,
} from "@/lib/contact-schema";

interface ContactFlowProps {
  planningLabel?: string;
  initialTripValues?: Partial<TripStepValues>;
  travelProduct?: string;
  sourcePath?: string;
}

export function ContactFlow({ planningLabel, initialTripValues, travelProduct, sourcePath }: ContactFlowProps) {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [trip, setTrip] = useState<TripStepValues>({ ...defaultTripValues, ...initialTripValues });
  const [about, setAbout] = useState<AboutYouFormState>(defaultAboutYouValues);
  const [tripErrors, setTripErrors] = useState<Partial<Record<keyof TripStepValues, string>>>({});
  const [aboutErrors, setAboutErrors] = useState<Partial<Record<keyof AboutYouFormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");

  const goToStep2 = () => {
    const result = tripStepSchema.safeParse(trip);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof TripStepValues, string>> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof TripStepValues;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setTripErrors(fieldErrors);
      return;
    }
    setTripErrors({});
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submit = async () => {
    const result = aboutYouStepSchema.safeParse(about);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof AboutYouFormState, string>> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof AboutYouFormState;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setAboutErrors(fieldErrors);
      return;
    }
    setAboutErrors({});
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
  };

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-8">
        {planningLabel && (
          <p className="mb-8 border border-ink/10 bg-sand px-5 py-3.5 text-sm text-ink">{planningLabel}</p>
        )}

        <ContactProgress step={step} />

        <div className="mt-9">
          <h1 className="font-serif text-3xl text-ink md:text-4xl">{step === 1 ? "Sua viagem" : "Sobre você"}</h1>

          <div className="mt-8">
            {step === 1 ? (
              <StepTrip values={trip} onChange={setTrip} errors={tripErrors} />
            ) : (
              <StepAbout values={about} onChange={setAbout} errors={aboutErrors} />
            )}
          </div>

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
            <p className="mt-6 border border-magenta/30 bg-magenta/5 px-4 py-3 text-sm text-magenta">{submitError}</p>
          )}

          <div className="mt-10 flex items-center justify-between gap-4">
            {step === 2 ? (
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-sm font-medium tracking-wide text-stone transition-colors duration-300 hover:text-ink"
              >
                ← Voltar
              </button>
            ) : (
              <span />
            )}
            {step === 1 ? (
              <button
                type="button"
                onClick={goToStep2}
                className="bg-ink px-8 py-3.5 text-sm font-medium tracking-wide text-ivory uppercase transition-colors duration-300 hover:bg-magenta"
              >
                Continuar
              </button>
            ) : (
              <button
                type="button"
                onClick={submit}
                disabled={submitting}
                className="bg-ink px-8 py-3.5 text-sm font-medium tracking-wide text-ivory uppercase transition-colors duration-300 hover:bg-magenta disabled:opacity-60"
              >
                {submitting ? "Enviando..." : "Enviar"}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="lg:col-span-4">
        <ContactSidebar />
      </div>
    </div>
  );
}
