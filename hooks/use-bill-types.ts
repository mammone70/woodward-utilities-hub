import { useQuery } from "@tanstack/react-query"
import { getBillTypes } from "@/actions/bill-types"

export function useBillTypes() {
    return useQuery({
        queryKey: ["billTypes"],
        queryFn: getBillTypes,
    })
} 