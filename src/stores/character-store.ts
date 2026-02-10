import { create } from "zustand";
import type { Character, CharacterClass, CharacterStats, EquippedGear } from "@/types/game";

/**
 * Character store — the player's RPG character state.
 * Updated after habit completions, level ups, and gear changes.
 */

interface CharacterState {
  character: Character | null;
  isLoading: boolean;

  setCharacter: (character: Character) => void;
  addXp: (amount: number) => void;
  setLevel: (level: number) => void;
  updateStats: (stats: Partial<CharacterStats>) => void;
  setLoading: (loading: boolean) => void;
  reset: () => void;
}

export const useCharacterStore = create<CharacterState>((set) => ({
  character: null,
  isLoading: true,

  setCharacter: (character) => set({ character, isLoading: false }),

  addXp: (amount) =>
    set((state) => {
      if (!state.character) return state;
      return {
        character: {
          ...state.character,
          totalXp: state.character.totalXp + amount,
        },
      };
    }),

  setLevel: (level) =>
    set((state) => {
      if (!state.character) return state;
      return {
        character: { ...state.character, level },
      };
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

  setLoading: (isLoading) => set({ isLoading }),

  reset: () => set({ character: null, isLoading: true }),
}));
