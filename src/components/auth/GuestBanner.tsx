/**
 * A.4 — Guest Banner
 * Design ref: designs/Profile Tab (Guest State).png
 *
 * Full-width warning banner shown on the character profile when
 * the user is a guest. Amber tint, gold border, save progress button.
 */

import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { StoneButton } from "@/components/ui/StoneButton";

interface GuestBannerProps {
  onSaveProgress: () => void;
}

export function GuestBanner({ onSaveProgress }: GuestBannerProps) {
  return (
    <View
      style={{
        backgroundColor: "rgba(244, 162, 97, 0.08)",
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: "#F4A261",
        padding: 16,
        marginHorizontal: 16,
        marginBottom: 16,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
        }}
      >
        <Ionicons name="warning-outline" size={24} color="#F4A261" />
        <View style={{ flex: 1 }}>
          <Text
            style={{
              color: "#F4A261",
              fontSize: 14,
              fontWeight: "700",
              marginBottom: 2,
            }}
          >
            Playing as Guest
          </Text>
          <Text style={{ color: "#B0B0C0", fontSize: 12, lineHeight: 17 }}>
            Progress saved on this device only.
          </Text>
        </View>
        <StoneButton
          label="Save"
          onPress={onSaveProgress}
          variant="gold"
        />
      </View>
    </View>
  );
}
