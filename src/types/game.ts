/**
 * Core game domain types.
 * These represent the game world — characters, habits, events, etc.
 */

// --- Character ---

export type CharacterClass = "warrior" | "mage" | "rogue" | "ranger";

export interface CharacterAppearance {
  skinTone: number;
  hairStyle: number;
  hairColor: number;
}

export interface CharacterStats {
  strength: number;
  intelligence: number;
  discipline: number;
  charisma: number;
}

export interface Character {
  id: string;
  userId: string;
  name: string;
  characterClass: CharacterClass;
  level: number;
  totalXp: number;
  stats: CharacterStats;
  equippedGear: EquippedGear;
  createdAt: string;
}

// --- Gear ---

export type Rarity = "common" | "uncommon" | "rare" | "epic" | "legendary";

export interface GearItem {
  id: string;
  name: string;
  slot: GearSlot;
  rarity: Rarity;
  statBonuses: Partial<CharacterStats>;
  iconKey: string;
}

export type GearSlot = "weapon" | "armor" | "accessory";

export interface EquippedGear {
  weapon: GearItem | null;
  armor: GearItem | null;
  accessory: GearItem | null;
}

// --- Habits ---

export type HabitCategory = "fitness" | "learning" | "discipline" | "social";

export type HabitFrequency =
  | "daily"
  | "weekdays"
  | "weekends"
  | "custom"
  | "5x_week"
  | "4x_week"
  | "3x_week"
  | "weekly"
  | "monthly";

export interface Habit {
  id: string;
  userId: string;
  name: string;
  category: HabitCategory;
  frequency: HabitFrequency;
  customDays: number[] | null; // 0=Sun, 1=Mon, ... 6=Sat
  iconKey: string;
  sortOrder: number;
  createdAt: string;
  deletedAt: string | null;
}

// --- Habit Events (immutable log) ---

export type HabitEventType = "completed" | "skipped" | "unchecked";

export interface HabitEvent {
  id: string;
  userId: string;
  habitId: string;
  eventType: HabitEventType;
  completedAt: string;
  dayDate: string; // YYYY-MM-DD in user's local timezone
  xpEarned: number;
}

// --- Quest Path (daily view) ---

export type WaypointStatus = "locked" | "active" | "completed" | "missed";

export interface QuestWaypoint {
  habitId: string;
  habit: Habit;
  status: WaypointStatus;
  position: number; // order on the path
}

export interface DailySummary {
  date: string; // YYYY-MM-DD
  totalHabits: number;
  completedHabits: number;
  xpEarned: number;
  isPerfectDay: boolean;
  streaksUpdated: StreakUpdate[];
}

export interface StreakUpdate {
  habitId: string;
  currentStreak: number;
  bestStreak: number;
  isMilestone: boolean;
}

// --- Dreams ---

export type DreamType = "aspirational" | "reflective" | "epic" | "phoenix";

export interface Dream {
  id: string;
  userId: string;
  dreamType: DreamType;
  title: string;
  narrative: string;
  dayDate: string;
  createdAt: string;
}

// --- Party & Boss ---

export interface Party {
  id: string;
  name: string;
  inviteCode: string;
  leaderId: string;
  createdAt: string;
}

export interface BossFight {
  id: string;
  partyId: string;
  bossName: string;
  maxHp: number;
  currentHp: number;
  weekStartDate: string;
  isDefeated: boolean;
}

// --- Subscription ---

export type SubscriptionTier = "free" | "premium";

// --- Onboarding ---

export type PrologueStep =
  | "cave_awakening"
  | "character_mirror"
  | "path_fork"
  | "habit_1"
  | "habit_2"
  | "habit_3"
  | "cave_exit"
  | "completed";
