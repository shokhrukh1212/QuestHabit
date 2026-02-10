import "../../global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";

/**
 * Root layout — wraps the entire app.
 *
 * Expo Router layout files define how child routes are rendered.
 * Stack = stack navigator (screens push on top of each other).
 * The (tabs) group uses a Tab navigator (defined in its own _layout).
 * The (prologue) group uses a Stack for the onboarding flow.
 */

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "#0D0D1A" },
            animation: "fade",
          }}
        >
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(prologue)" />
        </Stack>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
