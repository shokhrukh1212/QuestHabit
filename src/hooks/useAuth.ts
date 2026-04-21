/**
 * useAuth — convenience hook for auth UI components.
 *
 * Wraps the auth service calls with loading/error state
 * and triggers local → authenticated user migration on success.
 */

import { useCallback } from "react";

import type { AuthProvider } from "@/lib/auth-config";
import { signInWithApple, signInWithGoogle } from "@/lib/auth-service";
import { migrateLocalToAuthenticated } from "@/lib/user-migration";
import { useAuthStore } from "@/stores/auth-store";

export function useAuth() {
  const isAuthenticating = useAuthStore((s) => s.isAuthenticating);
  const authError = useAuthStore((s) => s.authError);
  const setAuthenticating = useAuthStore((s) => s.setAuthenticating);
  const setAuthError = useAuthStore((s) => s.setAuthError);
  const setAuthenticated = useAuthStore((s) => s.setAuthenticated);

  const handleSignIn = useCallback(
    async (provider: AuthProvider): Promise<boolean> => {
      setAuthenticating(true);
      setAuthError(null);

      try {
        const result =
          provider === "google"
            ? await signInWithGoogle()
            : await signInWithApple();

        // Update auth store
        setAuthenticated(result.userId, result.email);

        // Migrate local data to the new user ID
        await migrateLocalToAuthenticated(result.userId);

        return true;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Authentication failed";
        setAuthError(message);
        return false;
      } finally {
        setAuthenticating(false);
      }
    },
    [setAuthenticating, setAuthError, setAuthenticated],
  );

  const clearError = useCallback(() => {
    setAuthError(null);
  }, [setAuthError]);

  return {
    handleSignIn,
    isAuthenticating,
    authError,
    clearError,
  };
}
