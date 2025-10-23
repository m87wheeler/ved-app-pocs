import { useState } from "react";
import { StyleSheet, TextInput, View, Button, Text } from "react-native";
import { api } from "../api";

type Props = Readonly<{
  onSuccess?: () => void;
}>;

export function SignInForm({ onSuccess }: Props) {
  const [email, onEmailChange] = useState("");
  const [password, onPasswordChange] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    try {
      if (!email || !password) {
        throw new Error("Email and password are required.");
      }

      const success = await api.auth.signIn(email, password);
      if (!success) {
        throw new Error("Invalid email or password.");
      }

      onSuccess?.();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred."
      );
    }
  };

  return (
    <View style={$styles.form}>
      <View style={$styles.formItem}>
        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={onEmailChange}
          style={$styles.input}
        />
      </View>
      <View style={$styles.formItem}>
        <TextInput
          placeholder="Password"
          secureTextEntry
          onChangeText={onPasswordChange}
          style={$styles.input}
        />
      </View>
      <Button title="Sign In" onPress={handleSignIn} />
      {error ? (
        <View>
          <Text style={$styles.error}>{error}</Text>
        </View>
      ) : null}
    </View>
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
  error: {
    color: "red",
    marginTop: 8,
  },
});
