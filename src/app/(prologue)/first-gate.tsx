/**
 * P.4 — First Gate (Fitness/Strength Habit)
 * Design ref: designs/First Gate - Fitness-Strength.png
 *
 * Massive iron gate scene. User enters first habit (fitness category).
 * FrequencyPicker: Daily / 5x/week / 4x/week / 3x/week.
 * FloatingXPText "+50 XP" on submit. ProgressDots 1/3.
 */

import { useCallback, useState } from "react";
import { Keyboard, View } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";
import { router } from "expo-router";

import { FloatingXPText } from "@/components/ui/FloatingXPText";
import {
  FrequencyPicker,
  type FrequencyOption,
} from "@/components/ui/FrequencyPicker";
import { ProgressDots } from "@/components/ui/ProgressDots";
import { RPGDialogueBox } from "@/components/ui/RPGDialogueBox";
import { ScreenWrapper } from "@/components/ui/ScreenWrapper";
import { StoneButton } from "@/components/ui/StoneButton";
import { StoneTabletInput } from "@/components/ui/StoneTabletInput";
import { sceneImages } from "@/lib/assets";
import { usePrologueStore } from "@/stores/prologue-store";
import type { HabitFrequency } from "@/types/game";

const FREQUENCY_OPTIONS: FrequencyOption[] = [
  { label: "Daily", value: "daily" },
  { label: "5x/week", value: "5x_week" },
  { label: "4x/week", value: "4x_week" },
  { label: "3x/week", value: "3x_week" },
];

const DIALOGUE =
  "This gate is sealed by ancient magic. Only real-world strength can break it. What real-world challenge will you conquer?";

export default function FirstGate() {
  const addHabit = usePrologueStore((s) => s.addHabit);
  const addXp = usePrologueStore((s) => s.addXp);
  const setStep = usePrologueStore((s) => s.setStep);

  const [habitName, setHabitName] = useState("");
  const [frequency, setFrequency] = useState<HabitFrequency>("daily");
  const [showXp, setShowXp] = useState(false);

  const canSubmit = habitName.trim().length > 0;

  const handleBreakGate = useCallback(() => {
    if (!canSubmit) return;
    Keyboard.dismiss();

    addHabit({ name: habitName.trim(), frequency, category: "fitness" });
    addXp(50);
    setShowXp(true);
  }, [canSubmit, habitName, frequency, addHabit, addXp]);

  const handleXpComplete = useCallback(() => {
    setStep("habit_2");
    router.push("/(prologue)/second-obstacle");
  }, [setStep]);

  return (
    <ScreenWrapper bgColor="#0D0D1A" fullScreen withKeyboardAvoidance>
      <View className="flex-1 justify-end pb-8">
        {/* Scene illustration — full-width with gradient fade */}
        <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
          <Image
            source={sceneImages.ironGate}
            style={{ width: "100%", height: 260 }}
            contentFit="cover"
          />
          <LinearGradient
            colors={["transparent", "#0D0D1A"]}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 60,
            }}
          />
          {showXp && (
            <FloatingXPText amount={50} onComplete={handleXpComplete} />
          )}
        </View>

        {/* Dialogue */}
        <View style={{ marginBottom: 20 }}>
          <RPGDialogueBox text={DIALOGUE} />
        </View>

        {/* Habit input */}
        <View style={{ marginBottom: 16 }}>
          <StoneTabletInput
            value={habitName}
            onChangeText={setHabitName}
            placeholder="e.g. Gym workout, Push-ups, Run 2km..."
          />
        </View>

        {/* Frequency picker */}
        <View style={{ marginBottom: 24 }}>
          <FrequencyPicker
            options={FREQUENCY_OPTIONS}
            selected={frequency}
            onSelect={setFrequency}
          />
        </View>

        {/* Submit button */}
        <MotiView
          animate={{ opacity: canSubmit ? 1 : 0.5 }}
          transition={{ type: "timing", duration: 200 }}
          style={{ paddingHorizontal: 48 }}
        >
          <StoneButton
            label="Break the Gate"
            onPress={handleBreakGate}
            disabled={!canSubmit || showXp}
            pulse={canSubmit && !showXp}
          />
        </MotiView>

        {/* Progress dots */}
        <ProgressDots total={3} current={0} />
      </View>
    </ScreenWrapper>
  );
}
