"use client"

import React from 'react'
import { BillsTable } from './bills-table'
import { PaymentsTable } from './payments-table'
import { useBills } from '@/hooks/use-bills';
import { usePayments } from '@/hooks/use-payments';
import { useBillTypes } from '@/hooks/use-bill-types';

// TODO: Replace with actual user ID from auth
const CURRENT_USER_ID = 1

export default function TablesGrid() {
    const { bills } = useBills(1);
    const { payments,  } = usePayments(1);
    const { billTypes, } = useBillTypes();
  
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BillsTable userId={CURRENT_USER_ID} initialBills={bills} initialBillTypes={billTypes} readOnly />
          <PaymentsTable userId={CURRENT_USER_ID} initialPayments={payments} readOnly />
        </div>
  )
}
