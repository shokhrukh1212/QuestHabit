/**
 * GearSlotGrid — 3 horizontal gear slots (weapon, armor, accessory).
 * Shows equipped item with rarity border, or slot placeholder image.
 * Tappable to open inventory.
 */

import { Pressable, Text, View } from "react-native";
import { Image } from "expo-image";

import { RARITY_COLORS, getGearIcon } from "@/lib/gear-data";
import { slotImages } from "@/lib/assets";
import type { EquippedGear, GearSlot } from "@/types/game";

const SLOT_CONFIG: { slot: GearSlot; label: string }[] = [
  { slot: "weapon", label: "Weapon" },
  { slot: "armor", label: "Armor" },
  { slot: "accessory", label: "Accessory" },
];

interface GearSlotGridProps {
  equippedGear: EquippedGear;
  onPress?: () => void;
}

export function GearSlotGrid({ equippedGear, onPress }: GearSlotGridProps) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: "row",
        justifyContent: "center",
        gap: 12,
      }}
    >
      {SLOT_CONFIG.map(({ slot, label }) => {
        const gear = equippedGear[slot];
        const borderColor = gear
          ? RARITY_COLORS[gear.rarity]
          : "#3A3A5E";
        const gearIcon = gear ? getGearIcon(gear.iconKey) : null;

        return (
          <View key={slot} style={{ alignItems: "center", gap: 4 }}>
            <View
              style={{
                width: 64,
                height: 64,
                borderRadius: 12,
                backgroundColor: "#1A1A2E",
                borderWidth: 2,
                borderColor,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {gearIcon ? (
                <Image
                  source={gearIcon}
                  style={{ width: 40, height: 40 }}
                  contentFit="contain"
                />
              ) : (
                <Image
                  source={slotImages[slot]}
                  style={{ width: 32, height: 32, opacity: 0.4 }}
                  contentFit="contain"
                />
              )}
            </View>
            <Text style={{ color: "#7F8C8D", fontSize: 10 }}>
              {gear ? gear.name : label}
            </Text>
          </View>
        );
      })}
    </Pressable>
  );
}
