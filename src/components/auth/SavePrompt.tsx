/**
 * A.1 — Save Prompt (Post Level-Up Emotional Trigger)
 * Design ref: designs/Save Prompt (Post Level-Up Emotional Trigger).png
 *
 * Full-screen overlay shown after a level-up when the user is still a guest.
 * Uses the level-up background for continuity, character avatar with gold glow,
 * and Google/Apple sign-in buttons.
 */

import { Platform, Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { MotiView } from "moti";

import { useAuth } from "@/hooks/useAuth";
import { iconImages, sceneImages } from "@/lib/assets";

interface SavePromptProps {
  onAuthenticated: () => void;
  onDismiss: () => void;
}

export function SavePrompt({ onAuthenticated, onDismiss }: SavePromptProps) {
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
        backgroundColor: "#000000",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 32,
      }}
    >
      {/* Background — reuse level-up scene at low opacity */}
      <Image
        source={sceneImages.levelUpCelebration}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.3,
        }}
        contentFit="cover"
      />

      {/* Character avatar with gold glow */}
      <MotiView
        from={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "timing", duration: 500 }}
        style={{ marginBottom: 24 }}
      >
        <View
          style={{
            width: 110,
            height: 110,
            borderRadius: 55,
            backgroundColor: "#1A1A2E",
            borderWidth: 3,
            borderColor: "#F4A261",
            alignItems: "center",
            justifyContent: "center",
            shadowColor: "#F4A261",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.6,
            shadowRadius: 24,
            elevation: 10,
          }}
        >
          <Image
            source={iconImages.characterAvatar}
            style={{ width: 76, height: 76 }}
            contentFit="contain"
          />
        </View>
      </MotiView>

      {/* Narrative message */}
      <MotiView
        from={{ opacity: 0, translateY: 10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 500, delay: 200 }}
        style={{ marginBottom: 32 }}
      >
        <Text
          style={{
            color: "#FFFFFF",
            fontSize: 20,
            fontWeight: "700",
            textAlign: "center",
            marginBottom: 8,
          }}
        >
          Your hero is growing stronger.
        </Text>
        <Text
          style={{
            color: "#B0B0C0",
            fontSize: 15,
            textAlign: "center",
            lineHeight: 22,
          }}
        >
          Don&apos;t let them disappear.{"\n"}Save your progress with one tap.
        </Text>
      </MotiView>

      {/* Auth buttons */}
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 500, delay: 400 }}
        style={{ width: "100%", maxWidth: 300, gap: 12 }}
      >
        {/* Google button */}
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
            paddingHorizontal: 20,
            gap: 10,
            opacity: isAuthenticating ? 0.6 : 1,
          }}
        >
          <Ionicons name="logo-google" size={20} color="#4285F4" />
          <Text style={{ color: "#1A1A2E", fontSize: 16, fontWeight: "600" }}>
            Continue with Google
          </Text>
        </Pressable>

        {/* Apple button — iOS only */}
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
              paddingHorizontal: 20,
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

        {/* Error message */}
        {authError && (
          <Text
            style={{
              color: "#E74C3C",
              fontSize: 13,
              textAlign: "center",
              marginTop: 4,
            }}
          >
            The dark magic interfered... {authError}
          </Text>
        )}
      </MotiView>

      {/* "Not now" dismiss link */}
      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "timing", duration: 400, delay: 600 }}
        style={{ marginTop: 24 }}
      >
        <Pressable onPress={onDismiss} disabled={isAuthenticating}>
          <Text
            style={{
              color: "#7F8C8D",
              fontSize: 13,
              textAlign: "center",
            }}
          >
            Not now — I&apos;ll risk it.
          </Text>
        </Pressable>
      </MotiView>
    </View>
  );
}
