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
  initialBills: TBill[]
  initialBillTypes: TBillTypes[]
}

export function BillsTable({ initialBills, initialBillTypes }: BillsTableProps) {
  const { bills, isLoading } = useBills(initialBills[0]?.userId || 0)

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
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
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
              ) : (
                bills.map((bill: TBill) => (
                  <TableRow key={bill.id}>
                    <TableCell className="font-medium">
                      {initialBillTypes.find(type => type.id === bill.typeId)?.name || 'Unknown'}
                    </TableCell>
                    <TableCell>{new Date(bill.dateIssued).toLocaleDateString()}</TableCell>
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