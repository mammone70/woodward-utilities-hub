import { z } from "zod"

export type TPayment = {
    id: number;
    userId: number;
    date: string;
    amount: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

export const getPaymentsByUserIdSchema = z.object({
    userId: z.number(),
})

export const addPaymentSchema = z.object({
    userId: z.number(),
    date: z.string(),
    amount: z.number(),
    description: z.string(),
})

export const updatePaymentSchema = z.object({
    id: z.number(),
    date: z.string(),
    amount: z.number(),
    description: z.string(),
})

export const deletePaymentSchema = z.object({
    id: z.number(),
}) 