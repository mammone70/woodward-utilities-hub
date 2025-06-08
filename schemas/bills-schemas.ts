import { z } from "zod"

export type TBill = {
    id: number;
    userId: number;
    typeId: number;
    dateIssued: string;
    amount: string;
    paid: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export const getBillsByUserIdSchema = z.object({
    userId: z.number(),
})

export const addBillSchema = z.object({
    userId: z.number(),
    typeId: z.number(),
    dateIssued: z.string(),
    amount: z.string(),
    paid: z.boolean(),
})

export const updateBillSchema = z.object({
    id: z.number(),
    typeId: z.number(),
    dateIssued: z.string(),
    amount: z.string(),
    paid: z.boolean(),
})

export const deleteBillSchema = z.object({
    id: z.number(),
})