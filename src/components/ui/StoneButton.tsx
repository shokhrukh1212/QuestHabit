/**
 * StoneButton — RPG-styled action button with variants and animations.
 * Variants: primary (purple), secondary (muted), gold accent.
 * Supports pulse glow animation, loading/disabled states, and optional icon.
 */

import { useEffect } from "react";
import {
  ActivityIndicator,
  Pressable,
  Text,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

type ButtonVariant = "primary" | "secondary" | "gold";

interface StoneButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  /** Show pulsing glow animation */
  pulse?: boolean;
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
}

const VARIANT_STYLES: Record<
  ButtonVariant,
  { bg: string; border: string; text: string; glow: string }
> = {
  primary: {
    bg: "#6C5CE7",
    border: "#8B7CF7",
    text: "#FFFFFF",
    glow: "rgba(108, 92, 231, 0.6)",
  },
  secondary: {
    bg: "#1A1A2E",
    border: "#3A3A5E",
    text: "#B0B0C0",
    glow: "rgba(26, 26, 46, 0.4)",
  },
  gold: {
    bg: "#F4A261",
    border: "#F7C08A",
    text: "#0D0D1A",
    glow: "rgba(244, 162, 97, 0.6)",
  },
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function StoneButton({
  label,
  onPress,
  variant = "primary",
  pulse = false,
  loading = false,
  disabled = false,
  icon,
}: StoneButtonProps) {
  const style = VARIANT_STYLES[variant];
  const scale = useSharedValue(1);
  const glowOpacity = useSharedValue(0.3);

  useEffect(() => {
    if (pulse && !disabled) {
      glowOpacity.value = withRepeat(
        withSequence(
          withTiming(0.8, { duration: 1000 }),
          withTiming(0.3, { duration: 1000 }),
        ),
        -1,
        true,
      );
    }
  }, [pulse, disabled, glowOpacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    shadowOpacity: glowOpacity.value,
  }));

  const handlePressIn = () => {
    scale.value = withTiming(0.95, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 150 });
  };

  const isDisabled = disabled || loading;

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={isDisabled}
      style={[
        animatedStyle,
        glowStyle,
        {
          backgroundColor: style.bg,
          borderWidth: 2,
          borderColor: style.border,
          borderRadius: 12,
          paddingVertical: 14,
          paddingHorizontal: 24,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          gap: 8,
          opacity: isDisabled ? 0.5 : 1,
          shadowColor: style.glow,
          shadowOffset: { width: 0, height: 0 },
          shadowRadius: 16,
          elevation: 8,
        },
      ]}
    >
      {loading ? (
        <ActivityIndicator color={style.text} size="small" />
      ) : (
        <>
          {icon && <View>{icon}</View>}
          <Text
            style={{
              color: style.text,
              fontSize: 16,
              fontWeight: "700",
              letterSpacing: 0.5,
            }}
          >
            {label}
          </Text>
        </>
      )}
    </AnimatedPressable>
  );
}
