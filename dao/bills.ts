import { db } from "@/db"
import { bills } from "@/db/schemas/bills"
import { desc, eq } from "drizzle-orm"

export const getBillsByUserId = async (userId: number) => {
    const result = 
        await db
                .select()
                .from(bills)
                .orderBy(desc(bills.dateIssued))
                .where(eq(bills.userId, userId)
            )
    return result;
}

export const addBill = async (userId: number, typeId: number, dateIssued: string, amount: string, paid: boolean) => {
    const result = await db.insert(bills).values({
        userId,
        typeId,
        dateIssued: dateIssued,
        amount,
        paid,
    })
    return result[0];
}

export const updateBill = async (id: number, typeId: number, dateIssued: string, amount: string, paid: boolean) => {
    const result = await db.update(bills).set({
        typeId,
        dateIssued: dateIssued,
        amount,
        paid,
    }).where(eq(bills.id, id))
    return result[0];
}

export const deleteBill = async (id: number) => {
    const result = await db.delete(bills).where(eq(bills.id, id))
    return result[0];
}