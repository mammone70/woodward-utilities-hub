"use client"

import { ArrowLeft, Receipt, DollarSign, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"

interface Bill {
  id: number
  type: string
  dateIssued: string
  amount: number
  paid: boolean
}

interface Payment {
  id: number
  date: string
  amount: number
  description: string
}

// Same dummy data as dashboard
const bills: Bill[] = [
  {
    id: 1,
    type: "Electricity",
    dateIssued: "2024-01-15",
    amount: 245.5,
    paid: true,
  },
  {
    id: 2,
    type: "Gas",
    dateIssued: "2024-01-18",
    amount: 89.25,
    paid: false,
  },
  {
    id: 3,
    type: "Water",
    dateIssued: "2024-01-20",
    amount: 67.8,
    paid: true,
  },
  {
    id: 4,
    type: "Internet",
    dateIssued: "2024-01-22",
    amount: 79.99,
    paid: false,
  },
  {
    id: 5,
    type: "Trash",
    dateIssued: "2024-01-25",
    amount: 45.0,
    paid: true,
  },
]

const payments: Payment[] = [
  {
    id: 1,
    date: "2024-01-28",
    amount: 200.0,
    description: "Tenant payment - January utilities",
  },
  {
    id: 2,
    date: "2024-01-30",
    amount: 150.0,
    description: "Tenant payment - Additional utilities",
  },
]

export default function TenantView() {
  const totalBills = bills.reduce((sum, bill) => sum + bill.amount, 0)
  const totalPayments = payments.reduce((sum, payment) => sum + payment.amount, 0)
  const balance = totalBills - totalPayments
  const unpaidBills = bills.filter((bill) => !bill.paid)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tenant Portal</h1>
            <p className="text-gray-600 mt-2">View your utility bills and payment status</p>
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

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bills</CardTitle>
              <Receipt className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalBills.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">{bills.length} bills this period</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Payments Made</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">${totalPayments.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">{payments.length} payments recorded</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Balance</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div
                className={`text-2xl font-bold ${balance > 0 ? "text-red-600" : balance < 0 ? "text-green-600" : "text-gray-900"}`}
              >
                ${Math.abs(balance).toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">
                {balance > 0 ? "Amount owed" : balance < 0 ? "Credit balance" : "Paid in full"}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* All Bills */}
          <Card>
            <CardHeader>
              <CardTitle>Utility Bills</CardTitle>
              <CardDescription>All utility bills for this period</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bills.map((bill) => (
                      <TableRow key={bill.id}>
                        <TableCell className="font-medium">{bill.type}</TableCell>
                        <TableCell>{new Date(bill.dateIssued).toLocaleDateString()}</TableCell>
                        <TableCell>${bill.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge variant={bill.paid ? "default" : "destructive"}>{bill.paid ? "Paid" : "Unpaid"}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Payment History */}
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>Your payment records</CardDescription>
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
                        <TableCell className="font-medium text-green-600">${payment.amount.toFixed(2)}</TableCell>
                        <TableCell>{payment.description}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Outstanding Bills */}
        {unpaidBills.length > 0 && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-red-600">Outstanding Bills</CardTitle>
              <CardDescription>Bills that require payment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Date Issued</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Days Outstanding</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {unpaidBills.map((bill) => {
                      const daysOutstanding = Math.floor(
                        (new Date().getTime() - new Date(bill.dateIssued).getTime()) / (1000 * 60 * 60 * 24),
                      )
                      return (
                        <TableRow key={bill.id}>
                          <TableCell className="font-medium">{bill.type}</TableCell>
                          <TableCell>{new Date(bill.dateIssued).toLocaleDateString()}</TableCell>
                          <TableCell className="font-medium text-red-600">${bill.amount.toFixed(2)}</TableCell>
                          <TableCell>
                            <Badge variant={daysOutstanding > 30 ? "destructive" : "secondary"}>
                              {daysOutstanding} days
                            </Badge>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
