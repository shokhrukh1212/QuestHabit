/**
 * StoneTabletInput — Text input styled as a carved stone tablet.
 * Stone texture background with pixel-art edges, NOT a standard text field.
 */

import { TextInput, View } from "react-native";

interface StoneTabletInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  maxLength?: number;
  autoFocus?: boolean;
}

export function StoneTabletInput({
  value,
  onChangeText,
  placeholder,
  maxLength = 50,
  autoFocus = false,
}: StoneTabletInputProps) {
  return (
    <View
      style={{
        backgroundColor: "#1A1A2E",
        borderWidth: 2,
        borderColor: "#3A3A5E",
        borderRadius: 8,
        marginHorizontal: 16,
        // Stone tablet effect — inner shadow illusion with layered borders
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 4,
      }}
    >
      {/* Top edge highlight for carved-in effect */}
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 4,
          right: 4,
          height: 1,
          backgroundColor: "rgba(108, 92, 231, 0.2)",
          borderRadius: 1,
        }}
      />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#7F8C8D"
        maxLength={maxLength}
        autoFocus={autoFocus}
        autoCapitalize="sentences"
        autoCorrect={false}
        style={{
          color: "#FFFFFF",
          fontSize: 16,
          fontWeight: "500",
          paddingVertical: 14,
          paddingHorizontal: 16,
          textAlign: "center",
        }}
      />
      {/* Bottom edge shadow for depth */}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 4,
          right: 4,
          height: 1,
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          borderRadius: 1,
        }}
      />
    </View>
  );
}
