// Design reference: S.1 Party Dashboard
import { View, Text } from "react-native";

export default function PartyScreen() {
  return (
    <View className="flex-1 bg-bg-primary items-center justify-center">
      <Text className="text-accent-green text-2xl font-bold">
        Party
      </Text>
      <Text className="text-text-muted text-md mt-sm">
        Adventurers are stronger together
      </Text>
    </View>
  );
}
