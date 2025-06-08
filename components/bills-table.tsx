"use client"

import { Receipt } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BillActions } from "@/components/bill-actions"
import { TBill } from "@/schemas/bills-schemas"
import { TBillTypes } from "@/schemas/bill-types-schemas"
import { useBills } from "@/hooks/use-bills"

interface BillsTableProps {
  userId: number
  initialBills: TBill[]
  initialBillTypes: TBillTypes[]
}

export function BillsTable({ userId, initialBills, initialBillTypes }: BillsTableProps) {
  const { bills, isLoading } = useBills(userId, initialBills)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Receipt className="h-5 w-5" />
          Utility Bills
        </CardTitle>
        <CardDescription>Manage all utility bills for the property</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">Loading...</TableCell>
                </TableRow>
              ) : bills.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">No payments recorded</TableCell>
                </TableRow>
              ) : (
                bills.map((bill: TBill) => (
                  <TableRow key={bill.id}>
                      <TableCell>{bill.dateIssued.toLocaleDateString("en-US", { timeZone: "UTC" })}</TableCell>
                      <TableCell className="font-medium">
                      {initialBillTypes.find(type => type.id === bill.typeId)?.name || 'Unknown'}
                    </TableCell>                    
                    <TableCell>${Number(bill.amount).toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge variant={bill.paid ? "default" : "destructive"}>{bill.paid ? "Paid" : "Unpaid"}</Badge>
                    </TableCell>
                    <TableCell>
                      <BillActions bill={bill} billTypes={initialBillTypes} />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
} 