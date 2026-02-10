/**
 * FrequencyPicker — Row of stone pill buttons for frequency selection.
 * Accepts custom options array for flexible use across P.4-P.6.
 */

import { Pressable, ScrollView, Text } from "react-native";

import type { HabitFrequency } from "@/types/game";

export interface FrequencyOption {
  label: string;
  value: HabitFrequency;
}

interface FrequencyPickerProps {
  options: FrequencyOption[];
  selected: HabitFrequency;
  onSelect: (value: HabitFrequency) => void;
}

export function FrequencyPicker({
  options,
  selected,
  onSelect,
}: FrequencyPickerProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 16,
        gap: 10,
        flexDirection: "row",
      }}
    >
      {options.map((option) => {
        const isSelected = option.value === selected;
        return (
          <Pressable
            key={option.value}
            onPress={() => onSelect(option.value)}
            style={{
              backgroundColor: isSelected ? "#6C5CE7" : "#1A1A2E",
              borderWidth: 1.5,
              borderColor: isSelected ? "#8B7CF7" : "#3A3A5E",
              borderRadius: 20,
              paddingVertical: 8,
              paddingHorizontal: 16,
            }}
          >
            <Text
              style={{
                color: isSelected ? "#FFFFFF" : "#B0B0C0",
                fontSize: 14,
                fontWeight: isSelected ? "600" : "400",
              }}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
