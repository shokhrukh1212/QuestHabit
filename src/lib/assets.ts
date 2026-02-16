/**
 * Central asset map — single source of truth for all image references.
 * require() calls must be static (no dynamic paths), so we list them all here.
 */

// --- Scene Illustrations (large, webp format) ---

export const sceneImages = {
  caveAwakening: require("../../assets/images/scenes/Cave Awakening.webp"),
  characterMirror: require("../../assets/images/scenes/Character Mirror.webp"),
  pathFork: require("../../assets/images/scenes/Path Fork.webp"),
  ironGate: require("../../assets/images/scenes/Iron Gate.webp"),
  scrollPedestal: require("../../assets/images/scenes/Scroll Pedestal.webp"),
  shadowSiren: require("../../assets/images/scenes/Shadow Siren.webp"),
  caveExit: require("../../assets/images/scenes/Cave Exit.webp"),
  questPathBg: require("../../assets/images/scenes/Quest Path Background.webp"),
  gateShatter: require("../../assets/images/scenes/Gate Shatter.webp"),
  scrollDecipher: require("../../assets/images/scenes/Scroll Decipher.webp"),
  sirenResist: require("../../assets/images/scenes/Siren Resist.webp"),
  missedHabitNight: require("../../assets/images/scenes/Missed Habit Night.webp"),
  campfireCelebration: require("../../assets/images/scenes/Campfire Celebration.webp"),
  levelUpCelebration: require("../../assets/images/scenes/Level Up Celebration.webp"),
} as const;

// --- Hairstyle Icons (character mirror, png format) ---

export const hairstyleImages = {
  shortSpiky: require("../../assets/hairystyles/Short Spiky.png"),
  mediumWavy: require("../../assets/hairystyles/Medium Wavy.png"),
  longStraight: require("../../assets/hairystyles/Long Straight.png"),
  buzzCut: require("../../assets/hairystyles/Buzz Cut.png"),
  ponytail: require("../../assets/hairystyles/Ponytail.png"),
  braided: require("../../assets/hairystyles/Braided.png"),
} as const;

// --- Icons (small, png format) ---

export const iconImages = {
  ironGate: require("../../assets/images/icons/Iron Gate Icon.png"),
  scroll: require("../../assets/images/icons/Glowing Scroll Icon.png"),
  siren: require("../../assets/images/icons/Siren Icon.png"),
  campfire: require("../../assets/images/icons/Campfire Icon.png"),
  characterAvatar: require("../../assets/images/icons/Character Avatar.png"),
} as const;

// --- Gear Item Icons (Phase 4, png format) ---

export const gearImages = {
  ironGauntlets: require("../../assets/images/icons/gear/Iron Gauntlets.png"),
  apprenticeStaff: require("../../assets/images/icons/gear/Apprentice Staff.png"),
  leatherCloak: require("../../assets/images/icons/gear/Leather Cloak.png"),
  steelSword: require("../../assets/images/icons/gear/Steel Sword.png"),
  chainMail: require("../../assets/images/icons/gear/Chain Mail.png"),
  focusAmulet: require("../../assets/images/icons/gear/Focus Amulet.png"),
  flameBlade: require("../../assets/images/icons/gear/Flame Blade.png"),
  mithrilPlate: require("../../assets/images/icons/gear/Mithril Plate.png"),
  shadowRing: require("../../assets/images/icons/gear/Shadow Ring.png"),
  arcaneScepter: require("../../assets/images/icons/gear/Arcane Scepter.png"),
  dragonScaleArmor: require("../../assets/images/icons/gear/Dragon Scale Armor.png"),
  phoenixFeather: require("../../assets/images/icons/gear/Phoenix Feather.png"),
} as const;

// --- Stat Icons (Phase 4, png format) ---

export const statImages = {
  strength: require("../../assets/images/icons/stats/Strength Icon.png"),
  intelligence: require("../../assets/images/icons/stats/Intelligence Icon.png"),
  discipline: require("../../assets/images/icons/stats/Discipline Icon.png"),
  charisma: require("../../assets/images/icons/stats/Charisma Icon.png"),
} as const;

// --- Gear Slot Placeholder Icons (Phase 4, png format) ---

export const slotImages = {
  weapon: require("../../assets/images/icons/slots/Empty Weapon Slot.png"),
  armor: require("../../assets/images/icons/slots/Empty Armor Slot.png"),
  accessory: require("../../assets/images/icons/slots/Empty Accessory Slot.png"),
} as const;
