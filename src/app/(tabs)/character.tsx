/**
 * C.1 — Character Profile (Full Sheet)
 * Design ref: designs/Character Profile - Full Sheet.png
 *
 * Full RPG character sheet: avatar, name/class/level, XP bar,
 * 4 stat bars (tappable → stat detail), 3 gear slots (tappable → inventory).
 * Uses in-screen state for modal overlays (inventory, stat detail).
 */

import { useCallback, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Image } from "expo-image";

import { FeatureGatedAuth } from "@/components/auth/FeatureGatedAuth";
import { GuestBanner } from "@/components/auth/GuestBanner";
import { GearSlotGrid } from "@/components/character/GearSlotGrid";
import { StatBar } from "@/components/character/StatBar";
import { ScreenWrapper } from "@/components/ui/ScreenWrapper";
import { XPBar } from "@/components/ui/XPBar";
import { STAT_COLORS } from "@/lib/game-rules";
import { iconImages, statImages } from "@/lib/assets";
import { useAuthStore } from "@/stores/auth-store";
import { useCharacterStore, useXpProgress } from "@/stores/character-store";
import { useHabitStore } from "@/stores/habit-store";
import { useInventoryStore } from "@/stores/inventory-store";
import type { CharacterStats } from "@/types/game";

type ScreenView = "profile" | "inventory" | "stat_detail";

const CLASS_LABELS: Record<string, string> = {
  warrior: "Warrior",
  mage: "Mage",
  rogue: "Rogue",
  ranger: "Ranger",
};

const STAT_LABELS: Record<keyof CharacterStats, string> = {
  strength: "Strength",
  intelligence: "Intelligence",
  discipline: "Discipline",
  charisma: "Charisma",
};

const STAT_ORDER: (keyof CharacterStats)[] = [
  "strength",
  "intelligence",
  "discipline",
  "charisma",
];

export default function CharacterScreen() {
  const character = useCharacterStore((s) => s.character);
  const getDayNumber = useCharacterStore((s) => s.getDayNumber);
  const { xpIntoLevel, xpNeeded } = useXpProgress();
  const totalCompletions = useHabitStore(
    (s) => s.events.filter((e) => e.eventType === "completed").length,
  );
  const totalGearOwned = useInventoryStore((s) => s.ownedGear.length);

  const isGuest = useAuthStore((s) => s.isGuest);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const [screenView, setScreenView] = useState<ScreenView>("profile");
  const [selectedStat, setSelectedStat] = useState<keyof CharacterStats | null>(
    null,
  );

  const handleStatPress = useCallback((stat: keyof CharacterStats) => {
    setSelectedStat(stat);
    setScreenView("stat_detail");
  }, []);

  const handleGearPress = useCallback(() => {
    setScreenView("inventory");
  }, []);

  // Lazy-load modals to avoid circular deps and keep bundle small
  // These will be implemented in Steps 11 and 12
  if (screenView === "inventory") {
    const InventoryModal =
      require("@/components/character/InventoryModal").InventoryModal;
    return (
      <InventoryModal onClose={() => setScreenView("profile")} />
    );
  }

  if (screenView === "stat_detail" && selectedStat) {
    const StatDetailModal =
      require("@/components/character/StatDetailModal").StatDetailModal;
    return (
      <StatDetailModal
        stat={selectedStat}
        onClose={() => {
          setSelectedStat(null);
          setScreenView("profile");
        }}
      />
    );
  }

  if (!character) {
    return (
      <ScreenWrapper>
        <View className="flex-1 items-center justify-center">
          <Text className="text-text-muted text-lg">
            Complete the prologue to unlock your hero
          </Text>
        </View>
      </ScreenWrapper>
    );
  }

  const dayNumber = getDayNumber();

  // Feature-gated auth modal for sync
  if (showAuthModal) {
    return (
      <FeatureGatedAuth
        context="sync"
        onAuthenticated={() => setShowAuthModal(false)}
        onDismiss={() => setShowAuthModal(false)}
      />
    );
  }

  return (
    <ScreenWrapper>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingVertical: 24,
          paddingHorizontal: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Guest banner */}
        {isGuest && (
          <GuestBanner onSaveProgress={() => setShowAuthModal(true)} />
        )}

        {/* Avatar — large centered */}
        <View style={{ alignItems: "center", marginBottom: 16 }}>
          <View
            style={{
              width: 120,
              height: 120,
              borderRadius: 20,
              backgroundColor: "#0D0D1A",
              borderWidth: 2,
              borderColor: "#6C5CE7",
              alignItems: "center",
              justifyContent: "center",
              shadowColor: "#6C5CE7",
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.5,
              shadowRadius: 16,
              elevation: 8,
            }}
          >
            <Image
              source={iconImages.characterAvatar}
              style={{ width: 90, height: 90 }}
              contentFit="contain"
            />
          </View>
        </View>

        {/* Name + Class + Level badge */}
        <View style={{ alignItems: "center", marginBottom: 16 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 22,
                fontWeight: "700",
              }}
            >
              {character.name} — {CLASS_LABELS[character.characterClass]}
            </Text>
            <View
              style={{
                backgroundColor: "#F4A261",
                borderRadius: 8,
                paddingHorizontal: 8,
                paddingVertical: 2,
              }}
            >
              <Text
                style={{
                  color: "#0D0D1A",
                  fontSize: 13,
                  fontWeight: "800",
                }}
              >
                Lv{character.level}
              </Text>
            </View>
          </View>
          <Text
            style={{
              color: "#7F8C8D",
              fontSize: 12,
              marginTop: 4,
            }}
          >
            Day {dayNumber} of your adventure
          </Text>
        </View>

        {/* XP Bar */}
        <View style={{ marginBottom: 28 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 4,
            }}
          >
            <Text
              style={{
                color: "#B0B0C0",
                fontSize: 12,
                fontWeight: "600",
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Experience
            </Text>
            <Text
              style={{ color: "#6C5CE7", fontSize: 12, fontWeight: "700" }}
            >
              {xpIntoLevel} / {xpNeeded} XP
            </Text>
          </View>
          <XPBar
            current={xpIntoLevel}
            max={xpNeeded}
            showLabel={false}
            height={10}
          />
        </View>

        {/* Stat Bars */}
        <View style={{ marginBottom: 28, gap: 2 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <Text
              style={{
                color: "#B0B0C0",
                fontSize: 12,
                fontWeight: "600",
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Stats
            </Text>
            <Text style={{ color: "#7F8C8D", fontSize: 10 }}>
              Tap to explore
            </Text>
          </View>
          {STAT_ORDER.map((stat) => (
            <StatBar
              key={stat}
              name={STAT_LABELS[stat]}
              value={character.stats[stat]}
              color={STAT_COLORS[stat]}
              icon={statImages[stat]}
              onPress={() => handleStatPress(stat)}
            />
          ))}
        </View>

        {/* Gear Slots */}
        <View style={{ marginBottom: 24 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <Text
              style={{
                color: "#B0B0C0",
                fontSize: 12,
                fontWeight: "600",
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Equipment
            </Text>
            <Text style={{ color: "#7F8C8D", fontSize: 10 }}>
              Tap to manage
            </Text>
          </View>
          <GearSlotGrid
            equippedGear={character.equippedGear}
            onPress={handleGearPress}
          />
        </View>

        {/* Journey So Far */}
        <View style={{ marginBottom: 24 }}>
          <Text
            style={{
              color: "#B0B0C0",
              fontSize: 12,
              fontWeight: "600",
              textTransform: "uppercase",
              letterSpacing: 1,
              marginBottom: 12,
            }}
          >
            Journey So Far
          </Text>
          <View
            style={{
              backgroundColor: "#1A1A2E",
              borderRadius: 12,
              padding: 16,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <JourneyStat label="Quests Conquered" value={totalCompletions} />
              <JourneyStat label="Day of Adventure" value={dayNumber} />
              <JourneyStat label="Gear Collected" value={totalGearOwned} />
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

function JourneyStat({ label, value }: { label: string; value: number }) {
  return (
    <View style={{ alignItems: "center", flex: 1 }}>
      <Text style={{ color: "#F4A261", fontSize: 20, fontWeight: "700" }}>
        {value}
      </Text>
      <Text
        style={{
          color: "#7F8C8D",
          fontSize: 10,
          textAlign: "center",
          marginTop: 2,
        }}
      >
        {label}
      </Text>
    </View>
  );
}
