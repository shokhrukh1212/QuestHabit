/**
 * Gear data — deterministic level-keyed reward table.
 * Each level maps to a specific gear reward. No RNG.
 */

import type { ImageSource } from "expo-image";

import { gearImages } from "@/lib/assets";
import type { GearItem, Rarity } from "@/types/game";

/** Rarity UI colors for borders and text. */
export const RARITY_COLORS: Record<Rarity, string> = {
  common: "#7F8C8D",
  uncommon: "#2ECC71",
  rare: "#3498DB",
  epic: "#6C5CE7",
  legendary: "#F4A261",
};

/** Rarity label for display. */
export const RARITY_LABELS: Record<Rarity, string> = {
  common: "Common",
  uncommon: "Uncommon",
  rare: "Rare",
  epic: "Epic",
  legendary: "Legendary",
};

/** Map from gear iconKey to the actual image source. */
const GEAR_ICON_MAP: Record<string, ImageSource> = {
  ironGauntlets: gearImages.ironGauntlets,
  apprenticeStaff: gearImages.apprenticeStaff,
  leatherCloak: gearImages.leatherCloak,
  steelSword: gearImages.steelSword,
  chainMail: gearImages.chainMail,
  focusAmulet: gearImages.focusAmulet,
  flameBlade: gearImages.flameBlade,
  mithrilPlate: gearImages.mithrilPlate,
  shadowRing: gearImages.shadowRing,
  arcaneScepter: gearImages.arcaneScepter,
  dragonScaleArmor: gearImages.dragonScaleArmor,
  phoenixFeather: gearImages.phoenixFeather,
};

/** Resolve a gear item's iconKey to an image source. */
export function getGearIcon(iconKey: string): ImageSource | null {
  return GEAR_ICON_MAP[iconKey] ?? null;
}

/**
 * Level reward table. Each entry is awarded when the player reaches that level.
 * iconKey references a key in gearImages (resolved via getGearIcon).
 */
const LEVEL_REWARDS: { level: number; gear: GearItem }[] = [
  {
    level: 2,
    gear: {
      id: "gear-iron-gauntlets",
      name: "Iron Gauntlets",
      slot: "armor",
      rarity: "common",
      statBonuses: { strength: 1, discipline: 1 },
      iconKey: "ironGauntlets",
      source: "Level 2 Reward",
    },
  },
  {
    level: 3,
    gear: {
      id: "gear-apprentice-staff",
      name: "Apprentice Staff",
      slot: "weapon",
      rarity: "common",
      statBonuses: { intelligence: 2 },
      iconKey: "apprenticeStaff",
      source: "Level 3 Reward",
    },
  },
  {
    level: 4,
    gear: {
      id: "gear-leather-cloak",
      name: "Leather Cloak",
      slot: "accessory",
      rarity: "common",
      statBonuses: { charisma: 1, discipline: 1 },
      iconKey: "leatherCloak",
      source: "Level 4 Reward",
    },
  },
  {
    level: 5,
    gear: {
      id: "gear-steel-sword",
      name: "Steel Sword",
      slot: "weapon",
      rarity: "uncommon",
      statBonuses: { strength: 3, discipline: 1 },
      iconKey: "steelSword",
      source: "Level 5 Reward",
    },
  },
  {
    level: 6,
    gear: {
      id: "gear-chain-mail",
      name: "Chain Mail",
      slot: "armor",
      rarity: "uncommon",
      statBonuses: { strength: 2, discipline: 2 },
      iconKey: "chainMail",
      source: "Level 6 Reward",
    },
  },
  {
    level: 7,
    gear: {
      id: "gear-focus-amulet",
      name: "Focus Amulet",
      slot: "accessory",
      rarity: "uncommon",
      statBonuses: { intelligence: 2, charisma: 2 },
      iconKey: "focusAmulet",
      source: "Level 7 Reward",
    },
  },
  {
    level: 8,
    gear: {
      id: "gear-flame-blade",
      name: "Flame Blade",
      slot: "weapon",
      rarity: "rare",
      statBonuses: { strength: 4, intelligence: 2 },
      iconKey: "flameBlade",
      source: "Level 8 Reward",
    },
  },
  {
    level: 9,
    gear: {
      id: "gear-mithril-plate",
      name: "Mithril Plate",
      slot: "armor",
      rarity: "rare",
      statBonuses: { strength: 3, discipline: 3 },
      iconKey: "mithrilPlate",
      source: "Level 9 Reward",
    },
  },
  {
    level: 10,
    gear: {
      id: "gear-shadow-ring",
      name: "Shadow Ring",
      slot: "accessory",
      rarity: "rare",
      statBonuses: { discipline: 3, charisma: 3 },
      iconKey: "shadowRing",
      source: "Level 10 Reward",
    },
  },
  {
    level: 11,
    gear: {
      id: "gear-arcane-scepter",
      name: "Arcane Scepter",
      slot: "weapon",
      rarity: "epic",
      statBonuses: { intelligence: 5, charisma: 3 },
      iconKey: "arcaneScepter",
      source: "Level 11 Reward",
    },
  },
  {
    level: 12,
    gear: {
      id: "gear-dragon-scale-armor",
      name: "Dragon Scale Armor",
      slot: "armor",
      rarity: "epic",
      statBonuses: { strength: 4, discipline: 4 },
      iconKey: "dragonScaleArmor",
      source: "Level 12 Reward",
    },
  },
  {
    level: 13,
    gear: {
      id: "gear-phoenix-feather",
      name: "Phoenix Feather",
      slot: "accessory",
      rarity: "epic",
      statBonuses: { intelligence: 3, charisma: 5 },
      iconKey: "phoenixFeather",
      source: "Level 13 Reward",
    },
  },
];

/** Get the gear reward for a specific level, or null if none. */
export function getRewardForLevel(level: number): GearItem | null {
  const entry = LEVEL_REWARDS.find((r) => r.level === level);
  return entry?.gear ?? null;
}

/** Get all gear items (for reference/testing). */
export function getAllGear(): GearItem[] {
  return LEVEL_REWARDS.map((r) => r.gear);
}
