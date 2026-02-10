/**
 * ProgressDots — Row of small circles showing habit setup progress (1/3, 2/3, 3/3).
 * Filled green = complete, glowing purple = current, gray = upcoming.
 */

import { View } from "react-native";

interface ProgressDotsProps {
  total: number;
  /** 0-indexed current step */
  current: number;
}

export function ProgressDots({ total, current }: ProgressDotsProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 12,
        paddingVertical: 16,
      }}
    >
      {Array.from({ length: total }, (_, i) => {
        const isComplete = i < current;
        const isCurrent = i === current;

        return (
          <View
            key={i}
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: isComplete
                ? "#2ECC71"
                : isCurrent
                  ? "#6C5CE7"
                  : "#3A3A5E",
              ...(isCurrent && {
                shadowColor: "#6C5CE7",
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.8,
                shadowRadius: 6,
                elevation: 4,
              }),
            }}
          />
        );
      })}
    </View>
  );
}
