import { useCallback, useState } from "react";
import {
  Alert,
  DevSettings,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { FeatureGatedAuth } from "@/components/auth/FeatureGatedAuth";
import { StoneButton } from "@/components/ui/StoneButton";
import { signOut } from "@/lib/auth-service";
import { useAuthStore } from "@/stores/auth-store";
import { useCharacterStore } from "@/stores/character-store";
import { usePrologueStore } from "@/stores/prologue-store";
import { useQuestStore } from "@/stores/quest-store";

const SECURESTORE_KEYS_TO_CLEAR = [
  "token",
  "access_token",
  "refresh_token",
  "auth_token",
  "onboarding_done",
  "hasOnboarded",
] as const;

export default function SettingsScreen() {
  const [isResetting, setIsResetting] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const isGuest = useAuthStore((s) => s.isGuest);
  const email = useAuthStore((s) => s.email);
  const resetAuthStore = useAuthStore((s) => s.reset);
  const setGuest = useAuthStore((s) => s.setGuest);
  const resetCharacterStore = useCharacterStore((s) => s.reset);
  const resetPrologueStore = usePrologueStore((s) => s.reset);
  const resetQuestStore = useQuestStore((s) => s.reset);

  const doReset = useCallback(async () => {
    if (isResetting) return;
    setIsResetting(true);

    try {
      await AsyncStorage.clear();
      await Promise.all(
        SECURESTORE_KEYS_TO_CLEAR.map((key) =>
          SecureStore.deleteItemAsync(key),
        ),
      );

      resetAuthStore();
      resetCharacterStore();
      resetPrologueStore();
      resetQuestStore();

      router.replace("/(prologue)/cave-awakening");
      DevSettings.reload();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unknown reset error.";
      Alert.alert("Reset failed", message);
      setIsResetting(false);
    }
  }, [
    isResetting,
    resetAuthStore,
    resetCharacterStore,
    resetPrologueStore,
    resetQuestStore,
  ]);

  const handleResetPress = useCallback(() => {
    Alert.alert(
      "Reset onboarding?",
      "This will clear all local progress and restart from the first screen.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: () => {
            void doReset();
          },
        },
      ],
    );
  }, [doReset]);

  const handleSignOut = useCallback(async () => {
    setIsSigningOut(true);
    try {
      await signOut();
      setGuest();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Sign out failed";
      Alert.alert("Sign Out Failed", message);
    } finally {
      setIsSigningOut(false);
    }
  }, [setGuest]);

  if (showAuthModal) {
    return (
      <FeatureGatedAuth
        context="sync"
        onAuthenticated={() => setShowAuthModal(false)}
        onDismiss={() => setShowAuthModal(false)}
      />
    );
  }

  return (
    <View className="flex-1 bg-bg-primary">
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingVertical: 32,
          paddingHorizontal: 20,
        }}
      >
        <Text
          style={{
            color: "#FFFFFF",
            fontSize: 24,
            fontWeight: "700",
            textAlign: "center",
            marginBottom: 24,
          }}
        >
          Settings
        </Text>

        {/* Auth section */}
        <View
          style={{
            backgroundColor: "#1A1A2E",
            borderRadius: 12,
            padding: 16,
            marginBottom: 16,
          }}
        >
          {isGuest ? (
            <>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 12,
                }}
              >
                <Ionicons name="shield-outline" size={24} color="#F4A261" />
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontSize: 16,
                      fontWeight: "600",
                    }}
                  >
                    Save Your Progress
                  </Text>
                  <Text
                    style={{
                      color: "#7F8C8D",
                      fontSize: 12,
                      marginTop: 2,
                    }}
                  >
                    Sign in to sync your adventure across devices.
                  </Text>
                </View>
              </View>
              <StoneButton
                label="Save Progress"
                onPress={() => setShowAuthModal(true)}
                variant="gold"
              />
            </>
          ) : (
            <>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 12,
                }}
              >
                <Ionicons name="person-circle-outline" size={24} color="#6C5CE7" />
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontSize: 16,
                      fontWeight: "600",
                    }}
                  >
                    Signed In
                  </Text>
                  <Text
                    style={{
                      color: "#7F8C8D",
                      fontSize: 12,
                      marginTop: 2,
                    }}
                  >
                    {email || "No email"}
                  </Text>
                </View>
              </View>
              <StoneButton
                label="Sign Out"
                onPress={handleSignOut}
                variant="secondary"
                loading={isSigningOut}
              />
            </>
          )}
        </View>

        {/* Dev reset — development only */}
        {__DEV__ && (
          <Pressable
            onPress={handleResetPress}
            disabled={isResetting}
            style={{
              marginTop: 16,
              borderWidth: 1.5,
              borderColor: "#C0392B",
              borderRadius: 10,
              backgroundColor: isResetting
                ? "rgba(192, 57, 43, 0.2)"
                : "rgba(192, 57, 43, 0.12)",
              paddingVertical: 10,
              paddingHorizontal: 16,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#F5B7B1",
                fontSize: 14,
                fontWeight: "700",
              }}
            >
              {isResetting ? "Resetting..." : "Reset onboarding (DEV)"}
            </Text>
          </Pressable>
        )}
      </ScrollView>
    </View>
  );
}
