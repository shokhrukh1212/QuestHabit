/**
 * D.1 — Quest Path (Main Daily Screen)
 * Design ref: designs/Quest Path (Main Daily Screen).png
 *
 * The screen users see every day. Habits are waypoints on a journey.
 * Full landscape background. Character walks left to right. Campfire at the end.
 * Tap active waypoints to open encounter modal.
 */

import { useCallback, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Image } from "expo-image";
import { MotiView } from "moti";

import { SavePrompt } from "@/components/auth/SavePrompt";
import { UrgencyNudge } from "@/components/auth/UrgencyNudge";
import { CharacterBanner } from "@/components/ui/CharacterBanner";
import { ScreenWrapper } from "@/components/ui/ScreenWrapper";
import { LevelUpCelebration } from "@/components/character/LevelUpCelebration";
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
import { iconImages, sceneImages } from "@/lib/assets";
import { useAuthStore } from "@/stores/auth-store";
import { useCharacterStore } from "@/stores/character-store";
import { useHabitStore } from "@/stores/habit-store";
import { useInventoryStore } from "@/stores/inventory-store";
import { useQuestStore } from "@/stores/quest-store";
import type { QuestWaypoint } from "@/types/game";

type ScreenState =
  | "loading"
  | "missed_scene"
  | "quest_path"
  | "encounter"
  | "celebration"
  | "level_up"
  | "save_prompt"
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
  const incrementStat = useCharacterStore((s) => s.incrementStat);
  const pendingLevelUp = useCharacterStore((s) => s.pendingLevelUp);
  const clearPendingLevelUp = useCharacterStore((s) => s.clearPendingLevelUp);
  const equipGear = useCharacterStore((s) => s.equipGear);

  const addGear = useInventoryStore((s) => s.addGear);

  const isGuest = useAuthStore((s) => s.isGuest);
  const shouldShowSavePrompt = useAuthStore((s) => s.shouldShowSavePrompt);
  const dismissSavePrompt = useAuthStore((s) => s.dismissSavePrompt);
  const shouldShowUrgencyNudge = useAuthStore((s) => s.shouldShowUrgencyNudge);
  const dismissUrgencyNudge = useAuthStore((s) => s.dismissUrgencyNudge);

  const character = useCharacterStore((s) => s.character);
  const getDayNumber = useCharacterStore((s) => s.getDayNumber);

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

    // Update stat — using incrementStat to avoid stale closure
    const statKey = narrative.statName.toLowerCase() as
      | "strength"
      | "intelligence"
      | "discipline"
      | "charisma";
    incrementStat(statKey, narrative.statBonus);

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
  }, [activeWaypoint, completeHabit, completeWaypoint, addXp, incrementStat, events]);

  const handleCelebrationDone = useCallback(() => {
    setCelebrationData(null);
    setActiveWaypoint(null);

    // Check for level-up first — show celebration before moving on
    if (pendingLevelUp) {
      setScreenState("level_up");
      return;
    }

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
  }, [waypoints, totalCount, addXp, pendingLevelUp]);

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

  const handleLevelUpDone = useCallback(() => {
    if (pendingLevelUp?.rewardGear) {
      // Add gear to inventory
      addGear(pendingLevelUp.rewardGear);

      // Auto-equip if slot is empty
      const char = useCharacterStore.getState().character;
      if (char) {
        const slot = pendingLevelUp.rewardGear.slot;
        if (!char.equippedGear[slot]) {
          equipGear(pendingLevelUp.rewardGear);
        }
      }
    }

    clearPendingLevelUp();

    // Check if save prompt should be shown (guest + level threshold)
    const currentLevel = useCharacterStore.getState().character?.level ?? 1;
    if (shouldShowSavePrompt(currentLevel)) {
      setScreenState("save_prompt");
      return;
    }

    // Check if all habits done — proceed to campfire or back to path
    const newCompletedCount = waypoints.filter(
      (wp) => wp.status === "completed",
    ).length + 1;

    if (newCompletedCount >= totalCount) {
      addXp(PERFECT_DAY_BONUS);
      setScreenState("campfire");
    } else {
      setScreenState("quest_path");
    }
  }, [pendingLevelUp, addGear, equipGear, clearPendingLevelUp, waypoints, totalCount, addXp, shouldShowSavePrompt]);

  const handleSummaryDone = useCallback(() => {
    setScreenState("quest_path");
  }, []);

  /** After save prompt — user authenticated or dismissed. */
  const handleSavePromptDone = useCallback(() => {
    // Continue to campfire or quest path
    const newCompletedCount = waypoints.filter(
      (wp) => wp.status === "completed",
    ).length + 1;

    if (newCompletedCount >= totalCount) {
      addXp(PERFECT_DAY_BONUS);
      setScreenState("campfire");
    } else {
      setScreenState("quest_path");
    }
  }, [waypoints, totalCount, addXp]);

  const handleSavePromptDismiss = useCallback(() => {
    const currentLevel = useCharacterStore.getState().character?.level ?? 1;
    dismissSavePrompt(currentLevel);
    handleSavePromptDone();
  }, [dismissSavePrompt, handleSavePromptDone]);

  // Urgency nudge — show on quest path for Day 5+ guests
  const dayNumber = getDayNumber();
  const showUrgencyNudge =
    isGuest && shouldShowUrgencyNudge(dayNumber);

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

  // Level up celebration
  if (screenState === "level_up" && pendingLevelUp) {
    return <LevelUpCelebration levelUp={pendingLevelUp} onDone={handleLevelUpDone} />;
  }

  // Save prompt (post level-up for guests)
  if (screenState === "save_prompt") {
    return (
      <SavePrompt
        onAuthenticated={handleSavePromptDone}
        onDismiss={handleSavePromptDismiss}
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
      {/* Background landscape image */}
      <Image
        source={sceneImages.questPathBg}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        contentFit="cover"
      />
      {/* Dark overlay for readability */}
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(13, 13, 26, 0.55)",
        }}
      />

      <CharacterBanner />

      {/* Urgency nudge for Day 5+ guests */}
      {showUrgencyNudge && character && (
        <UrgencyNudge
          xp={character.totalXp}
          level={character.level}
          streak={0}
          dayNumber={dayNumber}
          onSaveNow={() => setScreenState("save_prompt")}
          onDismiss={dismissUrgencyNudge}
        />
      )}

      <View className="flex-1 justify-center">
        {/* Quest path — horizontal scroll */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 32,
            paddingRight: 48,
            alignItems: "center",
            gap: 8,
          }}
        >
          {/* Character at start */}
          <View style={{ alignItems: "center", width: 50 }}>
            <Image
              source={iconImages.characterAvatar}
              style={{ width: 44, height: 44 }}
              contentFit="contain"
            />
          </View>

          {/* Path segments + waypoints */}
          {waypoints.map((wp, index) => (
            <View
              key={wp.habitId}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              {/* Path line — thicker */}
              <View
                style={{
                  width: 20,
                  height: 3,
                  backgroundColor:
                    index <= completedCount - 1 ? "#2ECC71" : "#3A3A5E",
                  marginRight: 4,
                  borderRadius: 1.5,
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
              width: 20,
              height: 3,
              backgroundColor: allDone ? "#2ECC71" : "#3A3A5E",
              borderRadius: 1.5,
            }}
          />

          {/* Campfire at end */}
          <MotiView
            animate={{
              scale: allDone ? 1.1 : 0.9,
              opacity: allDone ? 1 : 0.4,
            }}
            transition={{ type: "timing", duration: 1000, loop: !allDone }}
            style={{ alignItems: "center", width: 56 }}
          >
            <Image
              source={iconImages.campfire}
              style={{ width: 48, height: 48 }}
              contentFit="contain"
            />
          </MotiView>
        </ScrollView>

        {/* Progress text */}
        <Text
          style={{
            color: "#FFFFFF",
            fontSize: 14,
            fontWeight: "600",
            textAlign: "center",
            marginTop: 24,
            textShadowColor: "rgba(0, 0, 0, 0.8)",
            textShadowOffset: { width: 0, height: 1 },
            textShadowRadius: 4,
          }}
        >
          {completedCount}/{totalCount} quests complete
        </Text>
      </View>
    </ScreenWrapper>
  );
}
