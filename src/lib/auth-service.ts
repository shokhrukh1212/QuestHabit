/**
 * Auth service — handles Google OAuth and Apple Sign In via Supabase.
 *
 * Google: expo-auth-session redirect flow → extract tokens → setSession
 * Apple: native AppleAuthentication → identityToken → signInWithIdToken
 *
 * Call `maybeCompleteAuthSession` at module top level so the OAuth
 * redirect can close the browser popup automatically.
 */

import * as AppleAuthentication from "expo-apple-authentication";
import * as WebBrowser from "expo-web-browser";

import { REDIRECT_URI } from "@/lib/auth-config";
import { supabase } from "@/lib/supabase";

// Allow the web browser auth session to complete when redirected back.
WebBrowser.maybeCompleteAuthSession();

// --- Types ---

interface AuthResult {
  userId: string;
  email: string;
}

// --- Google OAuth ---

/**
 * Sign in with Google via Supabase OAuth.
 *
 * Flow:
 * 1. Ask Supabase for an OAuth URL (with PKCE).
 * 2. Open it in an in-app browser via expo-web-browser.
 * 3. The browser redirects back to our custom scheme (questhabit://auth/callback).
 * 4. Extract the access_token + refresh_token from the URL fragment.
 * 5. Hand the tokens to Supabase so it creates/resumes a session.
 */
export async function signInWithGoogle(): Promise<AuthResult> {
  // 1. Get the OAuth URL from Supabase
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: REDIRECT_URI,
      skipBrowserRedirect: true, // we handle the browser ourselves
    },
  });

  if (error || !data.url) {
    throw new Error(error?.message ?? "Failed to create Google OAuth URL");
  }

  // 2. Open browser and wait for redirect
  const result = await WebBrowser.openAuthSessionAsync(data.url, REDIRECT_URI);

  if (result.type !== "success" || !result.url) {
    throw new Error("Google sign-in was cancelled or failed");
  }

  // 3. Parse tokens from the redirect URL
  const url = new URL(result.url);

  // Supabase appends tokens as a hash fragment: #access_token=...&refresh_token=...
  const params = new URLSearchParams(url.hash.substring(1));
  const accessToken = params.get("access_token");
  const refreshToken = params.get("refresh_token");

  if (!accessToken || !refreshToken) {
    throw new Error("Missing tokens in OAuth redirect");
  }

  // 4. Set the session in Supabase
  const { data: sessionData, error: sessionError } =
    await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    });

  if (sessionError || !sessionData.user) {
    throw new Error(sessionError?.message ?? "Failed to set session");
  }

  return {
    userId: sessionData.user.id,
    email: sessionData.user.email ?? "",
  };
}

// --- Apple Sign In ---

/**
 * Sign in with Apple via the native iOS dialog + Supabase.
 *
 * Flow:
 * 1. Present the native Apple Sign In dialog.
 * 2. Get the identityToken (JWT) from Apple.
 * 3. Send it to Supabase as an ID token for the "apple" provider.
 */
export async function signInWithApple(): Promise<AuthResult> {
  // 1. Native Apple dialog
  const credential = await AppleAuthentication.signInAsync({
    requestedScopes: [
      AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
      AppleAuthentication.AppleAuthenticationScope.EMAIL,
    ],
  });

  if (!credential.identityToken) {
    throw new Error("Apple Sign In did not return an identity token");
  }

  // 2. Exchange the Apple identity token with Supabase
  const { data, error } = await supabase.auth.signInWithIdToken({
    provider: "apple",
    token: credential.identityToken,
  });

  if (error || !data.user) {
    throw new Error(error?.message ?? "Failed to sign in with Apple");
  }

  // Apple only provides email on the FIRST sign-in. After that it's null.
  // Fall back to whatever Supabase has stored.
  const email = credential.email ?? data.user.email ?? "";

  return {
    userId: data.user.id,
    email,
  };
}

// --- Sign Out ---

export async function signOut(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
}

// --- Session Check ---

export async function getCurrentSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    throw new Error(error.message);
  }
  return data.session;
}
