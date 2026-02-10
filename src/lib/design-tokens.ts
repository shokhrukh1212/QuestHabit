/**
 * Design tokens — single source of truth for all visual constants.
 * These mirror the Tailwind config in tailwind.config.js.
 * Use Tailwind classes when possible; use these for dynamic/animated styles.
 */

export const colors = {
  bg: {
    primary: "#0D0D1A",
    card: "#1A1A2E",
    elevated: "#252542",
  },
  accent: {
    purple: "#6C5CE7",
    gold: "#F4A261",
    green: "#2ECC71",
    red: "#E74C3C",
    blue: "#3498DB",
  },
  text: {
    primary: "#FFFFFF",
    secondary: "#B0B0C0",
    muted: "#7F8C8D",
  },
  rarity: {
    common: "#9E9E9E",
    uncommon: "#2ECC71",
    rare: "#3498DB",
    epic: "#6C5CE7",
    legendary: "#F4A261",
  },
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
} as const;

export const fontSize = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 20,
  "2xl": 24,
  title: 32,
} as const;
