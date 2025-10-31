import { useEffect, useRef, useState } from "react";
import {
  TextInput as NativeTextInput,
  Pressable,
  Text,
  View,
  type ViewStyle,
  type TextInputProps,
} from "react-native";
import { StyleSheet } from "react-native-unistyles";

type Props = Readonly<{
  style?: ViewStyle;
}> &
  TextInputProps;

export function PasswordInput({ style, ...props }: Props) {
  const { showPassword, toggleShowPassword } = useShowPassword();

  return (
    <View style={[$styles.container, style]}>
      <NativeTextInput
        {...props}
        autoCapitalize="none"
        secureTextEntry={!showPassword}
        style={$styles.input}
      />
      <Pressable onPress={toggleShowPassword} style={$styles.toggle}>
        <Text style={$styles.toggleText}>{showPassword ? "Hide" : "Show"}</Text>
      </Pressable>
    </View>
  );
}

const $styles = StyleSheet.create((_) => ({
  container: {
    flexDirection: "row",
    gap: _.gap.md,
    backgroundColor: _.colors.background.base,
    borderWidth: _.border.md,
    borderRadius: _.radius.sm,
    borderColor: _.colors.brand.primary,
    overflow: "hidden",
  },
  input: {
    flex: 1,
    paddingBlock: _.padding.sm,
    paddingLeft: _.padding.md,
    fontSize: _.fontSize.md,
    fontFamily: _.fontFamily.body,
  },
  toggle: {
    minWidth: 80,
    justifyContent: "center",
    alignItems: "center",
    padding: _.padding.sm,
    borderWidth: _.border.md,
    borderColor: _.colors.background.base,
    borderRadius: _.radius.sm,
    backgroundColor: _.colors.brand.primary,
  },
  toggleText: {
    color: _.colors.text.onBrand,
    fontSize: _.fontSize.sm,
  },
}));

/**
 * Custom React hook to manage the visibility of a password input field.
 *
 * This hook provides a boolean state indicating whether the password is currently visible,
 * and a function to toggle the visibility. When toggled, the password will be shown for 3 seconds
 * before automatically hiding again. If toggled again within the 3-second window, the timer resets.
 *
 * @returns An object containing:
 * - `showPassword`: A boolean indicating if the password is visible.
 * - `toggleShowPassword`: A function to toggle the password visibility.
 */
function useShowPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const showTimeout = useRef<number | null>(null);

  const toggleShowPassword = () => {
    if (showTimeout.current) {
      clearTimeout(showTimeout.current);
      showTimeout.current = null;
    }

    setShowPassword((prev) => !prev);
    showTimeout.current = setTimeout(() => {
      setShowPassword(false);
      showTimeout.current = null;
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (showTimeout.current) {
        clearTimeout(showTimeout.current);
      }
    };
  }, []);

  return { showPassword, toggleShowPassword };
}
