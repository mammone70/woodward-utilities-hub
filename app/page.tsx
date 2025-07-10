import { StatsCards } from "@/components/stats-cards"
import { BillsTable } from "@/components/bills-table"
import { PaymentsTable } from "@/components/payments-table"
import { SignOutButton } from "@/components/auth/sign-out-button"
import BalanceBanner from "@/components/balance-banner"
import { usePayments } from "@/hooks/use-payments"
import { useBills } from "@/hooks/use-bills"
import { useBillTypes } from "@/hooks/use-bill-types"
import TablesGrid from "@/components/tables-grid"


export default async function App() {
  
  return (
    <div className="min-h-screen bg-gray-50">
        <BalanceBanner />
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Woodward Utilities</h1>
              <p className="text-gray-600 mt-2">View your utility bills and payment status</p>
            </div>
          </div>
          <SignOutButton />
        </div>      

        {/* Stats Cards */}
        <StatsCards />

        {/* Tables Grid */}
        <TablesGrid />
      </div>
  )
}
