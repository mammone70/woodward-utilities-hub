"use client"

import { Plus, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { BillForm } from "@/components/bill-form"
import { PaymentForm } from "@/components/payment-form"
import { TBillTypes } from "@/schemas/bill-types-schemas"
import { useState } from "react"

interface ActionButtonsProps {
  userId: number
  billTypes: TBillTypes[]
}

export function ActionButtons({ userId, billTypes }: ActionButtonsProps) {
  const [isAddingBill, setIsAddingBill] = useState(false)
  const [isAddingPayment, setIsAddingPayment] = useState(false)

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <Dialog open={isAddingBill} onOpenChange={setIsAddingBill}>
        <DialogTrigger asChild>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add New Bill
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Utility Bill</DialogTitle>
          </DialogHeader>
          <BillForm 
            userId={userId} 
            billTypes={billTypes} 
            onSuccess={() => setIsAddingBill(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isAddingPayment} onOpenChange={setIsAddingPayment}>
        <DialogTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Record Payment
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Record Tenant Payment</DialogTitle>
          </DialogHeader>
          <PaymentForm 
            userId={userId} 
            onSuccess={() => setIsAddingPayment(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
} 