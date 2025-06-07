"use client"

import { Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { BillForm } from "@/components/bill-form"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { TBill } from "@/schemas/bills-schemas"
import { TBillTypes } from "@/schemas/bill-types-schemas"
import { useBills } from "@/hooks/use-bills"

interface BillActionsProps {
  bill: TBill
  billTypes: TBillTypes[]
}

export function BillActions({ bill, billTypes }: BillActionsProps) {
  const [isEditing, setIsEditing] = useState(false)
  const router = useRouter()
  const { deleteBill } = useBills(bill.userId)

  const handleDelete = async () => {
    try {
      await deleteBill.mutateAsync({id: bill.id})
      router.refresh()
    } catch (error) {
      console.error("Failed to delete bill:", error)
    }
  }

  return (
    <div className="flex gap-1">
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon">
            <Edit className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Utility Bill</DialogTitle>
          </DialogHeader>
          <BillForm initialData={bill} userId={bill.userId} billTypes={billTypes} />
        </DialogContent>
      </Dialog>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={handleDelete}
        disabled={deleteBill.isPending}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
} 