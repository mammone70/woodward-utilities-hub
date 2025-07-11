"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TBill } from "@/schemas/bills-schemas"
import { TBillType } from "@/schemas/bill-types-schemas"
import { useBills } from "@/hooks/use-bills"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export const billFormSchema = z.object({
    typeId: z.number().min(1, "Bill type is required"),
    dateIssued: z.string(),
    amount: z.string().min(1, "Amount is required"),
    paid: z.boolean().default(false),
})

type BillFormValues = z.infer<typeof billFormSchema>

interface BillFormProps {
  initialData?: TBill
  userId?: number
  billTypes: TBillType[]
  onSuccess?: () => void
}

export function BillForm({ initialData, userId, billTypes, onSuccess }: BillFormProps) {
  const router = useRouter()
  const { addBill, updateBill } = useBills({userId: userId!})
  const { toast } = useToast()

  const form = useForm<BillFormValues>({
    resolver: zodResolver(billFormSchema),
    defaultValues: initialData
      ? {
          typeId: initialData.typeId,
          dateIssued: new Date(initialData.dateIssued).toISOString().split("T")[0],
          amount: initialData.amount.toString(),
          paid: initialData.paid,
        }
      : {
          typeId: 0,
          dateIssued: new Date().toISOString().split("T")[0],
          amount: "",
          paid: false,
        },
  })

  const onSubmit = async (values: BillFormValues) => {
    try {
      if (initialData) {
        await updateBill.mutateAsync({
          id: initialData.id,
          typeId: values.typeId,
          dateIssued: values.dateIssued,
          amount: values.amount,
          paid: values.paid,
        })
        toast({
          title: "Success",
          description: "Bill updated successfully",
          className: "bg-green-500 text-white",
        })
      } else {
        await addBill.mutateAsync({
          userId: userId!,
          typeId: values.typeId,
          dateIssued: values.dateIssued,
          amount: values.amount,
          paid: values.paid,
        })
        toast({
          title: "Success",
          description: "Bill added successfully",
          className: "bg-green-500 text-white",
        })
      }
      form.reset()
      onSuccess?.()
    } catch (error) {
      console.error("Failed to save bill:", error)
      toast({
        title: "Error",
        description: "Failed to save bill. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="typeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bill Type</FormLabel>
              <Select 
                onValueChange={(value) => field.onChange(Number(value))} 
                defaultValue={field.value.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select bill type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {billTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id.toString()}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dateIssued"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date Issued</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="paid"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={(value) => field.onChange(value === "true")} defaultValue={field.value.toString()}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="true">Paid</SelectItem>
                  <SelectItem value="false">Unpaid</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          disabled={addBill.isPending || updateBill.isPending}
        >
          {initialData ? "Update Bill" : "Add Bill"}
        </Button>
      </form>
    </Form>
  )
}
