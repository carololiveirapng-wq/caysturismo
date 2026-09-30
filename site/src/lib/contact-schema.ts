import { z } from "zod";

/**
 * Mesmos slugs reais de src/data/experiences/*.ts — importante pra bater
 * com /experiencias/[slug] e com o que o admin mostra como "interesse" do
 * lead (getLeadInterest resolve pelo slug). "nao-sei" é só deste
 * formulário, não corresponde a uma página.
 */
export const experienceTypeValues = [
  "lua-de-mel",
  "familia",
  "cruzeiros",
  "destination-wedding",
  "grandes-eventos",
  "gastronomia",
  "natureza-aventura",
  "safari",
  "privativas",
  "nao-sei",
] as const;

export const experienceTypeOptions: { value: (typeof experienceTypeValues)[number]; label: string }[] = [
  { value: "lua-de-mel", label: "Lua de Mel" },
  { value: "familia", label: "Viagem em Família" },
  { value: "cruzeiros", label: "Cruzeiro" },
  { value: "destination-wedding", label: "Destination Wedding" },
  { value: "grandes-eventos", label: "Grandes Eventos" },
  { value: "gastronomia", label: "Gastronomia" },
  { value: "natureza-aventura", label: "Natureza & Aventura" },
  { value: "safari", label: "Safari" },
  { value: "privativas", label: "Viagem Privativa" },
  { value: "nao-sei", label: "Ainda não sei" },
];

export const durationValues = ["5-7", "8-12", "13-20", "mais-20", "nao-sei"] as const;

export const durationOptions: { value: (typeof durationValues)[number]; label: string }[] = [
  { value: "5-7", label: "5–7 dias" },
  { value: "8-12", label: "8–12 dias" },
  { value: "13-20", label: "13–20 dias" },
  { value: "mais-20", label: "Mais de 20 dias" },
  { value: "nao-sei", label: "Ainda não sei" },
];

/**
 * Sem faixas em R$ — não há definição oficial de preço da Cays ainda, e não
 * vamos inventar uma. Guarda só a intenção (tem uma faixa em mente ou quer
 * entender as possibilidades); se tiver faixa, o texto livre de
 * `faixaInvestimentoDetalhe` é o que a pessoa efetivamente escreveu — sem
 * estrutura fixa de tiers.
 */
export const budgetChoiceValues = ["tenho-faixa", "quero-entender"] as const;

export const budgetChoiceOptions: { value: (typeof budgetChoiceValues)[number]; label: string }[] = [
  { value: "tenho-faixa", label: "Tenho uma faixa definida" },
  { value: "quero-entender", label: "Quero entender as possibilidades" },
];

export const contactPreferenceValues = ["whatsapp", "email"] as const;

export const contactPreferenceOptions: { value: (typeof contactPreferenceValues)[number]; label: string }[] = [
  { value: "whatsapp", label: "WhatsApp" },
  { value: "email", label: "E-mail" },
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
  tipoExperiencia: z.enum(experienceTypeValues, { error: "Escolha um tipo de viagem." }),
  mes: z.string().optional(),
  ano: z.string().optional(),
  datasAproximadas: z.string().optional(),
  duracao: z.enum(durationValues, { error: "Escolha uma duração." }),
  adultos: z.number().min(1, "Pelo menos 1 adulto."),
  criancas: z.number().min(0),
  idadesCriancas: z.string().optional(),
  faixaInvestimentoTipo: z.enum(budgetChoiceValues, { error: "Escolha uma opção." }),
  faixaInvestimentoDetalhe: z.string().optional(),
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
export type AboutYouValues = z.infer<typeof aboutYouStepSchema>;
export type ContactFormValues = z.infer<typeof contactFormSchema>;

/**
 * Estado do formulário — `consentimento` fica como `boolean` (começa
 * desmarcado) mesmo o schema exigindo `true`; é o `safeParse` no submit que
 * barra o envio enquanto estiver `false`.
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
  tipoExperiencia: "nao-sei",
  mes: "",
  ano: "",
  datasAproximadas: "",
  duracao: "nao-sei",
  adultos: 2,
  criancas: 0,
  idadesCriancas: "",
  faixaInvestimentoTipo: "quero-entender",
  faixaInvestimentoDetalhe: "",
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
