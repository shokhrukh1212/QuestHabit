/**
 * D.3 — Completion Celebration
 * Design ref: designs/Completion Celebration Screen.png
 *
 * Full-screen overlay after confirming habit completion.
 * Shows "+50 XP", stat bonus, streak count.
 * Auto-dismisses after ~2.5s.
 */

import { useEffect } from "react";
import { Text, View } from "react-native";
import { Image, type ImageSource } from "expo-image";
import { MotiView } from "moti";

import { XPBar } from "@/components/ui/XPBar";
import { useXpProgress } from "@/stores/character-store";

interface CompletionCelebrationProps {
  xp: number;
  statName: string;
  statBonus: number;
  streak: number;
  completionScene?: ImageSource;
  onDone: () => void;
}

export function CompletionCelebration({
  xp,
  statName,
  statBonus,
  streak,
  completionScene,
  onDone,
}: CompletionCelebrationProps) {
  const { xpIntoLevel, xpNeeded } = useXpProgress();

  useEffect(() => {
    const timer = setTimeout(onDone, 2500);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#000000",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
      }}
    >
      {/* XP text — large gold floating up */}
      <MotiView
        from={{ translateY: 0, opacity: 0 }}
        animate={{ translateY: -40, opacity: 1 }}
        transition={{ type: "timing", duration: 800 }}
      >
        <Text
          style={{
            color: "#F4A261",
            fontSize: 56,
            fontWeight: "900",
            textShadowColor: "rgba(244, 162, 97, 0.5)",
            textShadowOffset: { width: 0, height: 0 },
            textShadowRadius: 20,
          }}
        >
          +{xp} XP
        </Text>
      </MotiView>

      {/* Stat bonus + streak */}
      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "timing", duration: 600, delay: 400 }}
        style={{
          flexDirection: "row",
          gap: 20,
          marginTop: 16,
          marginBottom: 40,
        }}
      >
        <Text
          style={{
            color: "#E74C3C",
            fontSize: 16,
            fontWeight: "700",
          }}
        >
          +{statBonus} {statName}
        </Text>
        {streak > 0 && (
          <Text
            style={{
              color: "#F4A261",
              fontSize: 16,
              fontWeight: "700",
            }}
          >
            🔥 {streak} day streak
          </Text>
        )}
      </MotiView>

      {/* Completion scene illustration */}
      {completionScene && (
        <MotiView
          from={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "timing", duration: 500, delay: 200 }}
        >
          <Image
            source={completionScene}
            style={{ width: 300, height: 220 }}
            contentFit="contain"
          />
        </MotiView>
      )}

      {/* XP bar at bottom */}
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 600, delay: 600 }}
        style={{
          position: "absolute",
          bottom: 60,
          left: 24,
          right: 24,
        }}
      >
        <XPBar
          current={xpIntoLevel}
          max={xpNeeded}
          height={10}
          color="#2ECC71"
        />
      </MotiView>
    </View>
  );
}
