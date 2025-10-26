import { useState } from "react";
import { StyleSheet, TextInput, View, Button, Text } from "react-native";
import { api } from "../api";

type Props = Readonly<{
  /**
   * Callback invoked when the sign-in process starts.
   */
  onSubmit?: () => void;
  /**
   * Callback invoked upon a successful sign-in.
   */
  onSuccess?: () => void;
  /**
   * Callback invoked if an error occurs during sign-in.
   */
  onError?: (error: Error) => void;
  /**
   * Callback invoked when the sign-in process is complete, regardless of outcome.
   */
  onComplete?: () => void;
}>;

export function SignInForm({
  onSubmit,
  onSuccess,
  onError,
  onComplete,
}: Props) {
  const [email, onEmailChange] = useState("");
  const [password, onPasswordChange] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    try {
      if (!email || !password) {
        throw new Error("Email and password are required.");
      }

      setIsSubmitting(true);
      setError("");
      onSubmit?.();

      const { success, error } = await api.auth.signIn(email, password);
      if (!success) {
        throw new Error(error || "Sign-in failed. Please try again.");
      }

      onSuccess?.();
    } catch (error) {
      const isError = error instanceof Error;
      setError(isError ? error.message : "An unexpected error occurred.");
      onError?.(isError ? error : new Error("Unknown error"));
    } finally {
      onComplete?.();
      setIsSubmitting(false);
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
      <Button
        title={isSubmitting ? "Signing In..." : "Sign In"}
        onPress={handleSignIn}
      />
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
