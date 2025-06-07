import { boolean, integer, numeric, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";
import { billTypes } from "./bill-types";

export const bills = pgTable("bills", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").references(() => users.id).notNull(),
    typeId: integer("type_id").references(() => billTypes.id).notNull(),
    dateIssued: timestamp("date_issued").notNull(),
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
