/**
 * ScreenWrapper — Safe area + dark background wrapper for all screens.
 * Handles keyboard avoidance and optional header display.
 */

import { KeyboardAvoidingView, Platform, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ScreenWrapperProps {
  children: React.ReactNode;
  /** Override background color (e.g. pure black for Cave Awakening) */
  bgColor?: string;
  /** Adds KeyboardAvoidingView for screens with text inputs */
  withKeyboardAvoidance?: boolean;
  /** Use full screen (no safe area padding) for immersive screens */
  fullScreen?: boolean;
}

export function ScreenWrapper({
  children,
  bgColor = "#0D0D1A",
  withKeyboardAvoidance = false,
  fullScreen = false,
}: ScreenWrapperProps) {
  const content = fullScreen ? (
    <View className="flex-1" style={{ backgroundColor: bgColor }}>
      {children}
    </View>
  ) : (
    <SafeAreaView className="flex-1" style={{ backgroundColor: bgColor }}>
      {children}
    </SafeAreaView>
  );

  if (withKeyboardAvoidance) {
    return (
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ backgroundColor: bgColor }}
      >
        {content}
      </KeyboardAvoidingView>
    );
  }

  return content;
}
