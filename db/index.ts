import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import { users } from "./schemas/users"
import { bills } from "./schemas/bills"
import { payments } from "./schemas/payments"
import { billTypes } from "./schemas/bill-types"

// Initialize Supabase client
const connectionString = process.env.DATABASE_URL!

// Create postgres client
const client = postgres(
    connectionString,
    {
        ssl: 'require'
    }
)

// Create drizzle instance
export const db = drizzle(client,
    {
        schema: {
            users,
            bills,
            payments,
            billTypes
        }
    })

// // Export types
// export type User = typeof users.$inferSelect
// export type NewUser = typeof users.$inferInsert
// export type Bill = typeof bills.$inferSelect
// export type NewBill = typeof bills.$inferInsert
// export type Payment = typeof payments.$inferSelect
// export type NewPayment = typeof payments.$inferInsert 