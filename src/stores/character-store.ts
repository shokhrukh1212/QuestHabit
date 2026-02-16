/**
 * Character store — the player's RPG character state.
 * Updated after habit completions, level ups, and gear changes.
 * Persists to AsyncStorage. Initializes from prologue data on first load.
 */

import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { getRewardForLevel } from "@/lib/gear-data";
import {
  LEVEL_UP_STAT_BONUSES,
  levelFromTotalXp,
  xpProgressInCurrentLevel,
} from "@/lib/game-rules";
import type {
  Character,
  CharacterAppearance,
  CharacterClass,
  CharacterStats,
  GearItem,
  GearSlot,
} from "@/types/game";

/** Data produced when a level-up occurs — consumed by the celebration screen. */
export interface PendingLevelUp {
  newLevel: number;
  statIncreases: CharacterStats;
  rewardGear: GearItem | null;
}

interface CharacterState {
  character: Character | null;
  isLoading: boolean;
  /** Number of days since user started (day 1 = prologue completion day). */
  startDate: string | null; // YYYY-MM-DD
  /** Set when a level-up occurs — cleared after celebration is shown. */
  pendingLevelUp: PendingLevelUp | null;
}

interface CharacterActions {
  setCharacter: (character: Character) => void;
  /** Add XP and auto-compute level. Returns true if leveled up. */
  addXp: (amount: number) => boolean;
  setLevel: (level: number) => void;
  updateStats: (stats: Partial<CharacterStats>) => void;
  /** Increment a single stat by a delta (reads current value inside updater to avoid stale closures). */
  incrementStat: (stat: keyof CharacterStats, delta: number) => void;
  /** Equip a gear item (replaces current item in that slot). */
  equipGear: (gear: GearItem) => void;
  /** Unequip a gear slot. */
  unequipGear: (slot: GearSlot) => void;
  /** Clear the pending level-up after the celebration screen is shown. */
  clearPendingLevelUp: () => void;
  /** Initialize character from prologue data (one-time). */
  initFromPrologue: (
    name: string,
    characterClass: CharacterClass,
    appearance: CharacterAppearance,
    totalXp: number,
  ) => void;
  /** Get the current day number (days since start). */
  getDayNumber: () => number;
  setLoading: (loading: boolean) => void;
  reset: () => void;
}

const STORAGE_KEY = "questhabit-character";

function getTodayString(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export const useCharacterStore = create<
  CharacterState & CharacterActions
>()(
  persist(
    (set, get) => ({
      character: null,
      isLoading: true,
      startDate: null,
      pendingLevelUp: null,

      setCharacter: (character) => set({ character, isLoading: false }),

      addXp: (amount) => {
        const { character } = get();
        if (!character) return false;

        const newTotalXp = character.totalXp + amount;
        const oldLevel = character.level;
        const newLevel = levelFromTotalXp(newTotalXp);
        const leveledUp = newLevel > oldLevel;

        if (leveledUp) {
          // Compute stat bonuses from class
          const statIncreases =
            LEVEL_UP_STAT_BONUSES[character.characterClass];

          // Apply stat bonuses immediately
          const newStats: CharacterStats = {
            strength: character.stats.strength + statIncreases.strength,
            intelligence:
              character.stats.intelligence + statIncreases.intelligence,
            discipline: character.stats.discipline + statIncreases.discipline,
            charisma: character.stats.charisma + statIncreases.charisma,
          };

          // Check for gear reward
          const rewardGear = getRewardForLevel(newLevel);

          set({
            character: {
              ...character,
              totalXp: newTotalXp,
              level: newLevel,
              stats: newStats,
            },
            pendingLevelUp: {
              newLevel,
              statIncreases,
              rewardGear,
            },
          });
        } else {
          set({
            character: {
              ...character,
              totalXp: newTotalXp,
              level: newLevel,
            },
          });
        }

        return leveledUp;
      },

      setLevel: (level) =>
        set((state) => {
          if (!state.character) return state;
          return { character: { ...state.character, level } };
        }),

      updateStats: (stats) =>
        set((state) => {
          if (!state.character) return state;
          return {
            character: {
              ...state.character,
              stats: { ...state.character.stats, ...stats },
            },
          };
        }),

      incrementStat: (stat, delta) =>
        set((state) => {
          if (!state.character) return state;
          return {
            character: {
              ...state.character,
              stats: {
                ...state.character.stats,
                [stat]: state.character.stats[stat] + delta,
              },
            },
          };
        }),

      equipGear: (gear) =>
        set((state) => {
          if (!state.character) return state;
          return {
            character: {
              ...state.character,
              equippedGear: {
                ...state.character.equippedGear,
                [gear.slot]: gear,
              },
            },
          };
        }),

      unequipGear: (slot) =>
        set((state) => {
          if (!state.character) return state;
          return {
            character: {
              ...state.character,
              equippedGear: {
                ...state.character.equippedGear,
                [slot]: null,
              },
            },
          };
        }),

      clearPendingLevelUp: () => set({ pendingLevelUp: null }),

      initFromPrologue: (name, characterClass, appearance, totalXp) => {
        if (get().character) return; // Already initialized

        const level = levelFromTotalXp(totalXp);
        const character: Character = {
          id: `local-${Date.now()}`,
          userId: "local",
          name: name || "Adventurer",
          characterClass,
          level,
          totalXp,
          stats: {
            strength: 5,
            intelligence: 5,
            discipline: 5,
            charisma: 5,
          },
          equippedGear: {
            weapon: null,
            armor: null,
            accessory: null,
          },
          createdAt: new Date().toISOString(),
        };

        set({
          character,
          startDate: getTodayString(),
          isLoading: false,
        });
      },

      getDayNumber: () => {
        const { startDate } = get();
        if (!startDate) return 1;
        const start = new Date(startDate + "T00:00:00");
        const now = new Date();
        const diffMs = now.getTime() - start.getTime();
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        return diffDays + 1; // Day 1 = start day
      },

      setLoading: (isLoading) => set({ isLoading }),

      reset: () =>
        set({
          character: null,
          isLoading: true,
          startDate: null,
          pendingLevelUp: null,
        }),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

/** Helper to get XP progress for UI display. */
export function useXpProgress() {
  const character = useCharacterStore((s) => s.character);
  if (!character) return { currentLevel: 1, xpIntoLevel: 0, xpNeeded: 100 };
  return xpProgressInCurrentLevel(character.totalXp);
}
