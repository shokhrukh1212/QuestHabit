/**
 * D.5 — Daily Summary
 * Design ref: designs/Daily Summary.png
 *
 * Shows after all quests done (via campfire) or at end of day.
 * Habit list with check/X, XP breakdown, streak count.
 */

import { Text, View } from "react-native";
import { Image } from "expo-image";
import { MotiView } from "moti";

import { ScreenWrapper } from "@/components/ui/ScreenWrapper";
import { StoneButton } from "@/components/ui/StoneButton";
import { XPBar } from "@/components/ui/XPBar";
import { BASE_XP_PER_HABIT, PERFECT_DAY_BONUS } from "@/lib/game-rules";
import { getNarrative } from "@/lib/narrative-text";
import { useXpProgress } from "@/stores/character-store";
import { useQuestStore } from "@/stores/quest-store";

interface DailySummaryProps {
  onDone: () => void;
}

export function DailySummary({ onDone }: DailySummaryProps) {
  const waypoints = useQuestStore((s) => s.waypoints);
  const todayDate = useQuestStore((s) => s.todayDate);
  const { xpIntoLevel, xpNeeded, currentLevel } = useXpProgress();

  const completedCount = waypoints.filter(
    (wp) => wp.status === "completed",
  ).length;
  const totalCount = waypoints.length;
  const isPerfectDay = completedCount === totalCount && totalCount > 0;

  const habitXp = completedCount * BASE_XP_PER_HABIT;
  const bonusXp = isPerfectDay ? PERFECT_DAY_BONUS : 0;
  const totalXp = habitXp + bonusXp;

  // Format date for display
  const dateObj = new Date(todayDate + "T00:00:00");
  const dateStr = dateObj.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <ScreenWrapper>
      <View className="flex-1 justify-center px-6">
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 500 }}
          style={{
            backgroundColor: "#1A1A2E",
            borderRadius: 16,
            padding: 24,
          }}
        >
          {/* Header */}
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 22,
              fontWeight: "800",
              marginBottom: 4,
            }}
          >
            Day Summary
          </Text>
          <Text
            style={{
              color: "#7F8C8D",
              fontSize: 13,
              marginBottom: 20,
            }}
          >
            {dateStr}
          </Text>

          {/* Habit list */}
          <View style={{ gap: 12, marginBottom: 20 }}>
            {waypoints.map((wp) => {
              const narrative = getNarrative(wp.habit.category);
              const done = wp.status === "completed";
              return (
                <View
                  key={wp.habitId}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <Image
                    source={narrative.icon}
                    style={{ width: 24, height: 24 }}
                    contentFit="contain"
                  />
                  <Text
                    style={{
                      flex: 1,
                      color: "#FFFFFF",
                      fontSize: 15,
                      fontWeight: "500",
                    }}
                  >
                    {wp.habit.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "700",
                      color: done ? "#2ECC71" : "#E74C3C",
                    }}
                  >
                    {done ? "\u2714" : "\u2718"}
                  </Text>
                </View>
              );
            })}
          </View>

          {/* XP breakdown */}
          <View
            style={{
              borderTopWidth: 1,
              borderTopColor: "#3A3A5E",
              paddingTop: 16,
              marginBottom: 16,
            }}
          >
            <Text style={{ color: "#B0B0C0", fontSize: 14 }}>
              XP Earned Today: {habitXp} XP
            </Text>
            {isPerfectDay && (
              <Text
                style={{
                  color: "#F4A261",
                  fontSize: 14,
                  fontWeight: "700",
                  marginTop: 4,
                }}
              >
                +{PERFECT_DAY_BONUS} Perfect Day Bonus
              </Text>
            )}
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 16,
                fontWeight: "700",
                marginTop: 8,
              }}
            >
              Total: {totalXp} XP
            </Text>
          </View>

          {/* XP progress bar */}
          <View style={{ marginBottom: 16 }}>
            <XPBar current={xpIntoLevel} max={xpNeeded} height={8} />
            <Text
              style={{
                color: "#F4A261",
                fontSize: 12,
                marginTop: 4,
              }}
            >
              Level {currentLevel}
            </Text>
          </View>

          {/* Continue button */}
          <StoneButton label="Continue" onPress={onDone} />
        </MotiView>
      </View>
    </ScreenWrapper>
  );
}
