/**
 * D.4 — Missed Habit / Mid-Path Night Scene
 * Design ref: designs/Missed Habit - Mid-Path Night Scene.png
 *
 * Shows when opening app after incomplete previous day.
 * Night scene with character by campfire. Melancholic but hopeful.
 * NEVER shaming — always encouraging. "Onward."
 */

import { Text, View } from "react-native";
import { Image } from "expo-image";
import { MotiView } from "moti";

import { ScreenWrapper } from "@/components/ui/ScreenWrapper";
import { StoneButton } from "@/components/ui/StoneButton";
import { sceneImages } from "@/lib/assets";
import { useCharacterStore } from "@/stores/character-store";

interface MissedHabitSceneProps {
  onDismiss: () => void;
}

export function MissedHabitScene({ onDismiss }: MissedHabitSceneProps) {
  const character = useCharacterStore((s) => s.character);
  const className = character?.characterClass
    ? character.characterClass.charAt(0).toUpperCase() +
      character.characterClass.slice(1)
    : "Adventurer";

  return (
    <ScreenWrapper bgColor="#0A0A14" fullScreen>
      <View className="flex-1 justify-end">
        {/* Night scene */}
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Full missed habit night scene */}
          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: "timing", duration: 1000 }}
            style={{ width: "100%", height: "100%" }}
          >
            <Image
              source={sceneImages.missedHabitNight}
              style={{ width: "100%", height: "100%" }}
              contentFit="cover"
            />
          </MotiView>
        </View>

        {/* Message — hopeful, never shaming */}
        <View style={{ paddingHorizontal: 24, paddingBottom: 48 }}>
          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: "timing", duration: 800, delay: 500 }}
          >
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 18,
                lineHeight: 28,
                textAlign: "center",
                marginBottom: 32,
              }}
            >
              You didn&apos;t reach camp last night. But a new day means a new
              path. Onward, {className}.
            </Text>
          </MotiView>

          <MotiView
            from={{ opacity: 0, translateY: 10 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "timing", duration: 500, delay: 1000 }}
          >
            <StoneButton
              label="Start Today's Quest"
              onPress={onDismiss}
              pulse
            />
          </MotiView>
        </View>
      </View>
    </ScreenWrapper>
  );
}
