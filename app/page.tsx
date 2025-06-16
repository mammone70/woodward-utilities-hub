import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import Link from "next/link"
import { StatsCards } from "@/components/stats-cards"
import { BillsTable } from "@/components/bills-table"
import { PaymentsTable } from "@/components/payments-table"
import { getBillsByUserIdAction } from "@/actions/bills"
import { getBillTypesAction } from "@/actions/bill-types"
import { getPaymentsByUserIdAction } from "@/actions/payments"
import { SignOutButton } from "@/components/auth/sign-out-button"

// TODO: Replace with actual user ID from auth
const CURRENT_USER_ID = 1

export default async function App() {
  const [billsResult, billTypesResult, paymentsResult] = await Promise.all([
    getBillsByUserIdAction({ userId: CURRENT_USER_ID }),
    getBillTypesAction(),
    getPaymentsByUserIdAction({ userId: CURRENT_USER_ID })
  ])

  const bills = billsResult
  const billTypes = billTypesResult
  const payments = paymentsResult

  const totalBills = bills.reduce((sum, bill) => sum + Number(bill.amount), 0)
  const totalPayments = payments.reduce((sum, payment) => sum + Number(payment.amount), 0)
  const balance = totalBills - totalPayments

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Tenant Portal</h1>
              <p className="text-gray-600 mt-2">View your utility bills and payment status</p>
            </div>
          </div>
          <div>
            <SignOutButton />
          </div>
        </div>

        {/* Balance Alert */}
        {balance > 0 && (
          <Alert className="mb-6 border-orange-200 bg-orange-50">
            <AlertCircle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              You have an outstanding balance of <strong>${balance.toFixed(2)}</strong>.
            </AlertDescription>
          </Alert>
        )}

        {balance < 0 && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <AlertCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              You have a credit balance of <strong>${Math.abs(balance).toFixed(2)}</strong>. This will be applied to
              future bills.
            </AlertDescription>
          </Alert>
        )}

        {/* Stats Cards */}
        <StatsCards />

        {/* Tables Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BillsTable userId={CURRENT_USER_ID} initialBills={bills} initialBillTypes={billTypes} readOnly />
          <PaymentsTable userId={CURRENT_USER_ID} initialPayments={payments} readOnly />
        </div>
      </div>
    </div>
  )
}
