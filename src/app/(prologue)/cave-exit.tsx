/**
 * P.7 — Cave Exit / World Reveal
 * Design ref: designs/Cave Exit - World Reveal.png
 *
 * THE emotional payoff — maximum contrast from dark cave to bright world.
 * Full pixel-art landscape scene image. "Begin Your Journey" gold button.
 */

import { useCallback } from "react";
import { Text, View } from "react-native";
import { Image } from "expo-image";
import { MotiView } from "moti";
import { router } from "expo-router";

import { ScreenWrapper } from "@/components/ui/ScreenWrapper";
import { StoneButton } from "@/components/ui/StoneButton";
import { sceneImages } from "@/lib/assets";
import { usePrologueStore } from "@/stores/prologue-store";

export default function CaveExit() {
  const setStep = usePrologueStore((s) => s.setStep);
  const totalXp = usePrologueStore((s) => s.totalXpEarned);

  const handleBeginJourney = useCallback(() => {
    setStep("completed");
    router.replace("/(tabs)/quest-path");
  }, [setStep]);

  return (
    <ScreenWrapper bgColor="#0D0D1A" fullScreen>
      <View className="flex-1">
        {/* Landscape scene — full pixel-art world reveal */}
        <View style={{ flex: 1, position: "relative" }}>
          <Image
            source={sceneImages.caveExit}
            style={{ width: "100%", height: "100%" }}
            contentFit="cover"
          />

          {/* XP earned overlay */}
          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: "timing", duration: 1000, delay: 1000 }}
            style={{ position: "absolute", top: 60, alignSelf: "center" }}
          >
            <Text
              style={{
                color: "#F4A261",
                fontSize: 20,
                fontWeight: "800",
                textShadowColor: "rgba(0, 0, 0, 0.7)",
                textShadowOffset: { width: 0, height: 2 },
                textShadowRadius: 8,
              }}
            >
              {totalXp} XP Earned
            </Text>
          </MotiView>
        </View>

        {/* Text + CTA section */}
        <View
          style={{
            paddingHorizontal: 24,
            paddingBottom: 48,
            paddingTop: 24,
            backgroundColor: "#0D0D1A",
          }}
        >
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 18,
              fontWeight: "500",
              textAlign: "center",
              lineHeight: 28,
              marginBottom: 32,
            }}
          >
            You&apos;ve escaped. This is your world now. Your quests begin
            tomorrow. Rest tonight. Your journey starts at dawn.
          </Text>

          <StoneButton
            label="Begin Your Journey"
            onPress={handleBeginJourney}
            variant="gold"
            pulse
          />
        </View>
      </View>
    </ScreenWrapper>
  );
}
