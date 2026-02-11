/**
 * Streak utilities — calculates habit streaks from event history.
 * Uses dayDate (YYYY-MM-DD) for timezone-safe streak computation.
 * Streaks are celebrated, never weaponized for guilt.
 */

import { STREAK_MILESTONE_DAYS } from "@/lib/game-rules";
import type { HabitEvent } from "@/types/game";

export interface StreakResult {
  current: number;
  best: number;
}

/**
 * Calculate current and best streak for a habit from its event history.
 * Only counts "completed" events. Events must have dayDate in YYYY-MM-DD format.
 */
export function calculateStreak(
  events: HabitEvent[],
  habitId: string,
): StreakResult {
  // Filter to completed events for this habit, sorted by dayDate descending
  const completedDates = events
    .filter((e) => e.habitId === habitId && e.eventType === "completed")
    .map((e) => e.dayDate)
    .filter((date, index, arr) => arr.indexOf(date) === index) // unique dates
    .sort()
    .reverse();

  if (completedDates.length === 0) {
    return { current: 0, best: 0 };
  }

  // Calculate current streak (consecutive days ending at most recent)
  let current = 1;
  for (let i = 0; i < completedDates.length - 1; i++) {
    const thisDate = new Date(completedDates[i] + "T00:00:00");
    const prevDate = new Date(completedDates[i + 1] + "T00:00:00");
    const diffMs = thisDate.getTime() - prevDate.getTime();
    const diffDays = diffMs / (1000 * 60 * 60 * 24);

    if (diffDays === 1) {
      current++;
    } else {
      break;
    }
  }

  // Check if current streak is actually current (last completion was today or yesterday)
  const today = getTodayDateString();
  const yesterday = getYesterdayDateString();
  const mostRecent = completedDates[0];

  if (mostRecent !== today && mostRecent !== yesterday) {
    // Streak is broken — most recent completion is older than yesterday
    current = 0;
  }

  // Calculate best streak from all consecutive sequences
  const sortedAsc = [...completedDates].reverse();
  let best = 1;
  let runLength = 1;

  for (let i = 0; i < sortedAsc.length - 1; i++) {
    const thisDate = new Date(sortedAsc[i] + "T00:00:00");
    const nextDate = new Date(sortedAsc[i + 1] + "T00:00:00");
    const diffMs = nextDate.getTime() - thisDate.getTime();
    const diffDays = diffMs / (1000 * 60 * 60 * 24);

    if (diffDays === 1) {
      runLength++;
      best = Math.max(best, runLength);
    } else {
      runLength = 1;
    }
  }

  // If only one completion, best is 1 (or 0 if current is 0 and no history)
  best = Math.max(best, current);

  return { current, best };
}

/**
 * Check if a streak count hits a milestone (7, 14, 30, 60, 100 days).
 */
export function isMilestone(streak: number): boolean {
  return (STREAK_MILESTONE_DAYS as readonly number[]).includes(streak);
}

/** Get today's date as YYYY-MM-DD in local timezone. */
export function getTodayDateString(): string {
  const now = new Date();
  return formatDateString(now);
}

/** Get yesterday's date as YYYY-MM-DD in local timezone. */
export function getYesterdayDateString(): string {
  const now = new Date();
  now.setDate(now.getDate() - 1);
  return formatDateString(now);
}

/** Format a Date as YYYY-MM-DD. */
function formatDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
