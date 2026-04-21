/**
 * A.2 — Feature-Gated Auth (Contextual Prompt)
 * Design ref: designs/Feature-Gated Auth Contextual Prompt.png
 *
 * Modal overlay shown when a guest tries to access a gated feature.
 * Centered dark card with context-specific icon, message, and auth buttons.
 */

import { Platform, Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MotiView } from "moti";

import { useAuth } from "@/hooks/useAuth";
import {
  FEATURE_GATE_CONTEXTS,
  type FeatureGateContext,
} from "@/lib/auth-config";

interface FeatureGatedAuthProps {
  context: FeatureGateContext;
  onAuthenticated: () => void;
  onDismiss: () => void;
}

export function FeatureGatedAuth({
  context,
  onAuthenticated,
  onDismiss,
}: FeatureGatedAuthProps) {
  const config = FEATURE_GATE_CONTEXTS[context];
  const { handleSignIn, isAuthenticating, authError, clearError } = useAuth();

  const onProviderPress = async (provider: "google" | "apple") => {
    clearError();
    const success = await handleSignIn(provider);
    if (success) onAuthenticated();
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
      }}
    >
      <MotiView
        from={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "timing", duration: 300 }}
        style={{
          backgroundColor: "#1A1A2E",
          borderRadius: 20,
          borderWidth: 2,
          borderColor: "#6C5CE7",
          padding: 28,
          width: "100%",
          maxWidth: 340,
          alignItems: "center",
        }}
      >
        {/* Context icon */}
        <View
          style={{
            width: 64,
            height: 64,
            borderRadius: 32,
            backgroundColor: "rgba(108, 92, 231, 0.15)",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 16,
          }}
        >
          <Ionicons name={config.icon} size={32} color="#6C5CE7" />
        </View>

        {/* Title & message */}
        <Text
          style={{
            color: "#FFFFFF",
            fontSize: 20,
            fontWeight: "700",
            textAlign: "center",
            marginBottom: 8,
          }}
        >
          {config.title}
        </Text>
        <Text
          style={{
            color: "#B0B0C0",
            fontSize: 14,
            textAlign: "center",
            lineHeight: 20,
            marginBottom: 24,
          }}
        >
          {config.message}
        </Text>

        {/* Auth buttons */}
        <View style={{ width: "100%", gap: 12 }}>
          <Pressable
            onPress={() => onProviderPress("google")}
            disabled={isAuthenticating}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#FFFFFF",
              borderRadius: 12,
              paddingVertical: 14,
              gap: 10,
              opacity: isAuthenticating ? 0.6 : 1,
            }}
          >
            <Ionicons name="logo-google" size={20} color="#4285F4" />
            <Text
              style={{ color: "#1A1A2E", fontSize: 16, fontWeight: "600" }}
            >
              Continue with Google
            </Text>
          </Pressable>

          {Platform.OS === "ios" && (
            <Pressable
              onPress={() => onProviderPress("apple")}
              disabled={isAuthenticating}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#000000",
                borderRadius: 12,
                borderWidth: 1,
                borderColor: "#3A3A5E",
                paddingVertical: 14,
                gap: 10,
                opacity: isAuthenticating ? 0.6 : 1,
              }}
            >
              <Ionicons name="logo-apple" size={20} color="#FFFFFF" />
              <Text
                style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "600" }}
              >
                Continue with Apple
              </Text>
            </Pressable>
          )}

          {authError && (
            <Text
              style={{
                color: "#E74C3C",
                fontSize: 13,
                textAlign: "center",
                marginTop: 4,
              }}
            >
              {authError}
            </Text>
          )}
        </View>

        {/* "Not now" dismiss */}
        <Pressable
          onPress={onDismiss}
          disabled={isAuthenticating}
          style={{ marginTop: 20 }}
        >
          <Text style={{ color: "#7F8C8D", fontSize: 13 }}>Not now</Text>
        </Pressable>
      </MotiView>
    </View>
  );
}
