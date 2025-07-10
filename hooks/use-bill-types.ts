import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getBillTypesAction } from "@/actions/bill-types"

export function useBillTypes() {
    const queryClient = useQueryClient();
    const billTypesQuery = useQuery({
        queryKey: ["billTypes"],
        queryFn: () => getBillTypesAction(),
        initialData: [],
    })

    return {
        billTypes: billTypesQuery.data ?? [],
        isLoading: billTypesQuery.isLoading,
    }
} 