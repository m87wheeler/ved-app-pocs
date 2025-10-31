import { StyleSheet, View, Text } from "react-native";
import { api } from "../api";
import { TextInput } from "./text-input";
import { Button } from "./button";
import { useMutation } from "@tanstack/react-query";
import { useForm, useStore } from "@tanstack/react-form";
import { useRouter } from "expo-router";
import { useAuthStore } from "../stores/auth-store";
import { PasswordInput } from "./password-input";

export function SignInForm() {
  const router = useRouter();
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);

  const { mutateAsync } = useMutation({
    mutationFn: async (value: { email: string; password: string }) => {
      const res = await api.auth.signIn(value.email, value.password);
      if (!res?.success) {
        throw new Error(res?.error || "Sign-in failed");
      }
      return res;
    },
  });

  const form = useForm({
    defaultValues: { email: "", password: "" },
    onSubmit: async ({ formApi, value }) => {
      try {
        await mutateAsync(value);
        formApi.reset();
        setIsAuthenticated(true);
        router.replace("/");
      } catch (error) {}
    },
  });

  const formErrorMap = useStore(form.store, (state) => state.errorMap);

  return (
    <View style={$styles.form}>
      <form.Field name="email">
        {(field) => (
          <View style={$styles.formItem}>
            <TextInput
              placeholder="Email"
              keyboardType="email-address"
              value={field.state.value}
              onChangeText={field.handleChange}
            />
          </View>
        )}
      </form.Field>
      <form.Field name="password">
        {(field) => (
          <View style={$styles.formItem}>
            <PasswordInput
              placeholder="Password"
              value={field.state.value}
              onChangeText={field.handleChange}
            />
          </View>
        )}
      </form.Field>
      <form.Subscribe
        selector={(state) => [state.isSubmitting]}
        children={([isSubmitting]) => (
          <Button
            title={isSubmitting ? "Signing In..." : "Sign In"}
            onPress={async () => {
              void form.handleSubmit();
            }}
          />
        )}
      />
      {formErrorMap.onSubmit ? (
        <View>
          <Text style={$styles.error}>{formErrorMap.onSubmit}</Text>
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
