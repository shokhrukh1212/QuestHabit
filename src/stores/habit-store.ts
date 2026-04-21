/**
 * Habit store — manages habits and their completion events.
 * Converts prologue habits into full Habit objects on first load.
 * Events are append-only (never delete, add "unchecked" to undo).
 * Persists to AsyncStorage for offline-first operation.
 */

import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { BASE_XP_PER_HABIT } from "@/lib/game-rules";
import { getTodayDateString } from "@/lib/streak-utils";
import type { PrologueHabit } from "@/stores/prologue-store";
import type {
  Habit,
  HabitCategory,
  HabitEvent,
  HabitEventType,
  HabitFrequency,
} from "@/types/game";

// --- State ---

interface HabitState {
  habits: Habit[];
  events: HabitEvent[];
  initialized: boolean;
}

interface HabitActions {
  /** Convert prologue habits into full Habit objects (one-time init). */
  initFromPrologue: (prologueHabits: PrologueHabit[]) => void;
  /** Record a habit completion event for today. */
  completeHabit: (habitId: string) => void;
  /** Record an "unchecked" event (undo completion). */
  uncheckHabit: (habitId: string) => void;
  /** Get all events for a specific date (YYYY-MM-DD). */
  getEventsForDate: (date: string) => HabitEvent[];
  /** Get habits that should appear today based on frequency. */
  getHabitsForToday: () => Habit[];
  /** Check if a habit is completed today. */
  isCompletedToday: (habitId: string) => boolean;
  /** Migrate all habits and events from "local" userId to a real user ID. */
  migrateUserId: (newUserId: string) => void;
}

// --- Helpers ---

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function getIconKey(category: HabitCategory): string {
  return category;
}

/**
 * Determine if a habit should show today based on its frequency.
 * For MVP: daily and Nx_week habits show every day.
 * Weekly shows on Mondays (day 1). Monthly shows on the 1st.
 */
function shouldShowToday(frequency: HabitFrequency): boolean {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0=Sun, 1=Mon...
  const dayOfMonth = today.getDate();

  switch (frequency) {
    case "daily":
    case "5x_week":
    case "4x_week":
    case "3x_week":
    case "weekdays":
      // Weekdays: Mon-Fri
      if (frequency === "weekdays") return dayOfWeek >= 1 && dayOfWeek <= 5;
      return true;
    case "weekends":
      return dayOfWeek === 0 || dayOfWeek === 6;
    case "weekly":
      return dayOfWeek === 1; // Mondays
    case "monthly":
      return dayOfMonth === 1;
    case "custom":
      return true; // Custom frequency logic TBD
    default:
      return true;
  }
}

function prologueToHabit(ph: PrologueHabit, index: number): Habit {
  return {
    id: generateId(),
    userId: "local",
    name: ph.name,
    category: ph.category,
    frequency: ph.frequency,
    customDays: null,
    iconKey: getIconKey(ph.category),
    sortOrder: index,
    createdAt: new Date().toISOString(),
    deletedAt: null,
  };
}

// --- Store ---

const STORAGE_KEY = "questhabit-habits";

export const useHabitStore = create<HabitState & HabitActions>()(
  persist(
    (set, get) => ({
      habits: [],
      events: [],
      initialized: false,

      initFromPrologue: (prologueHabits) => {
        if (get().initialized) return;
        const habits = prologueHabits.map(prologueToHabit);
        set({ habits, initialized: true });
      },

      completeHabit: (habitId) => {
        const today = getTodayDateString();
        // Don't double-complete
        if (get().isCompletedToday(habitId)) return;

        const event: HabitEvent = {
          id: generateId(),
          userId: "local",
          habitId,
          eventType: "completed" as HabitEventType,
          completedAt: new Date().toISOString(),
          dayDate: today,
          xpEarned: BASE_XP_PER_HABIT,
        };

        set((state) => ({ events: [...state.events, event] }));
      },

      uncheckHabit: (habitId) => {
        const today = getTodayDateString();
        const event: HabitEvent = {
          id: generateId(),
          userId: "local",
          habitId,
          eventType: "unchecked" as HabitEventType,
          completedAt: new Date().toISOString(),
          dayDate: today,
          xpEarned: 0,
        };

        set((state) => ({ events: [...state.events, event] }));
      },

      getEventsForDate: (date) => {
        return get().events.filter((e) => e.dayDate === date);
      },

      getHabitsForToday: () => {
        return get().habits.filter(
          (h) => !h.deletedAt && shouldShowToday(h.frequency),
        );
      },

      isCompletedToday: (habitId) => {
        const today = getTodayDateString();
        const todayEvents = get().events.filter(
          (e) => e.habitId === habitId && e.dayDate === today,
        );
        // Find the latest event — if it's "completed", the habit is done
        if (todayEvents.length === 0) return false;
        const latest = todayEvents[todayEvents.length - 1];
        return latest.eventType === "completed";
      },

      migrateUserId: (newUserId) =>
        set((state) => ({
          habits: state.habits.map((h) =>
            h.userId === "local" ? { ...h, userId: newUserId } : h,
          ),
          events: state.events.map((e) =>
            e.userId === "local" ? { ...e, userId: newUserId } : e,
          ),
        })),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
