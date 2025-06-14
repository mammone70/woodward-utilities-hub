"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { createClient } from "@/lib/supabase/client"
import { useAuthStore } from "@/lib/store/use-auth-store"

import { motion } from "framer-motion"

export function SignOutButton() {
    const [isLoading, setIsLoading] = useState(false)
    const { user } = useAuthStore()

    const handleSignOut = async () => {
        const supabase = createClient()

        try {
            setIsLoading(true)
            await supabase.auth.signOut()
        } catch (error) {
            console.error("Error signing out:", error)
        } finally {
            console.log("signing out")
            setIsLoading(false)
        }
    }

    console.log(user)
    //  if (!user) return null

    return (
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
                onClick={handleSignOut}
                disabled={isLoading}
                variant="outline"
                className="border-amber-600 text-amber-100 hover:bg-amber-800 hover:text-amber-100"
            >
                Sign Out
            </Button>
        </motion.div>
    )
}
