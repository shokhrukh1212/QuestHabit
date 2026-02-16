/**
 * C.3 — Level Up Celebration
 * Design ref: designs/Level Up Celebration.png
 *
 * Full-screen overlay triggered when XP crosses a level threshold.
 * Golden glow, "LEVEL UP!" text, stat increases, optional gear reward card.
 * Follows CompletionCelebration pattern.
 */

import { useEffect } from "react";
import { Text, View } from "react-native";
import { Image } from "expo-image";
import * as Haptics from "expo-haptics";
import { MotiView } from "moti";

import { StoneButton } from "@/components/ui/StoneButton";
import { RARITY_COLORS, RARITY_LABELS, getGearIcon } from "@/lib/gear-data";
import { STAT_COLORS } from "@/lib/game-rules";
import { iconImages, sceneImages } from "@/lib/assets";
import type { PendingLevelUp } from "@/stores/character-store";
import type { CharacterStats } from "@/types/game";

interface LevelUpCelebrationProps {
  levelUp: PendingLevelUp;
  onDone: () => void;
}

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

export function LevelUpCelebration({
  levelUp,
  onDone,
}: LevelUpCelebrationProps) {
  const { newLevel, statIncreases, rewardGear } = levelUp;

  useEffect(() => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }, []);

  // Gold particle positions — spread across the screen
  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    left: (i % 4) * 80 + 30,
    top: 250 + (i % 3) * 120,
    delay: i * 250,
  }));

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#000000",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
      }}
    >
      {/* Background burst scene */}
      <Image
        source={sceneImages.levelUpCelebration}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.5,
        }}
        contentFit="cover"
      />

      {/* Gold particles floating upward */}
      {particles.map((p) => (
        <MotiView
          key={p.id}
          from={{ translateY: 0, opacity: 0.8 }}
          animate={{ translateY: -250, opacity: 0 }}
          transition={{
            type: "timing",
            duration: 2500,
            delay: p.delay,
            loop: true,
          }}
          style={{
            position: "absolute",
            left: p.left,
            top: p.top,
            width: 6,
            height: 6,
            borderRadius: 3,
            backgroundColor: "#F4A261",
          }}
        />
      ))}

      {/* "LEVEL UP!" — huge golden text */}
      <MotiView
        from={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "timing", duration: 600 }}
      >
        <Text
          style={{
            color: "#F4A261",
            fontSize: 48,
            fontWeight: "900",
            textAlign: "center",
            textShadowColor: "rgba(244, 162, 97, 0.6)",
            textShadowOffset: { width: 0, height: 0 },
            textShadowRadius: 24,
          }}
        >
          LEVEL UP!
        </Text>
      </MotiView>

      {/* Character avatar with gold glow */}
      <MotiView
        from={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "timing", duration: 500, delay: 200 }}
        style={{ marginVertical: 20 }}
      >
        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: "#1A1A2E",
            borderWidth: 3,
            borderColor: "#F4A261",
            alignItems: "center",
            justifyContent: "center",
            shadowColor: "#F4A261",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.6,
            shadowRadius: 20,
            elevation: 10,
          }}
        >
          <Image
            source={iconImages.characterAvatar}
            style={{ width: 70, height: 70 }}
            contentFit="contain"
          />
        </View>
        <View
          style={{
            position: "absolute",
            bottom: -4,
            alignSelf: "center",
            backgroundColor: "#F4A261",
            borderRadius: 10,
            paddingHorizontal: 10,
            paddingVertical: 2,
          }}
        >
          <Text
            style={{ color: "#0D0D1A", fontSize: 14, fontWeight: "800" }}
          >
            Lv{newLevel}
          </Text>
        </View>
      </MotiView>

      {/* Stat increases — staggered animation */}
      <MotiView
        from={{ opacity: 0, translateY: 10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 500, delay: 500 }}
        style={{ marginBottom: 24 }}
      >
        {STAT_ORDER.map((stat, i) => {
          const increase = statIncreases[stat];
          if (increase <= 0) return null;
          return (
            <MotiView
              key={stat}
              from={{ opacity: 0, translateX: -20 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ type: "timing", duration: 400, delay: 600 + i * 150 }}
            >
              <Text
                style={{
                  color: STAT_COLORS[stat],
                  fontSize: 18,
                  fontWeight: "700",
                  textAlign: "center",
                  marginVertical: 2,
                }}
              >
                +{increase} {STAT_LABELS[stat]}
              </Text>
            </MotiView>
          );
        })}
      </MotiView>

      {/* Gear reward card */}
      {rewardGear && (
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 500, delay: 1200 }}
          style={{
            backgroundColor: "#1A1A2E",
            borderRadius: 16,
            borderWidth: 2,
            borderColor: RARITY_COLORS[rewardGear.rarity],
            padding: 20,
            width: "100%",
            maxWidth: 300,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 16,
              fontWeight: "700",
              marginBottom: 12,
            }}
          >
            {rewardGear.name} Unlocked!
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 16,
            }}
          >
            <View
              style={{
                width: 56,
                height: 56,
                borderRadius: 12,
                backgroundColor: "#0D0D1A",
                borderWidth: 2,
                borderColor: RARITY_COLORS[rewardGear.rarity],
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {getGearIcon(rewardGear.iconKey) ? (
                <Image
                  source={getGearIcon(rewardGear.iconKey)}
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
                style={{
                  color: RARITY_COLORS[rewardGear.rarity],
                  fontSize: 12,
                  fontWeight: "600",
                  marginBottom: 4,
                }}
              >
                {RARITY_LABELS[rewardGear.rarity]}
              </Text>
              {Object.entries(rewardGear.statBonuses).map(
                ([stat, bonus]) =>
                  bonus ? (
                    <Text
                      key={stat}
                      style={{ color: "#B0B0C0", fontSize: 12 }}
                    >
                      +{bonus}{" "}
                      {STAT_LABELS[stat as keyof CharacterStats]}
                    </Text>
                  ) : null,
              )}
            </View>
          </View>
        </MotiView>
      )}

      {/* Continue button */}
      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "timing", duration: 500, delay: 1600 }}
        style={{
          marginTop: 32,
          width: "100%",
          maxWidth: 240,
        }}
      >
        <StoneButton label="Continue" onPress={onDone} variant="gold" />
      </MotiView>
    </View>
  );
}
