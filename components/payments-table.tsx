"use client"

import { DollarSign, Trash2, Edit } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { usePayments } from "@/hooks/use-payments"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { TPayment } from "@/schemas/payments-schemas"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useState, useMemo } from "react"
import { PaymentForm } from "@/components/payment-form"
import { TableFilters } from "./table-filters"

interface PaymentsTableProps {
  userId: number
  initialPayments: TPayment[]
}

export function PaymentsTable({ userId, initialPayments }: PaymentsTableProps) {
  const { payments, isLoading, deletePayment } = usePayments(userId, initialPayments)
  const { toast } = useToast()
  const router = useRouter()
  const [editingPayment, setEditingPayment] = useState<TPayment | undefined>()
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: new Date(),
    to: new Date(),
  })
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {
      const paymentDate = new Date(payment.date)
      const matchesDateRange =
        (!dateRange.from || paymentDate >= dateRange.from) &&
        (!dateRange.to || paymentDate <= dateRange.to)

      const searchLower = searchQuery.toLowerCase()
      const matchesSearch =
        !searchQuery ||
        payment.description.toLowerCase().includes(searchLower) ||
        payment.amount.toString().includes(searchLower)

      return matchesDateRange && matchesSearch
    })
  }, [payments, dateRange, searchQuery])

  const handleDelete = async (id: number) => {
    try {
      await deletePayment.mutateAsync({ id })
      toast({
        title: "Success",
        description: "Payment deleted successfully",
        className: "bg-green-500 text-white",
      })
      router.refresh()
    } catch (error) {
      console.error("Failed to delete payment:", error)
      toast({
        title: "Error",
        description: "Failed to delete payment. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Payments
          </CardTitle>
          <CardDescription>All payments made</CardDescription>
        </CardHeader>
        <CardContent>
          <TableFilters
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            showBillTypeFilter={false}
          />
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">Loading...</TableCell>
                  </TableRow>
                ) : filteredPayments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">No payments found</TableCell>
                  </TableRow>
                ) : (
                  filteredPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>{new Date(payment.date).toLocaleDateString("en-US", { timeZone: "UTC" })}</TableCell>
                      <TableCell>${Number(payment.amount).toFixed(2)}</TableCell>
                      <TableCell>{payment.description}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => setEditingPayment(payment)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleDelete(payment.id)}
                            disabled={deletePayment.isPending}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!editingPayment} onOpenChange={() => setEditingPayment(undefined)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Payment</DialogTitle>
          </DialogHeader>
          {editingPayment && (
            <PaymentForm 
              userId={userId} 
              initialData={editingPayment} 
              onSuccess={() => {
                setEditingPayment(undefined)
                router.refresh()
              }} 
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  )
} 