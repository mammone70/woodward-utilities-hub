"use client"

import { createClient } from "@/lib/supabase/client"
import { Button } from "../ui/button"
import { FcGoogle } from "react-icons/fc"
import { useState } from "react"

export default function GoogleSignInButton() {
    const [isLoading, setIsLoading] = useState(false)
    const handleSignInWithGoogle = async () => {
      const supabase = await createClient()

      try {
        setIsLoading(true)
        await supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo: `${window.location.origin}/auth/callback?next=/admin`,
          },
        })
      } catch (error) {
        console.error("Error signing in with Google:", error)
      } finally {
        setIsLoading(false)
      }
    }

    return (
        <Button
            variant="outline"
            className="w-full"
            onClick={handleSignInWithGoogle}
            disabled={isLoading}
            >
            <FcGoogle className="mr-2 h-4 w-4" />
            Continue with Google
        </Button>
    )
}
