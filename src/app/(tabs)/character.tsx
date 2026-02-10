// Design reference: C.1 Character Profile
import { View, Text } from "react-native";

export default function CharacterScreen() {
  return (
    <View className="flex-1 bg-bg-primary items-center justify-center">
      <Text className="text-accent-purple text-2xl font-bold">
        Hero Profile
      </Text>
      <Text className="text-text-muted text-md mt-sm">
        Your warrior grows stronger
      </Text>
    </View>
  );
}
