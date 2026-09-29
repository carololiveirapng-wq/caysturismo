import { z } from "zod";

export const experienceTypeValues = [
  "lua-de-mel",
  "familia",
  "cruzeiro",
  "destination-wedding",
  "evento",
  "outra",
] as const;

export const experienceTypeOptions: { value: (typeof experienceTypeValues)[number]; label: string }[] = [
  { value: "lua-de-mel", label: "Lua de Mel" },
  { value: "familia", label: "Família" },
  { value: "cruzeiro", label: "Cruzeiro" },
  { value: "destination-wedding", label: "Destination Wedding" },
  { value: "evento", label: "Evento" },
  { value: "outra", label: "Outra" },
];

export const durationValues = ["5-7", "8-12", "13-20", "mais-20"] as const;

export const durationOptions: { value: (typeof durationValues)[number]; label: string }[] = [
  { value: "5-7", label: "5–7 dias" },
  { value: "8-12", label: "8–12 dias" },
  { value: "13-20", label: "13–20 dias" },
  { value: "mais-20", label: "Mais de 20 dias" },
];

/**
 * Faixas qualitativas, não valores em R$ — não há definição de preço fechada
 * ainda, e não vamos inventar uma. // TODO: painel pode reconfigurar os
 * rótulos/limites reais de cada faixa quando isso existir.
 */
export const budgetValues = ["essencial", "conforto", "premium", "ultra-premium", "conversar"] as const;

export const budgetOptions: { value: (typeof budgetValues)[number]; label: string }[] = [
  { value: "essencial", label: "Essencial" },
  { value: "conforto", label: "Conforto" },
  { value: "premium", label: "Premium" },
  { value: "ultra-premium", label: "Ultra premium" },
  { value: "conversar", label: "Prefiro conversar sobre isso" },
];

export const contactPreferenceValues = ["whatsapp", "email", "telefone"] as const;

export const contactPreferenceOptions: { value: (typeof contactPreferenceValues)[number]; label: string }[] = [
  { value: "whatsapp", label: "WhatsApp" },
  { value: "email", label: "E-mail" },
  { value: "telefone", label: "Telefone" },
];

export const referralValues = ["instagram", "google", "indicacao", "outro"] as const;

export const referralOptions: { value: (typeof referralValues)[number]; label: string }[] = [
  { value: "instagram", label: "Instagram" },
  { value: "google", label: "Busca no Google" },
  { value: "indicacao", label: "Indicação" },
  { value: "outro", label: "Outro" },
];

export const tripStepSchema = z.object({
  destinos: z.array(z.string()).min(1, "Escolha ao menos um destino, ou \"Ainda não sei\"."),
  tipoExperiencia: z.enum(experienceTypeValues, { error: "Escolha um tipo de experiência." }),
  mes: z.string().optional(),
  ano: z.string().optional(),
  datasAproximadas: z.string().optional(),
  duracao: z.enum(durationValues, { error: "Escolha uma duração." }),
  adultos: z.number().min(1, "Pelo menos 1 adulto."),
  criancas: z.number().min(0),
  idadesCriancas: z.string().optional(),
  faixaInvestimento: z.enum(budgetValues, { error: "Escolha uma faixa." }),
  observacoes: z.string().optional(),
});

export const aboutYouStepSchema = z.object({
  nome: z.string().min(2, "Digite seu nome."),
  whatsapp: z.string().min(8, "Digite um WhatsApp válido, com DDD."),
  email: z.email("Digite um e-mail válido."),
  cidade: z.string().optional(),
  preferenciaContato: z.enum(contactPreferenceValues, { error: "Escolha uma preferência de contato." }),
  comoConheceu: z.string().optional(),
  consentimento: z.literal(true, { error: "É necessário aceitar para continuar." }),
});

export const contactFormSchema = tripStepSchema.extend(aboutYouStepSchema.shape);

export type TripStepValues = z.infer<typeof tripStepSchema>;
export type ContactFormValues = z.infer<typeof contactFormSchema>;

/**
 * Estado do formulário na etapa 2 — `consentimento` fica como `boolean`
 * (começa desmarcado) mesmo o schema de validação exigindo `true`; é o
 * `safeParse` no submit que barra o avanço enquanto estiver `false`.
 */
export interface AboutYouFormState {
  nome: string;
  whatsapp: string;
  email: string;
  cidade: string;
  preferenciaContato: (typeof contactPreferenceValues)[number];
  comoConheceu: string;
  consentimento: boolean;
}

export const defaultTripValues: TripStepValues = {
  destinos: [],
  tipoExperiencia: "outra",
  mes: "",
  ano: "",
  datasAproximadas: "",
  duracao: "8-12",
  adultos: 2,
  criancas: 0,
  idadesCriancas: "",
  faixaInvestimento: "conversar",
  observacoes: "",
};

export const defaultAboutYouValues: AboutYouFormState = {
  nome: "",
  whatsapp: "",
  email: "",
  cidade: "",
  preferenciaContato: "whatsapp",
  comoConheceu: "",
  consentimento: false,
};
