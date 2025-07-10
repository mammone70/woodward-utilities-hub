"use client"
import React from 'react'
import { Alert, AlertDescription } from './ui/alert'
import { AlertCircle } from 'lucide-react'
import { useBills } from '@/hooks/use-bills';
import { usePayments } from '@/hooks/use-payments';

export default function BalanceBanner() {
    const { totalBills, bills, isLoading } = useBills(1);
    const { totalPayments, payments, isLoading: paymentsLoading } = usePayments(1);
    const balance = totalBills - totalPayments;
    
return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
        {/* Header */}
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
    </div>
  )
}
