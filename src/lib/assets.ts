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
} as const;

// --- Icons (small, png format) ---

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
