import { create } from "zustand";
import type { SubscriptionTier } from "@/types/game";

/**
 * Auth store — tracks authentication and user session state.
 *
 * Zustand pattern: `create` takes a function that receives `set` (to update state).
 * Components use it like: const isGuest = useAuthStore(s => s.isGuest);
 * Selecting specific fields prevents unnecessary re-renders.
 */

interface AuthState {
  isGuest: boolean;
  isAuthenticated: boolean;
  userId: string | null;
  email: string | null;
  subscriptionTier: SubscriptionTier;

  setAuthenticated: (userId: string, email: string) => void;
  setGuest: () => void;
  setSubscriptionTier: (tier: SubscriptionTier) => void;
  reset: () => void;
}

const initialState = {
  isGuest: true,
  isAuthenticated: false,
  userId: null,
  email: null,
  subscriptionTier: "free" as SubscriptionTier,
};

export const useAuthStore = create<AuthState>((set) => ({
  ...initialState,

  setAuthenticated: (userId, email) =>
    set({
      isGuest: false,
      isAuthenticated: true,
      userId,
      email,
    }),

  setGuest: () =>
    set({
      isGuest: true,
      isAuthenticated: false,
      userId: null,
      email: null,
    }),

  setSubscriptionTier: (tier) =>
    set({ subscriptionTier: tier }),

  reset: () => set(initialState),
}));
