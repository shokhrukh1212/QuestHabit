/**
 * FloatingXPText — Animated "+50 XP" text that floats upward and fades out.
 * Core dopamine feedback used when habits are set during prologue.
 */

import { useEffect } from "react";
import { Text } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface FloatingXPTextProps {
  amount: number;
  /** Called when animation completes */
  onComplete?: () => void;
}

export function FloatingXPText({ amount, onComplete }: FloatingXPTextProps) {
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    translateY.value = withTiming(-80, { duration: 1500 });
    opacity.value = withTiming(0, { duration: 1500 }, (finished) => {
      if (finished && onComplete) {
        runOnJS(onComplete)();
      }
    });
  }, [translateY, opacity, onComplete]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        animatedStyle,
        { alignSelf: "center", position: "absolute" },
      ]}
    >
      <Text
        style={{
          color: "#F4A261",
          fontSize: 28,
          fontWeight: "800",
          textShadowColor: "rgba(244, 162, 97, 0.5)",
          textShadowOffset: { width: 0, height: 0 },
          textShadowRadius: 12,
        }}
      >
        +{amount} XP
      </Text>
    </Animated.View>
  );
}
