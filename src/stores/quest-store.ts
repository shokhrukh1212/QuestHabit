import { create } from "zustand";
import type { Habit, QuestWaypoint, WaypointStatus } from "@/types/game";

/**
 * Quest store — manages today's quest path and habit completion state.
 * This is the core of the daily loop: view path → tap waypoints → see progress.
 */

interface QuestState {
  todayDate: string; // YYYY-MM-DD
  waypoints: QuestWaypoint[];
  isLoading: boolean;

  setTodayDate: (date: string) => void;
  setWaypoints: (waypoints: QuestWaypoint[]) => void;
  completeWaypoint: (habitId: string) => void;
  setLoading: (loading: boolean) => void;
  reset: () => void;
}

export const useQuestStore = create<QuestState>((set) => ({
  todayDate: "",
  waypoints: [],
  isLoading: true,

  setTodayDate: (todayDate) => set({ todayDate }),

  setWaypoints: (waypoints) => set({ waypoints, isLoading: false }),

  completeWaypoint: (habitId) =>
    set((state) => ({
      waypoints: state.waypoints.map((wp) =>
        wp.habitId === habitId
          ? { ...wp, status: "completed" as WaypointStatus }
          : wp
      ),
    })),

  setLoading: (isLoading) => set({ isLoading }),

  reset: () => set({ todayDate: "", waypoints: [], isLoading: true }),
}));
