// Design reference: D.1 Quest Path
import { View, Text } from "react-native";

export default function QuestPathScreen() {
  return (
    <View className="flex-1 bg-bg-primary items-center justify-center">
      <Text className="text-accent-gold text-2xl font-bold">
        Quest Path
      </Text>
      <Text className="text-text-muted text-md mt-sm">
        Your daily adventure awaits
      </Text>
    </View>
  );
}
