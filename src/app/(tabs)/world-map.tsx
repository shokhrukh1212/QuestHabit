// Design reference: W.2 World Map
import { View, Text } from "react-native";

export default function WorldMapScreen() {
  return (
    <View className="flex-1 bg-bg-primary items-center justify-center">
      <Text className="text-accent-blue text-2xl font-bold">
        World Map
      </Text>
      <Text className="text-text-muted text-md mt-sm">
        Explore the realm
      </Text>
    </View>
  );
}
