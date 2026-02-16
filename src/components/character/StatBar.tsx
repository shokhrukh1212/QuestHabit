/**
 * StatBar — Animated stat bar with colored fill.
 * Shows stat icon, name, value, tier label, and optional tap handler.
 * Reuses the XPBar animation pattern (Reanimated shared values).
 */

import { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image, type ImageSource } from "expo-image";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { getStatTier } from "@/lib/game-rules";

interface StatBarProps {
  name: string;
  value: number;
  color: string;
  /** Optional pixel-art stat icon. */
  icon?: ImageSource;
  /** Max value for the bar fill (default 100). */
  max?: number;
  onPress?: () => void;
}

export function StatBar({
  name,
  value,
  color,
  icon,
  max = 100,
  onPress,
}: StatBarProps) {
  const progress = useSharedValue(0);
  const fraction = max > 0 ? Math.min(value / max, 1) : 0;
  const tier = getStatTier(value);

  useEffect(() => {
    progress.value = withTiming(fraction, { duration: 600 });
  }, [fraction, progress]);

  const fillStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%` as `${number}%`,
  }));

  const content = (
    <View style={{ gap: 4 }}>
      {/* Label row */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          {icon && (
            <Image
              source={icon}
              style={{ width: 18, height: 18 }}
              contentFit="contain"
            />
          )}
          <Text style={{ color: "#FFFFFF", fontSize: 13, fontWeight: "600" }}>
            {name}
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          <Text style={{ color: "#7F8C8D", fontSize: 11 }}>{tier}</Text>
          <Text style={{ color, fontSize: 14, fontWeight: "700" }}>
            {value}
          </Text>
          {onPress && (
            <Ionicons name="chevron-forward" size={14} color="#7F8C8D" />
          )}
        </View>
      </View>

      {/* Bar */}
      <View
        style={{
          height: 10,
          backgroundColor: "#1A1A2E",
          borderRadius: 5,
          overflow: "hidden",
        }}
      >
        <Animated.View
          style={[
            fillStyle,
            {
              height: "100%",
              backgroundColor: color,
              borderRadius: 5,
            },
          ]}
        />
      </View>
    </View>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} style={{ paddingVertical: 4 }}>
        {content}
      </Pressable>
    );
  }

  return <View style={{ paddingVertical: 4 }}>{content}</View>;
}
