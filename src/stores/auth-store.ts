/**
 * Auth store — tracks authentication state, guest metadata, and prompt tracking.
 *
 * Persists to AsyncStorage for guest-related metadata (save prompt dismissals,
 * urgency nudge tracking). Supabase handles its own session persistence.
 */

import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { SubscriptionTier } from "@/types/game";

// --- State ---

interface AuthState {
  /** Whether the user is playing as a guest (no account). */
  isGuest: boolean;
  /** Whether the user has an authenticated Supabase session. */
  isAuthenticated: boolean;
  /** Supabase user ID (null for guests). */
  userId: string | null;
  /** User email from social auth provider. */
  email: string | null;
  /** Subscription tier (free or premium). */
  subscriptionTier: SubscriptionTier;

  // Save prompt tracking (A.1)
  /** Level at which user last dismissed "Not now" on the save prompt. */
  lastSavePromptLevel: number | null;
  /** Total times the save prompt has been shown (for analytics). */
  savePromptShownCount: number;

  // Urgency nudge tracking (A.3)
  /** Date (YYYY-MM-DD) when the urgency nudge was last dismissed. */
  urgencyNudgeDismissedDate: string | null;
  /** Total times the urgency nudge has been dismissed. */
  urgencyNudgeDismissedCount: number;

  // Transient auth flow state (not persisted)
  /** Whether an auth operation is in progress. */
  isAuthenticating: boolean;
  /** Error message from the last auth attempt. */
  authError: string | null;
}

// --- Actions ---

interface AuthActions {
  /** Set the user as authenticated with their Supabase credentials. */
  setAuthenticated: (userId: string, email: string) => void;
  /** Reset to guest state (e.g. after sign out). */
  setGuest: () => void;
  /** Update the subscription tier. */
  setSubscriptionTier: (tier: SubscriptionTier) => void;

  // Save prompt (A.1)
  /**
   * Record that the user dismissed the save prompt at the given level.
   * The prompt won't appear again until the next level-up.
   */
  dismissSavePrompt: (currentLevel: number) => void;
  /**
   * Check whether the save prompt should be shown.
   * True if: guest AND level >= 2 AND (never shown OR new level since last dismissal).
   */
  shouldShowSavePrompt: (currentLevel: number) => boolean;

  // Urgency nudge (A.3)
  /** Record that the user dismissed the urgency nudge today. */
  dismissUrgencyNudge: () => void;
  /**
   * Check whether the urgency nudge should be shown.
   * True if: guest AND dayNumber >= 5 AND (never dismissed OR 3+ days since dismissal).
   */
  shouldShowUrgencyNudge: (dayNumber: number) => boolean;

  // Transient auth flow
  setAuthenticating: (value: boolean) => void;
  setAuthError: (error: string | null) => void;

  /** Full reset (e.g. dev reset or account deletion). */
  reset: () => void;
}

// --- Helpers ---

function getTodayString(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

// --- Initial State ---

const initialState: AuthState = {
  isGuest: true,
  isAuthenticated: false,
  userId: null,
  email: null,
  subscriptionTier: "free",
  lastSavePromptLevel: null,
  savePromptShownCount: 0,
  urgencyNudgeDismissedDate: null,
  urgencyNudgeDismissedCount: 0,
  isAuthenticating: false,
  authError: null,
};

// --- Store ---

const STORAGE_KEY = "questhabit-auth";

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      setAuthenticated: (userId, email) =>
        set({
          isGuest: false,
          isAuthenticated: true,
          userId,
          email,
          authError: null,
        }),

      setGuest: () =>
        set({
          isGuest: true,
          isAuthenticated: false,
          userId: null,
          email: null,
        }),

      setSubscriptionTier: (tier) => set({ subscriptionTier: tier }),

      // --- Save Prompt (A.1) ---

      dismissSavePrompt: (currentLevel) =>
        set((state) => ({
          lastSavePromptLevel: currentLevel,
          savePromptShownCount: state.savePromptShownCount + 1,
        })),

      shouldShowSavePrompt: (currentLevel) => {
        const { isGuest, lastSavePromptLevel } = get();
        if (!isGuest) return false;
        if (currentLevel < 2) return false;
        if (lastSavePromptLevel === null) return true;
        return currentLevel > lastSavePromptLevel;
      },

      // --- Urgency Nudge (A.3) ---

      dismissUrgencyNudge: () =>
        set((state) => ({
          urgencyNudgeDismissedDate: getTodayString(),
          urgencyNudgeDismissedCount: state.urgencyNudgeDismissedCount + 1,
        })),

      shouldShowUrgencyNudge: (dayNumber) => {
        const { isGuest, urgencyNudgeDismissedDate } = get();
        if (!isGuest) return false;
        if (dayNumber < 5) return false;
        if (!urgencyNudgeDismissedDate) return true;

        // Re-show after 3 days since dismissal
        const dismissed = new Date(urgencyNudgeDismissedDate + "T00:00:00");
        const now = new Date();
        const diffMs = now.getTime() - dismissed.getTime();
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        return diffDays >= 3;
      },

      // --- Transient ---

      setAuthenticating: (value) => set({ isAuthenticating: value }),
      setAuthError: (error) => set({ authError: error }),

      reset: () => set(initialState),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => AsyncStorage),
      // Only persist auth identity + prompt metadata. Transient fields are excluded.
      partialize: (state) => ({
        isGuest: state.isGuest,
        isAuthenticated: state.isAuthenticated,
        userId: state.userId,
        email: state.email,
        subscriptionTier: state.subscriptionTier,
        lastSavePromptLevel: state.lastSavePromptLevel,
        savePromptShownCount: state.savePromptShownCount,
        urgencyNudgeDismissedDate: state.urgencyNudgeDismissedDate,
        urgencyNudgeDismissedCount: state.urgencyNudgeDismissedCount,
      }),
    },
  ),
);
