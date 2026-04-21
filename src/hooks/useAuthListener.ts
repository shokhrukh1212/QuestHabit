/**
 * useAuthListener — syncs Supabase auth state changes to Zustand.
 *
 * On mount: checks for an existing Supabase session and hydrates the store.
 * Subscribes to onAuthStateChange for SIGNED_IN / SIGNED_OUT events.
 * Call this once in the root layout.
 */

import { useEffect } from "react";

import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/stores/auth-store";

export function useAuthListener() {
  const setAuthenticated = useAuthStore((s) => s.setAuthenticated);
  const setGuest = useAuthStore((s) => s.setGuest);

  useEffect(() => {
    // Hydrate from existing session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setAuthenticated(session.user.id, session.user.email ?? "");
      }
    });

    // Subscribe to future auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        setAuthenticated(session.user.id, session.user.email ?? "");
      } else if (event === "SIGNED_OUT") {
        setGuest();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setAuthenticated, setGuest]);
}
