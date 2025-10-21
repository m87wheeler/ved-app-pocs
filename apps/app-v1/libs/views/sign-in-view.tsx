import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { ViewContainer } from "../components/view-container";
import { useAuthStore } from "../stores/auth-store";
import { useRouter } from "expo-router";

export function SignInView() {
  const router = useRouter();
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);

  const handleSignIn = () => {
    setIsAuthenticated(true);
    router.replace("/");
  };

  return (
    <ViewContainer>
      <Text>Sign In To Your Account</Text>
      <View style={$styles.form}>
        <View style={$styles.formItem}>
          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            style={$styles.input}
          />
        </View>
        <View style={$styles.formItem}>
          <TextInput
            placeholder="Password"
            secureTextEntry
            style={$styles.input}
          />
        </View>
        <Button title="Sign In" onPress={handleSignIn} />
      </View>
    </ViewContainer>
  );
}

const $styles = StyleSheet.create({
  form: {
    marginTop: 16,
  },
  formItem: {
    marginBottom: 8,
  },
  input: {
    borderWidth: 2,
    borderColor: "#24a0ed",
    padding: 8,
  },
});
