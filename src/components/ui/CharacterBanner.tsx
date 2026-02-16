/**
 * CharacterBanner — Compact status bar for the Quest Path screen.
 * Shows: avatar emoji + XP bar + Level badge + Day number.
 * Design ref: Top section of designs/Quest Path (Main Daily Screen).png
 */

import { Text, View } from "react-native";
import { Image } from "expo-image";

import { XPBar } from "@/components/ui/XPBar";
import { iconImages } from "@/lib/assets";
import { useCharacterStore, useXpProgress } from "@/stores/character-store";

export function CharacterBanner() {
  const character = useCharacterStore((s) => s.character);
  const getDayNumber = useCharacterStore((s) => s.getDayNumber);
  const { xpIntoLevel, xpNeeded } = useXpProgress();

  if (!character) return null;

  const dayNumber = getDayNumber();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 12,
      }}
    >
      {/* Avatar */}
      <View
        style={{
          width: 44,
          height: 44,
          borderRadius: 8,
          backgroundColor: "#1A1A2E",
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 1.5,
          borderColor: "#3A3A5E",
        }}
      >
        <Image
          source={iconImages.characterAvatar}
          style={{ width: 32, height: 32 }}
          contentFit="contain"
        />
      </View>

      {/* XP bar + level */}
      <View style={{ flex: 1, gap: 2 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#F4A261",
              fontSize: 14,
              fontWeight: "700",
            }}
          >
            Lv {character.level}
          </Text>
          <Text
            style={{
              color: "#B0B0C0",
              fontSize: 12,
            }}
          >
            Day {dayNumber}
          </Text>
        </View>
        <XPBar current={xpIntoLevel} max={xpNeeded} height={6} showLabel={false} />
      </View>
    </View>
  );
}
