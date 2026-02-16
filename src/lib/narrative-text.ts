/**
 * Narrative text — maps habit categories to RPG encounter narratives.
 * Each category has unique icons, scene images, encounter dialogue,
 * completion text, and stat bonuses.
 */

import type { ImageSource } from "expo-image";

import { iconImages, sceneImages } from "@/lib/assets";
import type { HabitCategory } from "@/types/game";

export interface CategoryNarrative {
  icon: ImageSource;
  encounterText: string;
  completionText: string;
  completionScene: ImageSource;
  statName: string;
  statBonus: number;
  accentColor: string;
}

const NARRATIVES: Record<HabitCategory, CategoryNarrative> = {
  fitness: {
    icon: iconImages.ironGate,
    encounterText:
      "The Iron Gate blocks your path. Did you break through with your strength?",
    completionText: "The gate SHATTERS! Your strength prevails!",
    completionScene: sceneImages.gateShatter,
    statName: "Strength",
    statBonus: 2,
    accentColor: "#E74C3C",
  },
  learning: {
    icon: iconImages.scroll,
    encounterText:
      "The Ancient Scroll awaits. Did you decipher its wisdom?",
    completionText: "The scroll's secrets are revealed! Knowledge gained!",
    completionScene: sceneImages.scrollDecipher,
    statName: "Intelligence",
    statBonus: 2,
    accentColor: "#3498DB",
  },
  discipline: {
    icon: iconImages.siren,
    encounterText:
      "The Siren calls from the shadows. Did you resist its temptation?",
    completionText: "The Siren fades! Your will is unbreakable!",
    completionScene: sceneImages.sirenResist,
    statName: "Discipline",
    statBonus: 2,
    accentColor: "#6C5CE7",
  },
  social: {
    icon: iconImages.ironGate, // Placeholder — social icons TBD
    encounterText:
      "A fellow traveler needs your aid. Did you lend your strength?",
    completionText: "Your bond grows stronger! Charisma gained!",
    completionScene: sceneImages.gateShatter, // Placeholder — social scene TBD
    statName: "Charisma",
    statBonus: 2,
    accentColor: "#F4A261",
  },
};

export function getNarrative(category: HabitCategory): CategoryNarrative {
  return NARRATIVES[category];
}
