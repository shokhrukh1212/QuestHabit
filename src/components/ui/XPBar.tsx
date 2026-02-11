/**
 * XPBar — Animated progress bar showing XP within current level.
 * Purple fill on dark background with "180/400" text label.
 */

import { useEffect } from "react";
import { Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface XPBarProps {
  current: number;
  max: number;
  /** Show text label (default true) */
  showLabel?: boolean;
  /** Bar height in pixels (default 8) */
  height?: number;
  /** Fill color (default purple) */
  color?: string;
}

export function XPBar({
  current,
  max,
  showLabel = true,
  height = 8,
  color = "#6C5CE7",
}: XPBarProps) {
  const progress = useSharedValue(0);
  const fraction = max > 0 ? Math.min(current / max, 1) : 0;

  useEffect(() => {
    progress.value = withTiming(fraction, { duration: 600 });
  }, [fraction, progress]);

  const fillStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%` as `${number}%`,
  }));

  return (
    <View style={{ gap: 2 }}>
      <View
        style={{
          height,
          backgroundColor: "#1A1A2E",
          borderRadius: height / 2,
          overflow: "hidden",
        }}
      >
        <Animated.View
          style={[
            fillStyle,
            {
              height: "100%",
              backgroundColor: color,
              borderRadius: height / 2,
            },
          ]}
        />
      </View>
      {showLabel && (
        <Text
          style={{
            color: "#B0B0C0",
            fontSize: 10,
            textAlign: "right",
          }}
        >
          {current}/{max}
        </Text>
      )}
    </View>
  );
}
