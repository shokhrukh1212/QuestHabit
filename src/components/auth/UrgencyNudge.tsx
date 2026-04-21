/**
 * A.3 — Urgency Nudge (Day 5+ Inline Card)
 * Design ref: designs/Urgency Nudge (Day 5+ Inline Card).png
 *
 * Compact inline card shown above the quest path for Day 5+ guests.
 * Gold border, amber tint, character stats summary, "Save Now" button.
 * Slide-down enter animation. NOT a modal.
 */

import { Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { MotiView } from "moti";

import { StoneButton } from "@/components/ui/StoneButton";
import { iconImages } from "@/lib/assets";

interface UrgencyNudgeProps {
  xp: number;
  level: number;
  streak: number;
  dayNumber: number;
  onSaveNow: () => void;
  onDismiss: () => void;
}

export function UrgencyNudge({
  xp,
  level,
  streak,
  dayNumber,
  onSaveNow,
  onDismiss,
}: UrgencyNudgeProps) {
  return (
    <MotiView
      from={{ translateY: -60, opacity: 0 }}
      animate={{ translateY: 0, opacity: 1 }}
      transition={{ type: "timing", duration: 400 }}
      style={{
        marginHorizontal: 16,
        marginBottom: 12,
        backgroundColor: "rgba(244, 162, 97, 0.08)",
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: "#F4A261",
        paddingVertical: 12,
        paddingHorizontal: 14,
      }}
    >
      {/* Dismiss X — top right */}
      <Pressable
        onPress={onDismiss}
        hitSlop={12}
        style={{ position: "absolute", top: 8, right: 10, zIndex: 1 }}
      >
        <Ionicons name="close" size={18} color="#7F8C8D" />
      </Pressable>

      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        {/* Avatar */}
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: "#1A1A2E",
            borderWidth: 2,
            borderColor: "#F4A261",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={iconImages.characterAvatar}
            style={{ width: 30, height: 30 }}
            contentFit="contain"
          />
        </View>

        {/* Stats text */}
        <View style={{ flex: 1, marginRight: 60 }}>
          <Text
            style={{
              color: "#F4A261",
              fontSize: 13,
              fontWeight: "700",
              marginBottom: 2,
            }}
          >
            Don&apos;t lose your progress!
          </Text>
          <Text style={{ color: "#B0B0C0", fontSize: 11, lineHeight: 16 }}>
            Day {dayNumber} · Lv{level} · {xp} XP
            {streak > 0 ? ` · ${streak}🔥` : ""}
          </Text>
        </View>

        {/* Save Now button — positioned right */}
        <View style={{ position: "absolute", right: 0 }}>
          <StoneButton
            label="Save"
            onPress={onSaveNow}
            variant="gold"
          />
        </View>
      </View>
    </MotiView>
  );
}
