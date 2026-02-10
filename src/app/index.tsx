/**
 * Entry point — checks prologue completion status.
 * Routes to (prologue) for new users, (tabs) for returning users.
 */

import { Redirect } from "expo-router";

import { usePrologueStore } from "@/stores/prologue-store";

export default function Index() {
  const currentStep = usePrologueStore((s) => s.currentStep);

  if (currentStep === "completed") {
    return <Redirect href="/(tabs)/quest-path" />;
  }

  return <Redirect href="/(prologue)/cave-awakening" />;
}
