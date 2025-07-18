import { Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StatsCards } from "@/components/stats-cards"
import Link from "next/link"
import { getBillsByUserIdAction } from "@/actions/bills"
import { getBillTypesAction } from "@/actions/bill-types"
import { getPaymentsByUserIdAction } from "@/actions/payments"
import { Providers } from "../providers"
import { BillsTable } from "@/components/bills-table"
import { PaymentsTable } from "@/components/payments-table"
import { ActionButtons } from "@/components/action-buttons"
import { SignOutButton } from "@/components/auth/sign-out-button"
import TablesGrid from "@/components/tables-grid"

// TODO: Replace with actual user ID from auth
const CURRENT_USER_ID = 1

export default async function AdminDashboard() {
  const billTypes = await getBillTypesAction();
  const payments = await getPaymentsByUserIdAction({ userId: CURRENT_USER_ID });
  const bills = await getBillsByUserIdAction({ userId: CURRENT_USER_ID });

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
              <Link href="/">
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
          <TablesGrid 
            readonly={false} 
            initialBills={bills} 
            initialPayments={payments} 
            initialBillTypes={billTypes} />
        </div>
      </div>
    </Providers>
  )
} 