/**
 * P.5 — Second Obstacle (Knowledge/Learning Habit)
 * Design ref: designs/Second Obstacle - Knowledge-Learning.png
 *
 * Mysterious scroll on stone pedestal. Blue/cyan palette.
 * Same pattern as P.4 but themed for learning category.
 * ProgressDots 2/3.
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

const FREQUENCY_OPTIONS: FrequencyOption[] = [
  { label: "Daily", value: "daily" },
  { label: "5x/week", value: "5x_week" },
  { label: "4x/week", value: "4x_week" },
  { label: "3x/week", value: "3x_week" },
];

const DIALOGUE =
  "A mysterious scroll lies on a pedestal. Ancient wisdom locked within. What knowledge will you seek?";

export default function SecondObstacle() {
  const addHabit = usePrologueStore((s) => s.addHabit);
  const addXp = usePrologueStore((s) => s.addXp);
  const setStep = usePrologueStore((s) => s.setStep);

  const [habitName, setHabitName] = useState("");
  const [frequency, setFrequency] = useState<HabitFrequency>("daily");
  const [showXp, setShowXp] = useState(false);

  const canSubmit = habitName.trim().length > 0;

  const handleDecipher = useCallback(() => {
    if (!canSubmit) return;
    Keyboard.dismiss();

    addHabit({ name: habitName.trim(), frequency, category: "learning" });
    addXp(50);
    setShowXp(true);
  }, [canSubmit, habitName, frequency, addHabit, addXp]);

  const handleXpComplete = useCallback(() => {
    setStep("habit_3");
    router.push("/(prologue)/third-obstacle");
  }, [setStep]);

  return (
    <ScreenWrapper bgColor="#0D0D1A" fullScreen withKeyboardAvoidance>
      <View className="flex-1 justify-end pb-8">
        {/* Scene illustration — blue/cyan themed */}
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={sceneImages.scrollPedestal}
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
            placeholder="e.g. Read 30 minutes, Study Spanish, Learn coding..."
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

        {/* Submit button — blue tint differentiation */}
        <MotiView
          animate={{ opacity: canSubmit ? 1 : 0.5 }}
          transition={{ type: "timing", duration: 200 }}
          style={{ paddingHorizontal: 48 }}
        >
          <StoneButton
            label="Decipher the Scroll"
            onPress={handleDecipher}
            disabled={!canSubmit || showXp}
            pulse={canSubmit && !showXp}
          />
        </MotiView>

        {/* Progress dots */}
        <ProgressDots total={3} current={1} />
      </View>
    </ScreenWrapper>
  );
}
