import { boolean, date, integer, numeric, pgTable, serial, timestamp } from "drizzle-orm/pg-core";
import { billTypes } from "./bill-types";

export const bills = pgTable("bills", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").notNull(),
    typeId: integer("type_id").references(() => billTypes.id).notNull(),
    dateIssued: date("date_issued").notNull(),
    amount:
        numeric({
            precision: 100,
            scale: 2,
        })
            .default('0.00')
            .notNull(),
    paid: boolean("paid").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
})
