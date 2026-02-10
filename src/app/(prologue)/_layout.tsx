/**
 * Prologue layout — Stack navigator with NO headers, fade transitions.
 * Renders the 7-screen onboarding sequence (P.1-P.7).
 * Zero app chrome during prologue — no nav bars, no status bar, no headers.
 */

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function PrologueLayout() {
  return (
    <>
      <StatusBar hidden />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "fade",
          contentStyle: { backgroundColor: "#000000" },
          gestureEnabled: false,
        }}
      >
        <Stack.Screen name="cave-awakening" />
        <Stack.Screen name="character-mirror" />
        <Stack.Screen name="path-fork" />
        <Stack.Screen name="first-gate" />
        <Stack.Screen name="second-obstacle" />
        <Stack.Screen name="third-obstacle" />
        <Stack.Screen name="cave-exit" />
      </Stack>
    </>
  );
}
