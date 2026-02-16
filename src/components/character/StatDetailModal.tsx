/**
 * C.4 — Stat Detail Modal (Drill-Down)
 * Design ref: designs/Stat Detail Drill-Down.png
 *
 * Full-screen modal showing:
 * - Large stat name + value + color
 * - Large animated stat bar
 * - Contributing habits (habits whose category maps to this stat)
 * - Next milestone threshold
 */

import { Pressable, ScrollView, Text, View } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";

import { StatBar } from "@/components/character/StatBar";
import { ScreenWrapper } from "@/components/ui/ScreenWrapper";
import { STAT_COLORS, STAT_MILESTONES, getStatTier } from "@/lib/game-rules";
import { getNarrative } from "@/lib/narrative-text";
import { statImages } from "@/lib/assets";
import { useCharacterStore } from "@/stores/character-store";
import { useHabitStore } from "@/stores/habit-store";
import type { CharacterStats, HabitCategory } from "@/types/game";

/** Maps each stat to which habit category contributes to it. */
const STAT_TO_CATEGORY: Record<keyof CharacterStats, HabitCategory> = {
  strength: "fitness",
  intelligence: "learning",
  discipline: "discipline",
  charisma: "social",
};

const STAT_LABELS: Record<keyof CharacterStats, string> = {
  strength: "Strength",
  intelligence: "Intelligence",
  discipline: "Discipline",
  charisma: "Charisma",
};

interface StatDetailModalProps {
  stat: keyof CharacterStats;
  onClose: () => void;
}

export function StatDetailModal({ stat, onClose }: StatDetailModalProps) {
  const character = useCharacterStore((s) => s.character);
  const habits = useHabitStore((s) => s.habits);
  const events = useHabitStore((s) => s.events);

  if (!character) return null;

  const value = character.stats[stat];
  const color = STAT_COLORS[stat];
  const tier = getStatTier(value);
  const category = STAT_TO_CATEGORY[stat];

  // Find contributing habits (habits in the matching category)
  const contributingHabits = habits.filter((h) => h.category === category);

  // Count completions per habit (all time)
  const habitCompletions = contributingHabits.map((habit) => {
    const completionCount = events.filter(
      (e) => e.habitId === habit.id && e.eventType === "completed",
    ).length;
    // Each completion gives +2 to the stat (from narrative-text statBonus)
    const totalContribution = completionCount * 2;
    return { habit, completionCount, totalContribution };
  });

  // Find next milestone
  const nextMilestone = STAT_MILESTONES.find((m) => m.threshold > value);

  return (
    <ScreenWrapper>
      {/* Back button */}
      <Pressable
        onPress={onClose}
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 4,
          paddingHorizontal: 16,
          paddingVertical: 12,
        }}
      >
        <Ionicons name="arrow-back" size={20} color={color} />
        <Text style={{ color, fontSize: 16, fontWeight: "600" }}>Back</Text>
      </Pressable>

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Large stat name */}
        <Text
          style={{
            color,
            fontSize: 42,
            fontWeight: "900",
            textAlign: "center",
            marginTop: 20,
          }}
        >
          {STAT_LABELS[stat]}
        </Text>

        {/* Value */}
        <Text
          style={{
            color: "#FFFFFF",
            fontSize: 36,
            fontWeight: "700",
            textAlign: "center",
            marginBottom: 8,
          }}
        >
          {value}
        </Text>

        {/* Tier label */}
        <Text
          style={{
            color: "#7F8C8D",
            fontSize: 14,
            textAlign: "center",
            marginBottom: 24,
          }}
        >
          {tier}
        </Text>

        {/* Large stat bar */}
        <View style={{ marginBottom: 36 }}>
          <StatBar name={STAT_LABELS[stat]} value={value} color={color} icon={statImages[stat]} />
        </View>

        {/* Contributing Habits */}
        <Text
          style={{
            color: "#FFFFFF",
            fontSize: 18,
            fontWeight: "700",
            marginBottom: 4,
          }}
        >
          Contributing Habits
        </Text>
        <Text
          style={{
            color: "#7F8C8D",
            fontSize: 12,
            marginBottom: 16,
          }}
        >
          All time
        </Text>

        {contributingHabits.length === 0 ? (
          <Text style={{ color: "#7F8C8D", fontSize: 14, marginBottom: 24 }}>
            No habits contribute to this stat yet.
          </Text>
        ) : (
          <View style={{ gap: 12, marginBottom: 32 }}>
            {habitCompletions.map(
              ({ habit, completionCount, totalContribution }) => (
                <View
                  key={habit.id}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: "#1A1A2E",
                    borderRadius: 12,
                    padding: 14,
                    gap: 12,
                  }}
                >
                  <Image
                    source={getNarrative(habit.category).icon}
                    style={{ width: 28, height: 28 }}
                    contentFit="contain"
                  />
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        color: "#FFFFFF",
                        fontSize: 14,
                        fontWeight: "600",
                      }}
                    >
                      {habit.name}
                    </Text>
                    <Text
                      style={{
                        color: "#7F8C8D",
                        fontSize: 12,
                        marginTop: 2,
                      }}
                    >
                      +{totalContribution} {STAT_LABELS[stat]} from{" "}
                      {completionCount}{" "}
                      {completionCount === 1 ? "completion" : "completions"}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: 40,
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: "#3A3A5E",
                      overflow: "hidden",
                    }}
                  >
                    <View
                      style={{
                        width: `${Math.min((completionCount / 30) * 100, 100)}%`,
                        height: "100%",
                        backgroundColor: color,
                        borderRadius: 3,
                      }}
                    />
                  </View>
                </View>
              ),
            )}
          </View>
        )}

        {/* Milestones */}
        <Text
          style={{
            color: "#FFFFFF",
            fontSize: 18,
            fontWeight: "700",
            marginBottom: 16,
          }}
        >
          Milestones
        </Text>

        {nextMilestone ? (
          <View
            style={{
              backgroundColor: "#1A1A2E",
              borderRadius: 12,
              padding: 16,
              borderWidth: 1,
              borderColor: "#3A3A5E",
            }}
          >
            <Text style={{ color: "#FFFFFF", fontSize: 14 }}>
              Reach{" "}
              <Text style={{ color, fontWeight: "700" }}>
                {nextMilestone.threshold} {STAT_LABELS[stat]}
              </Text>{" "}
              to become{" "}
              <Text style={{ color: "#F4A261", fontWeight: "700" }}>
                {nextMilestone.label}
              </Text>
            </Text>
            <View
              style={{
                marginTop: 8,
                height: 4,
                backgroundColor: "#3A3A5E",
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <View
                style={{
                  width: `${Math.min(
                    (value / nextMilestone.threshold) * 100,
                    100,
                  )}%`,
                  height: "100%",
                  backgroundColor: color,
                  borderRadius: 2,
                }}
              />
            </View>
          </View>
        ) : (
          <View
            style={{
              backgroundColor: "#1A1A2E",
              borderRadius: 12,
              padding: 16,
              borderWidth: 1,
              borderColor: "#F4A261",
            }}
          >
            <Text
              style={{
                color: "#F4A261",
                fontSize: 14,
                fontWeight: "700",
                textAlign: "center",
              }}
            >
              LEGEND — All milestones achieved!
            </Text>
          </View>
        )}
      </ScrollView>
    </ScreenWrapper>
  );
}
