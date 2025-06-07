import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const billTypes = pgTable("bill_types", {
    id: serial("id").primaryKey(),
    name: text("name").notNull().unique(),
    description: text("description"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
}); 