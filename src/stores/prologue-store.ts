/**
 * Prologue store — tracks user progress through the 7-screen onboarding.
 * Persists to AsyncStorage so users can resume if the app closes mid-prologue.
 */

import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type {
  CharacterAppearance,
  CharacterClass,
  HabitFrequency,
  PrologueStep,
} from "@/types/game";

// --- Types ---

export interface PrologueHabit {
  name: string;
  frequency: HabitFrequency;
  category: "fitness" | "learning" | "discipline";
}

interface PrologueState {
  currentStep: PrologueStep;
  characterName: string;
  characterAppearance: CharacterAppearance;
  characterClass: CharacterClass | null;
  habits: PrologueHabit[];
  totalXpEarned: number;
}

interface PrologueActions {
  setStep: (step: PrologueStep) => void;
  setCharacterName: (name: string) => void;
  setAppearance: (appearance: Partial<CharacterAppearance>) => void;
  setClass: (cls: CharacterClass) => void;
  addHabit: (habit: PrologueHabit) => void;
  addXp: (amount: number) => void;
  reset: () => void;
}

// --- Defaults ---

const DEFAULT_APPEARANCE: CharacterAppearance = {
  skinTone: 0,
  hairStyle: 0,
  hairColor: 0,
};

const INITIAL_STATE: PrologueState = {
  currentStep: "cave_awakening",
  characterName: "",
  characterAppearance: DEFAULT_APPEARANCE,
  characterClass: null,
  habits: [],
  totalXpEarned: 0,
};

// --- Store ---

const STORAGE_KEY = "questhabit-prologue";

export const usePrologueStore = create<PrologueState & PrologueActions>()(
  persist(
    (set) => ({
      ...INITIAL_STATE,

      setStep: (step) => set({ currentStep: step }),

      setCharacterName: (name) => set({ characterName: name }),

      setAppearance: (partial) =>
        set((state) => ({
          characterAppearance: { ...state.characterAppearance, ...partial },
        })),

      setClass: (cls) => set({ characterClass: cls }),

      addHabit: (habit) =>
        set((state) => ({ habits: [...state.habits, habit] })),

      addXp: (amount) =>
        set((state) => ({ totalXpEarned: state.totalXpEarned + amount })),

      reset: () => set(INITIAL_STATE),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
