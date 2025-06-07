import { Plus, DollarSign, Receipt, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { BillForm } from "@/components/bill-form"
import { PaymentForm } from "@/components/payment-form"
import { StatsCards } from "@/components/stats-cards"
import Link from "next/link"
import { BillActions } from "@/components/bill-actions"
import { getBillsByUserIdAction } from "@/actions/bills"
import { getBillTypes } from "@/app/actions/bill-types"
import { TBill } from "@/schemas/bills-schemas"
import { Providers } from "./providers"
import { BillsTable } from "@/components/bills-table"

// TODO: Replace with actual user ID from auth
const CURRENT_USER_ID = 1

export default async function Dashboard() {
  // const { totalBills, totalPayments, balance, billCount, unpaidBills } = await getBillingSummary(CURRENT_USER_ID)
  const { totalBills, totalPayments, balance, billCount, unpaidBills } = {
    totalBills: 0,
    totalPayments: 0,
    balance: 0,
    billCount: 0,
    unpaidBills: 0
  }

  const billsResult = await getBillsByUserIdAction({userId: CURRENT_USER_ID})
  
  
  const bills: TBill[] = billsResult
  
  // const payments = await getPaymentsByUserId(CURRENT_USER_ID)
  const payments: any[] = []

  const { data: billTypes, error: billTypesError } = await getBillTypes()
  if (billTypesError) {
    console.error("Failed to fetch bill types:", billTypesError)
  }

  return (
    <Providers>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto p-4 md:p-6 lg:p-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Woodward Utilities Hub</h1>
              <p className="text-gray-600 mt-2">Manage utility bills and tenant payments</p>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              <Link href="/tenant-view">
                <Button variant="outline" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Tenant View
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats Cards */}
          <StatsCards totalBills={totalBills} totalPayments={totalPayments} balance={balance} billCount={billCount} />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Dialog>
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
                <BillForm userId={CURRENT_USER_ID} billTypes={billTypes || []} />
              </DialogContent>
            </Dialog>

            <Dialog>
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
                <PaymentForm onSubmit={() => {}} />
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Bills Table */}
            <BillsTable initialBills={bills} initialBillTypes={billTypes || []} />

            {/* Payments Table */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Payments
                </CardTitle>
                <CardDescription>Track all tenant payments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Description</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payments.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                          <TableCell>${Number(payment.amount).toFixed(2)}</TableCell>
                          <TableCell>{payment.description}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Providers>
  )
}
