/**
 * P.3 — Path Fork (Class Selection)
 * Design ref: designs/Path Fork (Class Selection).png
 *
 * Four class cards. On tap, selected card scales up + glows with class color,
 * others dim. Auto-advance to P.4 after ~0.8s delay.
 */

import { useCallback, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import { MotiView } from "moti";
import { router } from "expo-router";

import { ScreenWrapper } from "@/components/ui/ScreenWrapper";
import { sceneImages } from "@/lib/assets";
import { usePrologueStore } from "@/stores/prologue-store";
import type { CharacterClass } from "@/types/game";

interface ClassOption {
  id: CharacterClass;
  name: string;
  description: string;
  color: string;
}

const CLASS_OPTIONS: ClassOption[] = [
  {
    id: "warrior",
    name: "Warrior",
    description: "Your body is your weapon",
    color: "#E74C3C",
  },
  {
    id: "mage",
    name: "Mage",
    description: "Knowledge is your power",
    color: "#3498DB",
  },
  {
    id: "rogue",
    name: "Rogue",
    description: "Stealth is your advantage",
    color: "#2ECC71",
  },
  {
    id: "ranger",
    name: "Ranger",
    description: "Precision is your gift",
    color: "#F4A261",
  },
];

export default function PathFork() {
  const setClass = usePrologueStore((s) => s.setClass);
  const setStep = usePrologueStore((s) => s.setStep);
  const [selected, setSelected] = useState<CharacterClass | null>(null);

  const handleSelect = useCallback(
    (cls: CharacterClass) => {
      if (selected) return; // prevent double-tap
      setSelected(cls);
      setClass(cls);

      // Auto-advance after short delay for the selection animation to play
      setTimeout(() => {
        setStep("habit_1");
        router.push("/(prologue)/first-gate");
      }, 800);
    },
    [selected, setClass, setStep],
  );

  return (
    <ScreenWrapper bgColor="#0D0D1A" fullScreen>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          paddingHorizontal: 16,
        }}
      >
        {/* Scene illustration — large centered 2x2 grid */}
        <View style={{ alignItems: "center", marginBottom: 8 }}>
          <Image
            source={sceneImages.pathFork}
            style={{ width: "100%", height: 260 }}
            contentFit="contain"
          />
        </View>
          {/* Title dialogue */}
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 22,
              fontWeight: "700",
              textAlign: "center",
              lineHeight: 32,
              marginBottom: 32,
              paddingHorizontal: 16,
            }}
          >
            &ldquo;Four paths. Each demands a different kind of strength. Which
            calls to you?&rdquo;
          </Text>

          {/* Class cards */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              gap: 10,
              paddingHorizontal: 4,
            }}
          >
            {CLASS_OPTIONS.map((option) => {
              const isSelected = selected === option.id;
              const isDimmed = selected !== null && !isSelected;

              return (
                <MotiView
                  key={option.id}
                  animate={{
                    scale: isSelected ? 1.08 : 1,
                    opacity: isDimmed ? 0.4 : 1,
                  }}
                  transition={{ type: "timing", duration: 300 }}
                  style={{ flex: 1 }}
                >
                  <Pressable
                    onPress={() => handleSelect(option.id)}
                    disabled={selected !== null}
                    style={{
                      backgroundColor: "rgba(26, 26, 46, 0.8)",
                      borderWidth: 2,
                      borderColor: isSelected ? option.color : "#3A3A5E",
                      borderRadius: 12,
                      paddingVertical: 16,
                      paddingHorizontal: 8,
                      alignItems: "center",
                      ...(isSelected && {
                        shadowColor: option.color,
                        shadowOffset: { width: 0, height: 0 },
                        shadowOpacity: 0.6,
                        shadowRadius: 12,
                        elevation: 8,
                      }),
                    }}
                  >
                    <Text
                      style={{
                        color: isSelected ? option.color : "#FFFFFF",
                        fontSize: 14,
                        fontWeight: "700",
                        marginBottom: 6,
                      }}
                    >
                      {option.name}
                    </Text>
                    <Text
                      style={{
                        color: "#B0B0C0",
                        fontSize: 11,
                        textAlign: "center",
                        lineHeight: 16,
                      }}
                    >
                      {option.description}
                    </Text>
                  </Pressable>
                </MotiView>
              );
            })}
          </View>
      </View>
    </ScreenWrapper>
  );
}
