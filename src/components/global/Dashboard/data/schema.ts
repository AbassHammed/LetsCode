import { z } from 'zod';

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  connected: z.string(),
  joinedAt: z.string(),
  quittedAt: z.string().nullable(),
});

export type UserType = z.infer<typeof userSchema>;
