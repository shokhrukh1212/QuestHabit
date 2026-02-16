import { useCallback, useState } from "react";
import {
  Alert,
  DevSettings,
  Pressable,
  Text,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";

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

  const resetAuthStore = useAuthStore((s) => s.reset);
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

  return (
    <View className="flex-1 bg-bg-primary items-center justify-center px-6">
      <Text className="text-text-primary text-2xl font-bold">Settings</Text>
      <Text className="text-text-muted text-md mt-sm text-center">
        Configure your adventure
      </Text>

      {__DEV__ && (
        <Pressable
          onPress={handleResetPress}
          disabled={isResetting}
          style={{
            marginTop: 24,
            borderWidth: 1.5,
            borderColor: "#C0392B",
            borderRadius: 10,
            backgroundColor: isResetting
              ? "rgba(192, 57, 43, 0.2)"
              : "rgba(192, 57, 43, 0.12)",
            paddingVertical: 10,
            paddingHorizontal: 16,
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
    </View>
  );
}
