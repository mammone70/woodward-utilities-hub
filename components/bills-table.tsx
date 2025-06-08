"use client"

import { Receipt } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BillActions } from "@/components/bill-actions"
import { TBill } from "@/schemas/bills-schemas"
import { TBillType } from "@/schemas/bill-types-schemas"
import { useBills } from "@/hooks/use-bills"
import { useState, useMemo } from "react"
import { TableFilters } from "./table-filters"

interface BillsTableProps {
  userId: number
  initialBills: TBill[]
  initialBillTypes: TBillType[]
}

export function BillsTable({ userId, initialBills, initialBillTypes }: BillsTableProps) {
  
  const { bills, isLoading } = useBills(userId, initialBills)
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedBillType, setSelectedBillType] = useState("all")

  const filteredBills = useMemo(() => {
    return bills.filter((bill) => {
      const billDate = new Date(bill.dateIssued)
      const matchesDateRange =
        dateRange &&
        (!dateRange.from || billDate >= dateRange.from) &&
        (!dateRange.to || billDate <= dateRange.to)

      const billType = initialBillTypes.find((type) => type.id === bill.typeId)
      const matchesBillType = selectedBillType === "all" || bill.typeId.toString() === selectedBillType

      const searchLower = searchQuery.toLowerCase()
      const matchesSearch =
        !searchQuery ||
        billType?.name.toLowerCase().includes(searchLower) ||
        bill.amount.toString().includes(searchLower)

      return matchesDateRange && matchesBillType && matchesSearch
    })
  }, [bills, dateRange, searchQuery, selectedBillType, initialBillTypes])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Receipt className="h-5 w-5" />
          Utility Bills
        </CardTitle>
        <CardDescription>All utility bills for the property</CardDescription>
      </CardHeader>
      <CardContent>
        <TableFilters
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          billTypes={initialBillTypes}
          selectedBillType={selectedBillType}
          onBillTypeChange={setSelectedBillType}
          showBillTypeFilter
        />
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
              ) : filteredBills.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">No bills found</TableCell>
                </TableRow>
              ) : (
                filteredBills.map((bill: TBill) => (
                  <TableRow key={bill.id}>
                    <TableCell>{new Date(bill.dateIssued).toLocaleDateString("en-US", { timeZone: "UTC" })}</TableCell>
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