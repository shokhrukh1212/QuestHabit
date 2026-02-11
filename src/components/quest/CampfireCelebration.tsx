/**
 * D.6 — Campfire Celebration (All Quests Done)
 * Design ref: designs/All Quests Done (Campfire Celebration).png
 *
 * Full-screen cozy campfire scene. The reward for a perfect day.
 * Warm, peaceful, satisfying. Users should WANT to see this every night.
 */

import { Text, View } from "react-native";
import { MotiView } from "moti";

import { ScreenWrapper } from "@/components/ui/ScreenWrapper";
import { StoneButton } from "@/components/ui/StoneButton";
import { PERFECT_DAY_BONUS } from "@/lib/game-rules";

interface CampfireCelebrationProps {
  onDone: () => void;
}

export function CampfireCelebration({ onDone }: CampfireCelebrationProps) {
  return (
    <ScreenWrapper bgColor="#0A0A14" fullScreen>
      <View className="flex-1 justify-end">
        {/* Celebration scene */}
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Stars */}
          <MotiView
            from={{ opacity: 0.4 }}
            animate={{ opacity: 1 }}
            transition={{ type: "timing", duration: 2000, loop: true }}
            style={{ position: "absolute", top: "12%" }}
          >
            <Text style={{ fontSize: 14, color: "#FFFFFF" }}>✧ ✦ ✧ ✦ ✧</Text>
          </MotiView>

          {/* Cozy campfire scene */}
          <MotiView
            from={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "timing", duration: 1200 }}
          >
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 64 }}>🏕️</Text>
              {/* Warm glow effect */}
              <View
                style={{
                  position: "absolute",
                  bottom: -10,
                  width: 120,
                  height: 60,
                  borderRadius: 60,
                  backgroundColor: "rgba(244, 162, 97, 0.15)",
                }}
              />
            </View>
          </MotiView>
        </View>

        {/* Celebration text + button */}
        <View style={{ paddingHorizontal: 24, paddingBottom: 48 }}>
          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: "timing", duration: 800, delay: 600 }}
          >
            {/* Message card */}
            <View
              style={{
                backgroundColor: "rgba(13, 13, 26, 0.85)",
                borderRadius: 12,
                padding: 20,
                marginBottom: 24,
              }}
            >
              <Text
                style={{
                  color: "#F4A261",
                  fontSize: 18,
                  fontWeight: "700",
                  textAlign: "center",
                  lineHeight: 28,
                }}
              >
                All quests conquered. You earned your rest. +{PERFECT_DAY_BONUS}{" "}
                bonus XP.
              </Text>
            </View>
          </MotiView>

          <MotiView
            from={{ opacity: 0, translateY: 10 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "timing", duration: 500, delay: 1200 }}
          >
            <StoneButton label="Done" onPress={onDone} variant="gold" />
          </MotiView>
        </View>
      </View>
    </ScreenWrapper>
  );
}
