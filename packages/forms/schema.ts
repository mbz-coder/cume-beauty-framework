import { z } from "zod";
import { PROCEDIMENTOS } from "@forms/procedimentos";

export const leadFormSchema = z.object({
  nome: z.string().trim().min(2, "Digite seu nome completo"),
  telefone: z
    .string()
    .trim()
    .min(10, "Digite um WhatsApp válido com DDD")
    .regex(/^[\d\s()+-]+$/, "Use apenas números, espaços e ( ) + -"),
  procedimento: z.enum(PROCEDIMENTOS, {
    error: "Escolha um procedimento",
  }),
});

export type LeadFormValues = z.infer<typeof leadFormSchema>;
