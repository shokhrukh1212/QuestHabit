// Design reference: G.1 Settings
import { View, Text } from "react-native";

export default function SettingsScreen() {
  return (
    <View className="flex-1 bg-bg-primary items-center justify-center">
      <Text className="text-text-primary text-2xl font-bold">
        Settings
      </Text>
      <Text className="text-text-muted text-md mt-sm">
        Configure your adventure
      </Text>
    </View>
  );
}
