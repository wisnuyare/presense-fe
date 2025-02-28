import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface User {
  name: string;
  role: "employee" | "hr";
}

interface AuthState {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

console.log(API_BASE_URL);

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,

      login: async (username: string, password: string) => {
        try {
          const res = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ username, password }),
          });

          if (!res.ok) {
            throw new Error("Login failed");
          }

          const data = await res.json();
          set({ user: data });
        } catch (error) {
          console.error("Login Error:", error);
          set({ user: null });
          throw error;
        }
      },

      logout: async () => {
        try {
          await fetch(`${API_BASE_URL}/auth/logout`, {
            method: "POST",
            credentials: "include",
          });

          set({ user: null });
        } catch (error) {
          console.error("Logout Error:", error);
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
