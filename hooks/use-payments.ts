import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getPaymentsByUserIdAction, addPaymentAction, updatePaymentAction, deletePaymentAction } from "@/actions/payments"
import { TPayment } from "@/schemas/payments-schemas"
import { useMemo } from "react"

export interface UsePaymentsProps {
    userId: number;
    initialData? : TPayment[];
}

export function usePayments({ userId, initialData }: UsePaymentsProps) {
    const queryClient = useQueryClient()

    const paymentsQuery = useQuery({
        queryKey: ["payments", userId],
        queryFn: () => getPaymentsByUserIdAction({ userId }),
        initialData: initialData,
    })

    const addPayment = useMutation({
        mutationFn: (data: Parameters<typeof addPaymentAction>[0]) => addPaymentAction(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["payments", userId] })
        },
    })

    const updatePayment = useMutation({
        mutationFn: (data: Parameters<typeof updatePaymentAction>[0]) => updatePaymentAction(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["payments", userId] })
        },
    })

    const deletePayment = useMutation({
        mutationFn: (data: Parameters<typeof deletePaymentAction>[0]) => deletePaymentAction(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["payments", userId] })
        },
    })

    /* Payment Stats */
    const { totalPayments } = useMemo(() => {
        return {
            totalPayments: paymentsQuery.data?.reduce((acc, payment) => acc + parseFloat(payment.amount), 0) ?? 0,
        }
    }, [paymentsQuery.data])
    return {
        payments: paymentsQuery.data ?? [],
        isLoading: paymentsQuery.isLoading,
        totalPayments,
        addPayment,
        updatePayment,
        deletePayment,
    }
}