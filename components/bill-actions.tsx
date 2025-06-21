"use client"

import { Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { BillForm } from "@/components/bill-form"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { TBill } from "@/schemas/bills-schemas"
import { TBillType } from "@/schemas/bill-types-schemas"
import { useBills } from "@/hooks/use-bills"
import { useToast } from "@/hooks/use-toast"

interface BillActionsProps {
  bill: TBill
  billTypes: TBillType[]
}

export function BillActions({ bill, billTypes }: BillActionsProps) {
  const [isEditing, setIsEditing] = useState(false)
  const router = useRouter()
  const { deleteBill } = useBills(bill.userId)
  const { toast } = useToast()

  const handleDelete = async () => {
    try {
      await deleteBill.mutateAsync({id: bill.id})
      toast({
        title: "Success",
        description: "Bill deleted successfully",
        className: "bg-green-500 text-white",
      })
      router.refresh()
    } catch (error) {
      console.error("Failed to delete bill:", error)
      toast({
        title: "Error",
        description: "Failed to delete bill. Please try again.",
        variant: "destructive",
      })
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
          <BillForm 
            initialData={bill} 
            userId={bill.userId} 
            billTypes={billTypes} 
            onSuccess={() => setIsEditing(false)}
          />
        </DialogContent>
      </Dialog>
      
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon"
            disabled={deleteBill.isPending}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the bill for ${Number(bill.amount).toFixed(2)} issued on {new Date(bill.dateIssued).toLocaleDateString("en-US", { timeZone: "UTC" })}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete Bill
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
} 