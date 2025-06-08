"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useBills } from "@/hooks/use-bills"
import { Receipt, DollarSign, TrendingUp, FileText } from "lucide-react"
import StatsCardsSkeletons from "./stats-cards-skeletons";


export function StatsCards() {
  const { totalBills, totalPayments, balance, billCount, isLoading } = useBills(1);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Bills</CardTitle>
          <Receipt className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        {isLoading ? (
          <CardContent>
            <StatsCardsSkeletons />
          </CardContent>
        ) : (
          <CardContent>
            <div className="text-2xl font-bold h-8">${totalBills.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground h-4">{billCount} {billCount > 1 ? "bills" : "bill"}  this period</p>
          </CardContent>
        )}
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Payments Received</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        {isLoading ? (
          <CardContent>
            <StatsCardsSkeletons />
          </CardContent>
        ) : (
          <CardContent>
            <div className="text-2xl h-8 font-bold text-green-600">${totalPayments.toFixed(2)}</div>
            <p className="text-xs h-4 text-muted-foreground">From tenant payments</p>
          </CardContent>
        )}
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Balance</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        {isLoading ? (
          <CardContent>
            <StatsCardsSkeletons />
          </CardContent>
        ) : (
          <CardContent>
            <div
              className={`text-2xl h-8 font-bold ${balance < 0 ? "text-red-600" : balance > 0 ? "text-green-600" : "text-gray-900"}`}
            >
              ${Math.abs(balance).toFixed(2)}
            </div>
            <p className="text-xs h-4 text-muted-foreground">
              {balance > 0 ? "Outstanding" : balance < 0 ? "Credit" : "Balanced"}
            </p>
          </CardContent>
        )}
      </Card>

      {/* <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Collection Rate</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {totalBills > 0 ? Math.round((totalPayments / totalBills) * 100) : 0}%
          </div>
          <p className="text-xs text-muted-foreground">Payment collection rate</p>
        </CardContent>
      </Card> */}
    </div>
  )
}
