import { Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StatsCards } from "@/components/stats-cards"
import Link from "next/link"
import { getBillsByUserIdAction } from "@/actions/bills"
import { getBillTypesAction } from "@/actions/bill-types"
import { getPaymentsByUserIdAction } from "@/actions/payments"
import { Providers } from "./providers"
import { BillsTable } from "@/components/bills-table"
import { PaymentsTable } from "@/components/payments-table"
import { ActionButtons } from "@/components/action-buttons"
import { SignOutButton } from "@/components/auth/sign-out-button"

// TODO: Replace with actual user ID from auth
const CURRENT_USER_ID = 1

export default async function Dashboard() {
  const [billsResult, billTypesResult, paymentsResult] = await Promise.all([
    getBillsByUserIdAction({ userId: CURRENT_USER_ID }),
    getBillTypesAction(),
    getPaymentsByUserIdAction({ userId: CURRENT_USER_ID })
  ])

  const bills = billsResult
  const billTypes = billTypesResult
  const payments = paymentsResult

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
              <SignOutButton />
            </div>
          </div>

          {/* Stats Cards */}
          <StatsCards />
          
          {/* Action Buttons */}
          <ActionButtons userId={CURRENT_USER_ID} billTypes={billTypes} />

          {/* Tables Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <BillsTable userId={CURRENT_USER_ID} initialBills={bills} initialBillTypes={billTypes} />
            <PaymentsTable userId={CURRENT_USER_ID} initialPayments={payments} />
          </div>
        </div>
      </div>
    </Providers>
  )
}
