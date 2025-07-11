import { StatsCards } from "@/components/stats-cards"
import { SignOutButton } from "@/components/auth/sign-out-button"
import BalanceBanner from "@/components/balance-banner"
import TablesGrid from "@/components/tables-grid"
import { getBillsByUserIdAction } from "@/actions/bills";
import { getBillTypesAction } from "@/actions/bill-types";
import { getPaymentsByUserIdAction } from "@/actions/payments";

const CURRENT_USER_ID = 1

export default async function App() {
  const [billsResult, billTypesResult, paymentsResult] = await Promise.all([
    getBillsByUserIdAction({ userId: CURRENT_USER_ID }),
    getBillTypesAction(),
    getPaymentsByUserIdAction({ userId: CURRENT_USER_ID })
  ])

  const billTypes = billTypesResult
  const payments = paymentsResult
  const bills = billsResult

  
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
        <TablesGrid 
          readonly={true} 
          initialBills={bills} 
          initialPayments={payments} 
          initialBillTypes={billTypes} />
      </div>
  )
}
