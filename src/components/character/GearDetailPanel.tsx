/**
 * GearDetailPanel — Slide-up panel showing gear details with equip/unequip.
 * Shows pixel-art icon, name, rarity, stat bonuses, and action button.
 */

import { Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { MotiView } from "moti";

import { StoneButton } from "@/components/ui/StoneButton";
import { RARITY_COLORS, RARITY_LABELS, getGearIcon } from "@/lib/gear-data";
import { STAT_COLORS } from "@/lib/game-rules";
import type { CharacterStats, GearItem } from "@/types/game";

const STAT_LABELS: Record<keyof CharacterStats, string> = {
  strength: "Strength",
  intelligence: "Intelligence",
  discipline: "Discipline",
  charisma: "Charisma",
};

interface GearDetailPanelProps {
  gear: GearItem;
  isEquipped: boolean;
  onEquip: () => void;
  onUnequip: () => void;
  onClose: () => void;
}

export function GearDetailPanel({
  gear,
  isEquipped,
  onEquip,
  onUnequip,
  onClose,
}: GearDetailPanelProps) {
  const rarityColor = RARITY_COLORS[gear.rarity];
  const gearIcon = getGearIcon(gear.iconKey);

  return (
    <MotiView
      from={{ translateY: 200, opacity: 0 }}
      animate={{ translateY: 0, opacity: 1 }}
      transition={{ type: "timing", duration: 300 }}
      style={{
        backgroundColor: "#1A1A2E",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderWidth: 1,
        borderColor: "#3A3A5E",
        borderBottomWidth: 0,
        padding: 20,
        paddingBottom: 32,
      }}
    >
      {/* Close button */}
      <Pressable
        onPress={onClose}
        style={{ position: "absolute", top: 12, right: 16 }}
      >
        <Ionicons name="close" size={24} color="#7F8C8D" />
      </Pressable>

      {/* Header: icon + name + rarity */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 16,
          marginBottom: 16,
        }}
      >
        <View
          style={{
            width: 56,
            height: 56,
            borderRadius: 12,
            backgroundColor: "#0D0D1A",
            borderWidth: 2,
            borderColor: rarityColor,
            alignItems: "center",
            justifyContent: "center",
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
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={{ color: "#FFFFFF", fontSize: 18, fontWeight: "700" }}
          >
            {gear.name}
          </Text>
          <Text
            style={{
              color: rarityColor,
              fontSize: 12,
              fontWeight: "600",
              marginTop: 2,
            }}
          >
            {RARITY_LABELS[gear.rarity]} {gear.slot}
          </Text>
          {gear.source && (
            <Text
              style={{ color: "#7F8C8D", fontSize: 11, marginTop: 2 }}
            >
              {gear.source}
            </Text>
          )}
        </View>
      </View>

      {/* Stat bonuses */}
      <View style={{ marginBottom: 20, gap: 6 }}>
        {Object.entries(gear.statBonuses).map(([stat, bonus]) =>
          bonus ? (
            <View
              key={stat}
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <View
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor:
                    STAT_COLORS[stat as keyof CharacterStats],
                }}
              />
              <Text style={{ color: "#B0B0C0", fontSize: 14 }}>
                +{bonus} {STAT_LABELS[stat as keyof CharacterStats]}
              </Text>
            </View>
          ) : null,
        )}
      </View>

      {/* Action button */}
      <StoneButton
        label={isEquipped ? "Unequip" : "Equip"}
        onPress={isEquipped ? onUnequip : onEquip}
      />
    </MotiView>
  );
}
