import { db } from "@/db"
import { billTypes } from "@/db/schemas/bill-types"
import { eq } from "drizzle-orm"
import { TBillType } from "@/schemas/bill-types-schemas"

export async function getAllBillTypes(): Promise<TBillType[]> {
    return await db.select().from(billTypes).orderBy(billTypes.name)
}

export async function getBillTypeById(id: number): Promise<TBillType | undefined> {
    const result = await db
        .select()
        .from(billTypes)
        .where(eq(billTypes.id, id))
        .limit(1)
    return result[0]
}

export async function createBillType(data: {name: string, description: string | null}): Promise<TBillType> {
    const result = await db.insert(billTypes).values({
        name: data.name,
        description: data.description || null,
    }).returning()
    return result[0]
}

export async function updateBillType(data: {id: number, name: string, description: string | null}): Promise<TBillType> {
    const result = await db
        .update(billTypes)
        .set({
            name: data.name,
            description: data.description || null,
            updatedAt: new Date(),
        })
        .where(eq(billTypes.id, data.id))
        .returning()
    return result[0]
}

export async function deleteBillType(id: number): Promise<void> {
    await db.delete(billTypes).where(eq(billTypes.id, id))
} 