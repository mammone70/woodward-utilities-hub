import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getBillsByUserIdAction, addBillAction, updateBillAction, deleteBillAction } from "@/actions/bills"
import { TBill } from "@/schemas/bills-schemas"
import { useMemo } from "react"

export function useBills(userId: number, initialData?: TBill[]) {
    const queryClient = useQueryClient()

    const billsQuery = useQuery({
        queryKey: ["bills", userId],
        queryFn: () => getBillsByUserIdAction({ userId }),
        initialData: initialData,
    })

    const addBill = useMutation({
        mutationFn: (data: Parameters<typeof addBillAction>[0]) => addBillAction(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["bills", userId] })
        },
    })

    const updateBill = useMutation({
        mutationFn: (data: Parameters<typeof updateBillAction>[0]) => updateBillAction(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["bills", userId] })
        },
    })

    const deleteBill = useMutation({
        mutationFn: (data: Parameters<typeof deleteBillAction>[0]) => deleteBillAction(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["bills", userId] })
        },
    })

    
    /* Bill Stats */
    const { totalBills, billCount, unpaidBills } = useMemo(() => {
        return {
            totalBills : billsQuery.data?.reduce((acc, bill) => acc + parseFloat(bill.amount), 0) ?? 0,
            billCount : billsQuery.data?.length ?? 0,
            unpaidBills : billsQuery.data?.filter((bill) => !bill.paid).length ?? 0,
            isLoading: billsQuery.isLoading
        }
    }, [billsQuery.data])

    return {
        bills: billsQuery.data ?? [],
        isLoading: billsQuery.isLoading,
        addBill,
        updateBill,
        deleteBill,
        totalBills,
        // totalPayments,
        // balance,
        billCount,
        unpaidBills
    }
} 