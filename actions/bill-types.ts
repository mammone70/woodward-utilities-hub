"use server"

import { db } from "@/db";
import { billTypes } from "@/db/schemas/bill-types";

export async function getBillTypes() {
    try {
        const types = await db.select().from(billTypes).orderBy(billTypes.name);
        return { data: types, error: null };
    } catch (error) {
        console.error("Error fetching bill types:", error);
        return { data: null, error: "Failed to fetch bill types" };
    }
} 