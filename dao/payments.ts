import { db } from "@/db"
import { payments } from "@/db/schemas/payments"
import { desc, eq } from "drizzle-orm"

export const getPaymentsByUserId = async (userId: number) => {
    const result 
        = await db.select()
            .from(payments)
            .orderBy(desc(payments.date))
            .where(eq(payments.userId, userId))
    return result;
}

export const addPayment = async (userId: number, date: string, amount: number, description: string) => {
    const result = await db.insert(payments).values({
        userId,
        date: date,
        amount : amount.toString(),
        description,
    })
    return result[0];
}

export const updatePayment = async (id: number, date: string, amount: number, description: string) => {
    const result = await db.update(payments).set({
        date: date,
        amount : amount.toString(),
        description,
    }).where(eq(payments.id, id))
    return result[0];
}

export const deletePayment = async (id: number) => {
    const result = await db.delete(payments).where(eq(payments.id, id))
    return result[0];
} 