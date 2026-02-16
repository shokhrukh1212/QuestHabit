/**
 * Game rules — the ONLY source of truth for all game constants and formulas.
 * Every game mechanic references this file. Never hardcode game values elsewhere.
 */

// --- Character Stats ---

import type { CharacterClass, CharacterStats } from "@/types/game";

/** Per-class stat gains when leveling up. */
export const LEVEL_UP_STAT_BONUSES: Record<CharacterClass, CharacterStats> = {
  warrior: { strength: 3, intelligence: 1, discipline: 2, charisma: 1 },
  mage: { strength: 1, intelligence: 3, discipline: 1, charisma: 2 },
  rogue: { strength: 2, intelligence: 1, discipline: 3, charisma: 1 },
  ranger: { strength: 1, intelligence: 2, discipline: 1, charisma: 3 },
};

/** UI color per stat. */
export const STAT_COLORS: Record<keyof CharacterStats, string> = {
  strength: "#E74C3C",
  intelligence: "#3498DB",
  discipline: "#6C5CE7",
  charisma: "#2ECC71",
};

/** Stat tier thresholds — the label for the highest threshold <= value applies. */
export const STAT_MILESTONES = [
  { threshold: 0, label: "Novice" },
  { threshold: 15, label: "Apprentice" },
  { threshold: 30, label: "Adept" },
  { threshold: 50, label: "Expert" },
  { threshold: 75, label: "Master" },
  { threshold: 100, label: "Legend" },
] as const;

/** Get the tier label for a given stat value. */
export function getStatTier(value: number): string {
  let tier: string = STAT_MILESTONES[0].label;
  for (const milestone of STAT_MILESTONES) {
    if (value >= milestone.threshold) tier = milestone.label;
    else break;
  }
  return tier;
}

// --- XP & Leveling ---
export const BASE_XP_PER_HABIT = 50;
export const FUSED_HABIT_XP = 150;
export const TIME_RIFT_XP = 75;
export const PERFECT_DAY_BONUS = 30;

// --- Boss Fights ---
export const BOSS_DAMAGE_PER_HABIT = 25;

// --- Streaks ---
export const STREAK_MILESTONE_DAYS = [7, 14, 30, 60, 100] as const;

// --- Fusion ---
export const FUSION_TRIGGER_DAYS = 21;
export const FUSION_BREAK_DAYS = 7;

// --- Oaths ---
export const OATH_MIN_DAYS = 7;
export const OATH_MAX_DAYS = 30;

// --- Events ---
export const SHADOW_DUEL_DAY = "last_day_of_month" as const;

// --- Whispers ---
export const WHISPER_MAX_CHARS = 100;

// --- Free Tier Limits ---
export const FREE_HABIT_LIMIT = 3;
export const FREE_PARTY_LIMIT = 1;
export const MAX_HABIT_LIMIT = 10;

// --- XP Curve ---
// Polynomial curve: gets harder but never impossible.
// Level 1→2: 100 XP (~1 perfect day)
// Level 5→6: 1,118 XP (~6 days)
// Level 10→11: 3,162 XP (~17 days)
// Level 20→21: 8,944 XP (~49 days)
export function xpToNextLevel(level: number): number {
  return Math.floor(100 * Math.pow(level, 1.5));
}

// Calculate total XP needed from level 1 to reach a target level.
export function totalXpForLevel(targetLevel: number): number {
  let total = 0;
  for (let i = 1; i < targetLevel; i++) {
    total += xpToNextLevel(i);
  }
  return total;
}

// Given total accumulated XP, determine the current level.
export function levelFromTotalXp(totalXp: number): number {
  let level = 1;
  let xpRemaining = totalXp;
  while (xpRemaining >= xpToNextLevel(level)) {
    xpRemaining -= xpToNextLevel(level);
    level++;
  }
  return level;
}

// Given total XP, how much XP into the current level are we?
export function xpProgressInCurrentLevel(totalXp: number): {
  currentLevel: number;
  xpIntoLevel: number;
  xpNeeded: number;
} {
  let level = 1;
  let xpRemaining = totalXp;
  while (xpRemaining >= xpToNextLevel(level)) {
    xpRemaining -= xpToNextLevel(level);
    level++;
  }
  return {
    currentLevel: level,
    xpIntoLevel: xpRemaining,
    xpNeeded: xpToNextLevel(level),
  };
}

// Calculate daily XP for a perfect day with N habits.
export function perfectDayXp(habitCount: number): number {
  return BASE_XP_PER_HABIT * habitCount + PERFECT_DAY_BONUS;
}
