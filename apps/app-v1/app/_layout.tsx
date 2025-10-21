import { useAuthStore } from "@/libs/stores/auth-store";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useShallow } from "zustand/shallow";

export default function RootLayout() {
  const { isAuthenticated, isPlusMember } = useAuthStore(
    useShallow((state) => ({
      isAuthenticated: state.isAuthenticated,
      isPlusMember: state.isPlusMember,
    }))
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        {/* auth */}
        <Stack.Protected guard={!isAuthenticated}>
          <Stack.Screen name="(auth)/sign-in" />
        </Stack.Protected>

        {/* account */}
        <Stack.Protected guard={isAuthenticated}>
          <Stack.Screen name="(protected)" />

          {/* membership account */}
          <Stack.Protected guard={isPlusMember}>
            <Stack.Screen name="(protected)/(member)" />
          </Stack.Protected>
        </Stack.Protected>
      </Stack>
    </SafeAreaView>
  );
}
