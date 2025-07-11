import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getBillTypesAction } from "@/actions/bill-types"
import { TBillType } from "@/schemas/bill-types-schemas";

interface UseBillTypesProps {
    initialData?: TBillType[];
}

export function useBillTypes({ initialData }: UseBillTypesProps) {
    const queryClient = useQueryClient();
    const billTypesQuery = useQuery({
        queryKey: ["billTypes"],
        queryFn: () => getBillTypesAction(),
        initialData: initialData,
    })

    return {
        billTypes: billTypesQuery.data ?? [],
        isLoading: billTypesQuery.isLoading,
    }
} 