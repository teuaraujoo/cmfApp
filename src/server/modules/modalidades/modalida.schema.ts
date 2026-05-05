import { z } from "zod";

export const createModalidadeSchema = z.object({
  tipo: z.string().min(4, "O nome deve ter pelo menos 4 caracteres."),
});

export type CreateModalidadeBody = z.infer<typeof createModalidadeSchema>;