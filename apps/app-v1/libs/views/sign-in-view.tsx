import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { ViewContainer } from "../components/view-container";
import { useAuthStore } from "../stores/auth-store";
import { useRouter } from "expo-router";
import { SignInForm } from "../components/sign-in-form";

export function SignInView() {
  const router = useRouter();
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);

  const handleSignInSuccess = () => {
    setIsAuthenticated(true);
    router.replace("/");
  };

  return (
    <ViewContainer>
      <Text>Sign In To Your Account</Text>
      <SignInForm onSuccess={handleSignInSuccess} />
    </ViewContainer>
  );
}
