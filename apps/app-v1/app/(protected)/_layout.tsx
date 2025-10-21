import { ViewContainer } from "@/libs/components/view-container";
import { useAuthStore } from "@/libs/stores/auth-store";
import { Stack } from "expo-router";
import { Button, StyleSheet, View } from "react-native";

export default function ProtectedLayout() {
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);

  const handleSignOut = () => {
    setIsAuthenticated(false);
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
