import { z } from "zod"

export type TBillType = {
    id: number;
    name: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export const billTypeSchema = z.object({
    id: z.number(),
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
})

export const createBillTypeSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().nullable(),
})

export const updateBillTypeSchema = z.object({
    id: z.number(),
    name: z.string().min(1, "Name is required"),
    description: z.string().nullable(),
})

export const deleteBillTypeSchema = z.object({
    id: z.number(),
})
