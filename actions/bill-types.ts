"use server"

import { createBillTypeSchema, deleteBillTypeSchema, TBillType, updateBillTypeSchema } from "@/schemas/bill-types-schemas"
import { createBillType, deleteBillType, getAllBillTypes, getBillTypeById, updateBillType } from "@/dao/bill-types-dao"
import z from "zod"

export async function getBillTypesAction() : Promise<TBillType[]> {
    try {
        const types = await getAllBillTypes()
        return types
    } catch (error) {
        console.error("Error fetching bill types:", error)
        return []
    }
}

export async function getBillTypeByIdAction(id: number) {
    try {
        const validatedId = deleteBillTypeSchema.shape.id.parse(id)
        const type = await getBillTypeById(validatedId)
        if (!type) {
            return { data: null, error: "Bill type not found" }
        }
        return { data: type, error: null }
    } catch (error) {
        console.error("Error fetching bill type:", error)
        return { data: null, error: "Failed to fetch bill type" }
    }
}

export async function createBillTypeAction(data: z.infer<typeof createBillTypeSchema>) {
    try {
        const validatedData = createBillTypeSchema.parse(data)
        const type = await createBillType(validatedData)
        return { data: type, error: null }
    } catch (error) {
        console.error("Error creating bill type:", error)
        return { data: null, error: "Failed to create bill type" }
    }
}

export async function updateBillTypeAction(data: unknown) {
    try {
        const validatedData = updateBillTypeSchema.parse(data)
        const type = await updateBillType(validatedData)
        return { data: type, error: null }
    } catch (error) {
        console.error("Error updating bill type:", error)
        return { data: null, error: "Failed to update bill type" }
    }
}

export async function deleteBillTypeAction(id: number) {
    try {
        const validatedId = deleteBillTypeSchema.shape.id.parse(id)
        await deleteBillType(validatedId)
        return { data: null, error: null }
    } catch (error) {
        console.error("Error deleting bill type:", error)
        return { data: null, error: "Failed to delete bill type" }
    }
} 