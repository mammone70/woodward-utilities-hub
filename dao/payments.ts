import { db } from "@/db"
import { payments } from "@/db/schemas/payments"
import { eq } from "drizzle-orm"

export const getPaymentsByUserId = async (userId: number) => {
    const result = await db.select().from(payments).where(eq(payments.userId, userId))
    return result;
}

export const addPayment = async (userId: number, date: string, amount: number, description: string) => {
    const result = await db.insert(payments).values({
        userId,
        date: new Date(date),
        amount,
        description,
    })
    return result[0];
}

export const updatePayment = async (id: number, date: string, amount: number, description: string) => {
    const result = await db.update(payments).set({
        date: new Date(date),
        amount,
        description,
    }).where(eq(payments.id, id))
    return result[0];
}

export const deletePayment = async (id: number) => {
    const result = await db.delete(payments).where(eq(payments.id, id))
    return result[0];
} 