import { create } from "zustand"
import type { User } from "@/schemas/user-schema"

interface AuthState {
  user: User | null
  isLoading: boolean
  isAdmin: boolean

  // Actions
  setUser: (user: User | null) => void
  setLoading: (isLoading: boolean) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  isAdmin: false,

  setUser: (user) =>
    set({
      user,
      isAdmin: user?.role === "admin",
      isLoading: false,
    }),
  setLoading: (isLoading) => set({ isLoading }),
}))
