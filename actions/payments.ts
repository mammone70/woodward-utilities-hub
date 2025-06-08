"use server"

import { addPayment, deletePayment, getPaymentsByUserId, updatePayment } from "@/dao/payments"
import { addPaymentSchema, deletePaymentSchema, getPaymentsByUserIdSchema, TPayment, updatePaymentSchema } from "@/schemas/payments-schemas"
import z from "zod"

export async function getPaymentsByUserIdAction(data: z.infer<typeof getPaymentsByUserIdSchema>):
    Promise<TPayment[]> {

    const validatedParams = getPaymentsByUserIdSchema.safeParse(data);

    if (!validatedParams.success) {
        return []
    }

    const { userId } = validatedParams.data;
    const payments: TPayment[] = await getPaymentsByUserId(userId)
    return payments
}

export async function addPaymentAction(data: z.infer<typeof addPaymentSchema>):
    Promise<{ success?: boolean, error?: string, data?: TPayment }> {

    const validatedParams = addPaymentSchema.safeParse(data);

    if (!validatedParams.success) {
        return {
            success: false,
            error: validatedParams.error.message
        }
    }

    const { userId, date, amount, description } = validatedParams.data;

    const payment = await addPayment(userId, date, amount, description);

    return {
        success: true,
        data: payment
    }
}

export async function updatePaymentAction(data: z.infer<typeof updatePaymentSchema>):
    Promise<{ success?: boolean, error?: string, data?: TPayment }> {

    const validatedParams = updatePaymentSchema.safeParse(data);

    if (!validatedParams.success) {
        return {
            success: false,
            error: validatedParams.error.message
        }
    }

    const { id, date, amount, description } = validatedParams.data;

    const payment = await updatePayment(id, date, amount, description);

    return {
        success: true,
        data: payment
    }
}

export async function deletePaymentAction(data: z.infer<typeof deletePaymentSchema>):
    Promise<{ success?: boolean, error?: string, data?: TPayment }> {

    const validatedParams = deletePaymentSchema.safeParse(data);

    if (!validatedParams.success) {
        return {
            success: false,
            error: validatedParams.error.message
        }
    }

    const { id } = validatedParams.data;

    const payment = await deletePayment(id);

    return {
        success: true,
        data: payment
    }
} 