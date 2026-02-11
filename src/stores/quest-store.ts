/**
 * Quest store — manages today's quest path and habit completion state.
 * This is the core of the daily loop: view path → tap waypoints → see progress.
 * Persists to AsyncStorage so state survives app restarts.
 */

import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { Habit, QuestWaypoint, WaypointStatus } from "@/types/game";

type YesterdayResult = "perfect" | "partial" | "missed" | null;

interface QuestState {
  todayDate: string; // YYYY-MM-DD
  waypoints: QuestWaypoint[];
  yesterdayResult: YesterdayResult;
  isLoading: boolean;
}

interface QuestActions {
  setTodayDate: (date: string) => void;
  setWaypoints: (waypoints: QuestWaypoint[]) => void;
  completeWaypoint: (habitId: string) => void;
  setYesterdayResult: (result: YesterdayResult) => void;
  generateDailyPath: (todaysHabits: Habit[]) => void;
  setLoading: (loading: boolean) => void;
  reset: () => void;
}

const STORAGE_KEY = "questhabit-quest";

export const useQuestStore = create<QuestState & QuestActions>()(
  persist(
    (set) => ({
      todayDate: "",
      waypoints: [],
      yesterdayResult: null,
      isLoading: true,

      setTodayDate: (todayDate) => set({ todayDate }),

      setWaypoints: (waypoints) => set({ waypoints, isLoading: false }),

      completeWaypoint: (habitId) =>
        set((state) => ({
          waypoints: state.waypoints.map((wp) =>
            wp.habitId === habitId
              ? { ...wp, status: "completed" as WaypointStatus }
              : wp,
          ),
        })),

      setYesterdayResult: (yesterdayResult) => set({ yesterdayResult }),

      generateDailyPath: (todaysHabits) => {
        const waypoints: QuestWaypoint[] = todaysHabits.map((habit, index) => ({
          habitId: habit.id,
          habit,
          status: "active" as WaypointStatus,
          position: index,
        }));
        set({ waypoints, isLoading: false });
      },

      setLoading: (isLoading) => set({ isLoading }),

      reset: () =>
        set({
          todayDate: "",
          waypoints: [],
          yesterdayResult: null,
          isLoading: true,
        }),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
