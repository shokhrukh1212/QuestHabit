/**
 * Route type definitions for Expo Router.
 * Helps with type-safe navigation across the app.
 */

export type TabRoute =
  | "/(tabs)/quest-path"
  | "/(tabs)/character"
  | "/(tabs)/world-map"
  | "/(tabs)/party"
  | "/(tabs)/settings";

export type PrologueRoute =
  | "/(prologue)/cave-awakening"
  | "/(prologue)/character-mirror"
  | "/(prologue)/path-fork"
  | "/(prologue)/habit-setup"
  | "/(prologue)/cave-exit";
