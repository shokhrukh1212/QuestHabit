/**
 * P.2 — Character Mirror (Customization)
 * Design ref: designs/Character Mirror (Customization).png
 *
 * Large oval mirror with purple glow + shimmer animation.
 * Skin tone circles, hair style pixel-art thumbnails (scrollable), hair color circles.
 * Character preview updates in real-time.
 */

import { useCallback } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Image, type ImageSource } from "expo-image";
import { MotiView } from "moti";
import { router } from "expo-router";

import { ScreenWrapper } from "@/components/ui/ScreenWrapper";
import { StoneButton } from "@/components/ui/StoneButton";
import { hairstyleImages, sceneImages } from "@/lib/assets";
import { usePrologueStore } from "@/stores/prologue-store";

// --- Option data ---

const SKIN_TONES = ["#F5D0A9", "#D2A679", "#A0724A", "#6B4226", "#3B2010"];

const HAIR_STYLES: { label: string; source: ImageSource }[] = [
  { label: "Spiky", source: hairstyleImages.shortSpiky },
  { label: "Wavy", source: hairstyleImages.mediumWavy },
  { label: "Long", source: hairstyleImages.longStraight },
  { label: "Buzz", source: hairstyleImages.buzzCut },
  { label: "Ponytail", source: hairstyleImages.ponytail },
  { label: "Braided", source: hairstyleImages.braided },
];

const HAIR_COLORS = ["#FFD700", "#D4E157", "#DC143C", "#C2185B"];

export default function CharacterMirror() {
  const appearance = usePrologueStore((s) => s.characterAppearance);
  const setAppearance = usePrologueStore((s) => s.setAppearance);
  const setStep = usePrologueStore((s) => s.setStep);

  const handleContinue = useCallback(() => {
    setStep("path_fork");
    router.push("/(prologue)/path-fork");
  }, [setStep]);

  return (
    <ScreenWrapper bgColor="#0D0D1A" fullScreen>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          paddingVertical: 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <Text
          style={{
            color: "#FFFFFF",
            fontSize: 22,
            fontWeight: "700",
            textAlign: "center",
            marginBottom: 24,
            paddingHorizontal: 24,
          }}
        >
          Who are you? What do you look like?
        </Text>

        {/* Mirror with shimmer — larger */}
        <View style={{ alignItems: "center", marginBottom: 28 }}>
          <MotiView
            from={{ opacity: 0.6 }}
            animate={{ opacity: 1 }}
            transition={{ type: "timing", duration: 2000, loop: true }}
          >
            <View
              style={{
                width: 240,
                height: 300,
                borderRadius: 120,
                borderWidth: 3,
                borderColor: "#6C5CE7",
                backgroundColor: "#1A1A2E",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                shadowColor: "#6C5CE7",
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.5,
                shadowRadius: 20,
                elevation: 10,
              }}
            >
              <Image
                source={sceneImages.characterMirror}
                style={{ width: 240, height: 300 }}
                contentFit="cover"
              />
            </View>
          </MotiView>
        </View>

        {/* Skin tone selection */}
        <SectionLabel text="Your skin" />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: 14,
            marginBottom: 20,
          }}
        >
          {SKIN_TONES.map((color, i) => (
            <ColorCircle
              key={color}
              color={color}
              isSelected={appearance.skinTone === i}
              onPress={() => setAppearance({ skinTone: i })}
            />
          ))}
        </View>

        {/* Hair style selection — pixel-art icons */}
        <SectionLabel text="Your hair" />
        <View style={{ marginBottom: 20 }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 24,
              gap: 12,
            }}
          >
            {HAIR_STYLES.map((style, i) => (
              <Pressable
                key={`hair-${i}`}
                onPress={() => setAppearance({ hairStyle: i })}
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 12,
                  backgroundColor:
                    appearance.hairStyle === i ? "#6C5CE7" : "#1A1A2E",
                  borderWidth: 2,
                  borderColor:
                    appearance.hairStyle === i ? "#8B7CF7" : "#3A3A5E",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <Image
                  source={style.source}
                  style={{ width: 40, height: 40 }}
                  contentFit="contain"
                />
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Hair color selection */}
        <SectionLabel text="Your hair color" />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: 14,
            marginBottom: 28,
          }}
        >
          {HAIR_COLORS.map((color, i) => (
            <ColorCircle
              key={color}
              color={color}
              isSelected={appearance.hairColor === i}
              onPress={() => setAppearance({ hairColor: i })}
            />
          ))}
        </View>

        {/* Continue button */}
        <View style={{ paddingHorizontal: 48 }}>
          <StoneButton label="Continue" onPress={handleContinue} />
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

// --- Sub-components ---

function SectionLabel({ text }: { text: string }) {
  return (
    <Text
      style={{
        color: "#B0B0C0",
        fontSize: 14,
        fontWeight: "600",
        textAlign: "center",
        marginBottom: 12,
        marginTop: 4,
      }}
    >
      {text}
    </Text>
  );
}

function ColorCircle({
  color,
  isSelected,
  onPress,
}: {
  color: string;
  isSelected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: color,
        borderWidth: isSelected ? 3 : 2,
        borderColor: isSelected ? "#6C5CE7" : "transparent",
        ...(isSelected && {
          shadowColor: "#6C5CE7",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.6,
          shadowRadius: 8,
          elevation: 4,
        }),
      }}
    />
  );
}
