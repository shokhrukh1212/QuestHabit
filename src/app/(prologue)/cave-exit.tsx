/**
 * P.7 — Cave Exit / World Reveal
 * Design ref: designs/Cave Exit - World Reveal.png
 *
 * THE emotional payoff — maximum contrast from dark cave to bright world.
 * Pixel-art landscape with golden sunrise, green hills, campfire + tent.
 * Persists all data and navigates to main app on "Begin Your Journey".
 */

import { useCallback } from "react";
import { Text, View } from "react-native";
import { MotiView } from "moti";
import { router } from "expo-router";

import { ScreenWrapper } from "@/components/ui/ScreenWrapper";
import { StoneButton } from "@/components/ui/StoneButton";
import { usePrologueStore } from "@/stores/prologue-store";

export default function CaveExit() {
  const setStep = usePrologueStore((s) => s.setStep);
  const totalXp = usePrologueStore((s) => s.totalXpEarned);

  const handleBeginJourney = useCallback(() => {
    // Mark prologue as complete — store auto-persists to AsyncStorage
    setStep("completed");
    // Navigate to main app, replacing the entire stack
    router.replace("/(tabs)/quest-path");
  }, [setStep]);

  return (
    <ScreenWrapper bgColor="#0D0D1A" fullScreen>
      <View className="flex-1">
        {/* Landscape scene — bright world reveal */}
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#1a3a2a",
          }}
        >
          {/* Layered parallax-like scene */}
          {/* Sky layer */}
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "60%",
              backgroundColor: "#2d1b69",
            }}
          >
            {/* Sun/sunrise glow */}
            <MotiView
              from={{ opacity: 0.6, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1.05 }}
              transition={{ type: "timing", duration: 3000, loop: true }}
              style={{
                position: "absolute",
                top: "30%",
                alignSelf: "center",
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: "#F4A261",
                shadowColor: "#F4A261",
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.8,
                shadowRadius: 40,
                elevation: 20,
              }}
            />
          </View>

          {/* Hills layer */}
          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "50%",
              backgroundColor: "#2ECC71",
              opacity: 0.3,
              borderTopLeftRadius: 100,
              borderTopRightRadius: 60,
            }}
          />

          {/* Campfire + tent emoji scene */}
          <MotiView
            from={{ opacity: 0, translateY: 30 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "timing", duration: 1500, delay: 500 }}
            style={{
              position: "absolute",
              bottom: "15%",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 48 }}>🏕️</Text>
          </MotiView>

          {/* XP earned summary */}
          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: "timing", duration: 1000, delay: 1000 }}
            style={{ position: "absolute", top: "12%", alignItems: "center" }}
          >
            <Text
              style={{
                color: "#F4A261",
                fontSize: 20,
                fontWeight: "800",
                textShadowColor: "rgba(244, 162, 97, 0.5)",
                textShadowOffset: { width: 0, height: 0 },
                textShadowRadius: 10,
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
