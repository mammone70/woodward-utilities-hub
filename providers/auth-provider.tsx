"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { useAuthStore } from "@/lib/store/use-auth-store"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, setLoading } = useAuthStore()
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (session) {
          // Get user data including role from our users table
          // const { data: userData, error } = await supabase.from("users").select("*").eq("id", session.user.id).single()
            // if (error) {
          //   console.error("Error fetching user data:", error)
          //   setUser(null)
          // } else {
            setUser({
              id: session.user.id,
              email: session.user.email ?? "",
              displayName: session.user.identities?.[0]?.identity_data?.name,
              avatarUrl: session.user.user_metadata.avatar_url,
              role: session.user.identities?.[0]?.identity_data?.role,
              createdAt: session.user.created_at,
              updatedAt: session.user.updated_at ?? "",
            })
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error("Auth error:", error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()

    // Set up auth state change listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        // Get user data including role from our users table
        // const { data: userData, error } = await supabase.from("users").select("*").eq("id", session.user.id).single()
      
        // if (!error) {
          setUser({
            id: session.user.id,
            email: session.user.email ?? "",
            displayName: session.user.identities?.[0]?.identity_data?.name,
            avatarUrl: session.user.user_metadata.avatar_url,
            role: session.user.identities?.[0]?.identity_data?.role,
            createdAt: session.user.created_at,
            updatedAt: session.user.updated_at ?? "",
          })
        // }
      } else {
        setUser(null)
      }

      // Refresh the page to update server components
      router.refresh()
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase, setUser, setLoading, router])

  return <>{children}</>
}
