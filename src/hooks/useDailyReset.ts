/**
 * useDailyReset — orchestrates daily state transitions.
 * Runs on Quest Path mount. Checks if the date changed, initializes
 * character from prologue if needed, generates today's quest path,
 * and evaluates yesterday's performance.
 */

import { useEffect, useRef } from "react";

import { getTodayDateString, getYesterdayDateString } from "@/lib/streak-utils";
import { useCharacterStore } from "@/stores/character-store";
import { useHabitStore } from "@/stores/habit-store";
import { usePrologueStore } from "@/stores/prologue-store";
import { useQuestStore } from "@/stores/quest-store";

export function useDailyReset() {
  const hasRun = useRef(false);

  // Prologue data
  const prologueHabits = usePrologueStore((s) => s.habits);
  const prologueClass = usePrologueStore((s) => s.characterClass);
  const prologueName = usePrologueStore((s) => s.characterName);
  const prologueAppearance = usePrologueStore((s) => s.characterAppearance);
  const prologueXp = usePrologueStore((s) => s.totalXpEarned);

  // Habit store
  const habitInitialized = useHabitStore((s) => s.initialized);
  const initFromPrologueHabits = useHabitStore((s) => s.initFromPrologue);
  const getHabitsForToday = useHabitStore((s) => s.getHabitsForToday);
  const getEventsForDate = useHabitStore((s) => s.getEventsForDate);

  // Character store
  const character = useCharacterStore((s) => s.character);
  const initCharFromPrologue = useCharacterStore((s) => s.initFromPrologue);

  // Quest store
  const todayDate = useQuestStore((s) => s.todayDate);
  const setTodayDate = useQuestStore((s) => s.setTodayDate);
  const generateDailyPath = useQuestStore((s) => s.generateDailyPath);
  const setYesterdayResult = useQuestStore((s) => s.setYesterdayResult);
  const setLoading = useQuestStore((s) => s.setLoading);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const today = getTodayDateString();

    // 1. Initialize habits from prologue if first time
    if (!habitInitialized && prologueHabits.length > 0) {
      initFromPrologueHabits(prologueHabits);
    }

    // 2. Initialize character from prologue if first time
    if (!character && prologueClass) {
      initCharFromPrologue(
        prologueName,
        prologueClass,
        prologueAppearance,
        prologueXp,
      );
    }

    // 3. Check if new day → evaluate yesterday + generate new path
    if (todayDate !== today) {
      // Evaluate yesterday's result (if we have a previous date)
      if (todayDate) {
        const yesterdayEvents = getEventsForDate(todayDate);
        // We need to know how many habits were scheduled yesterday
        // For simplicity, check if any events exist
        const completedCount = yesterdayEvents.filter(
          (e) => e.eventType === "completed",
        ).length;

        // Get total habits (approximate — use current habits count)
        const totalHabits = getHabitsForToday().length;

        if (totalHabits === 0) {
          setYesterdayResult(null);
        } else if (completedCount >= totalHabits) {
          setYesterdayResult("perfect");
        } else if (completedCount > 0) {
          setYesterdayResult("partial");
        } else {
          setYesterdayResult("missed");
        }
      }

      // Generate new path for today
      setTodayDate(today);

      // Small delay to ensure habit store is hydrated from AsyncStorage
      setTimeout(() => {
        const todaysHabits = getHabitsForToday();
        generateDailyPath(todaysHabits);
      }, 100);
    } else {
      setLoading(false);
    }
  }, [
    todayDate,
    habitInitialized,
    character,
    prologueHabits,
    prologueClass,
    prologueName,
    prologueAppearance,
    prologueXp,
    initFromPrologueHabits,
    getHabitsForToday,
    getEventsForDate,
    initCharFromPrologue,
    setTodayDate,
    generateDailyPath,
    setYesterdayResult,
    setLoading,
  ]);
}
