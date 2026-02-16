/**
 * C.2 — Inventory Modal (Gear Grid)
 * Design ref: designs/Inventory - Gear Grid.png
 *
 * Full-screen modal with filter tabs (All/Weapons/Armor/Accessories),
 * 3-column grid of GearItemCards, and GearDetailPanel on selection.
 */

import { useCallback, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { GearDetailPanel } from "@/components/character/GearDetailPanel";
import { GearItemCard } from "@/components/character/GearItemCard";
import { ScreenWrapper } from "@/components/ui/ScreenWrapper";
import { useCharacterStore } from "@/stores/character-store";
import { useInventoryStore } from "@/stores/inventory-store";
import type { GearItem, GearSlot } from "@/types/game";

type FilterTab = "all" | "weapon" | "armor" | "accessory";

const TABS: { id: FilterTab; label: string }[] = [
  { id: "all", label: "All" },
  { id: "weapon", label: "Weapons" },
  { id: "armor", label: "Armor" },
  { id: "accessory", label: "Accessories" },
];

interface InventoryModalProps {
  onClose: () => void;
}

export function InventoryModal({ onClose }: InventoryModalProps) {
  const ownedGear = useInventoryStore((s) => s.ownedGear);
  const character = useCharacterStore((s) => s.character);
  const equipGear = useCharacterStore((s) => s.equipGear);
  const unequipGear = useCharacterStore((s) => s.unequipGear);

  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [selectedGear, setSelectedGear] = useState<GearItem | null>(null);

  const filteredGear =
    activeTab === "all"
      ? ownedGear
      : ownedGear.filter((g) => g.slot === activeTab);

  const isEquipped = useCallback(
    (gear: GearItem): boolean => {
      if (!character) return false;
      const equipped = character.equippedGear[gear.slot];
      return equipped?.id === gear.id;
    },
    [character],
  );

  const handleEquip = useCallback(() => {
    if (!selectedGear) return;
    equipGear(selectedGear);
    setSelectedGear(null);
  }, [selectedGear, equipGear]);

  const handleUnequip = useCallback(() => {
    if (!selectedGear) return;
    unequipGear(selectedGear.slot);
    setSelectedGear(null);
  }, [selectedGear, unequipGear]);

  return (
    <ScreenWrapper>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 16,
          paddingVertical: 12,
        }}
      >
        <Pressable onPress={onClose}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </Pressable>
        <Text
          style={{ color: "#FFFFFF", fontSize: 18, fontWeight: "700" }}
        >
          Inventory
        </Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Filter tabs */}
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 12,
          marginBottom: 12,
          gap: 4,
        }}
      >
        {TABS.map((tab) => (
          <Pressable
            key={tab.id}
            onPress={() => setActiveTab(tab.id)}
            style={{
              flex: 1,
              paddingVertical: 8,
              borderRadius: 8,
              backgroundColor:
                activeTab === tab.id ? "#6C5CE7" : "transparent",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: activeTab === tab.id ? "#FFFFFF" : "#7F8C8D",
                fontSize: 12,
                fontWeight: "600",
              }}
            >
              {tab.label}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Gear grid */}
      <FlatList
        data={filteredGear}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={{
          paddingHorizontal: 8,
          paddingBottom: selectedGear ? 220 : 20,
        }}
        renderItem={({ item }) => (
          <GearItemCard
            gear={item}
            isEquipped={isEquipped(item)}
            isSelected={selectedGear?.id === item.id}
            onPress={() =>
              setSelectedGear(
                selectedGear?.id === item.id ? null : item,
              )
            }
          />
        )}
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 60,
              paddingHorizontal: 24,
            }}
          >
            <Ionicons name="sparkles-outline" size={48} color="#3A3A5E" />
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 16,
                fontWeight: "600",
                marginTop: 16,
                textAlign: "center",
              }}
            >
              Your pack is empty
            </Text>
            <Text
              style={{
                color: "#7F8C8D",
                fontSize: 13,
                marginTop: 8,
                textAlign: "center",
                lineHeight: 20,
              }}
            >
              Mighty gear awaits those who grow stronger. Keep conquering
              your quests to earn legendary rewards.
            </Text>
          </View>
        }
      />

      {/* Detail panel — slides up from bottom */}
      {selectedGear && (
        <View style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
          <GearDetailPanel
            gear={selectedGear}
            isEquipped={isEquipped(selectedGear)}
            onEquip={handleEquip}
            onUnequip={handleUnequip}
            onClose={() => setSelectedGear(null)}
          />
        </View>
      )}
    </ScreenWrapper>
  );
}
