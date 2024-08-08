import { z } from 'zod';

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  connected: z.string(),
  joinedAt: z.string(),
  quittedAt: z.string().nullable(),
});

export type UserSchemaType = z.infer<typeof userSchema>;
