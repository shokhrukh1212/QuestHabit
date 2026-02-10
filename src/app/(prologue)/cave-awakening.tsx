/**
 * P.1 — Cave Awakening
 * Design ref: designs/Cave Awakening.png
 *
 * Pure black background. Pixel-art character with breathing animation.
 * RPG dialogue box with typing effect. "Tap to stand up" button with pulse.
 * ZERO app chrome.
 */

import { useCallback, useState } from "react";
import { Text, View } from "react-native";
import { MotiView } from "moti";
import { router } from "expo-router";

import { RPGDialogueBox } from "@/components/ui/RPGDialogueBox";
import { ScreenWrapper } from "@/components/ui/ScreenWrapper";
import { StoneButton } from "@/components/ui/StoneButton";
import { usePrologueStore } from "@/stores/prologue-store";

const DIALOGUE_TEXT =
  "You wake up in a dark cave. Cold stone beneath you. You don't remember how you got here.";

export default function CaveAwakening() {
  const setStep = usePrologueStore((s) => s.setStep);
  const [typingDone, setTypingDone] = useState(false);

  const handleStandUp = useCallback(() => {
    setStep("character_mirror");
    router.push("/(prologue)/character-mirror");
  }, [setStep]);

  return (
    <ScreenWrapper bgColor="#000000" fullScreen>
      <View className="flex-1 justify-center items-center">
        {/* Character sprite with breathing/idle animation */}
        <MotiView
          from={{ scale: 0.95, opacity: 0.8 }}
          animate={{ scale: 1.05, opacity: 1 }}
          transition={{
            type: "timing",
            duration: 2000,
            loop: true,
          }}
          style={{ marginBottom: 40 }}
        >
          {/* Placeholder pixel character — purple-toned mysterious figure */}
          <View
            style={{
              width: 80,
              height: 80,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 64 }}>🧙</Text>
          </View>
        </MotiView>

        {/* Dialogue box */}
        <View style={{ width: "100%", marginBottom: 32 }}>
          <RPGDialogueBox
            text={DIALOGUE_TEXT}
            typing
            typingSpeed={35}
            onTypingComplete={() => setTypingDone(true)}
          />
        </View>

        {/* CTA button — appears after typing completes */}
        {typingDone && (
          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "timing", duration: 500 }}
            style={{ paddingHorizontal: 48 }}
          >
            <StoneButton
              label="Tap to stand up"
              onPress={handleStandUp}
              pulse
            />
          </MotiView>
        )}
      </View>
    </ScreenWrapper>
  );
}
