import { api } from "@/libs/api";
import { ViewContainer } from "@/libs/components/view-container";
import { useAuthStore } from "@/libs/stores/auth-store";
import { Stack, useRouter } from "expo-router";
import { Button, StyleSheet, View } from "react-native";

export default function ProtectedLayout() {
  const router = useRouter();
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);

  const handleSignOut = async () => {
    try {
      const { success, error } = await api.auth.signOut();
      if (!success) {
        console.error("Sign-out failed:", error);
        return;
      }
      setIsAuthenticated(false);
      router.replace("/sign-in");
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };

  return (
    <ViewContainer>
      <View style={$styles.header}>
        <Button title="Sign Out" onPress={handleSignOut} />
      </View>
      <Stack screenOptions={{ headerShown: false }} />
    </ViewContainer>
  );
}

const $styles = StyleSheet.create({
  header: {
    padding: 8,
  },
});
