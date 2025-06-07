import { integer, numeric, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";

export const payments = pgTable("payments", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").references(() => users.id).notNull(),
    date: timestamp("date").notNull(),
    amount: numeric("amount").notNull(),
    description: text("description").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
}) 