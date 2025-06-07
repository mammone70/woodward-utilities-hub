"use server"

import { addBill, deleteBill, getBillsByUserId, updateBill } from "@/dao/bills"
import { addBillSchema, deleteBillSchema, getBillsByUserIdSchema, TBill, updateBillSchema } from "@/schemas/bills-schemas"
import z from "zod"



export async function getBillsByUserIdAction(data: z.infer<typeof getBillsByUserIdSchema>) : 
    Promise<TBill[]> {
        
        const validatedParams = getBillsByUserIdSchema.safeParse(data);

        if (!validatedParams.success) {
            return []
        }

        const {userId} = validatedParams.data;
        const bills : TBill[] = await getBillsByUserId(userId)
        return bills
}

export async function addBillAction(data: z.infer<typeof addBillSchema>) : 
    Promise<{success?: boolean, error?: string, data?: TBill}> {
        
        const validatedParams = addBillSchema.safeParse(data);

        if (!validatedParams.success) {
            return {
                success: false,
                error: validatedParams.error.message
            }
        }

        const {userId, typeId, dateIssued, amount, paid} = validatedParams.data;

        const bill = await addBill(userId, typeId, dateIssued, amount, paid);

        return {
            success: true,
            data: bill
        }
}

export async function updateBillAction(data: z.infer<typeof updateBillSchema>) :
    Promise<{success?: boolean, error?: string, data?: TBill}> {
        
        const validatedParams = updateBillSchema.safeParse(data);

        if (!validatedParams.success) {
            return {
                success: false,
                error: validatedParams.error.message
            }
        }

        const {id, typeId, dateIssued, amount, paid} = validatedParams.data;

        const bill = await updateBill(id, typeId, dateIssued, amount, paid);

        return {
            success: true,
            data: bill
        }
}

export async function deleteBillAction(data: z.infer<typeof deleteBillSchema>) :
    Promise<{success?: boolean, error?: string, data?: TBill}> {
        
        const validatedParams = deleteBillSchema.safeParse(data);

        if (!validatedParams.success) {
            return {
                success: false,
                error: validatedParams.error.message
            }
        }

        const {id} = validatedParams.data;

        const bill = await deleteBill(id);

        return {
            success: true,
            data: bill
        }
    }