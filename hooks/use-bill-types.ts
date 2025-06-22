import { useQuery } from "@tanstack/react-query"
import { getBillTypesAction } from "@/actions/bill-types"

export function useBillTypes() {
    return useQuery({
        queryKey: ["billTypes"],
        queryFn: getBillTypesAction,
    })
} 