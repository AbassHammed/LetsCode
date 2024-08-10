import { z } from 'zod';

export const userSchema = z.object({
  id: z.string(),
  sessionDocId: z.string(),
  name: z.string(),
  status: z.string(),
  joinedAt: z.string(),
  quittedAt: z.string().nullable(),
});

export type UserType = z.infer<typeof userSchema>;
