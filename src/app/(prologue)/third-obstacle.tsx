/**
 * P.6 — Third Obstacle (Discipline Habit)
 * Design ref: designs/Third Obstacle - Third Habit.png
 *
 * Siren/shadow figure. Purple/pink atmospheric glow.
 * Different frequency options: Daily / Weekly / Monthly.
 * ProgressDots 3/3 (all green on completion).
 */

import { useCallback, useState } from "react";
import { Keyboard, Text, View } from "react-native";
import { Image } from "expo-image";
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

// Different frequency options for discipline habits (per design)
const FREQUENCY_OPTIONS: FrequencyOption[] = [
  { label: "Daily", value: "daily" },
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
];

const DIALOGUE =
  "A siren calls from the shadows. Its voice promises comfort but leads to ruin. What temptation will you resist?";

export default function ThirdObstacle() {
  const addHabit = usePrologueStore((s) => s.addHabit);
  const addXp = usePrologueStore((s) => s.addXp);
  const setStep = usePrologueStore((s) => s.setStep);

  const [habitName, setHabitName] = useState("");
  const [frequency, setFrequency] = useState<HabitFrequency>("daily");
  const [showXp, setShowXp] = useState(false);

  const canSubmit = habitName.trim().length > 0;

  const handleResist = useCallback(() => {
    if (!canSubmit) return;
    Keyboard.dismiss();

    addHabit({ name: habitName.trim(), frequency, category: "discipline" });
    addXp(50);
    setShowXp(true);
  }, [canSubmit, habitName, frequency, addHabit, addXp]);

  const handleXpComplete = useCallback(() => {
    setStep("cave_exit");
    router.push("/(prologue)/cave-exit");
  }, [setStep]);

  return (
    <ScreenWrapper bgColor="#0D0D1A" fullScreen withKeyboardAvoidance>
      <View className="flex-1 justify-end pb-8">
        {/* Scene illustration — purple/pink themed */}
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={sceneImages.shadowSiren}
            style={{ width: 280, height: 200 }}
            contentFit="contain"
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
            placeholder="e.g. No social media before noon, No junk food..."
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
            label="Resist the Siren"
            onPress={handleResist}
            disabled={!canSubmit || showXp}
            pulse={canSubmit && !showXp}
          />
        </MotiView>

        {/* Progress dots — current is 2 (third dot, 0-indexed) */}
        <ProgressDots total={3} current={2} />
      </View>
    </ScreenWrapper>
  );
}
