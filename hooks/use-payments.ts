import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getPaymentsByUserIdAction, addPaymentAction, updatePaymentAction, deletePaymentAction } from "@/actions/payments"
import { TPayment } from "@/schemas/payments-schemas"

export function usePayments(userId: number, initialData?: TPayment[]) {
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

    return {
        payments: paymentsQuery.data ?? [],
        isLoading: paymentsQuery.isLoading,
        addPayment,
        updatePayment,
        deletePayment,
    }
}