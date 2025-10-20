import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const isLoggedIn = false;
const isMember = false;

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        {/* auth */}
        <Stack.Protected guard={!isLoggedIn}>
          <Stack.Screen name="(auth)" />
        </Stack.Protected>

        {/* account */}
        <Stack.Protected guard={isLoggedIn}>
          <Stack.Screen name="(protected)" />

          {/* membership account */}
          <Stack.Protected guard={isMember}>
            <Stack.Screen name="(protected)/(member)" />
          </Stack.Protected>
        </Stack.Protected>
      </Stack>
    </SafeAreaView>
  );
}
