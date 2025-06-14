import { z } from "zod";

export const userSchema = z.object({
    id: z.string().uuid(),
    email: z.string().email(),
    displayName: z.string().nullable(),
    avatarUrl: z.string().url().nullable(),
    role: z.enum(["user", "admin"]),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  })

  export type User = z.infer<typeof userSchema>
