/**
 * D.1 — Quest Path (Main Daily Screen)
 * Design ref: designs/Quest Path (Main Daily Screen).png
 *
 * The screen users see every day. Habits are waypoints on a journey.
 * Character walks left to right. Campfire at the end.
 * Tap active waypoints to open encounter modal.
 */

import { useCallback, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Image } from "expo-image";
import { MotiView } from "moti";

import { CharacterBanner } from "@/components/ui/CharacterBanner";
import { ScreenWrapper } from "@/components/ui/ScreenWrapper";
import { EncounterModal } from "@/components/encounter/EncounterModal";
import { CompletionCelebration } from "@/components/encounter/CompletionCelebration";
import { MissedHabitScene } from "@/components/quest/MissedHabitScene";
import { CampfireCelebration } from "@/components/quest/CampfireCelebration";
import { DailySummary } from "@/components/quest/DailySummary";
import { QuestWaypointNode } from "@/components/quest/QuestWaypointNode";
import { useDailyReset } from "@/hooks/useDailyReset";
import { BASE_XP_PER_HABIT, PERFECT_DAY_BONUS } from "@/lib/game-rules";
import { getNarrative } from "@/lib/narrative-text";
import { calculateStreak } from "@/lib/streak-utils";
import { iconImages } from "@/lib/assets";
import { useCharacterStore } from "@/stores/character-store";
import { useHabitStore } from "@/stores/habit-store";
import { useQuestStore } from "@/stores/quest-store";
import type { QuestWaypoint } from "@/types/game";

type ScreenState =
  | "loading"
  | "missed_scene"
  | "quest_path"
  | "encounter"
  | "celebration"
  | "campfire"
  | "summary";

export default function QuestPathScreen() {
  useDailyReset();

  const waypoints = useQuestStore((s) => s.waypoints);
  const yesterdayResult = useQuestStore((s) => s.yesterdayResult);
  const completeWaypoint = useQuestStore((s) => s.completeWaypoint);
  const setYesterdayResult = useQuestStore((s) => s.setYesterdayResult);
  const isLoading = useQuestStore((s) => s.isLoading);

  const completeHabit = useHabitStore((s) => s.completeHabit);
  const events = useHabitStore((s) => s.events);

  const addXp = useCharacterStore((s) => s.addXp);
  const updateStats = useCharacterStore((s) => s.updateStats);
  const character = useCharacterStore((s) => s.character);

  const [screenState, setScreenState] = useState<ScreenState>("quest_path");
  const [activeWaypoint, setActiveWaypoint] = useState<QuestWaypoint | null>(
    null,
  );
  const [celebrationData, setCelebrationData] = useState<{
    xp: number;
    statName: string;
    statBonus: number;
    streak: number;
    completionScene: ReturnType<typeof getNarrative>["completionScene"];
  } | null>(null);

  // Show missed scene on first load if yesterday was incomplete
  const shouldShowMissed =
    yesterdayResult === "partial" || yesterdayResult === "missed";

  const completedCount = waypoints.filter(
    (wp) => wp.status === "completed",
  ).length;
  const totalCount = waypoints.length;
  const allDone = totalCount > 0 && completedCount === totalCount;

  // --- Handlers ---

  const handleWaypointPress = useCallback((wp: QuestWaypoint) => {
    setActiveWaypoint(wp);
    setScreenState("encounter");
  }, []);

  const handleConquer = useCallback(() => {
    if (!activeWaypoint) return;

    const { habit } = activeWaypoint;
    const narrative = getNarrative(habit.category);

    // Record completion
    completeHabit(habit.id);
    completeWaypoint(habit.id);

    // Add XP
    addXp(BASE_XP_PER_HABIT);

    // Update stat
    const statKey = narrative.statName.toLowerCase() as
      | "strength"
      | "intelligence"
      | "discipline"
      | "charisma";
    updateStats({ [statKey]: (character?.stats[statKey] ?? 5) + narrative.statBonus });

    // Calculate streak
    const streak = calculateStreak(events, habit.id);

    // Show celebration
    setCelebrationData({
      xp: BASE_XP_PER_HABIT,
      statName: narrative.statName,
      statBonus: narrative.statBonus,
      streak: streak.current + 1,
      completionScene: narrative.completionScene,
    });
    setScreenState("celebration");
  }, [activeWaypoint, completeHabit, completeWaypoint, addXp, updateStats, character, events]);

  const handleCelebrationDone = useCallback(() => {
    setCelebrationData(null);
    setActiveWaypoint(null);

    // Check if all habits done after this completion
    const newCompletedCount = waypoints.filter(
      (wp) => wp.status === "completed",
    ).length + 1; // +1 for the one we just completed

    if (newCompletedCount >= totalCount) {
      // Award perfect day bonus
      addXp(PERFECT_DAY_BONUS);
      setScreenState("campfire");
    } else {
      setScreenState("quest_path");
    }
  }, [waypoints, totalCount, addXp]);

  const handleDismissEncounter = useCallback(() => {
    setActiveWaypoint(null);
    setScreenState("quest_path");
  }, []);

  const handleMissedDismiss = useCallback(() => {
    setYesterdayResult(null);
    setScreenState("quest_path");
  }, [setYesterdayResult]);

  const handleCampfireDone = useCallback(() => {
    setScreenState("summary");
  }, []);

  const handleSummaryDone = useCallback(() => {
    setScreenState("quest_path");
  }, []);

  // --- Render ---

  if (isLoading) {
    return (
      <ScreenWrapper>
        <View className="flex-1 items-center justify-center">
          <Text className="text-text-muted text-lg">Loading quest...</Text>
        </View>
      </ScreenWrapper>
    );
  }

  // Show missed habit scene first if applicable
  if (shouldShowMissed && screenState === "quest_path") {
    return <MissedHabitScene onDismiss={handleMissedDismiss} />;
  }

  // Encounter modal overlay
  if (screenState === "encounter" && activeWaypoint) {
    return (
      <EncounterModal
        waypoint={activeWaypoint}
        onConquer={handleConquer}
        onDismiss={handleDismissEncounter}
      />
    );
  }

  // Completion celebration overlay
  if (screenState === "celebration" && celebrationData) {
    return (
      <CompletionCelebration
        xp={celebrationData.xp}
        statName={celebrationData.statName}
        statBonus={celebrationData.statBonus}
        streak={celebrationData.streak}
        completionScene={celebrationData.completionScene}
        onDone={handleCelebrationDone}
      />
    );
  }

  // Campfire celebration (all done)
  if (screenState === "campfire") {
    return <CampfireCelebration onDone={handleCampfireDone} />;
  }

  // Daily summary
  if (screenState === "summary") {
    return <DailySummary onDone={handleSummaryDone} />;
  }

  // --- Main Quest Path ---
  return (
    <ScreenWrapper>
      <CharacterBanner />

      <View className="flex-1 justify-center">
        {/* Quest path — horizontal scroll */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
            alignItems: "center",
            gap: 16,
            minWidth: "100%",
            justifyContent: "center",
          }}
        >
          {/* Character at start */}
          <View style={{ alignItems: "center", width: 50 }}>
            <Image
              source={iconImages.characterAvatar}
              style={{ width: 40, height: 40 }}
              contentFit="contain"
            />
          </View>

          {/* Path segments + waypoints */}
          {waypoints.map((wp, index) => (
            <View
              key={wp.habitId}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              {/* Path line */}
              <View
                style={{
                  width: 24,
                  height: 2,
                  backgroundColor:
                    index <= completedCount - 1 ? "#2ECC71" : "#3A3A5E",
                  marginRight: 4,
                }}
              />
              <QuestWaypointNode
                waypoint={wp}
                onPress={handleWaypointPress}
              />
            </View>
          ))}

          {/* Path line to campfire */}
          <View
            style={{
              width: 24,
              height: 2,
              backgroundColor: allDone ? "#2ECC71" : "#3A3A5E",
            }}
          />

          {/* Campfire at end */}
          <MotiView
            animate={{
              scale: allDone ? 1.1 : 0.9,
              opacity: allDone ? 1 : 0.4,
            }}
            transition={{ type: "timing", duration: 1000, loop: !allDone }}
            style={{ alignItems: "center", width: 50 }}
          >
            <Image
              source={iconImages.campfire}
              style={{ width: 40, height: 40 }}
              contentFit="contain"
            />
          </MotiView>
        </ScrollView>

        {/* Progress text */}
        <Text
          style={{
            color: "#B0B0C0",
            fontSize: 14,
            textAlign: "center",
            marginTop: 24,
          }}
        >
          {completedCount}/{totalCount} quests complete
        </Text>
      </View>
    </ScreenWrapper>
  );
}
