"use client"

import React from 'react'
import { BillsTable } from './bills-table'
import { PaymentsTable } from './payments-table'
import { useBills } from '@/hooks/use-bills';
import { usePayments } from '@/hooks/use-payments';
import { useBillTypes } from '@/hooks/use-bill-types';
import { TBill } from '@/schemas/bills-schemas';
import { TPayment } from '@/schemas/payments-schemas';
import { TBillType } from '@/schemas/bill-types-schemas';

// TODO: Replace with actual user ID from auth
const CURRENT_USER_ID = 1


interface TablesGridProps {
  readonly: boolean;
  initialBills?: TBill[];
  initialPayments?: TPayment[];
  initialBillTypes?: TBillType[];
}

  export default function TablesGrid({ 
    readonly, 
    initialBills, 
    initialPayments, 
    initialBillTypes 
  }: TablesGridProps) {
    
    const { bills } = useBills({userId: 1, initialData: initialBills});
    const { payments,  } = usePayments({userId: 1, initialData: initialPayments});
    const { billTypes, } = useBillTypes({initialData: initialBillTypes});
  
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BillsTable userId={CURRENT_USER_ID} initialBills={bills} initialBillTypes={billTypes} readOnly={readonly} />
          <PaymentsTable userId={CURRENT_USER_ID} initialPayments={payments} readOnly={readonly} />
        </div>
  )
}
