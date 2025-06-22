"use client"

import { DollarSign, Trash2, Edit } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
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
import { usePayments } from "@/hooks/use-payments"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { TPayment } from "@/schemas/payments-schemas"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useState, useMemo } from "react"
import { PaymentForm } from "@/components/payment-form"
import { TableFilters } from "./table-filters"
import { useAuthStore } from "@/lib/store/use-auth-store"

interface PaymentsTableProps {
  userId: number
  initialPayments: TPayment[]
  readOnly?: boolean
}

export function PaymentsTable({ userId, initialPayments, readOnly = false }: PaymentsTableProps) {
  const { user } = useAuthStore()
  const { payments, isLoading, deletePayment } = usePayments(userId, initialPayments)
  const { toast } = useToast()
  const router = useRouter()
  const [editingPayment, setEditingPayment] = useState<TPayment | undefined>()
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  })
  const [searchQuery, setSearchQuery] = useState("")

  const showActions = user && !readOnly

  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {
      console.log(payment.date)
      const paymentDate = new Date(new Date(payment.date).toLocaleDateString("en-US", { timeZone: "UTC" }))
      console.log(dateRange)
      console.log(paymentDate)
      const matchesDateRange =
        dateRange &&
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
                  {showActions && <TableHead>Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={showActions ? 4 : 3} className="text-center">Loading...</TableCell>
                  </TableRow>
                ) : filteredPayments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={showActions ? 4 : 3} className="text-center">No payments found</TableCell>
                  </TableRow>
                ) : (
                  filteredPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>{new Date(payment.date).toLocaleDateString("en-US", { timeZone: "UTC" })}</TableCell>
                      <TableCell>${Number(payment.amount).toFixed(2)}</TableCell>
                      <TableCell>{payment.description}</TableCell>
                      {showActions && (
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => setEditingPayment(payment)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  disabled={deletePayment.isPending}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the payment of ${Number(payment.amount).toFixed(2)} made on {new Date(payment.date).toLocaleDateString("en-US", { timeZone: "UTC" })}.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDelete(payment.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                    Delete Payment
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      )}
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