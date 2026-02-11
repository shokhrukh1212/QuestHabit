/**
 * Narrative text — maps habit categories to RPG encounter narratives.
 * Each category has unique icons, encounter dialogue, completion text,
 * and stat bonuses to make every habit feel like a game interaction.
 */

import type { HabitCategory } from "@/types/game";

export interface CategoryNarrative {
  icon: string;
  encounterText: string;
  completionText: string;
  statName: string;
  statBonus: number;
  accentColor: string;
}

const NARRATIVES: Record<HabitCategory, CategoryNarrative> = {
  fitness: {
    icon: "⚔️",
    encounterText:
      "The Iron Gate blocks your path. Did you break through with your strength?",
    completionText: "The gate SHATTERS! Your strength prevails!",
    statName: "Strength",
    statBonus: 2,
    accentColor: "#E74C3C",
  },
  learning: {
    icon: "📜",
    encounterText:
      "The Ancient Scroll awaits. Did you decipher its wisdom?",
    completionText: "The scroll's secrets are revealed! Knowledge gained!",
    statName: "Intelligence",
    statBonus: 2,
    accentColor: "#3498DB",
  },
  discipline: {
    icon: "🛡️",
    encounterText:
      "The Siren calls from the shadows. Did you resist its temptation?",
    completionText: "The Siren fades! Your will is unbreakable!",
    statName: "Discipline",
    statBonus: 2,
    accentColor: "#6C5CE7",
  },
  social: {
    icon: "🤝",
    encounterText:
      "A fellow traveler needs your aid. Did you lend your strength?",
    completionText: "Your bond grows stronger! Charisma gained!",
    statName: "Charisma",
    statBonus: 2,
    accentColor: "#F4A261",
  },
};

export function getNarrative(category: HabitCategory): CategoryNarrative {
  return NARRATIVES[category];
}
