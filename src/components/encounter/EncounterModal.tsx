/**
 * D.2 — Encounter Tap (Habit Confirmation Modal)
 * Design ref: designs/Encounter Tap (Habit Confirmation).png
 *
 * Modal overlay with narrative encounter text.
 * "I conquered it!" to confirm, "Not yet — I'll return" to dismiss.
 * RPG language, NOT productivity language.
 */

import { Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import { MotiView } from "moti";

import { StoneButton } from "@/components/ui/StoneButton";
import { getNarrative } from "@/lib/narrative-text";
import type { QuestWaypoint } from "@/types/game";

interface EncounterModalProps {
  waypoint: QuestWaypoint;
  onConquer: () => void;
  onDismiss: () => void;
}

export function EncounterModal({
  waypoint,
  onConquer,
  onDismiss,
}: EncounterModalProps) {
  const { habit } = waypoint;
  const narrative = getNarrative(habit.category);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
      }}
    >
      <MotiView
        from={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "timing", duration: 300 }}
        style={{
          backgroundColor: "#0D0D1A",
          borderWidth: 2,
          borderColor: "#6C5CE7",
          borderRadius: 16,
          paddingVertical: 32,
          paddingHorizontal: 24,
          width: "100%",
          maxWidth: 340,
          alignItems: "center",
        }}
      >
        {/* Encounter icon */}
        <Image
          source={narrative.icon}
          style={{ width: 96, height: 96, marginBottom: 20 }}
          contentFit="contain"
        />

        {/* Narrative text */}
        <Text
          style={{
            color: "#FFFFFF",
            fontSize: 16,
            lineHeight: 24,
            textAlign: "center",
            marginBottom: 12,
          }}
        >
          {narrative.encounterText}
        </Text>

        {/* Habit name */}
        <Text
          style={{
            color: "#FFFFFF",
            fontSize: 20,
            fontWeight: "800",
            textAlign: "center",
            marginBottom: 28,
          }}
        >
          {habit.name}
        </Text>

        {/* Conquer button */}
        <View style={{ width: "100%", marginBottom: 16 }}>
          <StoneButton
            label="I conquered it!"
            onPress={onConquer}
            pulse
          />
        </View>

        {/* Dismiss link */}
        <Pressable onPress={onDismiss}>
          <Text
            style={{
              color: "#7F8C8D",
              fontSize: 14,
            }}
          >
            Not yet — I&apos;ll return.
          </Text>
        </Pressable>
      </MotiView>
    </View>
  );
}
