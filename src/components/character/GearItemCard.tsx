/**
 * GearItemCard — Grid card for inventory display.
 * Shows pixel-art gear icon, rarity border color, "EQ" badge if equipped.
 */

import { Pressable, Text, View } from "react-native";
import { Image } from "expo-image";

import { RARITY_COLORS, getGearIcon } from "@/lib/gear-data";
import type { GearItem } from "@/types/game";

/** Blend a hex color toward #1A1A2E (dark bg) by a given factor (0 = full bg, 1 = full color). */
function dimColor(hex: string, factor: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const bgR = 0x1a;
  const bgG = 0x1a;
  const bgB = 0x2e;
  const nr = Math.round(bgR + (r - bgR) * factor);
  const ng = Math.round(bgG + (g - bgG) * factor);
  const nb = Math.round(bgB + (b - bgB) * factor);
  return `#${nr.toString(16).padStart(2, "0")}${ng.toString(16).padStart(2, "0")}${nb.toString(16).padStart(2, "0")}`;
}

interface GearItemCardProps {
  gear: GearItem;
  isEquipped: boolean;
  isSelected: boolean;
  onPress: () => void;
}

export function GearItemCard({
  gear,
  isEquipped,
  isSelected,
  onPress,
}: GearItemCardProps) {
  const rarityColor = RARITY_COLORS[gear.rarity];
  const gearIcon = getGearIcon(gear.iconKey);

  return (
    <Pressable
      onPress={onPress}
      style={{
        flex: 1,
        aspectRatio: 1,
        maxWidth: "33%",
        padding: 4,
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: isSelected ? "#2A2A4E" : "#1A1A2E",
          borderRadius: 12,
          borderWidth: 2,
          borderColor: isSelected ? rarityColor : dimColor(rarityColor, 0.4),
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
          padding: 8,
          ...(isSelected && {
            shadowColor: rarityColor,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.4,
            shadowRadius: 8,
            elevation: 4,
          }),
        }}
      >
        {gearIcon ? (
          <Image
            source={gearIcon}
            style={{ width: 36, height: 36 }}
            contentFit="contain"
          />
        ) : (
          <View
            style={{
              width: 36,
              height: 36,
              backgroundColor: "#3A3A5E",
              borderRadius: 8,
            }}
          />
        )}
        <Text
          style={{
            color: "#FFFFFF",
            fontSize: 10,
            fontWeight: "600",
            textAlign: "center",
          }}
          numberOfLines={1}
        >
          {gear.name}
        </Text>
        {isEquipped && (
          <View
            style={{
              position: "absolute",
              top: 4,
              right: 4,
              backgroundColor: "#2ECC71",
              borderRadius: 4,
              paddingHorizontal: 4,
              paddingVertical: 1,
            }}
          >
            <Text
              style={{ color: "#0D0D1A", fontSize: 8, fontWeight: "700" }}
            >
              EQ
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}
