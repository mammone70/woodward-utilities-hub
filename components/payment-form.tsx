"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { usePayments } from "@/hooks/use-payments"
import { useToast } from "@/hooks/use-toast"
import { TPayment } from "@/schemas/payments-schemas"

const paymentFormSchema = z.object({
  date: z.string().min(1, "Date is required"),
  amount: z.string().min(1, "Amount is required"),
  description: z.string().min(1, "Description is required"),
})

type PaymentFormValues = z.infer<typeof paymentFormSchema>

interface PaymentFormProps {
  userId: number
  initialData?: TPayment
  onSuccess?: () => void
}

export function PaymentForm({ userId, initialData, onSuccess }: PaymentFormProps) {
  const { addPayment, updatePayment } = usePayments({userId: userId})
  const { toast } = useToast()

  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: initialData
      ? {
          date: new Date(initialData.date).toISOString().split("T")[0],
          amount: initialData.amount.toString(),
          description: initialData.description,
        }
      : {
          date: new Date().toISOString().split("T")[0],
          amount: "",
          description: "",
        },
  })

  const onSubmit = async (values: PaymentFormValues) => {
    try {
      if (initialData) {
        await updatePayment.mutateAsync({
          id: initialData.id,
          date: values.date,
          amount: parseFloat(values.amount),
          description: values.description,
        })
        toast({
          title: "Success",
          description: "Payment updated successfully",
          className: "bg-green-500 text-white",
        })
      } else {
        await addPayment.mutateAsync({
          userId,
          date: values.date,
          amount: parseFloat(values.amount),
          description: values.description,
        })
        toast({
          title: "Success",
          description: "Payment recorded successfully",
          className: "bg-green-500 text-white",
        })
      }
      form.reset()
      onSuccess?.()
    } catch (error) {
      console.error("Failed to save payment:", error)
      toast({
        title: "Error",
        description: "Failed to save payment. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Date</FormLabel>
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          disabled={addPayment.isPending || updatePayment.isPending}
        >
          {initialData ? "Update Payment" : "Record Payment"}
        </Button>
      </form>
    </Form>
  )
}
