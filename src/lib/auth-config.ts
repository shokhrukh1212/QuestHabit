/**
 * Auth configuration — redirect URIs, provider IDs, and feature gate contexts.
 * Single source of truth for all auth-related constants.
 */

import { makeRedirectUri } from "expo-auth-session";

import type { ComponentProps } from "react";
import type { Ionicons } from "@expo/vector-icons";

type IoniconsName = ComponentProps<typeof Ionicons>["name"];

/** OAuth redirect URI — used by the Google OAuth flow. */
export const REDIRECT_URI = makeRedirectUri({
  scheme: "questhabit",
  path: "auth/callback",
});

/** Supported auth providers. */
export type AuthProvider = "google" | "apple";

/**
 * Context-specific copy for feature-gated auth prompts.
 * Each context has an icon, title, and message shown when
 * a guest tries to access a gated feature.
 */
export type FeatureGateContext = "party" | "share" | "premium" | "sync";

interface FeatureGateConfig {
  icon: IoniconsName;
  title: string;
  message: string;
}

export const FEATURE_GATE_CONTEXTS: Record<FeatureGateContext, FeatureGateConfig> = {
  party: {
    icon: "people",
    title: "Save Your Hero",
    message: "To fight bosses with friends, save your hero first.",
  },
  share: {
    icon: "share-social",
    title: "Save Your Hero",
    message: "Create your account to share your hero on social media.",
  },
  premium: {
    icon: "diamond",
    title: "Save Your Hero",
    message: "Save your progress to unlock premium features.",
  },
  sync: {
    icon: "cloud-upload",
    title: "Save Your Hero",
    message: "Sign in to play on multiple devices.",
  },
};
