import { useQuery } from "@tanstack/react-query"
import { getBillTypes } from "@/app/actions/bill-types"

export function useBillTypes() {
    return useQuery({
        queryKey: ["billTypes"],
        queryFn: getBillTypes,
    })
} 