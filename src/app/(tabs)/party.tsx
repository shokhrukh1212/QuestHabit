// Design reference: S.1 Party Dashboard
import { useState } from "react";
import { View, Text } from "react-native";

import { FeatureGatedAuth } from "@/components/auth/FeatureGatedAuth";
import { StoneButton } from "@/components/ui/StoneButton";
import { useAuthStore } from "@/stores/auth-store";

export default function PartyScreen() {
  const isGuest = useAuthStore((s) => s.isGuest);
  const [dismissed, setDismissed] = useState(false);

  // Guests see the feature-gated auth prompt (unless they dismissed it)
  if (isGuest && !dismissed) {
    return (
      <FeatureGatedAuth
        context="party"
        onAuthenticated={() => {
          // After auth, isGuest becomes false → re-renders as authenticated
        }}
        onDismiss={() => setDismissed(true)}
      />
    );
  }

  return (
    <View className="flex-1 bg-bg-primary items-center justify-center px-6">
      <Text className="text-accent-green text-2xl font-bold">
        Party
      </Text>
      <Text className="text-text-muted text-md mt-sm text-center">
        Adventurers are stronger together
      </Text>
      {isGuest && (
        <View style={{ marginTop: 20 }}>
          <StoneButton
            label="Save to Unlock"
            onPress={() => setDismissed(false)}
            variant="gold"
          />
        </View>
      )}
    </View>
  );
}
