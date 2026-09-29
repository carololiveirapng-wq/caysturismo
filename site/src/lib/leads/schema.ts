import { z } from "zod";
import { tripStepSchema, aboutYouStepSchema } from "@/lib/contact-schema";

/**
 * Validação real no servidor — nunca confiamos só no client. Mesmos campos
 * do formulário, mais o contexto de conversão (produto/página de origem) e
 * o honeypot (checado à parte em `actions.ts`, não faz parte do schema).
 */
export const leadSubmissionSchema = tripStepSchema.extend(aboutYouStepSchema.shape).extend({
  travelProduct: z.string().optional(),
  sourcePath: z.string().optional(),
});

export type LeadSubmission = z.infer<typeof leadSubmissionSchema>;
